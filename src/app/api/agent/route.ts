import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { run } from "@openai/agents";
import { and, eq, gt, sql } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schemas/users";
import { createCorsairAgent } from "@/lib/agents/corsair-agent";

export const runtime = "nodejs";

type AgentRequestBody = {
    message?: string;
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
                { message: "You have hit your limit" },
                { status: 429 },
            );
        }

        const agent = createCorsairAgent(user.id);
        const result = await run(agent, message);
        const assistantMessage =
            typeof result.finalOutput === "string"
                ? result.finalOutput
                : result.finalOutput
                  ? String(result.finalOutput)
                  : "";

        return NextResponse.json({ message: assistantMessage });
    } catch (error) {
        console.error("Failed to run agent", error);

        return NextResponse.json(
            { error: "Failed to run agent" },
            { status: 500 },
        );
    }
}
