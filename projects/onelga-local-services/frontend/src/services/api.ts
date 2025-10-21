import axios from "axios";
import type { ApplicationSummary, NewsArticle, User } from "../types";

const api = axios.create({
  baseURL: "/api",
});

export interface LoginResponse {
  token: string;
  user: User;
}

export const login = async (email: string, password: string) => {
  const response = await api.post<LoginResponse>("/auth/login", { email, password });
  return response.data;
};

export const fetchAdminStats = async (token: string) => {
  const response = await api.get("/admin/stats", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data as {
    totalUsers: number;
    totalApplications: number;
    pendingApplications: number;
    publishedArticles: number;
  };
};

export const fetchApplications = async (token: string) => {
  const response = await api.get<Array<ApplicationSummary & { createdAt: string }>>("/admin/applications", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.map((application) => ({
    id: application.id,
    type: application.type,
    status: application.status,
    createdAt: application.createdAt,
  }));
};

export const fetchAdminArticles = async (token: string) => {
  const response = await api.get<NewsArticle[]>("/news/admin/articles", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchPublicNews = async () => {
  const response = await api.get<NewsArticle[]>("/news");
  return response.data;
};
