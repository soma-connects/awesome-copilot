import prisma from "../utils/prisma";

export const listPublishedArticles = () => {
  return prisma.newsArticle.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });
};

export const getArticleBySlug = (slug: string) => {
  return prisma.newsArticle.findUnique({ where: { slug } });
};

export const listAdminArticles = () => {
  return prisma.newsArticle.findMany({ orderBy: { createdAt: "desc" } });
};

export const createArticle = (data: {
  title: string;
  slug: string;
  content: string;
  published?: boolean;
  authorId?: string;
}) => {
  return prisma.newsArticle.create({
    data: {
      ...data,
      publishedAt: data.published ? new Date() : null,
    },
  });
};

export const updateArticle = (id: string, data: {
  title?: string;
  slug?: string;
  content?: string;
  published?: boolean;
}) => {
  return prisma.newsArticle.update({
    where: { id },
    data: {
      ...data,
      publishedAt: typeof data.published === "boolean" ? (data.published ? new Date() : null) : undefined,
    },
  });
};

export const deleteArticle = (id: string) => {
  return prisma.newsArticle.delete({ where: { id } });
};

export const getAdminStats = async () => {
  const [totalArticles, publishedArticles, drafts] = await Promise.all([
    prisma.newsArticle.count(),
    prisma.newsArticle.count({ where: { published: true } }),
    prisma.newsArticle.count({ where: { published: false } }),
  ]);

  return { totalArticles, publishedArticles, drafts };
};
