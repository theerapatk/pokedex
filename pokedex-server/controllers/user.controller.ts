import createError = require('http-errors');
import * as jwt from 'jsonwebtoken';
import { authSchema } from '../helpers/schema-validation';
import User from '../models/user.model';
import BaseController from './base.controller';

class UserController extends BaseController {

  model = User;

  register = async (req: any, res: any, next: any) => {
    try {
      const validatedBody = await authSchema.validateAsync(req.body);

      const doesExist = await User.findOne({ email: validatedBody.email });
      if (doesExist) {
        throw new createError.Conflict(`${validatedBody.email} has already been registered`);
      }

      const user = new User(validatedBody);
      const savedUser = await user.save();

      res.status(201).json(savedUser);
    } catch (error) {
      if (error.isJoi === true) {
        error.status = 422;
      }
      next(error);
    }
  }

  login = async (req: any, res: any, next: any) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        throw new createError.NotFound(`${req.body.email} has not been registered`);
      }

      const isMatched = await user.isPasswordMatched(req.body.password);
      if (!isMatched) {
        throw new createError.Unauthorized('Invalid Email/Password');
      }

      const accessToken = jwt.sign({ user }, process.env.SECRET_ACCESS_TOKEN as string, {
        issuer: 'jojo-pokedex',
        expiresIn: '15m'
      });
      const refreshToken = jwt.sign({ user }, process.env.SECRET_REFRESH_TOKEN as string, {
        issuer: 'jojo-pokedex',
        expiresIn: '1y'
      });
      res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
      if (error.isJoi === true) {
        return next(new createError.BadRequest('Invalid Email/Password'));
      }
      next(error);
    }
  }

  refreshToken = async (req: any, res: any, next: any) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        throw new createError.BadRequest();
      }

      const decodedToken = jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN as string) as any;
      const user = decodedToken.user;
      const accessToken = jwt.sign({ user }, process.env.SECRET_ACCESS_TOKEN as string, {
        issuer: 'jojo-pokedex',
        expiresIn: '15m'
      });
      const newRefreshToken = jwt.sign({ user }, process.env.SECRET_REFRESH_TOKEN as string, {
        issuer: 'jojo-pokedex',
        expiresIn: '1y'
      });
      res.status(200).json({ accessToken, refreshToken: newRefreshToken });
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return next(new createError.Unauthorized());
      }
      next(error);
    }
  }

}

export default UserController;
