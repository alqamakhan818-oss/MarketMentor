import { MarketingPlan } from "../models/MarketingPlan.js";

export async function createMarketingPlan(req, res, next) {
  try {
    const { businessType, goal, budget, recommendedPlan } = req.body;

    if (
      typeof businessType !== "string" ||
      !businessType.trim() ||
      typeof goal !== "string" ||
      !goal.trim() ||
      typeof budget !== "string" ||
      !budget.trim() ||
      recommendedPlan === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "businessType, goal, budget and recommendedPlan are required.",
      });
    }

    const plan = await MarketingPlan.create({
      businessType,
      goal,
      budget,
      recommendedPlan,
    });

    return res.status(201).json({
      success: true,
      data: plan,
    });
  } catch (error) {
    return next(error);
  }
}

export async function getMarketingPlans(_req, res, next) {
  try {
    const plans = await MarketingPlan.find()
      .sort({ createdAt: -1 })
      .limit(10);

    return res.json({
      success: true,
      data: plans,
    });
  } catch (error) {
    return next(error);
  }
}
