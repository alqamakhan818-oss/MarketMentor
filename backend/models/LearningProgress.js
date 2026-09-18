import mongoose from "mongoose";

const learningProgressSchema = new mongoose.Schema(
  {
    completedLessons: {
      type: [String],
      default: [],
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

export const LearningProgress = mongoose.model(
  "LearningProgress",
  learningProgressSchema,
);
