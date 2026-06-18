import { pgTable, uuid, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const conversations = pgTable("conversations", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: varchar("user_id", { length: 50 }).notNull(),

    title: text("title"),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
