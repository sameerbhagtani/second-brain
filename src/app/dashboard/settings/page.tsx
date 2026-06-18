import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarDays, Mail } from "lucide-react";

import { db } from "@/db";
import { usersTable } from "@/db/schemas/users";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export default async function DashboardSettings() {
    const { userId } = await auth();

    const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.clerkUserId, userId!))
        .limit(1);

    const integrations = [
        {
            name: "Gmail",
            cta: "Connect",
            href: "/api/connect?plugin=gmail",
            icon: Mail,
            connected: user.gmailConnected,
        },
        {
            name: "Google Calendar",
            cta: "Connect",
            href: "/api/connect?plugin=googlecalendar",
            icon: CalendarDays,
            connected: user.googleCalendarConnected,
        },
    ];

    return (
        <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                Settings
            </h1>

            <section className="mt-8 rounded-2xl border border-border/70 bg-background shadow-sm">
                <div className="border-b border-border/70 px-5 py-4 sm:px-6">
                    <h2 className="text-lg font-medium text-foreground">
                        Integrations
                    </h2>
                </div>

                <div className="divide-y divide-border/70">
                    {integrations.map((integration) => {
                        const Icon = integration.icon;

                        return (
                            <div
                                key={integration.name}
                                className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                                        <Icon className="size-5" />
                                    </div>
                                    <span className="text-sm font-medium text-foreground">
                                        {integration.name}
                                    </span>
                                </div>

                                {integration.connected ? (
                                    <Button
                                        variant="outline"
                                        disabled
                                        className="w-full rounded-full border-border/60 bg-muted text-muted-foreground opacity-100 sm:w-auto"
                                    >
                                        Connected
                                    </Button>
                                ) : (
                                    <Button
                                        variant="outline"
                                        className="w-full rounded-full px-4 sm:w-auto"
                                        asChild
                                    >
                                        <Link href={integration.href}>
                                            {integration.cta}
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
