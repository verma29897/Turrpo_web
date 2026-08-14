import { Loader2 } from "lucide-react";

/** Shown while a lazily-loaded route chunk is downloading. */
export function RouteFallback() {
    return (
        <div
            role="status"
            aria-live="polite"
            className="flex min-h-[60vh] flex-col items-center justify-center gap-3 bg-background"
        >
            <Loader2
                className="h-6 w-6 animate-spin text-primary"
                aria-hidden="true"
            />
            <p className="text-sm text-muted-foreground">Loading…</p>
        </div>
    );
}
