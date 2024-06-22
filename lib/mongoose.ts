import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URL) return console.log('MONGODB_URL not found');

  if (isConnected) {
    return console.log('Using existing database connection');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: 'devflow',
    });

    isConnected = true;

    console.log('Database connected');
  } catch (error) {
    console.log('Error connecting to database: ', error);
  }
};
