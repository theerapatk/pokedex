import * as bcrypt from 'bcrypt';
import { Document, Model, model, Schema } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: { text: string };
  isPasswordMatched(password: any): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    require: true,
    lowercase: true,
    unique: true,
    trim: true
  },
  password: { type: String, require: true },
  name: { type: String },
  role: { type: Schema.Types.ObjectId, ref: 'Role' }
}, { versionKey: false });

const populateRole = function (this: any) {
  this.populate('role');
};
userSchema.pre('findOne', populateRole).pre('find', populateRole);

userSchema.pre('save', async function (next): Promise<void> {
  try {
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    if (!this.password) {
      // it should generates random passwrod and notify via user email
      this.password = '$2b$10$nSd.4cyjZ2P7HmfGFhTuYejaWSdcFkWZRHt2df.SROn6LP2Obj1kS';
    }
    if (!this.name) {
      this.name = this._id;
    }
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isPasswordMatched = async function (password): Promise<boolean> {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

// Omit the password when returning a user
userSchema.set('toJSON', {
  transform: (doc: any, ret: { password: any; }, options: any) => {
    delete ret.password;
    return ret;
  }
});

const User: Model<IUser> = model('User', userSchema);

export default User;
