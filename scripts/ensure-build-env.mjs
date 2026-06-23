import { existsSync, appendFileSync, readFileSync, writeFileSync } from "node:fs";

const fallback = 'DATABASE_URL="file:./dev.db"';

if (process.env.DATABASE_URL) {
  process.exit(0);
}

if (!existsSync(".env")) {
  writeFileSync(".env", `${fallback}\n`, "utf8");
  process.exit(0);
}

const envFile = readFileSync(".env", "utf8");
if (!/^DATABASE_URL=/m.test(envFile)) {
  appendFileSync(".env", `\n${fallback}\n`, "utf8");
}
