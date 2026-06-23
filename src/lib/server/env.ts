export function getEnv(name: string, fallback = "") {
  const value = process.env[name];
  if (!value || value.trim() === "") return fallback;
  return value.trim();
}

export function getRequiredEnv(name: string) {
  const value = getEnv(name);
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}
