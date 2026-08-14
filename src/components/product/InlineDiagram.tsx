import type { ReactNode } from "react";
import { Router, ShieldBan, ShieldCheck, Wifi } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PRODUCT } from "@/constants/product";
import { cn } from "@/lib/utils";

/**
 * Hero diagram: modem → appliance → router, with packets flowing along the
 * links and a "threat blocked" badge that lights up on a loop.
 *
 * Stays horizontal at every width. The nodes shrink instead of stacking, so
 * the in-line position (the whole point of the product) reads the same on a
 * phone as on a desktop. Everything that moves is decoration and is applied
 * through `motion-safe:`; with animation suppressed the diagram is a static
 * three-node chain and loses no meaning.
 */

const NODE_BOX =
    "relative grid place-items-center rounded-xl border h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16";

/** Keeps the connector line level with the middle of the node icons. */
const LINK_OFFSET = "mt-6 sm:mt-7 md:mt-8";

function Node({
    icon: Icon,
    label,
    sublabel,
    highlight = false,
    children,
}: {
    icon: LucideIcon;
    label: string;
    sublabel?: string;
    highlight?: boolean;
    children?: ReactNode;
}) {
    return (
        <div className="relative flex w-16 shrink-0 flex-col items-center gap-2 text-center sm:w-20 md:w-28">
            {children}
            <div
                className={cn(
                    NODE_BOX,
                    highlight
                        ? "border-sky-400/60 bg-sky-500/15 shadow-[0_0_36px_-8px_rgba(56,189,248,0.85)]"
                        : "border-white/10 bg-white/5",
                )}
            >
                {highlight && (
                    <span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-xl border border-sky-400/70 motion-safe:animate-node-pulse"
                    />
                )}
                <Icon
                    className={cn(
                        "h-5 w-5 md:h-7 md:w-7",
                        highlight ? "text-sky-300" : "text-slate-300",
                    )}
                    aria-hidden="true"
                />
            </div>
            <p
                className={cn(
                    "text-[11px] font-semibold leading-tight md:text-sm",
                    highlight ? "text-sky-200" : "text-slate-300",
                )}
            >
                {label}
            </p>
            {sublabel && (
                <p className="hidden text-xs leading-tight text-slate-500 md:block">
                    {sublabel}
                </p>
            )}
        </div>
    );
}

/** One hop of the chain: a hairline with two packet dots travelling along it. */
function Hop({ label }: { label: string }) {
    return (
        <div
            className={cn(
                "relative h-px min-w-6 flex-1 self-start bg-gradient-to-r from-sky-500/10 via-sky-400/50 to-sky-500/10",
                LINK_OFFSET,
            )}
        >
            <span
                aria-hidden="true"
                className="absolute -top-5 left-1/2 hidden -translate-x-1/2 text-[10px] font-medium uppercase tracking-widest text-slate-600 md:block"
            >
                {label}
            </span>
            {[0, 1.3].map((delay) => (
                <span
                    key={delay}
                    aria-hidden="true"
                    className="absolute top-1/2 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-sky-200 opacity-0
                    shadow-[0_0_8px_2px_rgba(56,189,248,0.7)] motion-safe:animate-packet-flow"
                    style={{ animationDelay: `${delay}s` }}
                />
            ))}
        </div>
    );
}

export function InlineDiagram({ className }: { className?: string }) {
    return (
        <figure
            className={cn(
                "relative rounded-2xl border border-white/10 bg-slate-900/60 p-4 pt-12 backdrop-blur sm:p-6 sm:pt-12",
                className,
            )}
        >
            <p className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 sm:left-6">
                Inline · transparent bridge
            </p>

            <div className="flex items-start justify-between gap-1 sm:gap-2">
                <Node icon={Wifi} label="Modem" sublabel="ISP uplink" />
                <Hop label="wan" />
                <Node
                    icon={ShieldCheck}
                    label={PRODUCT.shortName}
                    sublabel="inspects here"
                    highlight
                >
                    <span
                        className="absolute -top-8 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1 whitespace-nowrap
                        rounded-full border border-red-500/40 bg-red-500/15 px-2 py-1 text-[10px] font-semibold text-red-200
                        opacity-0 sm:px-2.5 sm:text-xs motion-safe:animate-threat-pop"
                    >
                        <ShieldBan className="h-3 w-3" aria-hidden="true" />
                        Threat blocked
                    </span>
                </Node>
                <Hop label="lan" />
                <Node icon={Router} label="Router" sublabel="your devices" />
            </div>

            <figcaption className="mt-5 border-t border-white/5 pt-4 text-center text-xs leading-relaxed text-slate-500">
                No IP address, no port forwarding, no router settings to change.
                Traffic simply passes through the box on its way in and out.
            </figcaption>
        </figure>
    );
}
