"use strict";
/**
 * @module prisma
 * @description Prisma Client Singleton.
 * Ensures a single PrismaClient instance is reused across hot-reloads in development.
 * In production, a fresh instance is created on startup.
 * SECURITY: Prisma ORM generates parameterized queries, preventing SQL injection.
 */

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
