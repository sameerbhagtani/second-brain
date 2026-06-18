export default function TermsPage() {
    return (
        <div className="mx-auto max-w-3xl px-6 py-12 sm:py-20">
            <header className="mb-10 border-b border-border/70 pb-8">
                <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                    Terms of Service
                </h1>
                <p className="mt-4 text-sm text-muted-foreground">
                    Last Updated: 18 June, 2026
                </p>
            </header>

            <article className="space-y-8 text-foreground/90">
                <p className="text-base leading-relaxed text-muted-foreground">
                    Welcome to SecondBrain. These Terms of Service ("Terms") govern your access to and use of the SecondBrain website, dashboard, and AI-powered productivity tools. By accessing or using the Service, you agree to be bound by these Terms.
                </p>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold tracking-tight text-foreground border-b border-border/50 pb-2">
                        1. Services Description
                    </h2>
                    <p className="leading-relaxed">
                        SecondBrain is an AI-powered productivity platform that integrates Gmail and Google Calendar into a unified workspace. The platform enables users to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground pl-4">
                        <li>View and manage emails</li>
                        <li>View and manage calendar events</li>
                        <li>Receive AI-generated suggestions and assistance</li>
                        <li>Automate productivity workflows</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold tracking-tight text-foreground border-b border-border/50 pb-2">
                        2. Accounts and Authentication
                    </h2>
                    <p className="leading-relaxed">
                        To use SecondBrain, you must:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground pl-4">
                        <li>Create an account through Clerk authentication</li>
                        <li>Connect your Google Account using Google's official OAuth process</li>
                    </ul>
                    <p className="leading-relaxed text-sm text-muted-foreground">
                        You are responsible for maintaining the security of your account and for activities performed under your account.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold tracking-tight text-foreground border-b border-border/50 pb-2">
                        3. Acceptable Use
                    </h2>
                    <p className="leading-relaxed">
                        You agree not to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground pl-4">
                        <li>Use the Service for unlawful activities</li>
                        <li>Attempt unauthorized access to systems or accounts</li>
                        <li>Abuse, overload, or disrupt platform infrastructure</li>
                        <li>Generate spam or malicious content through the platform</li>
                    </ul>
                    <p className="leading-relaxed text-sm text-muted-foreground">
                        Violation of these terms may result in suspension or termination of access.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold tracking-tight text-foreground border-b border-border/50 pb-2">
                        4. AI Features
                    </h2>
                    <p className="leading-relaxed">
                        SecondBrain uses artificial intelligence to assist with email drafting, email summarization, scheduling assistance, and productivity recommendations.
                    </p>
                    <div className="rounded-xl border border-amber-200/30 bg-amber-500/5 p-4 text-sm text-amber-600 dark:text-amber-400">
                        <p className="font-medium">Important Disclaimer regarding AI outputs:</p>
                        <p className="mt-1">
                            AI-generated outputs may occasionally be inaccurate or incomplete. Users remain responsible for reviewing and approving actions before relying on them.
                        </p>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold tracking-tight text-foreground border-b border-border/50 pb-2">
                        5. Third-Party Services
                    </h2>
                    <p className="leading-relaxed">
                        SecondBrain integrates with third-party services including Google Gmail, Google Calendar, OpenAI, and Clerk.
                    </p>
                    <p className="leading-relaxed text-sm text-muted-foreground">
                        SecondBrain is not affiliated with, endorsed by, or sponsored by Google.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold tracking-tight text-foreground border-b border-border/50 pb-2">
                        6. Disclaimer of Warranties
                    </h2>
                    <p className="leading-relaxed text-muted-foreground">
                        The Service is provided on an "as is" and "as available" basis without warranties of any kind. We do not guarantee uninterrupted availability, accuracy, or suitability for any specific purpose.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold tracking-tight text-foreground border-b border-border/50 pb-2">
                        7. Limitation of Liability
                    </h2>
                    <p className="leading-relaxed text-muted-foreground">
                        To the maximum extent permitted by law, SecondBrain shall not be liable for indirect, incidental, special, consequential, or punitive damages arising from use of the Service. Users are responsible for reviewing emails, calendar events, and AI-generated actions before approval.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold tracking-tight text-foreground border-b border-border/50 pb-2">
                        8. Governing Law
                    </h2>
                    <p className="leading-relaxed text-muted-foreground">
                        These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms shall be subject to the jurisdiction of the courts of India.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold tracking-tight text-foreground border-b border-border/50 pb-2">
                        9. Changes to These Terms
                    </h2>
                    <p className="leading-relaxed text-muted-foreground">
                        We reserve the right to modify these Terms at any time. Continued use of the Service after changes are published constitutes acceptance of the updated Terms.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold tracking-tight text-foreground border-b border-border/50 pb-2">
                        10. Contact Information
                    </h2>
                    <p className="leading-relaxed">
                        For legal inquiries or support requests, please contact:
                    </p>
                    <p className="text-sm">
                        Email:{" "}
                        <a
                            href="mailto:sameerbhagtani0@gmail.com"
                            className="font-medium text-primary hover:underline"
                        >
                            sameerbhagtani0@gmail.com
                        </a>
                    </p>
                </section>
            </article>
        </div>
    );
}
