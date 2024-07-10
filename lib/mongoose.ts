import mongoose from 'mongoose';

let cached = (global as any).mongoose || { connection: null, promise: null };
// let isConnected: boolean = false;

export const connect = async () => {
  if (cached.connection) {
    console.log('=> using existing database connection');
    return cached.connection;
  }
  mongoose.set('strictQuery', true);

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
  }

  cached.promise =
    cached.promise ||
    mongoose.connect(process.env.MONGO_URI, {
      dbName: 'RidingRex',
      bufferCommands: false,
    });

  cached.connection = await cached.promise;

  return cached.connection;
};
