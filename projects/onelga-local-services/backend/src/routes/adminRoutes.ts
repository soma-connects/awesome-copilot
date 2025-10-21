import { Role } from "@prisma/client";
import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth";
import { decideApplication, getApplications, getStats, getUsers } from "../controllers/adminController";

const router = Router();

router.use(authenticate, authorize([Role.ADMIN, Role.STAFF]));

router.get("/dashboard/stats", getStats);
router.get("/stats", getStats);
router.get("/users", authorize([Role.ADMIN]), getUsers);
router.get("/applications", getApplications);
router.post("/applications/:id/decide", decideApplication);

export default router;
