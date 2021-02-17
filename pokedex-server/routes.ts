import * as express from 'express';
import * as jwt from 'express-jwt';
import UserController from './controllers/user';

function setRoutes(app: any): void {
  const router = express.Router();
  const userCtrl = new UserController();

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/user').post(userCtrl.insert);

  applyJwtCheck(router);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user/:id')
    .get(userCtrl.get)
    .put(userCtrl.update)
    .delete(userCtrl.delete);

  app.use('/api/v1', router);
}

function applyJwtCheck(router: any): void {
  router.use(
    jwt({ secret: process.env.SECRET_TOKEN as string, algorithms: ['HS256'] }),
    handleAfterJwtChecked()
  );
}

function handleAfterJwtChecked() {
  return (error: any, req: any, res: any, next: any) => {
    if (error) return res.sendStatus(401);
    next();
  };
}

export default setRoutes;
