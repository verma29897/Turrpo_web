import { useRef, useState } from "react";
import {
    Clock,
    Loader2,
    Mail,
    MapPin,
    Phone,
    Send,
    ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardIcon } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { useToast } from "@/components/ui/toast";
import { SITE } from "@/constants/site";
import {
    hasContactEndpoint,
    submitContactRequest,
    type ContactPayload,
} from "@/services/contact";

type FormValues = ContactPayload;
type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY: FormValues = { name: "", email: "", phone: "", message: "" };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: FormValues): FormErrors {
    const errors: FormErrors = {};

    const name = values.name.trim();
    if (!name) errors.name = "Please enter your name.";
    else if (name.length < 2) errors.name = "Name must be at least 2 characters.";

    const email = values.email.trim();
    if (!email) errors.email = "Please enter your email address.";
    else if (!EMAIL_PATTERN.test(email))
        errors.email = "Enter a valid email address, e.g. name@company.com.";

    const digits = values.phone.replace(/[^\d]/g, "");
    if (!values.phone.trim()) errors.phone = "Please enter a phone number.";
    else if (digits.length < 7 || digits.length > 15)
        errors.phone = "Enter a valid phone number (7 to 15 digits).";

    const message = values.message.trim();
    if (!message) errors.message = "Please tell us how we can help.";
    else if (message.length < 10)
        errors.message = "Please add a little more detail (at least 10 characters).";

    return errors;
}

const CONTACT_DETAILS = [
    {
        icon: Mail,
        label: "Email",
        value: SITE.email,
        href: `mailto:${SITE.email}`,
    },
    {
        icon: Phone,
        label: "Phone",
        value: SITE.phone,
        href: `tel:${SITE.phoneHref}`,
    },
    { icon: MapPin, label: "Office", value: SITE.address, href: undefined },
    { icon: Clock, label: "Hours", value: SITE.hours, href: undefined },
];

