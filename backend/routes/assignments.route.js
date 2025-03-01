import {Router} from "express";

import {
    getAssignments,
    getAssignment,
    addAssignment,
    updateAssignment,
    deleteAssignment, getAssignmentsForCourse,
} from "../controllers/assignments.controller.js";

import authMiddleware from "../middleware/authentication.js";

const router = Router();

router.get("/", authMiddleware, getAssignments);
router.get("/courses", authMiddleware, getAssignmentsForCourse);
router.get("/:id", authMiddleware, getAssignment);
router.post("/", authMiddleware, addAssignment);
router.put("/:id", authMiddleware, updateAssignment);
router.delete("/:id", authMiddleware, deleteAssignment);

export default router;
