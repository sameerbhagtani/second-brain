import { processOAuthCallback } from "corsair/oauth";
import { corsair } from "~/corsair";

import { db } from "@/db";
import { usersTable } from "@/db/schemas/users";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { eq } from "drizzle-orm";

const REDIRECT_URI = `${process.env.APP_URL}/api/auth`;

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code || !state) {
        const response = new NextResponse("Missing code or state.", {
            status: 400,
        });
        response.cookies.delete("oauth_state");
        return response;
    }

    const storedState = request.cookies.get("oauth_state")?.value;
    if (!storedState || storedState !== state) {
        const response = new NextResponse("Invalid state.", { status: 400 });
        response.cookies.delete("oauth_state");
        return response;
    }

    try {
        const { plugin, tenantId } = await processOAuthCallback(corsair, {
            code,
            state,
            redirectUri: REDIRECT_URI,
        });

        if (plugin === "gmail") {
            await db
                .update(usersTable)
                .set({ gmailConnected: true })
                .where(eq(usersTable.clerkUserId, tenantId));

            const response = NextResponse.redirect(
                new URL("/dashboard/inbox", request.url),
            );
            response.cookies.delete("oauth_state");

            return response;
        } else if (plugin === "googlecalendar") {
            await db
                .update(usersTable)
                .set({ googleCalendarConnected: true })
                .where(eq(usersTable.clerkUserId, tenantId));

            const response = NextResponse.redirect(
                new URL("/dashboard/calendar", request.url),
            );
            response.cookies.delete("oauth_state");

            return response;
        }
    } catch {
        const response = new NextResponse("OAuth failed.", { status: 500 });
        response.cookies.delete("oauth_state");

        return response;
    }
}
