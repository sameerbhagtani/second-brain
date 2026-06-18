"use client";

import { SignOutButton, useUser } from "@clerk/nextjs";
import {
    Bot,
    CalendarDays,
    ChevronUp,
    Home,
    Inbox,
    LogOut,
    Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

const navigationItems = [
    { title: "Agent", href: "/dashboard/agent", icon: Bot },
    { title: "Inbox", href: "/dashboard/inbox", icon: Inbox },
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

    return (
        <Sidebar>
            <SidebarContent className="pt-4">
                <SidebarGroup>
                    <SidebarMenu className="gap-1">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive}
                                        className="h-10 rounded-xl px-3"
                                    >
                                        <Link href={item.href}>
                                            <Icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
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
