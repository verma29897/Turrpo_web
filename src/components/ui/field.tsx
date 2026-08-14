import * as React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Labelled form control with inline validation messaging.
 *
 * The field owns the wiring that is easy to get wrong: the label's `htmlFor`,
 * `aria-invalid`, and `aria-describedby` pointing at whichever of the hint /
 * error is currently rendered.
 */

const CONTROL_CLASSES =
    "w-full rounded-lg border bg-card px-4 py-3 text-sm text-foreground placeholder:text-subtle transition-colors duration-200 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-60";

export interface FieldProps {
    id: string;
    label: string;
    error?: string;
    hint?: string;
    required?: boolean;
    className?: string;
    children: (controlProps: {
        id: string;
        "aria-invalid": boolean;
        "aria-describedby": string | undefined;
        className: string;
    }) => React.ReactNode;
}

export function Field({
    id,
    label,
    error,
    hint,
    required = false,
    className,
    children,
}: FieldProps) {
    const errorId = `${id}-error`;
    const hintId = `${id}-hint`;
    const describedBy = error ? errorId : hint ? hintId : undefined;

    return (
        <div className={cn("flex flex-col gap-2", className)}>
            <label htmlFor={id} className="text-sm font-medium text-foreground">
                {label}
                {required && (
                    <span className="ml-1 text-primary" aria-hidden="true">
                        *
                    </span>
                )}
                {required && <span className="sr-only"> (required)</span>}
            </label>

            {children({
                id,
                "aria-invalid": Boolean(error),
                "aria-describedby": describedBy,
                className: cn(
                    CONTROL_CLASSES,
                    error
                        ? "border-danger focus-visible:border-danger"
                        : "border-border hover:border-primary/50 focus-visible:border-sky-500",
                ),
            })}

            {error ? (
                <p
                    id={errorId}
                    className="flex items-center gap-1.5 text-sm text-danger"
                >
                    <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {error}
                </p>
            ) : hint ? (
                <p id={hintId} className="text-sm text-subtle">
                    {hint}
                </p>
            ) : null}
        </div>
    );
}
