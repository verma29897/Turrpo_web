import { SITE } from "@/constants/site";

/**
 * Contact request delivery.
 *
 * This site has no backend of its own. Rather than fake a successful POST,
 * delivery works one of two ways:
 *
 *   1. If `VITE_CONTACT_ENDPOINT` is set at build time, the payload is POSTed
 *      there as JSON (Formspree, a Vercel function, an internal API: anything
 *      that accepts `{name,email,phone,message}` and answers 2xx).
 *   2. Otherwise the visitor's mail client is opened with the message
 *      pre-filled, and the UI says so plainly instead of claiming the message
 *      was sent.
 *
 * See CONTACT-FORM.md for the endpoint contract.
 */

export type ContactPayload = {
    name: string;
    email: string;
    phone: string;
    message: string;
};

export type ContactResult =
    /** Delivered to the configured backend. */
    | { mode: "api" }
    /** Handed off to the visitor's mail client, not yet delivered. */
    | { mode: "mailto" };

const ENDPOINT: string = import.meta.env.VITE_CONTACT_ENDPOINT ?? "";

/** True when a real submission endpoint is configured for this build. */
export const hasContactEndpoint = ENDPOINT.length > 0;

function buildMailto({ name, email, phone, message }: ContactPayload): string {
    const subject = encodeURIComponent(`Website enquiry from ${name}`);
    const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}\n`,
    );
    return `mailto:${SITE.email}?subject=${subject}&body=${body}`;
}

export async function submitContactRequest(
    payload: ContactPayload,
    signal?: AbortSignal,
): Promise<ContactResult> {
    if (!hasContactEndpoint) {
        window.location.href = buildMailto(payload);
        return { mode: "mailto" };
    }

    const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(payload),
        signal,
    });

    if (!response.ok) {
        throw new Error(
            `The server rejected the request (HTTP ${response.status}). ` +
                `Please try again, or email ${SITE.email} directly.`,
        );
    }

    return { mode: "api" };
}
