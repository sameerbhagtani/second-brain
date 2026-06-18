import { auth } from "@clerk/nextjs/server";
import type { Message, MessagePart } from "@corsair-dev/gmail/types";
import { corsair } from "~/corsair";

export type Mailbox = "INBOX" | "SENT" | "SPAM" | "TRASH";

export type EmailPreview = {
    id: string;
    threadId: string;
    sender: string;
    senderEmail?: string;
    recipientName?: string;
    recipientEmail?: string;
    subject: string;
    snippet: string;
    internalDate?: string;
    labelIds?: string[];
};

export type GetEmailsResult = {
    emails: EmailPreview[];
    nextPageToken?: string;
    total?: number;
};

type GetEmailsParams = {
    mailbox: Mailbox;
    pageToken?: string;
    maxResults?: number;
};

function getHeaderValue(
    payload: MessagePart | undefined,
    headerName: string,
): string | undefined {
    const directMatch = payload?.headers?.find(
        (header) => header.name?.toLowerCase() === headerName.toLowerCase(),
    )?.value;

    if (directMatch) {
        return directMatch;
    }

    for (const part of payload?.parts ?? []) {
        const nestedMatch = getHeaderValue(part, headerName);

        if (nestedMatch) {
            return nestedMatch;
        }
    }

    return undefined;
}

function getMessageMetadata(message: Message) {
    const subject =
        getHeaderValue(message.payload, "Subject") ?? "(no subject)";
    const fromHeader = getHeaderValue(message.payload, "From");
    const toHeader =
        getHeaderValue(message.payload, "To") ??
        getHeaderValue(message.payload, "Delivered-To") ??
        getHeaderValue(message.payload, "X-Original-To") ??
        getHeaderValue(message.payload, "X-Envelope-To");

    return {
        subject,
        ...parseSender(fromHeader),
        ...parseRecipient(toHeader),
    };
}

function parseSender(fromHeader?: string) {
    if (!fromHeader) {
        return { sender: "Unknown sender" };
    }

    const matchedSender = fromHeader.match(/^(.*?)(?:\s*<(.+)>)?$/);
    const rawName = matchedSender?.[1]?.trim().replace(/^"|"$/g, "");
    const senderEmail = matchedSender?.[2]?.trim();

    if (rawName) {
        return { sender: rawName, senderEmail };
    }

    return {
        sender: senderEmail ?? fromHeader,
        senderEmail,
    };
}

function parseRecipient(toHeader?: string) {
    if (!toHeader) {
        return {};
    }

    const firstRecipient = toHeader
        .split(/[;,]/)
        .map((recipient) => recipient.trim())
        .find(Boolean);

    if (!firstRecipient) {
        return {};
    }

    const angleBracketMatch = firstRecipient.match(/<([^>]+)>/);
    const recipientEmail = angleBracketMatch?.[1]?.trim();
    const rawName = firstRecipient
        .replace(/<[^>]+>/g, "")
        .trim()
        .replace(/^"|"$/g, "")
        .replace(/[:;]+$/, "");

    if (rawName && rawName.toLowerCase() !== "undisclosed-recipients") {
        return { recipientName: rawName, recipientEmail };
    }

    return {
        recipientName: recipientEmail ?? firstRecipient,
        recipientEmail,
    };
}

export async function getEmails({
    mailbox,
    pageToken,
    maxResults = 20,
}: GetEmailsParams): Promise<GetEmailsResult> {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const response = await corsair.withTenant(userId).gmail.api.messages.list({
        labelIds: [mailbox],
        maxResults,
        pageToken,
    });

    const messages = response.messages ?? [];

    const emails = await Promise.all(
        messages.map(async (message) => {
            try {
                if (!message.id) {
                    return null;
                }

                const email = await corsair
                    .withTenant(userId)
                    .gmail.api.messages.get({
                        id: message.id,
                        format: "full",
                    });

                const {
                    sender,
                    senderEmail,
                    recipientName,
                    recipientEmail,
                    subject,
                } = getMessageMetadata(email);

                if (!email.id || !email.threadId) {
                    return null;
                }

                return {
                    id: email.id,
                    threadId: email.threadId,
                    sender,
                    senderEmail,
                    recipientName,
                    recipientEmail,
                    subject,
                    snippet: email.snippet ?? "",
                    internalDate: email.internalDate,
                    labelIds: email.labelIds,
                };
            } catch (error) {
                console.error(`Failed to fetch email ${message.id}`, error);

                return null;
            }
        }),
    );

    return {
        emails: emails.filter(Boolean) as EmailPreview[],
        nextPageToken: response.nextPageToken,
        total: response.resultSizeEstimate,
    };
}

export type EmailDetail = {
    id: string;
    threadId: string;
    sender: string;
    senderEmail?: string;
    recipientName?: string;
    recipientEmail?: string;
    subject: string;
    snippet: string;
    body: string;
    html?: string;
    internalDate?: string;
};

function base64UrlDecode(str: string): string {
    let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
        base64 += "=";
    }
    return Buffer.from(base64, "base64").toString("utf8");
}

function getEmailBody(part: any): string {
    if (part.mimeType === "text/plain" && part.body?.data) {
        return base64UrlDecode(part.body.data);
    }
    if (part.parts && part.parts.length > 0) {
        for (const subPart of part.parts) {
            const result = getEmailBody(subPart);
            if (result) return result;
        }
    }
    return "";
}

function getEmailHtml(part: any): string {
    if (part.mimeType === "text/html" && part.body?.data) {
        return base64UrlDecode(part.body.data);
    }
    if (part.parts && part.parts.length > 0) {
        for (const subPart of part.parts) {
            const result = getEmailHtml(subPart);
            if (result) return result;
        }
    }
    return "";
}

export async function getEmailDetail(id: string): Promise<EmailDetail> {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const email = await corsair
        .withTenant(userId)
        .gmail.api.messages.get({
            id,
            format: "full",
        });

    const {
        sender,
        senderEmail,
        recipientName,
        recipientEmail,
        subject,
    } = getMessageMetadata(email);

    if (!email.id || !email.threadId) {
        throw new Error("Message not found");
    }

    let body = "";
    let html = "";
    if (email.payload) {
        body = getEmailBody(email.payload);
        html = getEmailHtml(email.payload);
    }
    if (!body) {
        body = email.snippet ?? "";
    }

    return {
        id: email.id,
        threadId: email.threadId,
        sender,
        senderEmail,
        recipientName,
        recipientEmail,
        subject,
        snippet: email.snippet ?? "",
        body,
        html: html || undefined,
        internalDate: email.internalDate,
    };
}

