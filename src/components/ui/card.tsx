import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Surface used for every tile on the site. `interactive` adds the hover +
 * focus treatment; combine with `asChild` to render the card as a router Link
 * so the whole tile is one keyboard-reachable target.
 *
 *   <Card asChild interactive><Link to="/services">…</Link></Card>
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    asChild?: boolean;
    /**
     * The whole card is a click target (pair with `asChild` + a Link).
     * Adds cursor-pointer and a focus ring. Do not use on cards that are not
     * themselves clickable, or the pointer advertises an action that isn't there.
     */
    interactive?: boolean;
    /** Hover lift only, for cards that merely contain a link. */
    hover?: boolean;
    padding?: "sm" | "default" | "lg";
}

const HOVER_CLASSES =
    "transition-all duration-200 hover:shadow-md hover:border-sky-500/60";

const PADDINGS = {
    sm: "p-5",
    default: "p-6",
    lg: "p-8 md:p-10",
} as const;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    (
        {
            asChild = false,
            interactive = false,
            hover = false,
            padding = "default",
            className,
            ...props
        },
        ref,
    ) => {
        const Comp = asChild ? Slot : "div";
        return (
            <Comp
                ref={ref}
                className={cn(
                    "rounded-xl border border-border bg-card shadow-sm",
                    PADDINGS[padding],
                    (hover || interactive) && HOVER_CLASSES,
                    interactive &&
                        "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    className,
                )}
                {...props}
            />
        );
    },
);
Card.displayName = "Card";

/** The tinted rounded tile that holds a Lucide glyph at the top of a card. */
export function CardIcon({
    icon: Icon,
    size = "default",
    className,
}: {
    icon: LucideIcon;
    size?: "sm" | "default";
    className?: string;
}) {
    const box = size === "sm" ? "h-10 w-10" : "h-11 w-11";
    const glyph = size === "sm" ? "h-4 w-4" : "h-5 w-5";
    return (
        <span
            className={cn(
                "inline-flex shrink-0 items-center justify-center rounded-lg bg-sky-500/10",
                box,
                className,
            )}
        >
            <Icon className={cn("text-primary", glyph)} aria-hidden="true" />
        </span>
    );
}

export function CardTitle({
    as: Heading = "h3",
    className,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { as?: "h2" | "h3" | "h4" }) {
    return (
        <Heading
            className={cn("text-lg font-semibold text-foreground", className)}
            {...props}
        />
    );
}

export function CardDescription({
    className,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p
            className={cn("text-sm text-muted-foreground leading-relaxed", className)}
            {...props}
        />
    );
}
