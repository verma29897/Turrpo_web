import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * The eyebrow / title / description stack used at the top of every page and
 * above most section grids.
 */
export interface PageHeaderProps {
    /** Small uppercase kicker above the title. */
    eyebrow?: string;
    title: React.ReactNode;
    description?: React.ReactNode;
    /** Heading level: `h1` once per page, `h2` for section headings. */
    as?: "h1" | "h2";
    align?: "center" | "left";
    /** Buttons or links rendered under the description. */
    actions?: React.ReactNode;
    className?: string;
}

export function PageHeader({
    eyebrow,
    title,
    description,
    as: Heading = "h2",
    align = "center",
    actions,
    className,
}: PageHeaderProps) {
    const centered = align === "center";
    return (
        <div
            className={cn(
                centered && "text-center mx-auto",
                Heading === "h1" ? "max-w-3xl" : "max-w-2xl",
                centered ? "mx-auto" : "",
                className,
            )}
        >
            {eyebrow && (
                <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
                    {eyebrow}
                </p>
            )}
            <Heading
                className={cn(
                    "font-bold text-foreground tracking-tight",
                    Heading === "h1"
                        ? "text-4xl md:text-5xl mb-6"
                        : "text-3xl md:text-4xl mb-4",
                )}
            >
                {title}
            </Heading>
            {description && (
                <p className="text-lg text-muted-foreground leading-relaxed">
                    {description}
                </p>
            )}
            {actions && (
                <div
                    className={cn(
                        "mt-8 flex flex-wrap items-center gap-4",
                        centered && "justify-center",
                    )}
                >
                    {actions}
                </div>
            )}
        </div>
    );
}
