import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { login, register, validateToken } from "../controllers/authController";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/validate", authenticate, validateToken);

export default router;
