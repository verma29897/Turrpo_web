import { cn } from "@/lib/utils";

export type Stat = { value: string; label: string };

/**
 * Metric row used on Home, Services and About. Rendered as a description list
 * so screen readers pair each figure with its label.
 */
export function StatGrid({
    stats,
    tone = "white",
    className,
}: {
    stats: readonly Stat[];
    tone?: "white" | "accent";
    className?: string;
}) {
    return (
        <dl
            className={cn(
                "grid grid-cols-2 md:grid-cols-4 gap-8",
                className,
            )}
        >
            {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd
                        className={cn(
                            "font-heading text-4xl md:text-5xl font-bold",
                            tone === "accent" ? "text-primary" : "text-foreground",
                        )}
                    >
                        {stat.value}
                    </dd>
                    <p className="mt-2 text-sm md:text-base text-muted-foreground">
                        {stat.label}
                    </p>
                </div>
            ))}
        </dl>
    );
}
