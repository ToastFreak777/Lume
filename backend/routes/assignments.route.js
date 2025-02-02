import { Router } from "express";

import {
  getAssignments,
  getAssignment,
  addAssignment,
  updateAssignment,
  deleteAssignment,
} from "../controllers/assignments.controller.js";

const router = Router();

router.get("/", getAssignments);
router.get("/:id", getAssignment);
router.post("/", addAssignment);
router.put("/:id", updateAssignment);
router.delete("/:id", deleteAssignment);

export default router;
