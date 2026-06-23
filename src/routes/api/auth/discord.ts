import { createFileRoute } from "@tanstack/react-router";
import { getEnv, getRequiredEnv } from "@/lib/server/env";

export const Route = createFileRoute("/api/auth/discord")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const clientId = getRequiredEnv("DISCORD_CLIENT_ID");
        const redirectUri = getRedirectUri(request);
        const state = randomHex(16);
        const url = new URL("https://discord.com/oauth2/authorize");

        url.searchParams.set("client_id", clientId);
        url.searchParams.set("redirect_uri", redirectUri);
        url.searchParams.set("response_type", "code");
        url.searchParams.set("scope", "identify email");
        url.searchParams.set("state", state);

        const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
        return new Response(null, {
          status: 302,
          headers: {
            location: url.toString(),
            "set-cookie": `ng_oauth_state=${state}; Path=/; HttpOnly; SameSite=Lax; Max-Age=600${secure}`,
          },
        });
      },
    },
  },
});

export function getAvatarUrl(discordId: string, avatar?: string | null) {
  if (!avatar) return null;
  return `https://cdn.discordapp.com/avatars/${discordId}/${avatar}.png`;
}

export function getAppUrl(request?: Request) {
  const configured = getEnv("APP_URL");
  if (configured) return configured.replace(/\/$/, "");
  if (request) return new URL(request.url).origin;
  const vercelUrl = getEnv("VERCEL_URL");
  if (vercelUrl) return `https://${vercelUrl}`.replace(/\/$/, "");
  return "http://localhost:5173";
}

export function getRedirectUri(request?: Request) {
  const configured = getEnv("DISCORD_REDIRECT_URI");
  if (configured) return configured;
  return `${getAppUrl(request)}/api/auth/discord/callback`;
}

function randomHex(bytes: number) {
  const values = new Uint8Array(bytes);
  globalThis.crypto?.getRandomValues?.(values);
  for (let index = 0; index < values.length; index += 1) {
    if (values[index] === 0) values[index] = Math.floor(Math.random() * 256);
  }
  return Array.from(values, (value) => value.toString(16).padStart(2, "0")).join("");
}
