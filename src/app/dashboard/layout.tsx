import syncUser from "@/lib/syncUser";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    await syncUser();

    return (
        <>
            <aside>Sidebar here</aside>

            {children}
        </>
    );
}
