export type Role = "ADMIN" | "STAFF" | "CITIZEN";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
}

export interface ApplicationSummary {
  id: string;
  type: string;
  status: string;
  createdAt: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  publishedAt?: string;
}
