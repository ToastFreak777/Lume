import { Router } from "express";

import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";
import authMiddleware from "../middleware/authentication.js";
import authorizeUser from "../middleware/authorize.js";

const router = Router();

router.get("/", authMiddleware, getUsers);
router.get("/:id", authMiddleware, getUser);
router.put("/:id", authMiddleware, authorizeUser, updateUser);
router.delete("/:id", authMiddleware, authorizeUser, deleteUser);

export default router;
