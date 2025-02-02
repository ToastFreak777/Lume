import { Router } from "express";

import {
  getNotifications,
  getNotification,
  addNotification,
  updateNotification,
  deleteNotification,
} from "../controllers/notifications.controller.js";

const router = Router();

router.get("/", getNotifications);
router.get("/:id", getNotification);
router.post("/", addNotification);
router.put("/:id", updateNotification);
router.delete("/:id", deleteNotification);

export default router;
