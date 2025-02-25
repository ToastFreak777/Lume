import { Router } from "express";

import {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
  enrollStudent,
  dropCourse,
} from "../controllers/courses.controller.js";

import authMiddleware from "../middleware/authentication.js";
import isAdminAuth from "../middleware/isAdminAuth.js";
import authorizeUser from "../middleware/authorize.js";

const router = Router();

router.get("/", authMiddleware, getCourses);
router.get("/:id", authMiddleware, getCourse);
router.post("/", authMiddleware, isAdminAuth, addCourse);
router.post("/:id/enroll", authMiddleware, authorizeUser, enrollStudent);
router.put("/:id/enroll", authMiddleware, authorizeUser, dropCourse);
router.put("/:id", authMiddleware, isAdminAuth, updateCourse);
router.delete("/:id", authMiddleware, isAdminAuth, deleteCourse);

export default router;
