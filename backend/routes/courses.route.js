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

const router = Router();

router.get("/", getCourses);
router.get("/:id", getCourse);
router.post("/", addCourse);
router.post("/:id/enroll", enrollStudent);
router.put("/:id/enroll", dropCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;
