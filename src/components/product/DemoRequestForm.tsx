import { useEffect, useRef, useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
    COMPANY_SIZES,
    USE_CASES,
    type CompanySize,
    type UseCase,
} from "@/constants/product";

/**
 * Demo request form.
 *
 * Front-end mock only: submitting validates the fields and swaps in a success
 * state. Nothing is posted anywhere and nothing is persisted, not to a server
 * and not to storage, so the page can go live before there is a backend to
 * receive it. The form says as much beneath the button rather than quietly
 * pretending to collect addresses.
 */

type Values = {
    name: string;
    email: string;
    company: string;
    size: CompanySize;
    useCase: UseCase;
    message: string;
};
type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = {
    name: "",
    email: "",
    company: "",
    size: COMPANY_SIZES[0],
    useCase: USE_CASES[0],
    message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Consumer domains are rejected because the field asks for a work address.
 * Kept deliberately short: a long blocklist turns into a support problem, and
 * the goal is a nudge rather than an enforcement boundary.
 */
const CONSUMER_DOMAINS = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "icloud.com",
];

function validate(values: Values): Errors {
    const errors: Errors = {};

    const name = values.name.trim();
    if (!name) errors.name = "Please enter your full name.";
    else if (name.length < 2) errors.name = "Name must be at least 2 characters.";

    const email = values.email.trim().toLowerCase();
    if (!email) errors.email = "Please enter your work email address.";
    else if (!EMAIL_PATTERN.test(email))
        errors.email = "Enter a valid email address, for example name@company.com.";
    else if (CONSUMER_DOMAINS.includes(email.split("@")[1]))
        errors.email = "Please use your work email address.";

    if (!values.company.trim()) errors.company = "Please enter your company name.";

    return errors;
}

/** Circle, then tick, drawn with dash-array animations. */
function SuccessMark() {
    return (
        <svg
            viewBox="0 0 52 52"
            className="h-16 w-16 motion-safe:animate-check-pop"
            aria-hidden="true"
        >
            <circle
                cx="26"
                cy="26"
                r="24"
                fill="none"
                strokeWidth="2"
                strokeDasharray="151 151"
                className="stroke-primary/40 motion-safe:animate-check-circle"
            />
            <path
                d="M15 26.5 L22.5 34 L37 19.5"
                fill="none"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="32 32"
                className="stroke-primary motion-safe:animate-check-draw"
            />
        </svg>
    );
}

export function DemoRequestForm() {
    const [values, setValues] = useState<Values>(EMPTY);
    const [errors, setErrors] = useState<Errors>({});
    const [submittedName, setSubmittedName] = useState<string | null>(null);

    const formRef = useRef<HTMLFormElement>(null);
    const successRef = useRef<HTMLDivElement>(null);

    // Land the reader on the confirmation rather than wherever the form was.
    useEffect(() => {
        if (submittedName !== null) successRef.current?.focus();
    }, [submittedName]);

    const setField = <K extends keyof Values>(field: K, value: Values[K]) => {
        setValues((current) => ({ ...current, [field]: value }));
        // Clear the error as soon as the visitor starts fixing the field.
        setErrors((current) =>
            current[field] ? { ...current, [field]: undefined } : current,
        );
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const nextErrors = validate(values);
        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            const firstInvalid = Object.keys(nextErrors)[0];
            formRef.current
                ?.querySelector<HTMLElement>(`#demo-${firstInvalid}`)
                ?.focus();
            return;
        }

        // No fetch, no storage. The submitted values are dropped on purpose.
        setSubmittedName(values.name.trim().split(/\s+/)[0]);
        setValues(EMPTY);
        setErrors({});
    };

    if (submittedName !== null) {
        return (
            <div
                ref={successRef}
                tabIndex={-1}
                role="status"
                className="flex flex-col items-center rounded-xl border border-border bg-card px-6 py-14 text-center shadow-sm outline-none"
            >
                <SuccessMark />
                <h3 className="mt-6 font-heading text-2xl font-bold tracking-tight text-foreground">
                    Thanks: our team will reach out within 1 business day
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                    We have your details, {submittedName}. Expect a short email first,
                    not a sales call.
                </p>
                <button
                    type="button"
                    onClick={() => setSubmittedName(null)}
                    className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-primary
                    transition-colors duration-200 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                    Submit another request
                </button>
            </div>
        );
    }

    return (
        <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8"
        >
            <div className="grid gap-5 sm:grid-cols-2">
                <Field id="demo-name" label="Full name" required error={errors.name}>
                    {(control) => (
                        <input
                            {...control}
                            type="text"
                            name="name"
                            autoComplete="name"
                            placeholder="Jane Doe"
                            value={values.name}
                            onChange={(event) => setField("name", event.target.value)}
                        />
                    )}
                </Field>

                <Field id="demo-email" label="Work email" required error={errors.email}>
                    {(control) => (
                        <input
                            {...control}
                            type="email"
                            name="email"
                            autoComplete="email"
                            placeholder="jane@company.com"
                            value={values.email}
                            onChange={(event) => setField("email", event.target.value)}
                        />
                    )}
                </Field>

                <Field
                    id="demo-company"
                    label="Company name"
                    required
                    error={errors.company}
                >
                    {(control) => (
                        <input
                            {...control}
                            type="text"
                            name="company"
                            autoComplete="organization"
                            placeholder="Company Ltd"
                            value={values.company}
                            onChange={(event) => setField("company", event.target.value)}
                        />
                    )}
                </Field>

                <Field id="demo-size" label="Company size">
                    {(control) => (
                        <select
                            {...control}
                            name="size"
                            value={values.size}
                            onChange={(event) =>
                                setField("size", event.target.value as CompanySize)
                            }
                        >
                            {COMPANY_SIZES.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    )}
                </Field>

                <Field id="demo-useCase" label="Use case" className="sm:col-span-2">
                    {(control) => (
                        <select
                            {...control}
                            name="useCase"
                            value={values.useCase}
                            onChange={(event) =>
                                setField("useCase", event.target.value as UseCase)
                            }
                        >
                            {USE_CASES.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    )}
                </Field>

                <Field
                    id="demo-message"
                    label="Message"
                    className="sm:col-span-2"
                    hint="Optional. Anything about your setup we should know before we reply."
                >
                    {(control) => (
                        <textarea
                            {...control}
                            name="message"
                            rows={4}
                            placeholder="Two sites, a mesh system and far too many smart plugs."
                            value={values.message}
                            onChange={(event) => setField("message", event.target.value)}
                            className={`${control.className} resize-y`}
                        />
                    )}
                </Field>
            </div>

            <Button
                type="submit"
                size="lg"
                className="mt-7 w-full px-8 text-base font-semibold sm:w-auto"
            >
                Request a Demo
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>

            <p className="mt-4 text-xs leading-relaxed text-subtle">
                Front-end mock: this form does not send or store anything yet. Wire it
                to a real endpoint before collecting live requests.
            </p>
        </form>
    );
}
