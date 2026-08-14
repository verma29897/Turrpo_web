import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The opening band of every page except the product landing page, which builds
 * its own split hero.
 *
 * Light, in the enterprise-vendor idiom: a white surface over a faint blue
 * wash, a thin cyan rule under the eyebrow, and a grid pattern at low opacity
 * so the band has texture without competing with the headline. The dark
 * elements on this site are reserved for product visuals (the traffic panel,
 * the inline diagram) and the anchor bands (CTA, footer).
 *
 * Two layouts, chosen by whether `aside` is passed:
 *   - no aside: centred column, for pages whose hero is just an introduction
 *   - aside:    two columns on lg, for a hero that carries a diagram or panel
 *
 * The `h1` lives here, so pages must not render another one.
 */
export interface PageHeroProps {
    /** Small uppercase kicker above the title. */
    eyebrow?: string;
    title: ReactNode;
    description?: ReactNode;
    /** Buttons rendered under the description. */
    actions?: ReactNode;
    /** Extra content between description and actions: chips, badges. */
    children?: ReactNode;
    /** Right-hand slot on lg screens. Its presence switches to the split layout. */
    aside?: ReactNode;
    className?: string;
}

export function PageHero({
    eyebrow,
    title,
    description,
    actions,
    children,
    aside,
    className,
}: PageHeroProps) {
    const split = Boolean(aside);

    return (
        <div
            className={cn(
                "relative overflow-hidden border-b border-border bg-card",
                className,
            )}
        >
            {/* Faint blue wash from the top, so the band is not flat white. */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_0%,rgba(13,71,161,0.07),transparent_70%)]"
            />
            {/* 40px grid, barely there. Fades out before it reaches the copy. */}
            <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.55]
                [background-image:linear-gradient(to_right,rgba(13,71,161,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(13,71,161,0.06)_1px,transparent_1px)]
                [background-size:40px_40px]
                [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent_75%)]"
            />

            <div
                className={cn(
                    "relative mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24",
                    split && "grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]",
                )}
            >
                <div className={cn(!split && "mx-auto max-w-3xl text-center")}>
                    {eyebrow && (
                        <p
                            className={cn(
                                "text-sm font-semibold uppercase tracking-wider text-primary",
                                split ? "mb-4" : "mb-4",
                            )}
                        >
                            {eyebrow}
                            <span
                                aria-hidden="true"
                                className={cn(
                                    "mt-3 block h-0.5 w-12 rounded-full bg-cyan",
                                    !split && "mx-auto",
                                )}
                            />
                        </p>
                    )}

                    <h1 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl">
                        {title}
                    </h1>

                    {description && (
                        <p
                            className={cn(
                                "mt-6 text-lg leading-relaxed text-muted-foreground",
                                split ? "max-w-xl" : "mx-auto max-w-2xl",
                            )}
                        >
                            {description}
                        </p>
                    )}

                    {children}

                    {actions && (
                        <div
                            className={cn(
                                "mt-9 flex flex-wrap items-center gap-4",
                                !split && "justify-center",
                            )}
                        >
                            {actions}
                        </div>
                    )}
                </div>

                {aside}
            </div>
        </div>
    );
}
