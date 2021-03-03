import createError = require('http-errors');
import * as jwt from 'jsonwebtoken';
import {
  changePasswordSchema, insertUserSchema, registerUserSchema,
  updateUserSchema
} from '../helpers/schema-validation';
import Role from '../models/role.model';
import User from '../models/user.model';
import BaseController from './base.controller';
import multer = require('multer');

class UserController extends BaseController {

  model = User;

  register = async (req: any, res: any, next: any) => {
    try {
      const validatedBody = await registerUserSchema.validateAsync(req.body);

      const doesExist = await this.model.findOne({ email: validatedBody.email });
      if (doesExist) {
        throw new createError.Conflict(`${validatedBody.email} has already been registered`);
      }

      const role = await Role.findOne({ value: 0 });
      validatedBody.role = role?._id;

      new this.model(validatedBody).save();
      res.status(201).json({ success: true });
    } catch (error) {
      if (error.isJoi === true) {
        error.status = 422;
      }
      next(error);
    }
  }

  login = async (req: any, res: any, next: any) => {
    try {
      const user = await this.model.findOne({ email: req.body.email });
      if (!user) {
        throw new createError.NotFound(`${req.body.email} has not been registered`);
      }

      const isMatched = await user.isPasswordMatched(req.body.password);
      if (!isMatched) {
        throw new createError.Unauthorized('Invalid Email/Password');
      }

      const userRole = user.role.text.toLowerCase();
      const payload = {
        user: user.toJSON(),
        permissions: [userRole]
      }
      const accessToken = jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN as string, {
        issuer: 'jojo-pokedex',
        expiresIn: '15m'
      });
      const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH_TOKEN as string, {
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

  changePassword = async (req: any, res: any, next: any) => {
    try {
      const user = await this.model.findOne({ _id: req.params.id });
      if (!user) {
        throw new createError.Unauthorized('Invalid credentials');
      }

      const validatedBody = await changePasswordSchema.validateAsync(req.body);
      const isMatched = await user.isPasswordMatched(validatedBody.currentPassword);
      if (!isMatched) {
        throw new createError.Unauthorized('Invalid credentials');
      }

      if (validatedBody.password !== validatedBody.confirmPassword) {
        throw new createError.BadRequest('New password and confirm password do not match');
      }

      user.password = validatedBody.password;
      new this.model(user).save();
      res.status(200).send({ success: true });
    } catch (error) {
      if (error.isJoi === true) {
        error.status = 422;
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

      const user = await this.model.findOne({ _id: decodedToken.user._id });
      if (!user) {
        throw new createError.NotFound(`${req.body.email} has not been registered`);
      }

      const userRole = user.role.text.toLowerCase();
      const payload = {
        user: user.toJSON(),
        permissions: [userRole]
      }
      const accessToken = jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN as string, {
        issuer: 'jojo-pokedex',
        expiresIn: '15m'
      });
      const newRefreshToken = jwt.sign(payload, process.env.SECRET_REFRESH_TOKEN as string, {
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

  insert = async (req: any, res: any, next: any) => {
    try {
      const validatedBody = await insertUserSchema.validateAsync(req.body);

      if (validatedBody.hasOwnProperty('role')) {
        const role = await Role.findOne({ value: validatedBody.role });
        if (role) {
          validatedBody.role = role?._id;
        } else {
          throw new createError.BadRequest('Role not found');
        }
      }

      const savedUser = await new this.model(validatedBody).save();
      const user = await savedUser.populate('role').execPopulate();
      res.status(201).json(user);
    } catch (error) {
      if (error.isJoi === true) {
        error.status = 422;
      } else if (error.code === 11000) {
        if (error.keyValue.hasOwnProperty('email')) {
          return next(new createError.Conflict(`${error.keyValue.email} has already been registered`));
        }
      }
      next(error);
    }
  }

  update = async (req: any, res: any, next: any) => {
    try {
      const validatedBody = await updateUserSchema.validateAsync(req.body);

      if (validatedBody.hasOwnProperty('role')) {
        if (!req.user.permissions.includes('admin')) {
          throw new createError.Forbidden('Permissioin denied');
        }
        const role = await Role.findOne({ value: validatedBody.role });
        if (role) {
          validatedBody.role = role?._id;
        } else {
          throw new createError.BadRequest('Role not found');
        }
      }

      const user = await this.model
        .findOneAndUpdate({ _id: req.params.id }, validatedBody, { new: true })
        .populate('role');
      res.status(200).send({ success: true, user });
    } catch (error) {
      if (error.isJoi === true) {
        error.status = 422;
      } else if (error.code === 11000) {
        if (error.keyValue.hasOwnProperty('email')) {
          next(new createError.Conflict(`${error.keyValue.email} has already been registered`));
        }
      }
      next(error);
    }
  }

  validateRequestParam = async (req: any, res: any, next: any) => {
    try {
      const user = await this.model.findOne({ _id: req.params.id });
      if (!user) {
        throw new createError.BadRequest('User not found');
      }
      next();
    } catch (error) {
      if (error.name === 'CastError') {
        next(new createError.BadRequest('User not found'));
      }
      next(error);
    }
  }

  addProfilePicture = async (req: any, res: any, next: any) => {
    try {
      const profilePicture = req.file?.location;
      if (!profilePicture) {
        throw new createError.BadGateway('There\'s something wrong with the uploaded file');
      }

      req.body.profilePicture = profilePicture;
      const user = await this.model.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }

  //   let update = { profilePicture: req.file.location };
  //   res.status(200).send();

  //   const uid = req.params.id;

  //   const singleUpload = upload.single('image');
  //   singleUpload(req, res, function (err: { message: any; }) {
  //     if (err) {
  //       return res.json({
  //         success: false,
  //         errors: {
  //           title: 'Image Upload Error',
  //           detail: err.message,
  //           error: err,
  //         },
  //       });
  //     }

  //     let update = { profilePicture: req.file.location };

  //     User.findByIdAndUpdate(uid, update, { new: true })
  //       .then((user) => res.status(200).json({ success: true, user: user }))
  //       .catch((err) => res.status(400).json({ success: false, error: err }));
  //   });
  // }

}

export default UserController;
