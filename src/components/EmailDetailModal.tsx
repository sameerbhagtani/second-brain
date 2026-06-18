"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { EmailDetail } from "@/lib/services/gmail";

type EmailDetailModalProps = {
    emailId: string | null;
    onClose: () => void;
};

export default function EmailDetailModal({ emailId, onClose }: EmailDetailModalProps) {
    const [emailDetail, setEmailDetail] = useState<EmailDetail | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!emailId) {
            setEmailDetail(null);
            setError(null);
            return;
        }

        const id = emailId;

        async function fetchDetail() {
            setIsLoading(true);
            setError(null);
            try {
                const res = await axios.get<EmailDetail>(
                    `/api/gmail/message?id=${encodeURIComponent(id)}`,
                    { withCredentials: true }
                );
                setEmailDetail(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to load email details.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchDetail();
    }, [emailId]);

    if (!emailId) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={onClose}
        >
            {/* Glassmorphism backdrop */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200" />
            
            {/* Modal content box */}
            <div
                className="relative flex flex-col w-full max-w-3xl max-h-[85vh] rounded-2xl border border-border/70 bg-card text-card-foreground shadow-2xl overflow-hidden transition-all animate-in fade-in-0 zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border/70 px-6 py-4">
                    <h2 className="text-lg font-semibold tracking-tight truncate max-w-[85%] text-foreground">
                        {emailDetail ? emailDetail.subject : "Loading message..."}
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        aria-label="Close modal"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                
                {/* Scrollable details container */}
                <div className="flex-1 overflow-y-auto px-6 py-6">
                    {isLoading ? (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-1/3" />
                                    <Skeleton className="h-3 w-1/4" />
                                </div>
                            </div>
                            <div className="border-t border-border/50 my-4 pt-4 space-y-3">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-[90%]" />
                                <Skeleton className="h-4 w-[85%]" />
                                <Skeleton className="h-4 w-full" />
                            </div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-12">
                            <p className="text-sm text-destructive">{error}</p>
                        </div>
                    ) : emailDetail ? (
                        <div className="space-y-6">
                            {/* Sender info */}
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex gap-3">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
                                        {emailDetail.sender.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-foreground">
                                            {emailDetail.sender}
                                        </h3>
                                        {emailDetail.senderEmail && (
                                            <p className="text-xs text-muted-foreground">
                                                {emailDetail.senderEmail}
                                            </p>
                                        )}
                                        {emailDetail.recipientEmail && (
                                            <p className="text-[11px] text-muted-foreground/75 mt-0.5">
                                                To: {emailDetail.recipientName || emailDetail.recipientEmail}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                {emailDetail.internalDate && (
                                    <time className="text-xs text-muted-foreground mt-1">
                                        {new Date(Number(emailDetail.internalDate)).toLocaleString("en-US", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        })}
                                    </time>
                                )}
                            </div>

                            {/* Subject inside body */}
                            <div className="border-t border-border/70 pt-6">
                                <h1 className="text-xl font-bold tracking-tight text-foreground mb-4">
                                    {emailDetail.subject}
                                </h1>
                            </div>

                            {/* Message body */}
                            <div className="prose prose-sm dark:prose-invert max-w-none">
                                {emailDetail.html ? (
                                    <div className="rounded-xl border border-border/70 overflow-hidden bg-white">
                                        <iframe
                                            srcDoc={emailDetail.html}
                                            sandbox="allow-popups allow-popups-to-escape-sandbox"
                                            className="w-full min-h-[400px] border-0"
                                            title="Email Content"
                                        />
                                    </div>
                                ) : (
                                    <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90 font-sans">
                                        {emailDetail.body}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
