import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Page section band. Replaces the `bg-slate-900/50 border-y border-border` +
 * `max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24` class strings that were
 * copy-pasted into every page, so vertical rhythm stays identical site-wide.
 */

type Tone = "base" | "muted" | "deep";
type Border = "none" | "y" | "b" | "t";
type Width = "narrow" | "default" | "wide";
type Padding = "sm" | "default" | "lg";

/**
 * `deep` is a navy band in *both* themes, so it carries the `dark` class to
 * flip the design tokens for its subtree, so token-based children (text-foreground,
 * text-muted-foreground, border-border …) then resolve to their dark values
 * without any page needing to hardcode light-on-dark colours.
 */
const TONES: Record<Tone, string> = {
    base: "bg-background",
    muted: "bg-band-muted",
    deep: "dark bg-band-deep text-foreground",
};

const BORDERS: Record<Border, string> = {
    none: "",
    y: "border-y border-border",
    b: "border-b border-border",
    t: "border-t border-border",
};

const WIDTHS: Record<Width, string> = {
    narrow: "max-w-4xl",
    default: "max-w-6xl",
    wide: "max-w-7xl",
};

const PADDINGS: Record<Padding, string> = {
    sm: "py-12 md:py-16",
    default: "py-16 md:py-20",
    lg: "py-16 md:py-24",
};

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    tone?: Tone;
    border?: Border;
    width?: Width;
    padding?: Padding;
    /** Extra classes for the inner container rather than the outer band. */
    containerClassName?: string;
}

export function Section({
    tone = "base",
    border = "none",
    width = "default",
    padding = "default",
    className,
    containerClassName,
    children,
    ...props
}: SectionProps) {
    return (
        <section className={cn(TONES[tone], BORDERS[border], className)} {...props}>
            <div
                className={cn(
                    "mx-auto px-4 md:px-6",
                    WIDTHS[width],
                    PADDINGS[padding],
                    containerClassName,
                )}
            >
                {children}
            </div>
        </section>
    );
}