const Contact = () => {
    const [values, setValues] = useState<FormValues>(EMPTY);
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const { toast } = useToast();

    const setField = (field: keyof FormValues, value: string) => {
        setValues((current) => ({ ...current, [field]: value }));
        // Clear the error as soon as the visitor starts fixing the field.
        setErrors((current) =>
            current[field] ? { ...current, [field]: undefined } : current,
        );
    };

    const validateField = (field: keyof FormValues) => {
        const fieldError = validate(values)[field];
        setErrors((current) => ({ ...current, [field]: fieldError }));
    };

    const handleReset = () => {
        setValues(EMPTY);
        setErrors({});
        setSubmitError(null);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitError(null);

        const nextErrors = validate(values);
        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            // Move focus to the first field that needs attention.
            const firstInvalid = Object.keys(nextErrors)[0];
            formRef.current
                ?.querySelector<HTMLElement>(`#contact-${firstInvalid}`)
                ?.focus();
            return;
        }

        setSubmitting(true);
        try {
            const payload: ContactPayload = {
                name: values.name.trim(),
                email: values.email.trim(),
                phone: values.phone.trim(),
                message: values.message.trim(),
            };
            const result = await submitContactRequest(payload);

            if (result.mode === "api") {
                toast({
                    variant: "success",
                    title: "Message sent",
                    description:
                        "Thanks for reaching out. Our team will get back to you shortly.",
                });
                handleReset();
            } else {
                toast({
                    variant: "info",
                    title: "Opening your email app",
                    description: `Your message is pre-filled and addressed to ${SITE.email}. Press send there to deliver it.`,
                    duration: 9000,
                });
            }
        } catch (error) {
            const description =
                error instanceof Error
                    ? error.message
                    : `Something went wrong. Please email ${SITE.email} directly.`;
            setSubmitError(description);
            toast({
                variant: "error",
                title: "Could not send your message",
                description,
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="bg-background text-foreground">
            <PageHero
                eyebrow="Contact Us"
                title="Talk to our security team"
                description="Tell us about your environment and what you're trying to protect. We'll come back with a straight answer about where we can help."
            />

            <Section padding="lg">
                <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
                    {/* Form */}
                    <Card padding="lg">
                        <h2 className="text-2xl font-bold text-foreground tracking-tight mb-2">
                            Send us a message
                        </h2>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                            {hasContactEndpoint
                                ? "We usually reply within one business day."
                                : `This form opens your email client with the details filled in, addressed to ${SITE.email}.`}
                        </p>

                        <form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            noValidate
                            className="flex flex-col gap-5"
                        >
                            <div className="grid gap-5 sm:grid-cols-2">
                                <Field
                                    id="contact-name"
                                    label="Full name"
                                    required
                                    error={errors.name}
                                >
                                    {(control) => (
                                        <input
                                            {...control}
                                            type="text"
                                            name="name"
                                            autoComplete="name"
                                            placeholder="Jane Doe"
                                            value={values.name}
                                            disabled={submitting}
                                            onChange={(e) =>
                                                setField("name", e.target.value)
                                            }
                                            onBlur={() => validateField("name")}
                                        />
                                    )}
                                </Field>

                                <Field
                                    id="contact-email"
                                    label="Work email"
                                    required
                                    error={errors.email}
                                >
                                    {(control) => (
                                        <input
                                            {...control}
                                            type="email"
                                            name="email"
                                            autoComplete="email"
                                            placeholder="jane@company.com"
                                            value={values.email}
                                            disabled={submitting}
                                            onChange={(e) =>
                                                setField("email", e.target.value)
                                            }
                                            onBlur={() => validateField("email")}
                                        />
                                    )}
                                </Field>
                            </div>

                            <Field
                                id="contact-phone"
                                label="Phone"
                                required
                                error={errors.phone}
                                hint="Include your country code if you're outside India."
                            >
                                {(control) => (
                                    <input
                                        {...control}
                                        type="tel"
                                        name="phone"
                                        autoComplete="tel"
                                        placeholder="+91 90000 00000"
                                        value={values.phone}
                                        disabled={submitting}
                                        onChange={(e) =>
                                            setField("phone", e.target.value)
                                        }
                                        onBlur={() => validateField("phone")}
                                    />
                                )}
                            </Field>

                            <Field
                                id="contact-message"
                                label="How can we help?"
                                required
                                error={errors.message}
                            >
                                {(control) => (
                                    <textarea
                                        {...control}
                                        name="message"
                                        rows={5}
                                        placeholder="Tell us about your infrastructure, current controls, and what prompted you to get in touch."
                                        value={values.message}
                                        disabled={submitting}
                                        onChange={(e) =>
                                            setField("message", e.target.value)
                                        }
                                        onBlur={() => validateField("message")}
                                        className={`${control.className} resize-y min-h-32`}
                                    />
                                )}
                            </Field>

                            {submitError && (
                                <div
                                    role="alert"
                                    className="rounded-lg border border-danger/40 bg-danger/10 p-4 text-sm text-danger"
                                >
                                    {submitError}
                                </div>
                            )}

                            <div className="flex flex-wrap items-center gap-3 pt-1">
                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={submitting}
                                    aria-busy={submitting}
                                    className="cursor-pointer font-semibold transition-colors duration-200"
                                >
                                    {submitting ? (
                                        <>
                                            <Loader2
                                                className="mr-2 h-4 w-4 animate-spin"
                                                aria-hidden="true"
                                            />
                                            Sending…
                                        </>
                                    ) : (
                                        <>
                                            <Send
                                                className="mr-2 h-4 w-4"
                                                aria-hidden="true"
                                            />
                                            Send message
                                        </>
                                    )}
                                </Button>
                                <Button
                                    type="button"
                                    size="lg"
                                    variant="ghost"
                                    onClick={handleReset}
                                    disabled={submitting}
                                    className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors duration-200"
                                >
                                    Reset
                                </Button>
                            </div>
                        </form>
                    </Card>

                    {/* Direct contact details */}
                    <div className="flex flex-col gap-5">
                        <Card>
                            <h2 className="text-lg font-semibold text-foreground mb-5">
                                Reach us directly
                            </h2>
                            <ul className="flex flex-col gap-5">
                                {CONTACT_DETAILS.map((detail) => (
                                    <li
                                        key={detail.label}
                                        className="flex items-start gap-3"
                                    >
                                        <CardIcon icon={detail.icon} size="sm" />
                                        <div className="min-w-0">
                                            <p className="text-xs font-semibold uppercase tracking-widest text-subtle">
                                                {detail.label}
                                            </p>
                                            {detail.href ? (
                                                <a
                                                    href={detail.href}
                                                    className="text-sm text-foreground break-words rounded transition-colors duration-200 hover:text-primary
                                                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                                >
                                                    {detail.value}
                                                </a>
                                            ) : (
                                                <p className="text-sm text-foreground break-words">
                                                    {detail.value}
                                                </p>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        <Card className="border-sky-500/30 bg-sky-500/10">
                            <div className="flex items-start gap-3">
                                <ShieldCheck
                                    className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                                    aria-hidden="true"
                                />
                                <div>
                                    <h2 className="text-base font-semibold text-foreground mb-2">
                                        Dealing with an active incident?
                                    </h2>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Call us on{" "}
                                        <a
                                            href={`tel:${SITE.phoneHref}`}
                                            className="font-semibold text-primary rounded transition-colors duration-200 hover:text-primary/80
                                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        >
                                            {SITE.phone}
                                        </a>{" "}
                                        instead of using this form. It reaches
                                        our response team faster.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </Section>
        </main>
    );
};

export default Contact;
