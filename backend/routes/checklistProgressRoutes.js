import { Router } from "express";

import {
  getChecklistProgress,
  updateChecklistProgress,
} from "../controllers/checklistProgressController.js";

const router = Router();

router.get("/", getChecklistProgress);
router.put("/", updateChecklistProgress);

export default router;
