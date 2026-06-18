type EmailPreviewProps = {
    sender: string;
    subject: string;
    snippet: string;
    date?: string;
    onClick?: () => void;
};

export default function EmailPreview({
    sender,
    subject,
    snippet,
    date,
    onClick,
}: EmailPreviewProps) {
    return (
        <article
            onClick={onClick}
            className={`flex min-w-0 gap-4 px-5 py-4 transition-colors hover:bg-muted/35 sm:px-6 ${
                onClick ? "cursor-pointer" : ""
            }`}
        >
            <div className="min-w-0 flex-1">
                <div className="flex min-w-0 items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">
                            {sender}
                        </p>
                        <p className="mt-1 truncate text-sm text-foreground/90">
                            {subject}
                        </p>
                        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                            {snippet}
                        </p>
                    </div>

                    {date ? (
                        <time className="shrink-0 text-xs text-muted-foreground">
                            {date}
                        </time>
                    ) : null}
                </div>
            </div>
        </article>
    );
}
