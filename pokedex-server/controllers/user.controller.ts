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
      if (doesExist) throw new createError.Conflict(`${validatedBody.email} has already been registered`);

      const user = new User(validatedBody);
      const savedUser = await user.save();

      res.status(201).json(savedUser);
    } catch (error) {
      if (error.isJoi === true) error.status = 422
      next(error)
    }
  };

  login = async (req: any, res: any, next: any) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) throw new createError.NotFound('User not registered');

      const isMatched = await user.isPasswordMatched(req.body.password);
      if (!isMatched) throw new createError.Unauthorized('Invalid Email/Password');

      // const accessToken = jwt.sign({ user }, process.env.SECRET_TOKEN as string, { expiresIn: '1d' });
      const accessToken = jwt.sign({ user }, process.env.SECRET_ACCESS_TOKEN as string, {
        issuer: 'jojo-pokedex',
        expiresIn: '1d'
      });
      res.status(200).json({ accessToken });
    } catch (error) {
      if (error.isJoi === true) return next(new createError.BadRequest('Invalid Email/Password'))
      next(error)
    }
  };

};

export default UserController;
