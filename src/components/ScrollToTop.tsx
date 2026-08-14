import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router keeps the scroll position across client-side navigations, which
 * lands visitors halfway down a page they have never seen.
 *
 * Without a hash, reset to the top. With one (`/product#live` from the footer),
 * scroll to that section instead. The target may not be mounted on the first
 * frame after a route change, so the lookup is deferred to the next frame and
 * silently gives up if the id genuinely isn't on the page.
 */
export function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        const behavior = reduceMotion ? "auto" : "smooth";

        if (!hash) {
            window.scrollTo({ top: 0, behavior });
            return;
        }

        const frame = requestAnimationFrame(() => {
            const target = document.getElementById(hash.slice(1));
            if (target) target.scrollIntoView({ behavior, block: "start" });
        });
        return () => cancelAnimationFrame(frame);
    }, [pathname, hash]);

    return null;
}
