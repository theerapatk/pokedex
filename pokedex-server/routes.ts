import * as express from 'express';
import * as jwt from 'express-jwt';
import RoleController from './controllers/role.controller';
import UserController from './controllers/user.controller';
import User from './models/user.model';
import createError = require('http-errors');
import guard = require('express-jwt-permissions');

const setRoutes = (app: any) => {
  const userCtrl = new UserController();

  const authRouter = express.Router();
  authRouter
    .post('/register', userCtrl.register)
    .post('/login', userCtrl.login)
    .post('/refresh-token', userCtrl.refreshToken);
  app.use('/auth', authRouter);

  const apiRouter = express.Router();
  apiRouter
    .use(jwt({ secret: process.env.SECRET_ACCESS_TOKEN as string, algorithms: ['HS256'] }))
    .put('/users/:id', forbidAdminOp, userCtrl.update)
    .put('/users/:id/change-password', forbidAdminOp, userCtrl.changePassword)
    .get('/users/:id', userCtrl.get);

  // apiRouter.route('/users/:id/add-profile-picture').post(userCtrl.addProfilePicture)

  // const uploadRouter = express.Router();
  // uploadRouter.use(jwt({ secret: process.env.SECRET_ACCESS_TOKEN as string, algorithms: ['HS256'] }));
  // uploadRouter.post(
  //   '/api/v1/users/:id/add-profile-picture',
  //   userCtrl.validateRequestParam,
  //   upload.single('image'),
  //   userCtrl.addProfilePicture);
  // app.use(uploadRouter);

  apiRouter.use(guard().check('admin'));
  apiRouter.route('/users')
    .get(userCtrl.getAll)
    .post(userCtrl.insert);
  apiRouter.get('/users/count', userCtrl.count);
  apiRouter.delete('/users/:id', forbidAdminOp, userCtrl.delete);

  const roleCtrl = new RoleController();
  apiRouter.route('/roles')
    .get(roleCtrl.getAll)
    .post(roleCtrl.insert);
  apiRouter.route('/roles/:id')
    .get(roleCtrl.get)
    .put(roleCtrl.update)
    .delete(roleCtrl.delete);
  app.use('/api/v1', apiRouter);
};

const forbidAdminOp = async (req: any, res: any, next: any) => {
  try {
    const admin = await User.findOne({ _id: req.params.id }).lean();
    if (admin?.email === 'admin') {
      next(new createError.BadRequest('You are not allowed to modify admin user'));
    }
    next();
  } catch (err) {
    next();
  }
};

export default setRoutes;
