import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Upload, KeyRound, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { games } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/scripts/add")({
  head: () => ({ meta: [{ title: "Add Script — Nalyy Gate" }] }),
  component: AddScript,
});

function genKey() {
  return (
    "ng_sk_" +
    Array.from({ length: 32 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("")
  );
}

function AddScript() {
  const navigate = useNavigate();
  const [apiKey, setApiKey] = useState(genKey());
  const [hwid, setHwid] = useState(true);

  return (
    <div className="space-y-6">
      <Link
        to="/scripts"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to scripts
      </Link>

      <PageHeader
        title="Add a new script"
        description="Configure your script, generate an API key and ship it to your community."
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Script created (demo)", { description: "Backend wiring coming soon." });
          navigate({ to: "/scripts" });
        }}
        className="grid gap-6 lg:grid-cols-3"
      >
        <div className="space-y-6 lg:col-span-2">
          <Card title="Script details">
            <Field label="Script name" required>
              <Input required placeholder="e.g. Aurora Hub" />
            </Field>
            <Field label="Description">
              <Textarea rows={4} placeholder="What does your script do?" />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Target game" required>
                <Select defaultValue="Universal">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {games.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Linked Discord role">
                <Input placeholder="e.g. Aurora Premium" />
              </Field>
            </div>
          </Card>

          <Card title="Script file">
            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-background/40 p-10 text-center transition hover:border-primary/50 hover:bg-primary/5">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <div className="text-sm font-medium">Drop your .lua / .luau here</div>
              <div className="text-xs text-muted-foreground">or click to browse · max 5MB</div>
              <input type="file" className="hidden" accept=".lua,.luau,.txt" />
            </label>
          </Card>

          <Card title="Security">
            <div className="flex items-start justify-between gap-4 rounded-xl border border-border bg-background/40 p-4">
              <div className="min-w-0">
                <div className="text-sm font-medium">HWID Lock</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Bind keys to a single hardware ID. Prevents resellers and account sharing.
                </div>
              </div>
              <Switch checked={hwid} onCheckedChange={setHwid} className="shrink-0" />
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="API Key" icon={KeyRound}>
            <p className="text-xs text-muted-foreground">
              This key authenticates your loader. Keep it secret.
            </p>
            <div className="mt-3 break-all rounded-lg border border-primary/30 bg-primary/5 p-3 font-mono text-xs text-primary">
              {apiKey}
            </div>
            <Button
              type="button"
              variant="neon"
              size="sm"
              className="mt-3 w-full"
              onClick={() => setApiKey(genKey())}
            >
              <Sparkles className="h-4 w-4" /> Regenerate
            </Button>
          </Card>

          <div className="flex flex-col gap-2">
            <Button type="submit" variant="hero" size="lg">Create Script</Button>
            <Button type="button" variant="ghost" asChild>
              <Link to="/scripts">Cancel</Link>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

function Card({
  title,
  children,
  icon: Icon,
}: {
  title: string;
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur">
      <div className="mb-4 flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-primary" />}
        <h3 className="font-display text-base font-semibold">{title}</h3>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs uppercase tracking-widest text-muted-foreground">
        {label} {required && <span className="text-primary">*</span>}
      </Label>
      {children}
    </div>
  );
}
