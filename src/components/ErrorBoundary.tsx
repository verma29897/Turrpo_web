import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/constants/site";

type Props = { children: ReactNode };
type State = { error: Error | null };

/**
 * Catches render-time crashes so a broken page shows a recoverable error state
 * instead of a blank white screen.
 */
export class ErrorBoundary extends Component<Props, State> {
    state: State = { error: null };

    static getDerivedStateFromError(error: Error): State {
        return { error };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        // Surfaced in the browser console for debugging; swap for a real
        // error-reporting service when one is available.
        console.error("Unhandled UI error:", error, info.componentStack);
    }

    handleRetry = () => {
        this.setState({ error: null });
    };

    render() {
        const { error } = this.state;
        if (!error) return this.props.children;

        return (
            <main className="flex min-h-[60vh] items-center justify-center bg-background px-4 py-20">
                <div className="w-full max-w-lg rounded-xl border border-border bg-card p-8 text-center shadow-sm">
                    <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-danger/10">
                        <AlertTriangle
                            className="h-6 w-6 text-danger"
                            aria-hidden="true"
                        />
                    </span>
                    <h1 className="mb-3 text-2xl font-bold tracking-tight text-foreground">
                        Something went wrong
                    </h1>
                    <p className="mb-2 text-sm leading-relaxed text-muted-foreground">
                        This page failed to load. Trying again usually fixes it.
                        If it keeps happening, let us know at{" "}
                        <a
                            href={`mailto:${SITE.email}`}
                            className="rounded font-semibold text-primary transition-colors duration-200 hover:text-primary/80
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            {SITE.email}
                        </a>
                        .
                    </p>
                    <p className="mb-6 font-mono text-xs text-subtle break-words">
                        {error.message}
                    </p>
                    <Button
                        onClick={this.handleRetry}
                        className="cursor-pointer font-semibold transition-colors duration-200"
                    >
                        <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
                        Try again
                    </Button>
                </div>
            </main>
        );
    }
}
