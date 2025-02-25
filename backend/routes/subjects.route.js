import { Router } from "express";

import {
  getSubjects,
  getSubject,
  addSubject,
  updateSubject,
  deleteSubject,
} from "../controllers/subjects.controller.js";

import isAdminAuth from "../middleware/isAdminAuth.js";
import authMiddleware from "../middleware/authentication.js";

const router = Router();

router.get("/", authMiddleware, getSubjects);
router.get("/:id", authMiddleware, getSubject);
router.post("/", authMiddleware, isAdminAuth, addSubject);
router.put("/:id", authMiddleware, isAdminAuth, updateSubject);
router.delete("/:id", authMiddleware, isAdminAuth, deleteSubject);

export default router;
