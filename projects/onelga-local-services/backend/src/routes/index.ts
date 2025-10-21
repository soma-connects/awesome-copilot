import { Router } from "express";
import authRoutes from "./authRoutes";
import adminRoutes from "./adminRoutes";
import newsRoutes from "./newsRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/news", newsRoutes);

export default router;
