"use client";

import { SignOutButton, useUser } from "@clerk/nextjs";
import {
    Bot,
    FilePenLine,
    CalendarDays,
    ChevronUp,
    Home,
    Inbox,
    LogOut,
    Send,
    Settings,
    ShieldAlert,
    Trash2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ComponentType, useState } from "react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar";

const primaryNavigationItems = [
    { title: "Agent", href: "/dashboard/agent", icon: Bot },
] as const;

const mailboxNavigationItems = [
    { title: "Inbox", href: "/dashboard/inbox", icon: Inbox },
    { title: "Sent", href: "/dashboard/sent", icon: Send },
    { title: "Spam", href: "/dashboard/spam", icon: ShieldAlert },
    { title: "Trash", href: "/dashboard/trash", icon: Trash2 },
] as const;

const secondaryNavigationItems = [
    { title: "Calendar", href: "/dashboard/calendar", icon: CalendarDays },
    { title: "Settings", href: "/dashboard/settings", icon: Settings },
] as const;

export default function DashboardSidebar() {
    const pathname = usePathname();
    const { user, isLoaded } = useUser();
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

    const displayName =
        user?.fullName || user?.firstName || user?.username || "User";
    const avatarUrl = user?.imageUrl;

    const renderNavItems = (
        items: ReadonlyArray<{
            title: string;
            href: string;
            icon: ComponentType<{ className?: string }>;
        }>,
    ) =>
        items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
                <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className="h-10 rounded-xl px-3 data-[active=true]:bg-primary/15 data-[active=true]:font-medium data-[active=true]:text-primary"
                    >
                        <Link href={item.href}>
                            <Icon />
                            <span>{item.title}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            );
        });

    return (
        <Sidebar>
            <SidebarHeader className="gap-3 border-b border-sidebar-border/70 px-4 py-4">
                <div className="px-2">
                    <Link
                        href="/dashboard"
                        className="block text-lg font-semibold tracking-tight text-sidebar-foreground"
                    >
                        SecondBrain
                    </Link>
                </div>
                {/* <button
                    type="button"
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring"
                >
                    <FilePenLine className="size-4" />
                    <span>Compose</span>
                </button> */}
            </SidebarHeader>

            <SidebarContent className="pt-3">
                <SidebarGroup className="gap-3 px-3">
                    <SidebarMenu className="gap-1">
                        {renderNavItems(primaryNavigationItems)}
                    </SidebarMenu>

                    <SidebarSeparator className="mx-0" />

                    <SidebarMenu className="gap-1">
                        {renderNavItems(mailboxNavigationItems)}
                    </SidebarMenu>

                    <SidebarSeparator className="mx-0" />

                    <SidebarMenu className="gap-1">
                        {renderNavItems([secondaryNavigationItems[0]])}
                    </SidebarMenu>

                    <SidebarSeparator className="mx-0" />

                    <SidebarMenu className="gap-1">
                        {renderNavItems([secondaryNavigationItems[1]])}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-sidebar-border/70 p-3">
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setIsAccountMenuOpen((open) => !open)}
                        className="flex w-full items-center gap-3 rounded-xl border border-sidebar-border/70 bg-sidebar-accent/30 px-3 py-2 text-left transition-colors hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-sidebar-ring"
                    >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-sidebar-accent text-sm font-semibold text-sidebar-accent-foreground">
                            {avatarUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={avatarUrl}
                                    alt={displayName}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                displayName.charAt(0).toUpperCase()
                            )}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-sidebar-foreground">
                                {isLoaded ? displayName : "Loading..."}
                            </p>
                        </div>
                        <ChevronUp className="size-4 shrink-0 text-sidebar-foreground/70" />
                    </button>

                    {isAccountMenuOpen ? (
                        <div className="absolute inset-x-0 bottom-full z-20 mb-2 rounded-xl border border-sidebar-border bg-sidebar p-2 shadow-lg">
                            <div className="flex flex-col gap-1">
                                <Link
                                    href="/"
                                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                    onClick={() => setIsAccountMenuOpen(false)}
                                >
                                    <Home className="size-4" />
                                    <span>Home</span>
                                </Link>
                                <SignOutButton>
                                    <button
                                        type="button"
                                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                    >
                                        <LogOut className="size-4" />
                                        <span>Logout</span>
                                    </button>
                                </SignOutButton>
                            </div>
                        </div>
                    ) : null}
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
