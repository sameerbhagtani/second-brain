"use client";

import { useEffect, useState, useTransition } from "react";
import axios from "axios";

import EmailPreview from "@/components/EmailPreview";
import EmailDetailModal from "@/components/EmailDetailModal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type {
    EmailPreview as EmailPreviewItem,
    GetEmailsResult,
} from "@/lib/services/gmail";

type InboxEmailListProps = GetEmailsResult;

function formatEmailDate(value?: string) {
    if (!value) {
        return undefined;
    }

    const timestamp = Number(value);

    if (Number.isNaN(timestamp)) {
        return undefined;
    }

    const date = new Date(timestamp);
    const now = new Date();

    if (Number.isNaN(date.getTime())) {
        return undefined;
    }

    const isToday =
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();

    if (isToday) {
        return new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        }).format(date);
    }

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
    }).format(date);
}

export default function DashboardTrash() {
    const [emails, setEmails] = useState<EmailPreviewItem[]>([]);
    const [nextPageToken, setNextPageToken] =
        useState<InboxEmailListProps["nextPageToken"]>(undefined);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const [total, setTotal] = useState<number | undefined>(undefined);
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    // Selected email details states
    const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);

    useEffect(() => {
        startTransition(async () => {
            setError(null);
            setIsInitialLoading(true);

            try {
                const res = await axios.get<GetEmailsResult>(
                    `/api/gmail/inbox?mailbox=TRASH`,
                    { withCredentials: true },
                );

                const data = res.data;
                setEmails(data.emails);
                setNextPageToken(data.nextPageToken);
                setTotal(data.total);
            } catch (err) {
                console.error(err);
                setError("Failed to load trash emails");
            } finally {
                setIsInitialLoading(false);
            }
        });
    }, []);

    function handleLoadMore() {
        if (!nextPageToken || isPending) {
            return;
        }

        startTransition(async () => {
            setError(null);

            try {
                const res = await axios.get<GetEmailsResult>(
                    `/api/gmail/inbox?mailbox=TRASH&pageToken=${encodeURIComponent(
                        nextPageToken,
                    )}`,
                    { withCredentials: true },
                );

                const data = res.data;

                setEmails((currentEmails) => [
                    ...currentEmails,
                    ...data.emails,
                ]);
                setNextPageToken(data.nextPageToken);
            } catch (loadError) {
                console.error(loadError);
                setError("Could not load more messages.");
            }
        });
    }

    return (
        <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                        Trash
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {total ?? emails.length} messages
                    </p>
                </div>
            </div>

            <section className="overflow-hidden rounded-2xl border border-border/70 bg-background shadow-sm">
                {isInitialLoading ? (
                    <div className="px-4 py-6 sm:px-6">
                        <div className="space-y-3">
                            <Skeleton className="h-5 w-28" />
                            <Skeleton className="h-4 w-56" />
                        </div>
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-2/5" />
                                    <Skeleton className="h-3 w-3/4" />
                                </div>
                                <Skeleton className="h-3 w-16" />
                            </div>
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-1/2" />
                                    <Skeleton className="h-3 w-2/3" />
                                </div>
                                <Skeleton className="h-3 w-16" />
                            </div>
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-3/5" />
                                    <Skeleton className="h-3 w-1/2" />
                                </div>
                                <Skeleton className="h-3 w-16" />
                            </div>
                        </div>
                    </div>
                ) : emails.length === 0 ? (
                    <div className="px-6 py-12 text-center">
                        <p className="text-sm font-medium text-foreground">
                            No messages yet
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Your trash preview will appear here once Gmail data
                            is available.
                        </p>
                    </div>
                ) : (
                    <div>
                        <div className="divide-y divide-border/70">
                            {emails.map((email) => (
                                <EmailPreview
                                    key={email.id}
                                    sender={email.sender}
                                    subject={email.subject}
                                    snippet={
                                        email.snippet || "No preview available"
                                    }
                                    date={formatEmailDate(email.internalDate)}
                                    onClick={() => setSelectedEmailId(email.id)}
                                />
                            ))}
                        </div>

                        {nextPageToken ? (
                            <div className="border-t border-border/70 px-5 py-4 sm:px-6">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full rounded-xl"
                                    onClick={handleLoadMore}
                                    disabled={isPending}
                                >
                                    {isPending ? "Loading..." : "Load more"}
                                </Button>
                                {error ? (
                                    <p className="mt-2 text-sm text-destructive">
                                        {error}
                                    </p>
                                ) : null}
                            </div>
                        ) : null}
                    </div>
                )}
            </section>

            {/* Email Detail Popup Modal */}
            <EmailDetailModal
                emailId={selectedEmailId}
                onClose={() => setSelectedEmailId(null)}
            />
        </div>
    );
}
