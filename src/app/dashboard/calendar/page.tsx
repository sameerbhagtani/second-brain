import CalendarShell from "@/components/CalendarShell";

export default async function DashboardCalendar() {
    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                        Calendar
                    </h1>
                </div>
            </div>

            <section className="overflow-hidden rounded-3xl border border-border/70 bg-background shadow-sm">
                <CalendarShell />
            </section>
        </div>
    );
}
