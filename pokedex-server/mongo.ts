import * as mongoose from 'mongoose';

async function setMongo(): Promise<any> {
  let mongodbURI = process.env.MONGODB_URI;
  if (process.env.NODE_ENV === 'test') {
    mongodbURI = process.env.MONGODB_TEST_URI;
  }
  (mongoose as any).Promise = global.Promise;
  mongoose.set('useCreateIndex', true);
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useUnifiedTopology', true);
  // Connect to MongoDB using Mongoose
  await mongoose.connect(mongodbURI as string);
  console.log('Connected to MongoDB');
}

export default setMongo;
