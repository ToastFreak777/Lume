import { Router } from "express";

import {
  getSubjects,
  getSubject,
  addSubject,
  updateSubject,
  deleteSubject,
} from "../controllers/subjects.controller.js";

const router = Router();

router.get("/", getSubjects);
router.get("/:id", getSubject);
router.post("/", addSubject);
router.put("/:id", updateSubject);
router.delete("/:id", deleteSubject);

export default router;
