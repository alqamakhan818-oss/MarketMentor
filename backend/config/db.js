import mongoose from "mongoose";

let connectionPromise = null;

export async function connectDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionPromise) {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("MONGODB_URI is missing.");
    }

    connectionPromise = mongoose.connect(mongoUri);
  }

  await connectionPromise;

  console.log("MongoDB connected");

  return mongoose.connection;
}