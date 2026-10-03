import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const staffApplications = sqliteTable("staff_applications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull(),
  discord: text("discord").notNull(),
  age: integer("age").notNull(),
  role: text("role").notNull(),
  timezone: text("timezone").notNull(),
  experience: text("experience").notNull(),
  why: text("why").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});
