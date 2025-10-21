import { Role } from "@prisma/client";
import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth";
import {
  createAdminArticle,
  getAdminArticles,
  getArticle,
  getNewsStats,
  getPublicNews,
  removeAdminArticle,
  updateAdminArticle,
} from "../controllers/newsController";

const router = Router();

router.get("/", getPublicNews);

router.get("/admin/articles", authenticate, authorize([Role.ADMIN, Role.STAFF]), getAdminArticles);
router.post("/admin/articles", authenticate, authorize([Role.ADMIN, Role.STAFF]), createAdminArticle);
router.put("/admin/articles/:id", authenticate, authorize([Role.ADMIN, Role.STAFF]), updateAdminArticle);
router.delete("/admin/articles/:id", authenticate, authorize([Role.ADMIN, Role.STAFF]), removeAdminArticle);
router.get("/admin/stats", authenticate, authorize([Role.ADMIN, Role.STAFF]), getNewsStats);

router.get("/:slug", getArticle);

export default router;
