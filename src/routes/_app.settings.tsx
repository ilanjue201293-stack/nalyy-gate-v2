import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { User, Bot, Palette, Save } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings — Nalyy Gate" }] }),
  component: Settings,
});

function Settings() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage your account, Discord and dashboard preferences." />

      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account"><User className="mr-1.5 h-3.5 w-3.5" /> Account</TabsTrigger>
          <TabsTrigger value="discord"><Bot className="mr-1.5 h-3.5 w-3.5" /> Discord</TabsTrigger>
          <TabsTrigger value="dashboard"><Palette className="mr-1.5 h-3.5 w-3.5" /> Dashboard</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="mt-6">
          <SettingsCard
            title="Account profile"
            description="Update your public profile and contact details."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Display name"><Input defaultValue="nalyy.dev" /></Field>
              <Field label="Email"><Input type="email" defaultValue="dev@nalyy.gg" /></Field>
            </div>
            <Field label="Bio">
              <Textarea rows={3} defaultValue="Building scripts since 2022." />
            </Field>
          </SettingsCard>

          <SettingsCard title="Security" description="Manage your sign-in security.">
            <Toggle label="Two-factor authentication" desc="Require a code at every login." defaultChecked />
            <Toggle label="Login alerts" desc="Email me when a new device signs in." defaultChecked />
          </SettingsCard>
        </TabsContent>

        <TabsContent value="discord" className="mt-6">
          <SettingsCard title="Discord integration" description="Sync roles and guild data.">
            <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-background/40 p-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#5865F2]/15 text-[#5865F2]">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium">Connected as nalyy.dev</div>
                  <div className="truncate text-xs text-muted-foreground">2 guilds · 5 roles synced</div>
                </div>
              </div>
              <Button variant="outline" size="sm">Reconnect</Button>
            </div>
            <Field label="Guild ID">
              <Input defaultValue="918273645102938475" className="font-mono" />
            </Field>
            <Field label="Premium role ID">
              <Input defaultValue="918273645102938490" className="font-mono" />
            </Field>
            <Toggle label="Auto-revoke on role removal" desc="Revoke keys when the linked role is removed." defaultChecked />
          </SettingsCard>
        </TabsContent>

        <TabsContent value="dashboard" className="mt-6">
          <SettingsCard title="Dashboard preferences" description="Tune the look & feel of your workspace.">
            <Toggle label="Compact tables" desc="Show more rows by reducing padding." />
            <Toggle label="Animated background" desc="Enable the ambient glow on hero sections." defaultChecked />
            <Toggle label="Show beta features" desc="Get early access to experimental tools." />
          </SettingsCard>

          <SettingsCard title="Notifications" description="Choose what you get notified about.">
            <Toggle label="New key claimed" defaultChecked />
            <Toggle label="HWID mismatch detected" defaultChecked />
            <Toggle label="Weekly report" />
          </SettingsCard>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button variant="hero" onClick={() => toast.success("Settings saved (demo)")}>
          <Save className="h-4 w-4" /> Save changes
        </Button>
      </div>
    </div>
  );
}

function SettingsCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 rounded-2xl border border-border bg-card/50 p-6 backdrop-blur">
      <div className="mb-5">
        <h3 className="font-display text-base font-semibold">{title}</h3>
        {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function Toggle({
  label,
  desc,
  defaultChecked,
}: {
  label: string;
  desc?: string;
  defaultChecked?: boolean;
}) {
  const [on, setOn] = useState(!!defaultChecked);
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-border bg-background/40 p-4">
      <div className="min-w-0">
        <div className="text-sm font-medium">{label}</div>
        {desc && <div className="mt-1 text-xs text-muted-foreground">{desc}</div>}
      </div>
      <Switch checked={on} onCheckedChange={setOn} className="shrink-0" />
    </div>
  );
}
