import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/constants/site";

/** Catch-all route. Without it, an unknown URL rendered an empty page. */
const NotFound = () => {
    const { pathname } = useLocation();

    return (
        <main className="flex min-h-[60vh] items-center justify-center bg-background px-4 py-20 text-foreground">
            <div className="w-full max-w-xl text-center">
                <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/10">
                    <Compass className="h-6 w-6 text-primary" aria-hidden="true" />
                </span>
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
                    404: Page not found
                </p>
                <h1 className="mb-4 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                    We couldn&apos;t find that page
                </h1>
                <p className="mb-3 text-lg leading-relaxed text-muted-foreground">
                    The page you were looking for doesn&apos;t exist, or it may
                    have moved.
                </p>
                <p className="mb-10 font-mono text-xs text-subtle break-all">
                    {pathname}
                </p>

                <div className="mb-10 flex flex-wrap items-center justify-center gap-4">
                    <Button
                        asChild
                        size="lg"
                        className="px-8 text-base font-semibold transition-colors duration-200"
                    >
                        <Link to="/">
                            Back to home
                            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                        </Link>
                    </Button>
                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="px-8 text-base font-semibold cursor-pointer transition-colors duration-200"
                    >
                        <Link to="/contact">Contact us</Link>
                    </Button>
                </div>

                <nav aria-label="Site pages">
                    <p className="mb-4 text-sm text-subtle">
                        Or jump to one of these:
                    </p>
                    <ul className="flex flex-wrap justify-center gap-2">
                        {NAV_LINKS.filter((link) => link.to !== "/").map((link) => (
                            <li key={link.to}>
                                <Link
                                    to={link.to}
                                    className="inline-block cursor-pointer rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground
                                    transition-colors duration-200 hover:border-primary/50 hover:text-foreground
                                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </main>
    );
};

export default NotFound;
