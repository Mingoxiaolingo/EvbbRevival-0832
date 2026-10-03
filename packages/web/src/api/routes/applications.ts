import { z } from "zod";
import { count } from "drizzle-orm";
import { base } from "../__core/app";
import { db } from "../database";
import * as schema from "../database/schema";

export const applications = {
  create: base
    .input(
      z.object({
        username: z.string().trim().min(3).max(16).regex(/^[A-Za-z0-9_]+$/),
        discord: z.string().trim().min(2).max(40),
        age: z.number().int().min(10).max(99),
        role: z.enum(["Helper", "Moderator", "Builder", "Developer"]),
        timezone: z.string().trim().min(1).max(40),
        experience: z.string().trim().min(10).max(1500),
        why: z.string().trim().min(20).max(1500),
      }),
    )
    .handler(async ({ input }) => {
      const [row] = await db.insert(schema.staffApplications).values(input).returning();
      return { id: row.id };
    }),
  count: base.handler(async () => {
    const [r] = await db.select({ n: count() }).from(schema.staffApplications);
    return { total: r?.n ?? 0 };
  }),
};
