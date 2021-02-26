import { Document, Model, model, Schema } from 'mongoose';

interface IRole extends Document {
  value: number;
  text: string;
}

const roleSchema = new Schema<IRole>({
  value: {
    type: Number,
    require: true,
    unique: true
  },
  text: {
    type: String,
    require: true,
    unique: true
  }
});

const Role: Model<IRole> = model('Role', roleSchema);

export default Role;
