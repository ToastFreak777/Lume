import { Router } from "express";

import {
  getClasses,
  getClass,
  addClass,
  updateClass,
  deleteClass,
} from "../controllers/classes.controller.js";

const router = Router();

router.get("/", getClasses);
router.get("/:id", getClass);
router.post("/", addClass);
router.put("/:id", updateClass);
router.delete("/:id", deleteClass);

export default router;
