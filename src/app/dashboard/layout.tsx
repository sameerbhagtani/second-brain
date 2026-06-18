import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/layout/DashboardSidebar";

import syncUser from "@/lib/syncUser";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    await syncUser();

    return (
        <SidebarProvider>
            <DashboardSidebar />

            <main className="w-full">
                <SidebarTrigger className="m-2" />
                {children}
            </main>
        </SidebarProvider>
    );
}
