import {
    pgTable,
    timestamp,
    uuid,
    varchar,
    boolean,
    integer,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),

    clerkUserId: varchar("clerk_user_id", { length: 50 }).notNull().unique(),

    gmailConnected: boolean("gmail_connected").notNull().default(false),
    googleCalendarConnected: boolean("google_calendar_connected")
        .notNull()
        .default(false),

    messageCredits: integer("message_credits").notNull().default(10),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
