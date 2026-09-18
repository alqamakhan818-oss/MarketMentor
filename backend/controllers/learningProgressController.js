import { LearningProgress } from "../models/LearningProgress.js";

export async function getLearningProgress(_req, res, next) {
  try {
    const progress = await LearningProgress.findOne().sort({ updatedAt: -1 });

    return res.json({
      success: true,
      data:
        progress ??
        {
          completedLessons: [],
          updatedAt: null,
        },
    });
  } catch (error) {
    return next(error);
  }
}

export async function updateLearningProgress(req, res, next) {
  try {
    const { completedLessons } = req.body;

    if (
      !Array.isArray(completedLessons) ||
      !completedLessons.every((item) => typeof item === "string")
    ) {
      return res.status(400).json({
        success: false,
        message: "completedLessons must be an array of lesson IDs.",
      });
    }

    const uniqueLessons = [...new Set(completedLessons)].slice(0, 8);
    const current = await LearningProgress.findOne().sort({ updatedAt: -1 });
    const progress = current
      ? await LearningProgress.findByIdAndUpdate(
          current._id,
          {
            completedLessons: uniqueLessons,
            updatedAt: new Date(),
          },
          { new: true, runValidators: true },
        )
      : await LearningProgress.create({
          completedLessons: uniqueLessons,
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
