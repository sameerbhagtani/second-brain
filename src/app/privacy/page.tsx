export default function PrivacyPolicyPage() {
    return (
        <div className="mx-auto max-w-3xl px-6 py-12 sm:py-20">
            <header className="mb-10 border-b border-border/70 pb-8">
                <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                    Privacy Policy
                </h1>
                <p className="mt-4 text-sm text-muted-foreground">
                    Last Updated: 18 June, 2026
                </p>
            </header>

            <article className="space-y-8 text-foreground/90">
                <p className="text-base leading-relaxed text-muted-foreground">
                    At SecondBrain, we value your trust and are committed to protecting your privacy. This Privacy Policy explains how we collect, process, and protect your information when you use our website, application, and AI-powered productivity services.
                </p>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold tracking-tight text-foreground border-b border-border/50 pb-2">
                        1. Google API Scopes & OAuth Integration
                    </h2>
                    <p className="leading-relaxed">
                        SecondBrain integrates directly with your Google Account (Gmail and Google Calendar) using official Google OAuth 2.0 credentials.
                    </p>
                    <p className="leading-relaxed">
                        Our service requires specific Google API scopes to function:
                    </p>
                    <div className="grid gap-6 sm:grid-cols-2 mt-4">
                        <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
                            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-primary" />
                                Gmail Scopes
                            </h3>
                            <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground">
                                <li>Read emails</li>
                                <li>Search emails</li>
                                <li>Draft emails</li>
                                <li>Send emails</li>
                                <li>Organize and manage mailbox content</li>
                            </ul>
                        </div>
                        <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
                            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-primary" />
                                Google Calendar Scopes
                            </h3>
                            <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground">
                                <li>View calendar events</li>
                                <li>Create and manage events</li>
                                <li>Synchronize schedules</li>
                                <li>Assist with meeting planning</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-4 rounded-xl border border-amber-200/30 bg-amber-500/5 p-4 text-sm text-amber-600 dark:text-amber-400">
                        <p className="font-medium">Important Data Usage Policy:</p>
                        <p className="mt-1">
                            SecondBrain does not sell, share, or use Google Workspace data for advertising purposes. Additionally, data obtained through Google Workspace APIs is not used to develop, improve, or train generalized artificial intelligence or machine learning models.
                        </p>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold tracking-tight text-foreground border-b border-border/50 pb-2">
                        2. Information We Collect
                    </h2>
                    <p className="leading-relaxed">
                        We collect only the information necessary to provide our services.
                    </p>
                    
                    <div className="space-y-4 mt-2">
                        <div>
                            <h3 className="text-base font-semibold text-foreground">Account Information</h3>
                            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                                Name, Email address, Profile image (if provided), and Authentication details processed through Clerk.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-base font-semibold text-foreground">OAuth Credentials</h3>
                            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                                To access Gmail and Google Calendar on your behalf, we store OAuth access credentials securely. These credentials are encrypted in transit and at rest.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-base font-semibold text-foreground">Usage Information</h3>
                            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                                Feature usage statistics, API usage counts, error logs, and service performance metrics to help maintain reliability and enforce service limits.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold tracking-tight text-foreground border-b border-border/50 pb-2">
                        3. How We Use Your Information
                    </h2>
                    <p className="leading-relaxed">
                        Your information is used solely to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                        <li>Provide and maintain your SecondBrain workspace</li>
                        <li>Authenticate your account</li>
                        <li>Connect to Gmail and Google Calendar</li>
                        <li>Enable AI-powered email and scheduling assistance</li>
                        <li>Improve application reliability and security</li>
                        <li>Respond to support requests</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold tracking-tight text-foreground border-b border-border/50 pb-2">
                        4. Data Sharing and Third Parties
                    </h2>
                    <p className="leading-relaxed">
                        We do not sell, rent, or trade your information. Your information may be processed by trusted service providers required to operate the platform:
                    </p>
                    
                    <div className="space-y-4 mt-2">
                        <div>
                            <h3 className="text-base font-semibold text-foreground">Google Services</h3>
                            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                                Used directly for Gmail and Google Calendar integrations.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-base font-semibold text-foreground">AI Providers</h3>
                            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                                When you use AI-powered features, limited contextual information may be processed by AI providers such as OpenAI solely to fulfill your request. We do not permit AI providers to use your data for model training.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-base font-semibold text-foreground">Infrastructure Providers</h3>
                            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                                Hosting, database, authentication, and security providers used to operate the platform.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold tracking-tight text-foreground border-b border-border/50 pb-2">
                        5. Data Security and Deletion
                    </h2>
                    <p className="leading-relaxed">
                        We implement reasonable technical and organizational safeguards to protect user data.
                    </p>
                    <p className="leading-relaxed">
                        You may revoke Google access at any time through your Google Account security settings. You may also request deletion of your account and associated data by contacting us.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold tracking-tight text-foreground border-b border-border/50 pb-2">
                        6. Contact Information
                    </h2>
                    <p className="leading-relaxed">
                        For privacy questions, account deletion requests, or concerns regarding this Privacy Policy, please contact:
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
