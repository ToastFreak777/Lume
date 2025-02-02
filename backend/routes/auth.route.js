import { Router } from "express";

import { register, login, logout } from "../controllers/auth.controller.js";

const router = Router();

router.get("/register", register);
router.get("/login", login);
router.get("/logout", logout);

export default router;
