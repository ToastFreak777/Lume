import { Router } from "express";

import {
  register,
  login,
  logout,
  verify,
} from "../controllers/auth.controller.js";

import authMiddleware from "../middleware/authentication.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.get("/verify", authMiddleware, verify);

export default router;
