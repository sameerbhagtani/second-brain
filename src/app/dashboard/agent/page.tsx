"use client";

import { useState, type FormEvent, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ChatMessage = {
    id: string;
    role: "user" | "assistant";
    content: string;
};

export default function DashboardAgent() {
    const { user, isLoaded } = useUser();
    const [draft, setDraft] = useState("");
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [conversationId, setConversationId] = useState<string | null>(null);
    const [isSending, setIsSending] = useState(false);

    // Pagination states
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [nextCursor, setNextCursor] = useState<string | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const displayName =
        user?.fullName || user?.firstName || user?.username || "User";

    // 1. Fetch conversations on mount to find the latest active conversation
    useEffect(() => {
        async function loadLatestConversation() {
            try {
                const res = await fetch("/api/conversations");
                if (res.ok) {
                    const data = (await res.json()) as {
                        conversations?: Array<{ id: string }>;
                    };
                    if (data.conversations && data.conversations.length > 0) {
                        const latestConv = data.conversations[0];
                        setConversationId(latestConv.id);
                        await fetchMessages(latestConv.id);
                    }
                }
            } catch (error) {
                console.error("Failed to load conversations:", error);
            } finally {
                setIsLoading(false);
            }
        }

        if (isLoaded) {
            loadLatestConversation();
        }
    }, [isLoaded]);

    // 2. Fetch initial messages for a conversation
    async function fetchMessages(convId: string) {
        try {
            const res = await fetch(
                `/api/conversations/${convId}/messages?limit=20`,
            );
            if (res.ok) {
                const data = (await res.json()) as {
                    messages: Array<{
                        id: string;
                        role: "user" | "assistant";
                        content: string;
                    }>;
                    nextCursor: string | null;
                    hasMore: boolean;
                };
                // Reverse because API returns newest first (desc)
                const chronological = [...data.messages].reverse();
                setMessages(chronological);
                setHasMore(data.hasMore);
                setNextCursor(data.nextCursor);
            }
        } catch (error) {
            console.error("Failed to fetch messages:", error);
        }
    }

    // 3. Load more messages when user clicks "Load older messages"
    async function handleLoadMore() {
        if (!conversationId || !nextCursor || isLoadingMore) return;

        setIsLoadingMore(true);

        // Keep track of scroll height before adding new elements
        const scrollContainer = scrollContainerRef.current;
        const previousScrollHeight = scrollContainer?.scrollHeight || 0;
        const previousScrollTop = scrollContainer?.scrollTop || 0;

        try {
            const res = await fetch(
                `/api/conversations/${conversationId}/messages?limit=20&cursor=${encodeURIComponent(
                    nextCursor,
                )}`,
            );
            if (res.ok) {
                const data = (await res.json()) as {
                    messages: Array<{
                        id: string;
                        role: "user" | "assistant";
                        content: string;
                    }>;
                    nextCursor: string | null;
                    hasMore: boolean;
                };
                const chronological = [...data.messages].reverse();
                setMessages((current) => [...chronological, ...current]);
                setHasMore(data.hasMore);
                setNextCursor(data.nextCursor);

                // Maintain scroll position after content renders
                setTimeout(() => {
                    if (scrollContainer) {
                        const newScrollHeight = scrollContainer.scrollHeight;
                        scrollContainer.scrollTop =
                            newScrollHeight -
                            previousScrollHeight +
                            previousScrollTop;
                    }
                }, 0);
            }
        } catch (error) {
            console.error("Failed to load more messages:", error);
        } finally {
            setIsLoadingMore(false);
        }
    }

    // 4. Scroll to bottom on new messages
    useEffect(() => {
        // Only auto-scroll to bottom if we are not loading older messages
        if (!isLoadingMore && messages.length > 0) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages.length, isLoadingMore]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const content = draft.trim();

        if (!content || isSending) {
            return;
        }

        // Add user message optimistically
        const userMessageId = crypto.randomUUID();
        setMessages((currentMessages) => [
            ...currentMessages,
            { id: userMessageId, role: "user", content },
        ]);
        setDraft("");
        setIsSending(true);

        try {
            const response = await fetch("/api/agent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: content,
                    conversationId: conversationId || undefined,
                }),
            });

            const data = (await response.json()) as
                | { message?: string; conversationId?: string }
                | { error?: string };

            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error("You have hit your agent limit.");
                }

                throw new Error("error" in data ? data.error : "Agent failed");
            }

            const assistantContent =
                "message" in data &&
                typeof data.message === "string" &&
                data.message.trim()
                    ? data.message
                    : "I could not generate a response just now.";

            if ("conversationId" in data && data.conversationId) {
                setConversationId(data.conversationId);
            }

            setMessages((currentMessages) => [
                ...currentMessages,
                {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    content: assistantContent,
                },
            ]);
        } catch (error) {
            setMessages((currentMessages) => [
                ...currentMessages,
                {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    content:
                        error instanceof Error
                            ? error.message
                            : "Something went wrong.",
                },
            ]);
        } finally {
            setIsSending(false);
        }
    }

    return (
        <div className="mx-auto flex h-[calc(100vh-4rem)] w-full max-w-4xl flex-col overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
                {isLoading ? (
                    <div className="flex flex-1 items-center justify-center">
                        <p className="text-muted-foreground animate-pulse">
                            Loading conversation history...
                        </p>
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center px-4 py-12 text-center">
                        <div className="max-w-xl space-y-3">
                            <p className="text-lg font-medium text-muted-foreground">
                                Hello, {isLoaded ? displayName : "there"}
                            </p>
                            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                                How can I help you today?
                            </h1>
                        </div>
                    </div>
                ) : (
                    <div
                        ref={scrollContainerRef}
                        className="flex-1 space-y-4 overflow-y-auto py-4 sm:py-6"
                    >
                        {hasMore && (
                            <div className="flex justify-center pb-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={handleLoadMore}
                                    disabled={isLoadingMore}
                                    className="text-xs"
                                >
                                    {isLoadingMore
                                        ? "Loading..."
                                        : "Load older messages"}
                                </Button>
                            </div>
                        )}
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${
                                    message.role === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-2xl border px-4 py-3 text-sm leading-6 shadow-sm sm:max-w-[75%] ${
                                        message.role === "user"
                                            ? "border-primary/20 bg-primary text-primary-foreground"
                                            : "border-border/70 bg-background text-foreground"
                                    }`}
                                >
                                    {message.content}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="border-t border-border/70 bg-background/95 pt-4 backdrop-blur"
                >
                    <div className="flex items-center gap-2 rounded-2xl border border-border/70 bg-background px-3 py-2 shadow-sm">
                        <Input
                            value={draft}
                            onChange={(event) => setDraft(event.target.value)}
                            placeholder="Message SecondBrain..."
                            aria-label="Chat message"
                            disabled={isSending}
                            className="h-10 border-0 bg-transparent px-1 text-sm shadow-none ring-0 placeholder:text-muted-foreground focus-visible:border-0 focus-visible:ring-0"
                        />
                        <Button
                            type="submit"
                            className="rounded-xl px-4"
                            disabled={isSending}
                        >
                            {isSending ? "Sending..." : "Send"}
                        </Button>
                    </div>
                    <p className="mt-2 text-center text-xs text-muted-foreground">
                        Press Enter to start a new conversation with your AI
                        assistant.
                    </p>
                </form>
            </div>
        </div>
    );
}
