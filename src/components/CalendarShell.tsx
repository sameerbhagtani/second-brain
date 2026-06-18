"use client";

import { useCallback, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import type { DatesSetArg, EventInput } from "@fullcalendar/core";

type CalendarShellProps = {
    initialEvents?: EventInput[];
};

type CalendarEventsResponse = {
    events: EventInput[];
};

function buildRange(date: Date) {
    return {
        timeMin: new Date(date.getFullYear(), date.getMonth(), 1).toISOString(),
        timeMax: new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            1,
        ).toISOString(),
    };
}

export default function CalendarShell({
    initialEvents = [],
}: CalendarShellProps) {
    const [events, setEvents] = useState<EventInput[]>(initialEvents);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const calendarTheme = {
        "--fc-button-bg-color": "#f97316",
        "--fc-button-border-color": "#f97316",
        "--fc-button-text-color": "#ffffff",
        "--fc-button-hover-bg-color": "#ea580c",
        "--fc-button-hover-border-color": "#ea580c",
        "--fc-button-active-bg-color": "#c2410c",
        "--fc-button-active-border-color": "#c2410c",
        "--fc-button-focus-shadow": "0 0 0 0.2rem rgba(249, 115, 22, 0.25)",
    } as React.CSSProperties;

    const fetchMonth = useCallback(async (arg: DatesSetArg) => {
        const { timeMin, timeMax } = buildRange(arg.view.currentStart);

        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get<CalendarEventsResponse>(
                "/api/googlecalendar/events",
                {
                    params: {
                        timeMin,
                        timeMax,
                        calendarId: "primary",
                    },
                    withCredentials: true,
                },
            );

            setEvents(response.data.events);
        } catch (loadError) {
            console.error(loadError);
            setError("Failed to load calendar events.");
            setEvents([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="relative" style={calendarTheme}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "",
                }}
                navLinks={false}
                nowIndicator={false}
                editable={false}
                selectable={false}
                dayMaxEventRows={3}
                height="auto"
                expandRows
                weekends
                eventDisplay="block"
                events={events}
                datesSet={fetchMonth}
            />

            {isLoading ? (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-3xl bg-background/60 backdrop-blur-[1px]">
                    <div className="rounded-full border border-border/70 bg-background px-4 py-2 text-sm text-muted-foreground shadow-sm">
                        Loading month...
                    </div>
                </div>
            ) : null}

            {error ? (
                <div className="pointer-events-none absolute left-4 top-4 rounded-2xl border border-destructive/30 bg-background px-4 py-2 text-sm text-destructive shadow-sm">
                    {error}
                </div>
            ) : null}
        </div>
    );
}
