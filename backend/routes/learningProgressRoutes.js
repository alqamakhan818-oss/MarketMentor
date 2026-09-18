import { Router } from "express";

import {
  getLearningProgress,
  updateLearningProgress,
} from "../controllers/learningProgressController.js";

const router = Router();

router.get("/", getLearningProgress);
router.put("/", updateLearningProgress);

export default router;
