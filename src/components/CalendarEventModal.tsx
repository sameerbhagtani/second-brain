"use client";

import { X, Calendar, MapPin, AlignLeft, User, ExternalLink } from "lucide-react";

type CalendarEventModalProps = {
    event: {
        title: string;
        start?: string;
        end?: string;
        allDay?: boolean;
        extendedProps?: {
            description?: string | null;
            location?: string | null;
            creatorEmail?: string | null;
            creatorName?: string | null;
            organizerEmail?: string | null;
            organizerName?: string | null;
            status?: string | null;
            htmlLink?: string | null;
        };
    } | null;
    onClose: () => void;
};

function formatEventTime(startStr?: string, endStr?: string, allDay?: boolean) {
    if (!startStr) return "";
    const start = new Date(startStr);
    const end = endStr ? new Date(endStr) : null;
    
    const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    };

    if (allDay) {
        const startDateString = start.toLocaleDateString("en-US", dateOptions);
        if (end) {
            const adjustedEnd = new Date(end.getTime());
            adjustedEnd.setDate(adjustedEnd.getDate() - 1);
            const endDateString = adjustedEnd.toLocaleDateString("en-US", dateOptions);
            if (startDateString === endDateString) {
                return startDateString;
            }
            return `${startDateString} – ${endDateString}`;
        }
        return startDateString;
    }

    const startD = start.toLocaleDateString("en-US", dateOptions);
    const startT = start.toLocaleTimeString("en-US", timeOptions);
    
    if (end) {
        const endD = end.toLocaleDateString("en-US", dateOptions);
        const endT = end.toLocaleTimeString("en-US", timeOptions);
        
        if (startD === endD) {
            return `${startD}, ${startT} – ${endT}`;
        }
        return `${startD}, ${startT} – ${endD}, ${endT}`;
    }
    
    return `${startD}, ${startT}`;
}

export default function CalendarEventModal({ event, onClose }: CalendarEventModalProps) {
    if (!event) return null;

    const { title, start, end, allDay, extendedProps } = event;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200" />
            
            {/* Modal */}
            <div
                className="relative flex flex-col w-full max-w-lg rounded-2xl border border-border/70 bg-card text-card-foreground shadow-2xl overflow-hidden transition-all animate-in fade-in-0 zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border/70 px-6 py-4">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                        Event Details
                    </h3>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        aria-label="Close modal"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                
                {/* Body */}
                <div className="overflow-y-auto px-6 py-6 space-y-5">
                    {/* Title */}
                    <h2 className="text-xl font-bold tracking-tight text-foreground leading-snug">
                        {title}
                    </h2>

                    {/* Time */}
                    <div className="flex items-start gap-3 text-sm text-foreground/95">
                        <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                        <div>
                            <p className="font-medium">
                                {formatEventTime(start, end, allDay)}
                            </p>
                        </div>
                    </div>

                    {/* Location */}
                    {extendedProps?.location && (
                        <div className="flex items-start gap-3 text-sm text-foreground/95">
                            <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium">{extendedProps.location}</p>
                            </div>
                        </div>
                    )}

                    {/* Organizer/Creator */}
                    {(extendedProps?.organizerEmail || extendedProps?.creatorEmail) && (
                        <div className="flex items-start gap-3 text-sm text-foreground/95">
                            <User className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium text-xs text-muted-foreground">Organizer</p>
                                <p className="font-medium mt-0.5">
                                    {extendedProps.organizerName || extendedProps.creatorName || extendedProps.organizerEmail || extendedProps.creatorEmail}
                                </p>
                                {(extendedProps.organizerEmail || extendedProps.creatorEmail) && (
                                    <p className="text-xs text-muted-foreground/75 mt-0.5">
                                        {extendedProps.organizerEmail || extendedProps.creatorEmail}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    {extendedProps?.description && (
                        <div className="flex items-start gap-3 text-sm border-t border-border/70 pt-4 mt-4">
                            <AlignLeft className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">Description</p>
                                <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90 font-sans">
                                    {extendedProps.description}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                {extendedProps?.htmlLink && (
                    <div className="border-t border-border/70 px-6 py-4 bg-muted/20 flex justify-end">
                        <a
                            href={extendedProps.htmlLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/95 transition-colors"
                        >
                            <span>Open in Calendar</span>
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
