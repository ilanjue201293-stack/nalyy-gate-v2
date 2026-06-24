import type { DurationUnit } from "@prisma/client";

export function generateLicenseKey(prefix = "NALYY") {
  const parts = Array.from({ length: 4 }, () => randomHex(2).toUpperCase());
  return `${prefix}-${parts.join("-")}`;
}

export function calculateExpiry(amount?: number | null, unit?: DurationUnit | null, from = new Date()) {
  if (!amount || !unit) return null;
  const multipliers: Record<DurationUnit, number> = {
    minutes: 60_000,
    hours: 3_600_000,
    days: 86_400_000,
    weeks: 604_800_000,
    months: 2_592_000_000,
  };
  return new Date(from.getTime() + amount * multipliers[unit]);
}

function randomHex(bytes: number) {
  return Array.from({ length: bytes }, () => secureRandomByte().toString(16).padStart(2, "0")).join("");
}

function secureRandomByte() {
  const cryptoApi = globalThis.crypto;
  if (cryptoApi?.getRandomValues) {
    return cryptoApi.getRandomValues(new Uint8Array(1))[0];
  }
  return Math.floor(Math.random() * 256);
}
