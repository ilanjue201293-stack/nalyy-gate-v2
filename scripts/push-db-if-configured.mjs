import { spawnSync } from "node:child_process";

const databaseUrl =
  process.env.DATABASE_URL ??
  process.env.POSTGRES_PRISMA_URL ??
  process.env.POSTGRES_URL ??
  process.env.NEON_DATABASE_URL ??
  "";

if (!databaseUrl || databaseUrl.includes("localhost")) {
  console.log("No hosted PostgreSQL DATABASE_URL found; skipping prisma db push.");
  process.exit(0);
}

process.env.DATABASE_URL = databaseUrl;

const command = process.platform === "win32" ? "npx.cmd" : "npx";
const result = spawnSync(command, ["prisma", "db", "push", "--skip-generate"], {
  env: process.env,
  stdio: "inherit",
});

process.exit(result.status ?? 1);
