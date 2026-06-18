import {
    pgTable,
    uuid,
    text,
    timestamp,
    index,
    pgEnum,
} from "drizzle-orm/pg-core";

import { conversations } from "./conversations";

export const messageRoleEnum = pgEnum("message_role", ["user", "assistant"]);

export const messages = pgTable(
    "messages",
    {
        id: uuid("id").defaultRandom().primaryKey(),

        conversationId: uuid("conversation_id")
            .references(() => conversations.id, {
                onDelete: "cascade",
            })
            .notNull(),

        role: messageRoleEnum("role").notNull(),
        content: text("content").notNull(),

        createdAt: timestamp("created_at").defaultNow(),
        updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
    },
    (t) => [
        index("messages_conversation_created_idx").on(
            t.conversationId,
            t.createdAt,
        ),
    ],
);
