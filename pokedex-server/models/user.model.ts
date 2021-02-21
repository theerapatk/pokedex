import * as bcrypt from 'bcrypt';
import { Document, model, Schema } from 'mongoose';

interface IUser extends Document {
  password: string,
  isPasswordMatched(password: any): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  name: String,
  email: {
    type: String,
    require: true,
    lowercase: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    require: true
  },
  role: String
});

userSchema.pre('save', async function (next): Promise<void> {
  try {
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
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
