import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { run } from "@openai/agents";

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
