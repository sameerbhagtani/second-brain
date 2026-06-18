"use client";

import { useState } from "react";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Menu, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/90 backdrop-blur-md">
            <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo Section */}
                <Link
                    href="/"
                    className="text-base font-semibold tracking-tight text-foreground transition-all hover:opacity-90 active:scale-95"
                >
                    <span className="font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                        Second<span className="text-primary">Brain</span>
                    </span>
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-6">
                    <Link
                        href="/#features"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                    >
                        Features
                    </Link>
                    <Link
                        href="/#demo"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                    >
                        Demo
                    </Link>
                    <Link
                        href="/#how-it-works"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                    >
                        How It Works
                    </Link>
                </div>

                {/* Desktop Action Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    <Show when="signed-out">
                        <SignInButton mode="modal">
                            <Button
                                variant="outline"
                                className="rounded-full px-4 hover:border-primary/50 transition-all hover:shadow-sm"
                            >
                                Sign in
                            </Button>
                        </SignInButton>
                    </Show>
                    <Show when="signed-in">
                        <Button
                            asChild
                            variant="outline"
                            className="rounded-full px-4 hover:border-primary/50 transition-all hover:shadow-sm"
                        >
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-1"
                            >
                                Dashboard
                                <ArrowRight className="h-3 w-3" />
                            </Link>
                        </Button>

                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background shadow-sm hover:border-primary/50 transition-all">
                            <UserButton />
                        </div>
                    </Show>
                </div>

                {/* Mobile Navigation (Menu Icon & Sheet) */}
                <div className="flex items-center gap-3 md:hidden">
                    <Show when="signed-in">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-background shadow-sm">
                            <UserButton />
                        </div>
                    </Show>

                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-lg h-9 w-9 hover:bg-muted/80 text-foreground"
                                aria-label="Toggle Menu"
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-[280px] sm:w-[320px] p-6 border-l border-border/40 bg-background/95 backdrop-blur-md flex flex-col gap-6"
                        >
                            <SheetHeader className="pb-4 border-b border-border/40">
                                <SheetTitle className="text-left">
                                    <Link
                                        href="/"
                                        className="text-base font-semibold tracking-tight text-foreground"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <span className="font-bold">
                                            Second<span className="text-primary">Brain</span>
                                        </span>
                                    </Link>
                                </SheetTitle>
                            </SheetHeader>

                            <nav className="flex flex-col gap-4">
                                <Link
                                    href="/#features"
                                    className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground py-2 border-b border-border/10"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Features
                                </Link>
                                <Link
                                    href="/#demo"
                                    className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground py-2 border-b border-border/10"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Demo
                                </Link>
                                <Link
                                    href="/#how-it-works"
                                    className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground py-2 border-b border-border/10"
                                    onClick={() => setIsOpen(false)}
                                >
                                    How It Works
                                </Link>
                            </nav>

                            <div className="mt-auto pt-6 border-t border-border/40 flex flex-col gap-3">
                                <Show when="signed-out">
                                    <SignInButton mode="modal">
                                        <Button
                                            variant="outline"
                                            className="w-full rounded-full py-5 hover:border-primary/50"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Sign in
                                        </Button>
                                    </SignInButton>
                                </Show>
                                <Show when="signed-in">
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="w-full rounded-full py-5 hover:border-primary/50"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <Link
                                            href="/dashboard"
                                            className="flex items-center justify-center gap-2"
                                        >
                                            Dashboard
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </Show>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>
    );
}
