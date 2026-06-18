import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { run } from "@openai/agents";
import { and, desc, eq, gt, sql } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schemas/users";
import { conversations } from "@/db/schemas/conversations";
import { messages } from "@/db/schemas/messages";
import { createCorsairAgent } from "@/lib/agents/corsair-agent";

export const runtime = "nodejs";

type AgentRequestBody = {
    message?: string;
    conversationId?: string;
};

export async function POST(request: Request) {
    const user = await currentUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let body: AgentRequestBody;

    try {
        body = (await request.json()) as AgentRequestBody;
    } catch {
        return NextResponse.json(
            { error: "Invalid request body" },
            { status: 400 },
        );
    }

    const message = body.message?.trim();

    if (!message) {
        return NextResponse.json(
            { error: "Message is required" },
            { status: 400 },
        );
    }

    try {
        const [updatedUser] = await db
            .update(usersTable)
            .set({
                messageCredits: sql`${usersTable.messageCredits} - 1`,
            })
            .where(
                and(
                    eq(usersTable.clerkUserId, user.id),
                    gt(usersTable.messageCredits, 0),
                ),
            )
            .returning({
                messageCredits: usersTable.messageCredits,
            });

        if (!updatedUser) {
            return NextResponse.json(
                { message: "You have hit your agent limit." },
                { status: 429 },
            );
        }

        // 1. Get or create conversation
        let conversationId = body.conversationId;

        if (!conversationId) {
            const [newConv] = await db
                .insert(conversations)
                .values({
                    userId: user.id,
                    title:
                        message.length > 60
                            ? `${message.substring(0, 57)}...`
                            : message,
                })
                .returning();
            conversationId = newConv.id;
        } else {
            // Check if conversation exists and belongs to the user
            const [existingConv] = await db
                .select()
                .from(conversations)
                .where(
                    and(
                        eq(conversations.id, conversationId),
                        eq(conversations.userId, user.id),
                    ),
                )
                .limit(1);

            if (!existingConv) {
                return NextResponse.json(
                    { error: "Conversation not found or unauthorized" },
                    { status: 404 },
                );
            }

            // Update conversation updatedAt timestamp
            await db
                .update(conversations)
                .set({ updatedAt: new Date() })
                .where(eq(conversations.id, conversationId));
        }

        // 2. Insert user message in database
        await db.insert(messages).values({
            conversationId,
            role: "user",
            content: message,
        });

        // Fetch the last 15 messages for context
        const lastMessages = await db
            .select()
            .from(messages)
            .where(eq(messages.conversationId, conversationId))
            .orderBy(desc(messages.createdAt))
            .limit(15);

        // Reverse to get chronological order (oldest first)
        const chronologicalHistory = lastMessages.reverse();

        const agentInput = chronologicalHistory.map((msg) => {
            if (msg.role === "user") {
                return {
                    role: "user" as const,
                    content: msg.content,
                };
            } else {
                return {
                    role: "assistant" as const,
                    status: "completed" as const,
                    content: [
                        {
                            type: "output_text" as const,
                            text: msg.content,
                        },
                    ],
                };
            }
        });

        // 3. Run the AI agent with the conversation context
        const agent = createCorsairAgent(user.id);
        const result = await run(agent, agentInput);
        const assistantMessage =
            typeof result.finalOutput === "string"
                ? result.finalOutput
                : result.finalOutput
                  ? String(result.finalOutput)
                  : "";

        const assistantContent = assistantMessage.trim()
            ? assistantMessage
            : "I could not generate a response just now.";

        // 4. Insert assistant message in database
        await db.insert(messages).values({
            conversationId,
            role: "assistant",
            content: assistantContent,
        });

        return NextResponse.json({
            message: assistantContent,
            conversationId,
        });
    } catch (error) {
        console.error("Failed to run agent", error);

        return NextResponse.json(
            { error: "Failed to run agent" },
            { status: 500 },
        );
    }
}
