import { Router } from "express";

import {
  createMarketingPlan,
  getMarketingPlans,
} from "../controllers/marketingPlanController.js";

const router = Router();

router.get("/", getMarketingPlans);
router.post("/", createMarketingPlan);

export default router;
