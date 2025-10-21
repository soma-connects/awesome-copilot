import { Request, Response } from "express";
import { createArticle, deleteArticle, getAdminStats, getArticleBySlug, listAdminArticles, listPublishedArticles, updateArticle } from "../services/newsService";

export const getPublicNews = async (_req: Request, res: Response) => {
  const articles = await listPublishedArticles();
  return res.json(articles);
};

export const getArticle = async (req: Request, res: Response) => {
  const article = await getArticleBySlug(req.params.slug);
  if (!article || !article.published) {
    return res.status(404).json({ message: "Article not found" });
  }

  return res.json(article);
};

export const getAdminArticles = async (_req: Request, res: Response) => {
  const articles = await listAdminArticles();
  return res.json(articles);
};

export const createAdminArticle = async (req: Request, res: Response) => {
  const { title, slug, content, published } = req.body;
  const user = (req as Request & { user?: { id: string } }).user;
  if (!title || !slug) {
    return res.status(400).json({ message: "Title and slug are required" });
  }

  const article = await createArticle({ title, slug, content, published, authorId: user?.id });
  return res.status(201).json(article);
};

export const updateAdminArticle = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, slug, content, published } = req.body;
  const article = await updateArticle(id, { title, slug, content, published });
  return res.json(article);
};

export const removeAdminArticle = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteArticle(id);
  return res.status(204).send();
};

export const getNewsStats = async (_req: Request, res: Response) => {
  const stats = await getAdminStats();
  return res.json(stats);
};
