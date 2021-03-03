import * as mongoose from 'mongoose';

const setMongo = async () => {
  let uri = process.env.MONGODB_URI;
  if (process.env.NODE_ENV === 'test') {
    uri = process.env.MONGODB_TEST_URI;
  }

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  };

  await mongoose.connect(uri as string, options)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err.message));

  mongoose.connection.on('connected', () => {
    console.log('mongoose connected');
  });

  mongoose.connection.on('error', (err) => {
    console.log(err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('mongoose disconnected');
  });

  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
};

export default setMongo;
