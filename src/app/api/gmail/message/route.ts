import { NextResponse } from "next/server";
import { getEmailDetail } from "@/lib/services/gmail";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json(
            { error: "Message ID is required" },
            { status: 400 },
        );
    }

    try {
        const response = await getEmailDetail(id);
        return NextResponse.json(response);
    } catch (error) {
        console.error("Failed to load email detail", error);

        return NextResponse.json(
            { error: "Failed to load email detail" },
            { status: 500 },
        );
    }
}
