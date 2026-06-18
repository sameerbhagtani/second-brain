import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Navbar() {
    return (
        <header className="border-b border-border/60 bg-background/80 backdrop-blur">
            <nav className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <Link
                    href="/"
                    className="text-base font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
                >
                    SecondBrain
                </Link>

                <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                    <Show when="signed-out">
                        <SignInButton mode="modal">
                            <Button
                                variant="outline"
                                className="w-full rounded-full px-4 sm:w-auto"
                            >
                                Sign in
                            </Button>
                        </SignInButton>
                    </Show>
                    <Show when="signed-in">
                        <Button
                            asChild
                            variant="outline"
                            className="w-full rounded-full px-4 sm:w-auto"
                        >
                            <Link href="/dashboard">Dashboard</Link>
                        </Button>

                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background shadow-sm">
                            <UserButton />
                        </div>
                    </Show>
                </div>
            </nav>
        </header>
    );
}
