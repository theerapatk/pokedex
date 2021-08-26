import * as express from 'express';
import * as jwt from 'express-jwt';
import PokeApiController from './controllers/poke-api.controller';
import RoleController from './controllers/role.controller';
import UserController from './controllers/user.controller';
import User from './models/user.model';
import createError = require('http-errors');
import guard = require('express-jwt-permissions');
import expressRedisCache = require('express-redis-cache');
import redis = require('redis');

const setRoutes = (app: any) => {
  const authRouter = express.Router();
  const userCtrl = new UserController();
  authRouter
    .post('/register', userCtrl.register)
    .post('/login', userCtrl.login)
    .post('/refresh-token', userCtrl.refreshToken);
  app.use('/auth', authRouter);

  const pokeCtrl = new PokeApiController();
  const apiRouter = express.Router();
  // const options = process.env.REDIS_URL ? { url: process.env.REDIS_URL } : { port: 6379, host: 'localhost' };
  // const client = redis.createClient(options);
  // const cache = expressRedisCache({ client, expire: 86400 });
  // cache.route()
  apiRouter
    .get('/poke-api/pokemons', pokeCtrl.getPokemons)
    .get('/poke-api/pokemons/:id', pokeCtrl.getPokemon)
    .get('/poke-api/types/:type', pokeCtrl.getTypes);

  apiRouter
    .use(jwt({ secret: process.env.SECRET_ACCESS_TOKEN as string, algorithms: ['HS256'] }))
    .put('/users/:id', guardAdmin, userCtrl.update)
    .put('/users/:id/change-password', guardAdmin, userCtrl.changePassword)
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
  apiRouter.delete('/users/:id', guardAdmin, userCtrl.delete);

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

const guardAdmin = async (req: any, res: any, next: any) => {
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