import { ChecklistProgress } from "../models/ChecklistProgress.js";

export async function getChecklistProgress(_req, res, next) {
  try {
    const progress = await ChecklistProgress.findOne().sort({ updatedAt: -1 });

    return res.json({
      success: true,
      data:
        progress ??
        {
          completedItems: [],
          updatedAt: null,
        },
    });
  } catch (error) {
    return next(error);
  }
}

export async function updateChecklistProgress(req, res, next) {
  try {
    const { completedItems } = req.body;

    if (
      !Array.isArray(completedItems) ||
      !completedItems.every((item) => typeof item === "string")
    ) {
      return res.status(400).json({
        success: false,
        message: "completedItems must be an array of checklist item IDs.",
      });
    }

    const uniqueItems = [...new Set(completedItems)].slice(0, 18);
    const current = await ChecklistProgress.findOne().sort({ updatedAt: -1 });
    const progress = current
      ? await ChecklistProgress.findByIdAndUpdate(
          current._id,
          {
            completedItems: uniqueItems,
            updatedAt: new Date(),
          },
          { new: true, runValidators: true },
        )
      : await ChecklistProgress.create({
          completedItems: uniqueItems,
          updatedAt: new Date(),
        });

    return res.json({
      success: true,
      data: progress,
    });
  } catch (error) {
    return next(error);
  }
}
