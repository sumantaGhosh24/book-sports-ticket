import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || {conn: null, promise: null};

export const connectToDatabase = async () => {
  try {
    if (cached.conn) return cached.conn;
    if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");
    cached.promise = cached.promise || mongoose.connect(MONGODB_URI);
    cached.conn = await cached.promise;
    console.log("Mongodb connection successful!");
    return cached.conn;
  } catch (error) {
    console.log(error);
  }
};
