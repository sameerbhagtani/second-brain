import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { and, eq, lt, desc } from "drizzle-orm";

import { db } from "@/db";
import { conversations } from "@/db/schemas/conversations";
import { messages } from "@/db/schemas/messages";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ conversationId: string }> }
) {
    try {
        // 1. Authenticate user
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // 2. Resolve parameters (params is a Promise in Next.js 15+)
        const { conversationId } = await params;
        if (!conversationId) {
            return NextResponse.json(
                { error: "Conversation ID is required" },
                { status: 400 }
            );
        }

        // 3. Verify conversation ownership and existence
        const conversationResult = await db
            .select()
            .from(conversations)
            .where(
                and(
                    eq(conversations.id, conversationId),
                    eq(conversations.userId, userId)
                )
            )
            .limit(1);

        if (!conversationResult || conversationResult.length === 0) {
            return NextResponse.json(
                { error: "Conversation not found or unauthorized" },
                { status: 404 }
            );
        }

        // 4. Parse pagination parameters from URL
        const { searchParams } = new URL(request.url);
        const limitParam = searchParams.get("limit");
        const cursor = searchParams.get("cursor");

        const limit = limitParam 
            ? Math.min(Math.max(parseInt(limitParam, 10) || 20, 1), 100) 
            : 20;

        let cursorDate: Date | null = null;
        if (cursor) {
            const parsed = new Date(cursor);
            if (!isNaN(parsed.getTime())) {
                cursorDate = parsed;
            }
        }

        // 5. Fetch messages (fetch limit + 1 to check for next page)
        const conditions = [eq(messages.conversationId, conversationId)];
        if (cursorDate) {
            conditions.push(lt(messages.createdAt, cursorDate));
        }

        const results = await db
            .select()
            .from(messages)
            .where(and(...conditions))
            .orderBy(desc(messages.createdAt))
            .limit(limit + 1);

        const hasMore = results.length > limit;
        const slicedMessages = hasMore ? results.slice(0, limit) : results;
        
        // Use the oldest message's createdAt timestamp as the cursor for the next batch
        const nextCursor = hasMore && slicedMessages.length > 0
            ? slicedMessages[slicedMessages.length - 1].createdAt?.toISOString()
            : null;

        return NextResponse.json({
            messages: slicedMessages,
            nextCursor,
            hasMore,
        });
    } catch (error) {
        console.error("Failed to fetch messages", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
