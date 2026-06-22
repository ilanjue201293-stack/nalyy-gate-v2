export type Script = {
  id: string;
  name: string;
  description: string;
  game: string;
  apiKey: string;
  discordRole: string;
  hwidLock: boolean;
  status: "active" | "paused" | "draft";
  users: number;
  keys: number;
  executions: number;
  createdAt: string;
};

export type ScriptKey = {
  id: string;
  key: string;
  scriptId: string;
  scriptName: string;
  user: string | null;
  duration: string;
  status: "active" | "expired" | "revoked" | "unused";
  expiresAt: string;
  note: string;
  createdAt: string;
};

export type WhitelistUser = {
  id: string;
  discordId: string;
  discordTag: string;
  avatar: string;
  script: string;
  hwid: string;
  addedAt: string;
  lastSeen: string;
  status: "online" | "offline";
};

export const scripts: Script[] = [
  {
    id: "scr_aurora",
    name: "Aurora Hub",
    description: "Premium multi-game script hub with auto-updates and stealth bypass.",
    game: "Universal",
    apiKey: "ng_sk_7a3f9c12d8e4b56a91fc8e2d7b4a1c93",
    discordRole: "Aurora Premium",
    hwidLock: true,
    status: "active",
    users: 2841,
    keys: 3120,
    executions: 184230,
    createdAt: "2025-01-12",
  },
  {
    id: "scr_blade",
    name: "Blade Ball Pro",
    description: "Auto-parry, deflect predictor and ESP for Blade Ball.",
    game: "Blade Ball",
    apiKey: "ng_sk_b21e774c0f1a92ef445d8a6c19b3e72f",
    discordRole: "Blade Premium",
    hwidLock: true,
    status: "active",
    users: 1647,
    keys: 1820,
    executions: 92410,
    createdAt: "2025-03-04",
  },
  {
    id: "scr_arsenal",
    name: "Arsenal Edge",
    description: "Silent aim, no-recoil and triggerbot for Arsenal.",
    game: "Arsenal",
    apiKey: "ng_sk_19fa8c3e4d2b67901a5e3f8c2b4d9170",
    discordRole: "Arsenal Squad",
    hwidLock: false,
    status: "paused",
    users: 412,
    keys: 530,
    executions: 21340,
    createdAt: "2025-04-22",
  },
  {
    id: "scr_pet",
    name: "Pet Simulator X",
    description: "Auto farm, hatch eggs and trade scanner.",
    game: "Pet Simulator X",
    apiKey: "ng_sk_44b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5",
    discordRole: "Pets VIP",
    hwidLock: true,
    status: "active",
    users: 932,
    keys: 1010,
    executions: 41280,
    createdAt: "2025-05-18",
  },
  {
    id: "scr_fish",
    name: "Fisch Master",
    description: "Auto fish, instant catch and rare detector.",
    game: "Fisch",
    apiKey: "ng_sk_99e8d7c6b5a493827160f5e4d3c2b1a0",
    discordRole: "Fisch Pro",
    hwidLock: false,
    status: "draft",
    users: 0,
    keys: 0,
    executions: 0,
    createdAt: "2025-06-20",
  },
];

