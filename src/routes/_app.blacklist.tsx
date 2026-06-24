import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Ban, Plus, Search, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { apiClient } from "@/lib/api-client";
import { scripts } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/blacklist")({
  head: () => ({ meta: [{ title: "Blacklist - Nalyy Gate" }] }),
  component: Blacklist,
});

function Blacklist() {
  const [q, setQ] = useState("");
  const [scriptId, setScriptId] = useState("");
  const [discordId, setDiscordId] = useState("");
  const [keyValue, setKeyValue] = useState("");
  const [reason, setReason] = useState("");
  const scriptsQuery = useQuery({ queryKey: ["scripts"], queryFn: apiClient.scripts });
  const blacklistQuery = useQuery({ queryKey: ["blacklist"], queryFn: apiClient.blacklists });
  const liveScripts = scriptsQuery.data ?? scripts;
  const rows = blacklistQuery.data ?? [];
  const filtered = rows.filter((row) => {
    const needle = q.toLowerCase();
    return (
      row.script.toLowerCase().includes(needle) ||
      row.target.toLowerCase().includes(needle) ||
      row.reason.toLowerCase().includes(needle) ||
      row.discordId?.includes(q) ||
      row.keyValue?.toLowerCase().includes(needle)
    );
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Blacklist"
        description="Block Discord users or license keys from using a script."
        actions={
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="hero" size="sm">
                <Plus className="h-4 w-4" /> Add blacklist
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add blacklist</DialogTitle>
                <DialogDescription>Choose a script, then block either a Discord ID or a key.</DialogDescription>
              </DialogHeader>
              <form
                className="space-y-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  apiClient
                    .addBlacklist({
                      scriptId: scriptId || liveScripts[0]?.id,
                      discordId: discordId || undefined,
                      keyValue: keyValue || undefined,
                      reason: reason || undefined,
                    })
                    .then(() => {
                      toast.success("Blacklist added");
                      setDiscordId("");
                      setKeyValue("");
                      setReason("");
                      blacklistQuery.refetch();
                    })
                    .catch((error) => toast.error(error.message));
                }}
              >
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest text-muted-foreground">Script</Label>
                  <Select value={scriptId || liveScripts[0]?.id} onValueChange={setScriptId}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {liveScripts.map((script) => (
                        <SelectItem key={script.id} value={script.id}>{script.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground">Discord ID</Label>
                    <Input value={discordId} onChange={(event) => setDiscordId(event.target.value)} placeholder="1234567890" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground">Key</Label>
                    <Input value={keyValue} onChange={(event) => setKeyValue(event.target.value)} placeholder="NALYY-..." />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest text-muted-foreground">Reason</Label>
                  <Input value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Reason shown internally" />
                </div>
                <DialogFooter>
                  <Button type="submit" variant="hero">Blacklist</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatRow label="Active blacklists" value={rows.length} accent />
        <StatRow label="Users blocked" value={rows.filter((row) => row.discordId).length} />
        <StatRow label="Keys blocked" value={rows.filter((row) => row.keyValue).length} />
      </div>

      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-5">
          <div className="flex items-center gap-2">
            <Ban className="h-4 w-4 text-destructive" />
            <h3 className="font-display text-base font-semibold">Blocked access</h3>
          </div>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(event) => setQ(event.target.value)} placeholder="Search..." className="h-9 w-56 pl-9" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="bg-background/30 text-left text-xs uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Target</th>
                <th className="px-4 py-3 font-medium">Script</th>
                <th className="px-4 py-3 font-medium">Reason</th>
                <th className="px-4 py-3 font-medium">Expires</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-background/30">
                  <td className="px-4 py-3">
                    <div className="font-medium">{row.discordId ? "Discord user" : "License key"}</div>
                    <div className="font-mono text-[11px] text-muted-foreground">{row.discordId ?? row.keyValue}</div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="border-border">{row.script}</Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{row.reason || "-"}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {row.expiresAt ? new Date(row.expiresAt).toLocaleString() : "Never"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{new Date(row.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/15"
                      onClick={() => {
                        apiClient
                          .removeBlacklist({ id: row.id })
                          .then(() => {
                            toast.success("Blacklist removed");
                            blacklistQuery.refetch();
                          })
                          .catch((error) => toast.error(error.message));
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td className="px-4 py-10 text-center text-muted-foreground" colSpan={6}>
                    No active blacklist entries.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatRow({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="rounded-2xl border border-border bg-card/50 p-5 backdrop-blur">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={`mt-2 font-display text-3xl font-bold ${accent ? "text-destructive" : ""}`}>{value}</div>
    </div>
  );
}
