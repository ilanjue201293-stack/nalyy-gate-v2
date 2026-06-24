import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { badRequest, forbidden, json, readJson, requireUser } from "@/lib/server/http";
import { prisma } from "@/lib/server/prisma";

const bodySchema = z.object({
  id: z.string().min(1),
});

export const Route = createFileRoute("/api/blacklist/remove")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const user = await requireUser(request);
        const parsed = bodySchema.safeParse(await readJson(request));
        if (!parsed.success) return badRequest("Invalid blacklist payload", parsed.error.flatten());

        const row = await prisma.blacklist.findUnique({
          where: { id: parsed.data.id },
          include: { script: true },
        });
        if (!row) return json({ ok: true });
        if (!user.isAdmin && row.script.ownerId !== user.id) return forbidden("You do not own this script");

        await prisma.blacklist.update({ where: { id: row.id }, data: { active: false } });
        if (row.keyValue) {
          await prisma.key.updateMany({
            where: { scriptId: row.scriptId, keyValue: row.keyValue },
            data: { revoked: false },
          });
        }
        return json({ ok: true });
      },
    },
  },
});
