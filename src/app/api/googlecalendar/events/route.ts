import { NextResponse } from "next/server";

import type { EventInput } from "@fullcalendar/core";

import { corsair } from "~/corsair";
import { auth } from "@clerk/nextjs/server";

function mapCalendarEvent(event: {
    id?: string;
    summary?: string;
    start?: { date?: string; dateTime?: string };
    end?: { date?: string; dateTime?: string };
}): EventInput {
    const isAllDay = Boolean(event.start?.date && !event.start?.dateTime);

    return {
        id: event.id,
        title: event.summary ?? "Untitled event",
        start: event.start?.dateTime ?? event.start?.date,
        end: event.end?.dateTime ?? event.end?.date,
        allDay: isAllDay,
    };
}

export async function GET(request: Request) {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const timeMin = searchParams.get("timeMin") ?? undefined;
    const timeMax = searchParams.get("timeMax") ?? undefined;
    const calendarId = searchParams.get("calendarId") ?? "primary";

    if (!timeMin || !timeMax) {
        return NextResponse.json(
            { error: "timeMin and timeMax are required" },
            { status: 400 },
        );
    }

    try {
        const response = await corsair
            .withTenant(userId)
            .googlecalendar.api.events.getMany({
                calendarId,
                timeMin,
                timeMax,
                singleEvents: true,
                orderBy: "startTime",
                maxResults: 2500,
            });

        return NextResponse.json({
            events: (response.items ?? []).map(mapCalendarEvent),
        });
    } catch (error) {
        console.error("Failed to load calendar events", error);

        return NextResponse.json(
            { error: "Failed to load calendar events" },
            { status: 500 },
        );
    }
}
