import { QuizResult } from "../models/QuizResult.js";

export async function createQuizResult(req, res, next) {
  try {
    const score = Number(req.body.score);
    const totalQuestions = Number(req.body.totalQuestions);

    if (
      !Number.isInteger(score) ||
      !Number.isInteger(totalQuestions) ||
      totalQuestions < 1 ||
      score < 0 ||
      score > totalQuestions
    ) {
      return res.status(400).json({
        success: false,
        message: "Provide a valid score and totalQuestions value.",
      });
    }

    const percentage = Math.round((score / totalQuestions) * 100);
    const result = await QuizResult.create({
      score,
      totalQuestions,
      percentage,
    });

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return next(error);
  }
}

export async function getQuizResults(_req, res, next) {
  try {
    const results = await QuizResult.find()
      .sort({ createdAt: -1 })
      .limit(10);

    return res.json({
      success: true,
      data: results,
    });
  } catch (error) {
    return next(error);
  }
}
