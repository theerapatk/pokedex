import * as express from 'express';
import * as jwt from 'express-jwt';
import UserController from './controllers/user.controller';

function setRoutes(app: any): void {
  const userCtrl = new UserController();

  const authRouter = express.Router();
  authRouter.route('/register').post(userCtrl.register);
  authRouter.route('/login').post(userCtrl.login);
  authRouter.route('/refresh-token').post(userCtrl.refreshToken);
  app.use('/auth', authRouter);

  const apiRouter = express.Router();
  apiRouter.use(jwt({ secret: process.env.SECRET_ACCESS_TOKEN!, algorithms: ['HS256'] }));
  apiRouter.route('/users').get(userCtrl.getAll);
  apiRouter.route('/users/count').get(userCtrl.count);
  apiRouter.route('/users/:id')
    .get(userCtrl.get)
    .put(userCtrl.update)
    .delete(userCtrl.delete);
  app.use('/api/v1', apiRouter);
}

export default setRoutes;
