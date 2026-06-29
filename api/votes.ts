import mongoose from "mongoose";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is missing");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

const CounterSchema = new mongoose.Schema({
  name: String,
  count: Number,
});

const Counter =
  mongoose.models.Counter ||
  mongoose.model("Counter", CounterSchema);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  await connectDB();

  if (req.method === "GET") {
    let counter = await Counter.findOne({ name: "support" });

    if (!counter) {
      counter = await Counter.create({
        name: "support",
        count: 0,
      });
    }

    return res.status(200).json({
      count: counter.count,
    });
  }

  if (req.method === "POST") {
    const counter = await Counter.findOneAndUpdate(
      {
        name: "support",
      },
      {
        $inc: {
          count: 1,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );

    return res.status(200).json({
      count: counter.count,
    });
  }

  res.status(405).json({
    error: "Method Not Allowed",
  });
}