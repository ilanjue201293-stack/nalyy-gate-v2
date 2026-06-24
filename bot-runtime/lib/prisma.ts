type PrismaLike = Record<string, any>;

process.env.DATABASE_URL ??=
  process.env.POSTGRES_PRISMA_URL ?? process.env.POSTGRES_URL ?? process.env.NEON_DATABASE_URL;

const globalForPrisma = globalThis as unknown as {
  prismaClient?: PrismaLike;
  prismaClientPromise?: Promise<PrismaLike>;
};

async function getPrisma() {
  if (globalForPrisma.prismaClient) return globalForPrisma.prismaClient;

  if (!globalForPrisma.prismaClientPromise) {
    globalForPrisma.prismaClientPromise = import("@prisma/client").then(({ PrismaClient }) => {
      const client = new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
      });
      globalForPrisma.prismaClient = client;
      return client;
    });
  }

  return globalForPrisma.prismaClientPromise;
}

function modelProxy(modelName: string) {
  return new Proxy(
    {},
    {
      get(_target, methodName) {
        if (typeof methodName !== "string") return undefined;
        return async (...args: unknown[]) => {
          const client = await getPrisma();
          return client[modelName][methodName](...args);
        };
      },
    },
  );
}

export const prisma = new Proxy(
  {},
  {
    get(_target, prop) {
      if (typeof prop !== "string") return undefined;

      if (prop.startsWith("$")) {
        return async (...args: unknown[]) => {
          const client = await getPrisma();
          return client[prop](...args);
        };
      }

      return modelProxy(prop);
    },
  },
) as any;
