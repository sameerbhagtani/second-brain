"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import {
    Bot,
    LayoutDashboard,
    Inbox,
    Calendar,
    Zap,
    ArrowRight,
    CheckCircle2,
    Mail,
    Link2,
    Search,
    MessageSquare,
    CalendarDays,
    ChevronRight,
    Terminal,
    Check,
} from "lucide-react";

function Github({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
    );
}

interface PromptItem {
    id: string;
    text: string;
    category: string;
    response: {
        title: string;
        type:
            | "emails"
            | "event"
            | "invoices"
            | "draft"
            | "meetings"
            | "followup";
        content: React.ReactNode;
    };
}

export default function Home() {
    const prompts: PromptItem[] = [
        {
            id: "unread",
            text: "Summarize today's unread emails",
            category: "Inbox",
            response: {
                title: "Inbox Summary",
                type: "emails",
                content: (
                    <div className="space-y-3.5">
                        <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-neutral-100 pb-2">
                            <span className="font-mono">AI AGENT ACTION</span>
                            <span className="flex items-center gap-1">
                                <Inbox className="size-3 text-orange-500" />{" "}
                                Inbox Summary
                            </span>
                        </div>
                        <div className="space-y-3 text-sm text-neutral-700">
                            <div className="flex items-start gap-2.5">
                                <span className="mt-0.5 text-orange-500 text-xs">
                                    ✉️
                                </span>
                                <div>
                                    <p className="font-semibold text-neutral-900 text-xs sm:text-sm">
                                        Sarah (Product Manager)
                                    </p>
                                    <p className="text-neutral-500 text-xs">
                                        Requested feedback on the Q3 roadmap
                                        slides by end of day.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <span className="mt-0.5 text-neutral-500 text-xs">
                                    ✉️
                                </span>
                                <div>
                                    <p className="font-semibold text-neutral-900 text-xs sm:text-sm">
                                        AWS Billing
                                    </p>
                                    <p className="text-neutral-500 text-xs">
                                        Monthly invoice of $142.50 is ready (due
                                        in 15 days).
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <span className="mt-0.5 text-neutral-500 text-xs">
                                    ✉️
                                </span>
                                <div>
                                    <p className="font-semibold text-neutral-900 text-xs sm:text-sm">
                                        Alex (Designer)
                                    </p>
                                    <p className="text-neutral-500 text-xs">
                                        Sent the updated Figma links for the
                                        calendar onboarding flow.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="pt-2 border-t border-neutral-100 flex justify-end">
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                            >
                                Open Workspace{" "}
                                <ArrowRight className="size-3 ml-1" />
                            </Link>
                        </div>
                    </div>
                ),
            },
        },
        {
            id: "schedule",
            text: "Schedule a meeting tomorrow at 5 PM",
            category: "Calendar",
            response: {
                title: "Create Event",
                type: "event",
                content: (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-neutral-100 pb-2">
                            <span className="font-mono">AI AGENT ACTION</span>
                            <span className="flex items-center gap-1 text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                                <Check className="size-2.5" /> Event Scheduled
                            </span>
                        </div>
                        <div className="space-y-3 text-sm">
                            <div>
                                <h4 className="font-semibold text-neutral-900 text-sm">
                                    Product Sync with Team
                                </h4>
                                <p className="text-neutral-500 text-xs mt-0.5">
                                    Created via Google Calendar API
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-3 border border-neutral-100 bg-neutral-50/50 rounded-xl p-3 text-xs">
                                <div>
                                    <span className="text-neutral-400 block mb-0.5">
                                        When
                                    </span>
                                    <span className="font-medium text-neutral-800 flex items-center gap-1">
                                        <Calendar className="size-3 text-orange-500" />
                                        Tomorrow, 5:00 - 5:30 PM
                                    </span>
                                </div>
                                <div>
                                    <span className="text-neutral-400 block mb-0.5">
                                        Guests
                                    </span>
                                    <span className="font-medium text-neutral-800 block truncate">
                                        Sarah, Alex (Pending)
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="pt-1 flex gap-2 justify-end">
                            <Link
                                href="/dashboard"
                                className="h-7 text-xs rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 px-3 inline-flex items-center font-medium"
                            >
                                Reschedule
                            </Link>
                            <Link
                                href="/dashboard"
                                className="h-7 text-xs rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white px-3 inline-flex items-center font-medium"
                            >
                                View Calendar
                            </Link>
                        </div>
                    </div>
                ),
            },
        },
        {
            id: "reply",
            text: "Send a reply to John",
            category: "Inbox",
            response: {
                title: "Email Sent",
                type: "emails",
                content: (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-neutral-100 pb-2">
                            <span className="font-mono">AI AGENT ACTION</span>
                            <span className="flex items-center gap-1 text-orange-600 font-medium bg-orange-50 px-1.5 py-0.5 rounded text-[10px]">
                                <Mail className="size-3" /> Email Sent
                            </span>
                        </div>
                        <div className="space-y-3 text-xs sm:text-sm bg-neutral-50 border border-neutral-100 rounded-xl p-3.5 font-mono">
                            <div className="grid grid-cols-[50px_1fr] gap-1 border-b border-neutral-200/50 pb-2 text-neutral-500">
                                <span>To:</span>
                                <span className="text-neutral-800">
                                    john@company.com
                                </span>
                                <span>Subject:</span>
                                <span className="text-neutral-800">
                                    Re: Partnership Proposal
                                </span>
                            </div>
                            <p className="text-neutral-700 leading-relaxed text-[11px] sm:text-xs">
                                Hi John, thanks for reaching out. The proposal
                                looks solid. I have some feedback on section 3.
                                Let&apos;s hop on a 15-min call this Thursday at
                                2 PM to align. Let me know if that works!
                            </p>
                        </div>
                        <div className="pt-1 flex gap-2 justify-end">
                            <Link
                                href="/dashboard"
                                className="h-7 text-xs rounded-lg bg-orange-500 hover:bg-orange-600 text-white px-3 inline-flex items-center font-semibold shadow-xs"
                            >
                                Check Sent
                            </Link>
                        </div>
                    </div>
                ),
            },
        },
        {
            id: "meetings",
            text: "Show all meetings this week",
            category: "Calendar",
            response: {
                title: "Weekly Schedule",
                type: "meetings",
                content: (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-neutral-100 pb-2">
                            <span className="font-mono">AI AGENT ACTION</span>
                            <span className="flex items-center gap-1">
                                <CalendarDays className="size-3 text-orange-500" />{" "}
                                Agenda (3 Events)
                            </span>
                        </div>
                        <div className="space-y-2.5 text-xs sm:text-sm">
                            <div className="flex justify-between items-center py-1.5 border-b border-dashed border-neutral-100">
                                <div className="flex items-center gap-2.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                    <span className="font-semibold text-neutral-800">
                                        Monday
                                    </span>
                                    <span className="text-neutral-500 text-xs">
                                        Weekly Standup
                                    </span>
                                </div>
                                <span className="text-xs text-neutral-400">
                                    10:00 AM
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-1.5 border-b border-dashed border-neutral-100">
                                <div className="flex items-center gap-2.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                    <span className="font-semibold text-neutral-800">
                                        Wednesday
                                    </span>
                                    <span className="text-neutral-500 text-xs">
                                        Client Check-in
                                    </span>
                                </div>
                                <span className="text-xs text-neutral-400">
                                    2:00 PM
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-1.5">
                                <div className="flex items-center gap-2.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                    <span className="font-semibold text-neutral-800">
                                        Thursday
                                    </span>
                                    <span className="text-neutral-500 text-xs">
                                        1-on-1 with Design Lead
                                    </span>
                                </div>
                                <span className="text-xs text-neutral-400">
                                    3:30 PM
                                </span>
                            </div>
                        </div>
                        <div className="pt-2 border-t border-neutral-100 flex justify-end">
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                            >
                                View Calendar{" "}
                                <ArrowRight className="size-3 ml-1" />
                            </Link>
                        </div>
                    </div>
                ),
            },
        },
    ];

    const [activePromptId, setActivePromptId] = useState("unread");
    const [displayText, setDisplayText] = useState("");
    const [status, setStatus] = useState<
        "idle" | "typing" | "loading" | "done"
    >("done");

    // Keep track of current animation loop so we don't leak intervals/timeouts
    const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
    const loadingTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Clear any running timers
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
        if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);

        const targetText =
            prompts.find((p) => p.id === activePromptId)?.text || "";
        setDisplayText("");
        setStatus("typing");

        let currentLength = 0;
        typingTimerRef.current = setInterval(() => {
            currentLength += 1;
            setDisplayText(targetText.slice(0, currentLength));
            if (currentLength >= targetText.length) {
                if (typingTimerRef.current)
                    clearInterval(typingTimerRef.current);
                setStatus("loading");

                loadingTimerRef.current = setTimeout(() => {
                    setStatus("done");
                }, 650);
            }
        }, 20);

        return () => {
            if (typingTimerRef.current) clearInterval(typingTimerRef.current);
            if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
        };
    }, [activePromptId]);

    return (
        <>
            <Navbar />

            <main className="w-full flex-grow bg-white text-neutral-950 font-sans selection:bg-orange-100 selection:text-orange-800">
                {/* HERO SECTION */}
                <section className="relative overflow-hidden pt-20 pb-20 md:pt-28 md:pb-24 border-b border-neutral-100">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
                        {/* Headline */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.12] max-w-4xl mx-auto">
                            Take Control of Your{" "}
                            <br className="hidden sm:inline" /> Inbox and
                            Calendar with AI
                        </h1>

                        {/* Subheadline */}
                        <p className="mt-6 text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed font-normal">
                            Connect Gmail and Google Calendar, manage your
                            schedule, and complete tasks through natural
                            language.
                        </p>

                        {/* Primary & Secondary CTA */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                            <Button
                                asChild
                                className="w-full sm:w-auto h-11 px-6 text-sm sm:text-base font-semibold rounded-xl bg-primary hover:bg-orange-600 text-white transition-all shadow-md shadow-orange-500/10 hover:shadow-lg active:translate-y-px duration-150"
                            >
                                <Link href="/dashboard">Get Started</Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* FEATURES SECTION */}
                <section
                    id="features"
                    className="py-20 md:py-24 bg-white border-b border-neutral-100"
                >
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
                                Everything You Need to Stay Organized
                            </h2>
                            <p className="mt-4 text-neutral-500 text-sm sm:text-base">
                                Ditch the manual sorting. Let an intelligent
                                assistant orchestrate your everyday messaging
                                and calendar flow.
                            </p>
                        </div>

                        {/* Grid display */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
                            {/* Feature 1 */}
                            <Card className="border border-neutral-100 shadow-xs hover:shadow-md hover:border-neutral-200 transition-all duration-300 group rounded-2xl bg-white overflow-hidden">
                                <CardHeader className="p-6 pb-4">
                                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                                        <Bot className="size-5" />
                                    </div>
                                    <CardTitle className="text-xl font-bold text-neutral-900">
                                        AI Agent
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="px-6 pb-6 pt-0">
                                    <CardDescription className="text-neutral-500 text-sm leading-relaxed">
                                        Manage emails and calendar events using
                                        natural language commands.
                                    </CardDescription>
                                </CardContent>
                            </Card>

                            {/* Feature 2 */}
                            <Card className="border border-neutral-100 shadow-xs hover:shadow-md hover:border-neutral-200 transition-all duration-300 group rounded-2xl bg-white overflow-hidden">
                                <CardHeader className="p-6 pb-4">
                                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                                        <LayoutDashboard className="size-5" />
                                    </div>
                                    <CardTitle className="text-xl font-bold text-neutral-900">
                                        Unified Workspace
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="px-6 pb-6 pt-0">
                                    <CardDescription className="text-neutral-500 text-sm leading-relaxed">
                                        Access Gmail and Google Calendar from a
                                        single dashboard.
                                    </CardDescription>
                                </CardContent>
                            </Card>

                            {/* Feature 3 */}
                            <Card className="border border-neutral-100 shadow-xs hover:shadow-md hover:border-neutral-200 transition-all duration-300 group rounded-2xl bg-white overflow-hidden">
                                <CardHeader className="p-6 pb-4">
                                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                                        <Zap className="size-5" />
                                    </div>
                                    <CardTitle className="text-xl font-bold text-neutral-900">
                                        Automate Tasks
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="px-6 pb-6 pt-0">
                                    <CardDescription className="text-neutral-500 text-sm leading-relaxed">
                                        Send emails, schedule meetings, and
                                        organize your workflow instantly.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* EXAMPLE PROMPTS & INTERACTIVE PREVIEW */}
                <section
                    id="demo"
                    className="py-20 md:py-24 bg-neutral-50/50 border-b border-neutral-100"
                >
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-12">
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
                                Talk to Your Productivity Assistant
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-5xl mx-auto items-stretch">
                            {/* Prompt Suggestions Column */}
                            <div className="lg:col-span-2 flex flex-col gap-3 justify-center">
                                {prompts.map((prompt) => (
                                    <button
                                        key={prompt.id}
                                        onClick={() =>
                                            setActivePromptId(prompt.id)
                                        }
                                        className={`p-4 flex items-center justify-between border rounded-xl text-left transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-orange-500/20 ${
                                            activePromptId === prompt.id
                                                ? "border-orange-500 bg-orange-50/60 shadow-xs text-neutral-900"
                                                : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50/50 text-neutral-700"
                                        }`}
                                    >
                                        <div className="flex flex-col gap-1 pr-4">
                                            <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 font-mono">
                                                {prompt.category}
                                            </span>
                                            <span className="text-xs sm:text-sm font-medium leading-normal">
                                                {prompt.text}
                                            </span>
                                        </div>
                                        <ChevronRight
                                            className={`size-4 shrink-0 transition-transform ${
                                                activePromptId === prompt.id
                                                    ? "text-orange-500 translate-x-0.5"
                                                    : "text-neutral-400"
                                            }`}
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Mock Terminal Workspace Preview */}
                            <div className="lg:col-span-3 flex flex-col">
                                <div className="w-full h-full flex flex-col rounded-2xl border border-neutral-200/80 shadow-lg bg-white overflow-hidden min-h-[360px] md:min-h-[400px]">
                                    {/* Title Bar */}
                                    <div className="bg-neutral-50 border-b border-neutral-200/60 px-4 py-3 flex items-center justify-between">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                                        </div>
                                        <span className="text-xs font-semibold text-neutral-400 font-mono tracking-wide">
                                            SECONDBRAIN
                                        </span>
                                        <span className="w-10"></span>
                                    </div>

                                    {/* Input Search Mock */}
                                    <div className="p-4 border-b border-neutral-100 flex items-center gap-3 bg-white">
                                        <Search className="size-4 text-neutral-400 shrink-0" />
                                        <div className="flex-grow flex items-center relative font-mono text-xs sm:text-sm text-neutral-800">
                                            <span>{displayText}</span>
                                            {status === "typing" && (
                                                <span className="w-1.5 h-4 bg-orange-500 ml-0.5 animate-pulse shrink-0"></span>
                                            )}
                                        </div>

                                        {/* Status badges */}
                                        <div className="shrink-0">
                                            {status === "typing" && (
                                                <span className="text-[10px] font-semibold text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded">
                                                    Typing...
                                                </span>
                                            )}
                                            {status === "loading" && (
                                                <span className="flex items-center gap-1.5 text-[10px] font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping"></span>
                                                    Thinking
                                                </span>
                                            )}
                                            {status === "done" && (
                                                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                                                    Success
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Simulated output area */}
                                    <div className="p-6 flex-grow flex flex-col justify-center bg-white">
                                        {status === "typing" && (
                                            <div className="flex flex-col items-center justify-center text-center text-neutral-400 h-full py-8">
                                                <Terminal className="size-8 stroke-1 mb-2.5 animate-pulse text-neutral-300" />
                                                <p className="text-xs font-mono">
                                                    Waiting for instruction...
                                                </p>
                                            </div>
                                        )}

                                        {status === "loading" && (
                                            <div className="flex flex-col items-center justify-center text-center h-full py-8">
                                                <div className="relative w-8 h-8 flex items-center justify-center">
                                                    <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-20 animate-ping"></span>
                                                    <span className="relative rounded-full h-4 w-4 bg-orange-500"></span>
                                                </div>
                                                <p className="text-xs text-neutral-500 font-mono mt-4">
                                                    Analyzing calendar
                                                    constraints & inbox
                                                    content...
                                                </p>
                                            </div>
                                        )}

                                        {status === "done" && (
                                            <div className="animate-fade-in duration-300">
                                                {
                                                    prompts.find(
                                                        (p) =>
                                                            p.id ===
                                                            activePromptId,
                                                    )?.response.content
                                                }
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* HOW IT WORKS SECTION */}
                <section
                    id="how-it-works"
                    className="py-20 md:py-24 bg-white border-b border-neutral-100"
                >
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
                                How It Works
                            </h2>
                            <p className="mt-4 text-neutral-500 text-sm sm:text-base">
                                Get up and running in less than two minutes. No
                                complex setups or coding needed.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto relative">
                            {/* Connecting lines for desktop */}
                            <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-0.5 border-t border-dashed border-neutral-200 z-0"></div>

                            {/* Step 1 */}
                            <div className="flex flex-col items-center text-center relative z-10 bg-white">
                                <div className="font-mono text-xs font-bold tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md mb-4">
                                    STEP 01
                                </div>
                                <div className="w-14 h-14 rounded-full bg-white border border-neutral-200/80 flex items-center justify-center text-neutral-800 shadow-xs mb-5">
                                    <Link2 className="size-5 text-orange-500" />
                                </div>
                                <h3 className="font-bold text-lg text-neutral-900 mb-2">
                                    Connect Gmail & Calendar
                                </h3>
                                <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
                                    Securely link your accounts in one click via
                                    official OAuth integrations.
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div className="flex flex-col items-center text-center relative z-10 bg-white">
                                <div className="font-mono text-xs font-bold tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md mb-4">
                                    STEP 02
                                </div>
                                <div className="w-14 h-14 rounded-full bg-white border border-neutral-200/80 flex items-center justify-center text-neutral-800 shadow-xs mb-5">
                                    <MessageSquare className="size-5 text-orange-500" />
                                </div>
                                <h3 className="font-bold text-lg text-neutral-900 mb-2">
                                    Give Instructions in Natural Language
                                </h3>
                                <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
                                    Type instructions like &quot;summarize
                                    unread emails&quot; or &quot;reschedule my
                                    meetings&quot;.
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div className="flex flex-col items-center text-center relative z-10 bg-white">
                                <div className="font-mono text-xs font-bold tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md mb-4">
                                    STEP 03
                                </div>
                                <div className="w-14 h-14 rounded-full bg-white border border-neutral-200/80 flex items-center justify-center text-neutral-800 shadow-xs mb-5">
                                    <CheckCircle2 className="size-5 text-orange-500" />
                                </div>
                                <h3 className="font-bold text-lg text-neutral-900 mb-2">
                                    Let the Agent Handle the Work
                                </h3>
                                <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
                                    Watch the agent send emails, modify calendar
                                    slots, and summarize text accurately.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FINAL CTA SECTION */}
                <section className="py-20 md:py-24 bg-white">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <div className="relative overflow-hidden bg-neutral-50/80 border border-neutral-100 rounded-3xl px-8 py-14 sm:px-12 sm:py-20 text-center max-w-4xl mx-auto shadow-xs">
                            {/* Faint subtle orange ring overlay to add visual polish without heavy gradients */}
                            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-orange-500/5 blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-orange-500/5 blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                            <div className="relative z-10">
                                {/* Headline */}
                                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 max-w-xl mx-auto">
                                    Let AI Handle Your Inbox
                                </h2>

                                {/* Subheadline */}
                                <p className="mt-4 text-neutral-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                                    Spend less time managing emails and more
                                    time getting work done.
                                </p>

                                {/* CTAs */}
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                                    <Button
                                        asChild
                                        className="w-full sm:w-auto h-10 px-5 text-sm font-semibold rounded-xl bg-primary hover:bg-orange-600 text-white transition-all shadow-xs"
                                    >
                                        <Link href="/dashboard">
                                            Get Started
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* FOOTER */}
            <footer className="w-full bg-white border-t border-neutral-100">
                <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-neutral-500">
                    {/* Logo / Product Name */}
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-neutral-900 tracking-tight">
                            SecondBrain
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono bg-neutral-50 px-1.5 py-0.5 rounded border border-neutral-100">
                            v1.0.0
                        </span>
                    </div>

                    {/* Footer Navigation */}
                    <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-neutral-500">
                        <a
                            href="https://github.com/sameerbhagtani/second-brain"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-neutral-900 transition-colors flex items-center gap-1.5"
                        >
                            <Github className="size-4" />
                            <span>GitHub</span>
                        </a>
                        <Link
                            href="/privacy"
                            className="hover:text-neutral-900 transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="hover:text-neutral-900 transition-colors"
                        >
                            Terms
                        </Link>
                    </nav>

                    {/* Copyright/Attribution */}
                    <p className="text-xs text-neutral-400 text-center md:text-right">
                        &copy; {new Date().getFullYear()} SecondBrain Inc. All
                        rights reserved.
                    </p>
                </div>
            </footer>
        </>
    );
}
