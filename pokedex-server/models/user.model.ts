import * as bcrypt from 'bcryptjs';
import { Document, model, Schema } from 'mongoose';

interface IUser extends Document {
  isPasswordMatched(password: any): Promise<boolean>;
  name: String,
  email: { type: String, unique: true, lowercase: true, trim: true },
  password: string,
  role: String
}

const userSchema = new Schema<IUser>({
  name: String,
  email: { type: String, unique: true, lowercase: true, trim: true },
  password: String,
  role: String
});

// Before saving the user, hash the password
userSchema.pre('save', function (next): void {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) { return next(error); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.isPasswordMatched = async function (password) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (error) {
    throw error
  }
}

// Omit the password when returning a user
userSchema.set('toJSON', {
  transform: (doc: any, ret: { password: any; }, options: any) => {
    delete ret.password;
    return ret;
  }
});

const User = model('User', userSchema);

export default User;
