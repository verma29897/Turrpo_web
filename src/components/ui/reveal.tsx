import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Fades and lifts its children into place the first time they scroll into
 * view, then stops observing.
 *
 * Anyone who has asked for reduced motion is shown the resting state
 * immediately. The check runs before the observer is created, so the content
 * is never left sitting at opacity 0 waiting for a transition that will not
 * play.
 */
export interface RevealProps {
    /** Element to render. Use `li` inside lists so the markup stays valid. */
    as?: ElementType;
    /** Stagger, in ms, applied as a transition delay. */
    delay?: number;
    className?: string;
    children: ReactNode;
}

export function Reveal({ as = "div", delay = 0, className, children }: RevealProps) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [shown, setShown] = useState(false);

    /*
     * `as` is a free-form ElementType, which leaves TS unable to narrow the
     * ref prop. Every tag this is used with is a plain block element, so it is
     * typed as a div here and the DOM node type is the same shape we use.
     */
    const Tag = as as "div";

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setShown(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                setShown(true);
                observer.disconnect();
            },
            // Fire a little before the element is fully on screen, so the
            // transition finishes around the time the reader gets there.
            { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <Tag
            ref={ref}
            style={shown && delay ? { transitionDelay: `${delay}ms` } : undefined}
            className={cn(
                "motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out",
                shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                className,
            )}
        >
            {children}
        </Tag>
    );
}

/**
 * Smooth-scrolls to an in-page section, honouring the reduced-motion setting.
 * Used by the hero buttons instead of a global `scroll-behavior: smooth`,
 * which would also animate the scroll-to-top that runs on every route change.
 */
export function scrollToSection(id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}
