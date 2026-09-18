import { Router } from "express";

import {
  createQuizResult,
  getQuizResults,
} from "../controllers/quizResultController.js";

const router = Router();

router.get("/", getQuizResults);
router.post("/", createQuizResult);

export default router;
