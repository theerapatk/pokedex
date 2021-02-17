import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';
import { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: String,
  username: String,
  email: { type: String, unique: true, lowercase: true, trim: true },
  password: string,
  role: String
}

const userSchema = new Schema<IUser>({
  name: String,
  username: String,
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

userSchema.methods.comparePassword = function (candidatePassword, callback): void {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

// Omit the password when returning a user
userSchema.set('toJSON', {
  transform: (doc: any, ret: { password: any; }, options: any) => {
    delete ret.password;
    return ret;
  }
});

const User = mongoose.model('User', userSchema);
// mongoose.model<user>("User", userSchema);

export default User;
