import { Router } from "express";

import {
  getGrades,
  getGrade,
  addGrade,
  updateGrade,
  deleteGrade,
} from "../controllers/grades.controller.js";

const router = Router();

router.get("/", getGrades);
router.get("/:id", getGrade);
router.post("/", addGrade);
router.put("/:id", updateGrade);
router.delete("/:id", deleteGrade);

export default router;
