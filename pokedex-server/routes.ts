import * as express from 'express';
import * as jwt from 'express-jwt';
import UserController from './controllers/user.controller';

function setRoutes(app: any): void {
  const router = express.Router();
  const userCtrl = new UserController();

  router.route('/register').post(userCtrl.register);
  router.route('/login').post(userCtrl.login);
  app.use('/auth', router);

  router.use(jwt({ secret: process.env.SECRET_TOKEN as string, algorithms: ['HS256'] }));
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user/:id')
    .get(userCtrl.get)
    .put(userCtrl.update)
    .delete(userCtrl.delete);
  app.use('/api/v1', router);
}

export default setRoutes;
