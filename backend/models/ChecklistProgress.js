import mongoose from "mongoose";

const checklistProgressSchema = new mongoose.Schema(
  {
    completedItems: {
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

export const ChecklistProgress = mongoose.model(
  "ChecklistProgress",
  checklistProgressSchema,
);
