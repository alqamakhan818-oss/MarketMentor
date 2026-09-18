import mongoose from "mongoose";

export async function connectDatabase() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error(
      "MONGODB_URI is missing. Copy .env.example to .env and add your MongoDB connection string.",
    );
  }

  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
}
