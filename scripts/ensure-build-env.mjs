import { existsSync, appendFileSync, readFileSync, writeFileSync } from "node:fs";

const detectedDatabaseUrl =
  process.env.DATABASE_URL ??
  process.env.POSTGRES_PRISMA_URL ??
  process.env.POSTGRES_URL ??
  process.env.NEON_DATABASE_URL;

const fallback =
  detectedDatabaseUrl ??
  "postgresql://postgres:postgres@localhost:5432/nalyy_gate?schema=public";
const fallbackLine = `DATABASE_URL="${fallback}"`;

if (detectedDatabaseUrl) {
  process.exit(0);
}

if (!existsSync(".env")) {
  writeFileSync(".env", `${fallbackLine}\n`, "utf8");
  process.exit(0);
}

const envFile = readFileSync(".env", "utf8");
if (!/^DATABASE_URL=/m.test(envFile)) {
  appendFileSync(".env", `\n${fallbackLine}\n`, "utf8");
}
