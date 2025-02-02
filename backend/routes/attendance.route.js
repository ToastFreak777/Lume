import { Router } from "express";

import {
  getAllAttendance,
  getAttendance,
  addAttendance,
  updateAttendance,
  deleteAttendance,
} from "../controllers/attendance.controller.js";

const router = Router();

router.get("/", getAllAttendance);
router.get("/:id", getAttendance);
router.post("/", addAttendance);
router.put("/:id", updateAttendance);
router.delete("/:id", deleteAttendance);

export default router;