export const keys: ScriptKey[] = [
  {
    id: "k1",
    key: "NALYY-9F3A-7B21-DC44-118E",
    scriptId: "scr_aurora",
    scriptName: "Aurora Hub",
    user: "ghost#0001",
    duration: "30 days",
    status: "active",
    expiresAt: "2026-07-10",
    note: "Sold via Discord bot",
    createdAt: "2026-06-10",
  },
  {
    id: "k2",
    key: "NALYY-LIFE-MMXX-91AB-44C2",
    scriptId: "scr_aurora",
    scriptName: "Aurora Hub",
    user: "neo#4521",
    duration: "Lifetime",
    status: "active",
    expiresAt: "Never",
    note: "Giveaway winner",
    createdAt: "2026-04-02",
  },
  {
    id: "k3",
    key: "NALYY-BL3D-77F1-2C8E-9012",
    scriptId: "scr_blade",
    scriptName: "Blade Ball Pro",
    user: null,
    duration: "7 days",
    status: "unused",
    expiresAt: "—",
    note: "Reseller batch #14",
    createdAt: "2026-06-18",
  },
  {
    id: "k4",
    key: "NALYY-AR1S-44E1-9A02-BB23",
    scriptId: "scr_arsenal",
    scriptName: "Arsenal Edge",
    user: "fade#9981",
    duration: "30 days",
    status: "expired",
    expiresAt: "2026-05-30",
    note: "",
    createdAt: "2026-04-30",
  },
  {
    id: "k5",
    key: "NALYY-PETX-3331-77AA-D0F2",
    scriptId: "scr_pet",
    scriptName: "Pet Simulator X",
    user: "lunar#2210",
    duration: "Lifetime",
    status: "revoked",
    expiresAt: "Never",
    note: "Refund chargeback",
    createdAt: "2026-02-14",
  },
  {
    id: "k6",
    key: "NALYY-FISH-AAB1-77CC-9911",
    scriptId: "scr_aurora",
    scriptName: "Aurora Hub",
    user: "zen#7700",
    duration: "1 day",
    status: "active",
    expiresAt: "2026-06-23",
    note: "Trial",
    createdAt: "2026-06-22",
  },
];

export const whitelist: WhitelistUser[] = [
  {
    id: "w1",
    discordId: "928374651029384756",
    discordTag: "ghost#0001",
    avatar: "G",
    script: "Aurora Hub",
    hwid: "A8F3-EE21-9BC4-DD77",
    addedAt: "2026-06-10",
    lastSeen: "2 min ago",
    status: "online",
  },
  {
    id: "w2",
    discordId: "771029384756102938",
    discordTag: "neo#4521",
    avatar: "N",
    script: "Aurora Hub",
    hwid: "B2C1-77AA-9912-EE33",
    addedAt: "2026-04-02",
    lastSeen: "1 h ago",
    status: "offline",
  },
  {
    id: "w3",
    discordId: "660192837465019283",
    discordTag: "fade#9981",
    avatar: "F",
    script: "Arsenal Edge",
    hwid: "99AA-1122-CC33-DD44",
    addedAt: "2026-04-30",
    lastSeen: "3 d ago",
    status: "offline",
  },
  {
    id: "w4",
    discordId: "550918273645501827",
    discordTag: "lunar#2210",
    avatar: "L",
    script: "Pet Simulator X",
    hwid: "EE21-1122-AB44-9988",
    addedAt: "2026-02-14",
    lastSeen: "5 min ago",
    status: "online",
  },
  {
    id: "w5",
    discordId: "440918273645501827",
    discordTag: "zen#7700",
    avatar: "Z",
    script: "Aurora Hub",
    hwid: "12AB-34CD-56EF-7890",
    addedAt: "2026-06-22",
    lastSeen: "online now",
    status: "online",
  },
  {
    id: "w6",
    discordId: "330918273645501822",
    discordTag: "vortex#1100",
    avatar: "V",
    script: "Blade Ball Pro",
    hwid: "AAFF-2233-CCDD-1100",
    addedAt: "2026-05-01",
    lastSeen: "10 min ago",
    status: "online",
  },
];

export const executionsByDay = [
  { day: "Mon", execs: 12400, keys: 84 },
  { day: "Tue", execs: 15820, keys: 91 },
  { day: "Wed", execs: 14210, keys: 72 },
  { day: "Thu", execs: 19840, keys: 110 },
  { day: "Fri", execs: 23210, keys: 145 },
  { day: "Sat", execs: 28490, keys: 187 },
  { day: "Sun", execs: 25100, keys: 162 },
];

export const scriptShare = scripts
  .filter((s) => s.executions > 0)
  .map((s) => ({ name: s.name, value: s.executions }));

export const totals = {
  scripts: scripts.length,
  activeScripts: scripts.filter((s) => s.status === "active").length,
  keys: keys.length,
  activeKeys: keys.filter((k) => k.status === "active").length,
  whitelistUsers: whitelist.length,
  onlineUsers: whitelist.filter((w) => w.status === "online").length,
  executions: scripts.reduce((a, b) => a + b.executions, 0),
};

export const games = ["Universal", "Blade Ball", "Arsenal", "Pet Simulator X", "Fisch", "Da Hood", "Doors", "Other"];
