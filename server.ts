import express from "express";
import path from "path";
import mongoose from "mongoose";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // MongoDB Connection
  const MONGODB_URI = process.env.MONGODB_URI;
  let dbConnected = false;

  if (MONGODB_URI) {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log("Connected to MongoDB successfully!");
      dbConnected = true;
    } catch (error) {
      console.error("MongoDB connection error:", error);
    }
  } else {
    console.warn("MONGODB_URI is not set in environment variables. Falling back to local memory counter.");
  }

  // --- Mongoose Schema ---
  interface ICounter {
    name: string;
    count: number;
  }
  const counterSchema = new mongoose.Schema<ICounter>({
    name: { type: String, required: true, unique: true },
    count: { type: Number, default: 0 }
  });
  const Counter = mongoose.models.Counter || mongoose.model<ICounter>('Counter', counterSchema);

  // In-memory fallback if no DB connected
  let memoryCount = 0;

  // --- API Routes ---
  
  // 1. Get current vote count
  app.get("/api/votes", async (req, res) => {
    if (!dbConnected) {
      return res.json({ count: memoryCount, status: "local" });
    }
    try {
      let counter = await Counter.findOne({ name: 'support' });
      if (!counter) {
        counter = await Counter.create({ name: 'support', count: 0 });
      }
      res.json({ count: counter.count, status: "db" });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch votes" });
    }
  });

  // 2. Submit a new vote
  app.post("/api/votes", async (req, res) => {
    if (!dbConnected) {
      memoryCount += 1;
      return res.json({ count: memoryCount, status: "local" });
    }
    try {
      const counter = await Counter.findOneAndUpdate(
        { name: 'support' },
        { $inc: { count: 1 } },
        { new: true, upsert: true }
      );
      res.json({ count: counter.count, status: "db" });
    } catch (error) {
      res.status(500).json({ error: "Failed to add vote" });
    }
  });

  // 3. Reset votes (Protected by a secret)
  app.post("/api/votes/reset", async (req, res) => {
    const { secret } = req.body;
    const envSecret = process.env.RESET_SECRET || 'pari2026'; // fallback secret for demo

    if (secret !== envSecret) {
      return res.status(403).json({ error: "Unauthorized: Invalid secret" });
    }

    if (!dbConnected) {
      memoryCount = 0;
      return res.json({ message: "Counter reset to 0 (local memory)", count: 0 });
    }

    try {
      await Counter.findOneAndUpdate(
        { name: 'support' },
        { $set: { count: 0 } },
        { upsert: true }
      );
      res.json({ message: "Counter reset to 0 in MongoDB!", count: 0 });
    } catch (error) {
      res.status(500).json({ error: "Failed to reset" });
    }
  });

  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== "production") {
    // In dev mode, mount Vite middleware to serve the React app
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve the built dist/ folder
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
