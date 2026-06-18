"use client";

import { useState, type FormEvent } from "react";
import { useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ChatMessage = {
    id: number;
    role: "user" | "assistant";
    content: string;
};

export default function DashboardAgent() {
    const { user, isLoaded } = useUser();
    const [draft, setDraft] = useState("");
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isSending, setIsSending] = useState(false);

    const displayName =
        user?.fullName || user?.firstName || user?.username || "User";

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const content = draft.trim();

        if (!content || isSending) {
            return;
        }

        setMessages((currentMessages) => [
            ...currentMessages,
            { id: Date.now(), role: "user", content },
        ]);
        setDraft("");

        setIsSending(true);

        try {
            const response = await fetch("/api/agent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: content }),
            });

            const data = (await response.json()) as
                | { message?: string }
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

            if (assistantContent) {
                setMessages((currentMessages) => [
                    ...currentMessages,
                    {
                        id: Date.now() + 1,
                        role: "assistant",
                        content: assistantContent,
                    },
                ]);
            }
        } catch (error) {
            setMessages((currentMessages) => [
                ...currentMessages,
                {
                    id: Date.now() + 1,
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
                {messages.length === 0 ? (
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
                    <div className="flex-1 space-y-4 overflow-y-auto py-4 sm:py-6">
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
