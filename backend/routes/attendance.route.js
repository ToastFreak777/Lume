import { Router } from "express";

import {
  getAllAttendance,
  getAttendance,
  addAttendance,
  updateAttendance,
  deleteAttendance,
} from "../controllers/attendance.controller.js";

import authMiddleware from "../middleware/authentication.js";

const router = Router();

router.get("/", authMiddleware, getAllAttendance);
router.get("/:id", authMiddleware, getAttendance);
router.post("/", authMiddleware, addAttendance);
router.put("/:id", authMiddleware, updateAttendance);
router.delete("/:id", authMiddleware, deleteAttendance);

export default router;
