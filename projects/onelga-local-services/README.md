# Onelga Local Services

Onelga Local Services is a full-stack platform that demonstrates a municipal services portal with authentication, admin tooling, and citizen-facing news.

## Project Structure

```
projects/onelga-local-services/
├── backend/     # Node.js + Express + Prisma API
├── frontend/    # React + TypeScript dashboard and citizen portal
└── docker-compose.yml
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm, npm, or yarn
- (Optional) Docker Desktop if you prefer running Postgres locally via Docker Compose

### Backend Setup

1. Install dependencies:
   ```bash
   cd projects/onelga-local-services/backend
   npm install
   ```
2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```
   Update the values if needed. The default configuration uses SQLite.
3. Generate the Prisma client and apply migrations:
   ```bash
   npx prisma migrate dev --name init
   ```
4. Seed demo data (admin, staff, and citizen accounts plus sample content):
   ```bash
   npm run prisma:seed
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:4000`.

### Frontend Setup

1. Install dependencies:
   ```bash
   cd projects/onelga-local-services/frontend
   npm install
   ```
2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```
   Adjust `VITE_API_URL` if your backend runs on a different URL.
3. Start the development server:
   ```bash
   npm run dev
   ```
   Open the app at `http://localhost:5173`.

### Demo Credentials

Use the seeded accounts to explore the platform locally:

| Role   | Email                | Password   |
| ------ | -------------------- | ---------- |
| Admin  | `admin@onelga.local` | `Passw0rd!` |
| Staff  | `staff@onelga.local` | `Passw0rd!` |
| Citizen| `citizen@onelga.local` | `Passw0rd!` |

### Smoke Test Script

After starting the backend, run a quick health check:

```bash
cd projects/onelga-local-services/backend
npx ts-node scripts/smoke-test.ts
```

The script signs in with the admin account, fetches dashboard stats, and retrieves the news feed.

### Unlocking Accounts

If you lock an account due to repeated failed logins, reset it with:

```bash
cd projects/onelga-local-services/backend
npm run unlock:user -- user@example.com
```

### Docker Compose (Optional)

A `docker-compose.yml` file is provided to run Postgres locally. Update `DATABASE_URL` in your backend `.env` before starting.

```bash
cd projects/onelga-local-services
docker-compose up -d
```

Run `npx prisma migrate deploy` against the Postgres instance and reseed data.

## Available Scripts

### Backend

- `npm run dev` — Start the Express server with hot reload.
- `npm run build` — Compile TypeScript output.
- `npm run prisma:seed` — Seed baseline data.
- `npm run seed:test` — Seed extended demo data.
- `npm run unlock:user -- <email>` — Clear failed login attempts for a user.
- `npm run typecheck` / `npm run lint` — Static analysis.

### Frontend

- `npm run dev` — Start the Vite dev server.
- `npm run build` — Build production assets.
- `npm run typecheck` / `npm run lint` — Static analysis.

## API Overview

Key backend endpoints are namespaced under `/api`:

- `POST /api/auth/login` — Authenticate a user.
- `GET /api/auth/validate` — Validate a JWT.
- `GET /api/admin/stats` — Admin dashboard metrics.
- `GET /api/admin/applications` — List service applications.
- `POST /api/admin/applications/:id/decide` — Approve or reject an application.
- `GET /api/news` — Public news feed.
- `GET /api/news/admin/articles` — Admin news management (requires admin or staff role).

Refer to the source code for the full set of routes and controllers.

## Testing Checklist

1. Run `npm run typecheck` in both `backend` and `frontend`.
2. Start the backend and frontend dev servers.
3. Sign in with the admin account.
4. Navigate to `/admin`, `/admin/news`, and `/admin/requests` to confirm data loads.
5. Execute the smoke test script.

## License

MIT
