import cors from "cors";
import express from "express";

import { connectDatabase } from "./config/db.js";

import checklistProgressRoutes from "./routes/checklistProgressRoutes.js";
import learningProgressRoutes from "./routes/learningProgressRoutes.js";
import marketingPlanRoutes from "./routes/marketingPlanRoutes.js";
import quizResultRoutes from "./routes/quizResultRoutes.js";

const app = express();

const allowedOrigins = (process.env.CLIENT_URL ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : true,
  }),
);

app.use(express.json({ limit: "200kb" }));

app.use(async (_req, _res, next) => {
  try {
    await connectDatabase();
    next();
  } catch (error) {
    next(error);
  }
});

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "MarketMentor API is running.",
  });
});

app.use("/api/quiz-results", quizResultRoutes);
app.use("/api/learning-progress", learningProgressRoutes);
app.use("/api/checklist-progress", checklistProgressRoutes);
app.use("/api/marketing-plans", marketingPlanRoutes);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

app.use((error, _req, res, _next) => {
  console.error(error);

  res.status(500).json({
    success: false,
    message: "Something went wrong on the server.",
  });
});

export default app;