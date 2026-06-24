import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { badRequest, forbidden, json, readJson, requireUser } from "@/lib/server/http";
import { prisma } from "@/lib/server/prisma";

const bodySchema = z
  .object({
    scriptId: z.string().min(1),
    discordId: z.string().min(1).optional(),
    keyValue: z.string().min(1).optional(),
    reason: z.string().optional(),
    expiresAt: z.string().datetime().nullable().optional(),
  })
  .refine((data) => data.discordId || data.keyValue, "Provide a Discord ID or a key.");

export const Route = createFileRoute("/api/blacklist/add")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const user = await requireUser(request);
        const parsed = bodySchema.safeParse(await readJson(request));
        if (!parsed.success) return badRequest("Invalid blacklist payload", parsed.error.flatten());

        const script = await prisma.script.findUnique({ where: { id: parsed.data.scriptId } });
        if (!script) return badRequest("Script not found");
        if (!user.isAdmin && script.ownerId !== user.id) return forbidden("You do not own this script");

        const row = await prisma.blacklist.create({
          data: {
            scriptId: script.id,
            discordId: parsed.data.discordId ?? null,
            keyValue: parsed.data.keyValue ?? null,
            reason: parsed.data.reason || "Blacklisted from dashboard.",
            expiresAt: parsed.data.expiresAt ? new Date(parsed.data.expiresAt) : null,
            createdById: user.discordId,
          },
        });

        if (parsed.data.discordId) {
          await prisma.whitelist.updateMany({
            where: { scriptId: script.id, discordId: parsed.data.discordId },
            data: { active: false },
          });
        }
        if (parsed.data.keyValue) {
          await prisma.key.updateMany({
            where: { scriptId: script.id, keyValue: parsed.data.keyValue },
            data: { revoked: true },
          });
        }

        return json({
          id: row.id,
          scriptId: script.id,
          script: script.name,
          discordId: row.discordId,
          keyValue: row.keyValue,
          reason: row.reason ?? "",
          expiresAt: row.expiresAt?.toISOString() ?? null,
          createdById: row.createdById,
          createdAt: row.createdAt.toISOString(),
          target: row.discordId ? `User ${row.discordId}` : row.keyValue ? `Key ${row.keyValue}` : "Unknown",
        });
      },
    },
  },
});
