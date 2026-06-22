import { createFileRoute } from "@tanstack/react-router";
import { Activity, KeyRound, Users, FileCode2 } from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { PageHeader, StatCard } from "@/components/page-header";
import { totals, executionsByDay, scriptShare, scripts } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/statistics")({
  head: () => ({ meta: [{ title: "Statistics — Nalyy Gate" }] }),
  component: Statistics,
});

const palette = [
  "oklch(0.62 0.26 295)",
  "oklch(0.7 0.2 240)",
  "oklch(0.78 0.18 220)",
  "oklch(0.72 0.18 155)",
  "oklch(0.78 0.17 75)",
];

function Statistics() {
  const tooltipStyle = {
    background: "oklch(0.17 0.03 280)",
    border: "1px solid oklch(0.62 0.26 295 / 0.4)",
    borderRadius: 12,
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Statistics"
        description="Deep insights across every script, key and user."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Scripts" value={totals.scripts} icon={FileCode2} accent="primary" />
        <StatCard label="Active keys" value={totals.activeKeys} icon={KeyRound} accent="accent" />
        <StatCard label="Whitelist" value={totals.whitelistUsers} icon={Users} accent="success" />
        <StatCard label="Executions" value={totals.executions.toLocaleString()} icon={Activity} accent="warning" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Executions over time" subtitle="Last 7 days">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={executionsByDay}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.7 0.2 240)" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="oklch(0.7 0.2 240)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="oklch(0.3 0.04 280 / 0.3)" vertical={false} />
              <XAxis dataKey="day" stroke="oklch(0.7 0.03 270)" fontSize={12} />
              <YAxis stroke="oklch(0.7 0.03 270)" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="execs" stroke="oklch(0.7 0.2 240)" strokeWidth={2} fill="url(#g1)" />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Script share" subtitle="By executions">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={scriptShare}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
                stroke="oklch(0.13 0.025 280)"
                strokeWidth={3}
              >
                {scriptShare.map((_, i) => (
                  <Cell key={i} fill={palette[i % palette.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <Panel title="Per-script breakdown" subtitle="Users vs executions">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={scripts}>
            <CartesianGrid stroke="oklch(0.3 0.04 280 / 0.3)" vertical={false} />
            <XAxis dataKey="name" stroke="oklch(0.7 0.03 270)" fontSize={12} />
            <YAxis stroke="oklch(0.7 0.03 270)" fontSize={12} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="users" name="Users" fill="oklch(0.62 0.26 295)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="keys" name="Keys" fill="oklch(0.7 0.2 240)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Panel>

      <Panel title="Top users" subtitle="Most active script consumers">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] text-sm">
            <thead className="text-left text-xs uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="pb-3 font-medium">User</th>
                <th className="pb-3 font-medium">Executions</th>
                <th className="pb-3 font-medium">Scripts used</th>
                <th className="pb-3 font-medium">Last active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {[
                ["ghost#0001", 12480, 3, "2 min ago"],
                ["neo#4521", 9120, 2, "1 h ago"],
                ["lunar#2210", 7420, 2, "5 min ago"],
                ["zen#7700", 4810, 1, "online"],
                ["vortex#1100", 3210, 1, "10 min ago"],
              ].map((row) => (
                <tr key={row[0] as string}>
                  <td className="py-3 font-medium">{row[0]}</td>
                  <td className="py-3">{(row[1] as number).toLocaleString()}</td>
                  <td className="py-3 text-muted-foreground">{row[2]}</td>
                  <td className="py-3 text-muted-foreground">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

function Panel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur">
      <div className="mb-4">
        <h3 className="font-display text-lg font-semibold">{title}</h3>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
