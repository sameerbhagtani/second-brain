import { NextResponse } from "next/server";
import type { Mailbox } from "@/lib/services/gmail";

import { getEmails } from "@/lib/services/gmail";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const pageToken = searchParams.get("pageToken") ?? undefined;
    const mailbox = (searchParams.get("mailbox") as Mailbox) ?? "INBOX";

    try {
        const response = await getEmails({
            mailbox,
            pageToken,
        });

        return NextResponse.json(response);
    } catch (error) {
        console.error("Failed to load inbox emails", error);

        return NextResponse.json(
            { error: "Failed to load inbox emails" },
            { status: 500 },
        );
    }
}
