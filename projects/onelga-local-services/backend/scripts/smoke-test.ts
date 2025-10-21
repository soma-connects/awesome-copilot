const BASE_URL = process.env.BASE_URL ?? "http://localhost:4000";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@onelga.local";
const PASSWORD = process.env.ADMIN_PASSWORD ?? "Passw0rd!";

type LoginResponse = {
  token: string;
};

type AdminStats = {
  totalUsers: number;
  totalApplications: number;
  pendingApplications: number;
  publishedArticles: number;
};

async function main() {
  const loginResponse = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: PASSWORD }),
  });

  if (!loginResponse.ok) {
    throw new Error(`Login failed with status ${loginResponse.status}`);
  }

  const loginData = (await loginResponse.json()) as LoginResponse;
  console.log("Login successful");

  const statsResponse = await fetch(`${BASE_URL}/api/admin/stats`, {
    headers: { Authorization: `Bearer ${loginData.token}` },
  });

  if (!statsResponse.ok) {
    throw new Error(`Fetching stats failed with status ${statsResponse.status}`);
  }

  const stats = (await statsResponse.json()) as AdminStats;
  console.log("Admin stats:", stats);

  const newsResponse = await fetch(`${BASE_URL}/api/news`);
  if (!newsResponse.ok) {
    throw new Error(`Fetching news failed with status ${newsResponse.status}`);
  }

  const news = (await newsResponse.json()) as unknown[];
  console.log(`Fetched ${news.length} news articles`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
