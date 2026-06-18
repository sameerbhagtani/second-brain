import { generateOAuthUrl } from "corsair/oauth";
import { corsair } from "~/corsair";
import { auth } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const REDIRECT_URI = `${process.env.APP_URL}/api/auth`;

export async function GET(request: NextRequest) {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const plugin = new URL(request.url).searchParams.get("plugin");

    if (!plugin) {
        return NextResponse.json({ error: "Missing plugin" }, { status: 400 });
    }

    const { url, state } = await generateOAuthUrl(corsair, plugin, {
        tenantId: userId,
        redirectUri: REDIRECT_URI,
    });

    const response = NextResponse.redirect(url);

    response.cookies.set("oauth_state", state, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 10,
    });

    return response;
}
