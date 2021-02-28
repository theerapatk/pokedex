import * as express from 'express';
import * as jwt from 'express-jwt';
import RoleController from './controllers/role.controller';
import UserController from './controllers/user.controller';
import createError = require('http-errors');

function setRoutes(app: any): void {
  const userCtrl = new UserController();

  const authRouter = express.Router();
  authRouter.route('/register').post(userCtrl.register);
  authRouter.route('/login').post(userCtrl.login);
  authRouter.route('/refresh-token').post(userCtrl.refreshToken);
  app.use('/auth', authRouter);

  const apiRouter = express.Router();
  apiRouter.use(
    jwt({ secret: process.env.SECRET_ACCESS_TOKEN as string, algorithms: ['HS256'] }),
    checkIfAdminRole
  );
  apiRouter.route('/users').get(userCtrl.getAll);
  apiRouter.route('/users').post(userCtrl.insert);
  apiRouter.route('/users/count').get(userCtrl.count);
  apiRouter.route('/users/:id')
    .get(userCtrl.get)
    .put(userCtrl.update)
    .delete(userCtrl.delete);

  const roleCtrl = new RoleController();
  apiRouter.route('/roles').get(roleCtrl.getAll);
  apiRouter.route('/roles').post(roleCtrl.insert);
  apiRouter.route('/roles/count').get(roleCtrl.count);
  apiRouter.route('/roles/:id')
    .get(roleCtrl.get)
    .put(roleCtrl.update)
    .delete(roleCtrl.delete);
  app.use('/api/v1', apiRouter);
}

function checkIfAdminRole(req: any, res: any, next: any) {
  const role = req.user.user.role.text.toLowerCase();
  if (role !== 'admin') {
    return next(new createError.Forbidden('Only admin is allowed to access the resource'));
  }
  next();
}

export default setRoutes;
