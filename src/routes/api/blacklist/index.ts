import { createFileRoute } from "@tanstack/react-router";
import { json, requireUser } from "@/lib/server/http";
import { blacklistSummaryWhere } from "@/lib/server/access";

export const Route = createFileRoute("/api/blacklist/")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const user = await requireUser(request);
        return json(await blacklistSummaryWhere(user.isAdmin ? undefined : user.id));
      },
    },
  },
});
