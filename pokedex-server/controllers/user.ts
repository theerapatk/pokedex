import * as jwt from 'jsonwebtoken';
import User from '../models/user';
import BaseController from './base';

class UserController extends BaseController {
  model = User;

  login = (req: any, res: any) => {
    this.model.findOne({ email: req.body.email }, (err: any, user: any) => {
      if (!user) { return res.sendStatus(403); }
      user.comparePassword(req.body.password, (error: any, isMatch: boolean) => {
        if (!isMatch) { return res.sendStatus(403); }
        const token = jwt.sign({ user }, process.env.SECRET_TOKEN || ''); // , { expiresIn: 10 } seconds
        res.status(200).json({ token });
      });
    });
  }

}

export default UserController;
