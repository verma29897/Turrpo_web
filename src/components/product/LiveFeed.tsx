import { useCallback, useEffect, useRef, useState } from "react";
import { Activity, Pause, Play, ShieldBan, Waypoints } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
    FEED_SEED,
    PRODUCT,
    FEED_CYCLE,
    SCENARIOS,
    type FeedAction,
    type ScenarioKey,
} from "@/constants/product";
import { cn } from "@/lib/utils";

/**
 * Simulated inspection dashboard.
 *
 * Everything on screen is generated in the browser from the scripted cycle in
 * constants/product.ts. No packets are captured and nothing is fetched. The
 * panel says so in its own chrome and again underneath, because a dark feed of
 * IP addresses and verdicts is exactly the sort of thing a visitor would
 * otherwise assume is real.
 *
 * The loop stops whenever the panel is off screen or the visitor pauses it, so
 * it is not burning timers behind the rest of the page.
 */

/**
 * Rows kept in the feed. Matches FEED_CYCLE.length so the seed is exactly one
 * full pass (all four verdicts are on screen before anything animates) and
 * so the panel is full from the start and never changes height.
 */
const MAX_ROWS = FEED_CYCLE.length;

/** How often the packet counter ticks up, independent of the event cycle. */
const COUNTER_INTERVAL_MS = 220;

type Counters = {
    packetsInspected: number;
    threatsBlocked: number;
    activeConnections: number;
};

type PacketEvent = {
    id: number;
    time: string;
    src: string;
    port: number;
    protocol: string;
    threat: string;
    action: FeedAction;
    label: string;
    detail: string;
};

const ACTION_STYLES: Record<FeedAction, { badge: string; rule: string }> = {
    ALLOWED: {
        badge: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
        rule: "bg-emerald-400/70",
    },
    FLAGGED: {
        badge: "border-amber-500/40 bg-amber-500/10 text-amber-300",
        rule: "bg-amber-400/80",
    },
    DROPPED: {
        badge: "border-red-500/50 bg-red-500/15 text-red-300",
        rule: "bg-red-400/90",
    },
};

/** 24-hour HH:MM:SS, independent of the visitor's locale format. */
function clockTime(at: number): string {
    return new Date(at).toTimeString().slice(0, 8);
}

function randomBetween(min: number, max: number): number {
    return min + Math.floor(Math.random() * (max - min + 1));
}

/**
 * Playback position. `variants` counts occurrences *per scenario* rather than
 * per cycle step: "allowed" comes round five times in one pass of FEED_CYCLE,
 * and without its own counter all five rows would be the identical packet.
 */
type Cursor = { step: number; nextId: number; variants: Partial<Record<ScenarioKey, number>> };

function nextEvent(cursor: Cursor, at: number): PacketEvent {
    const key = FEED_CYCLE[cursor.step % FEED_CYCLE.length];
    cursor.step += 1;

    const seen = cursor.variants[key] ?? 0;
    cursor.variants[key] = seen + 1;

    const scenario = SCENARIOS[key];
    const variant = scenario.variants[seen % scenario.variants.length];

    return {
        id: cursor.nextId++,
        time: clockTime(at),
        src: variant.src,
        port: variant.port,
        protocol: variant.protocol,
        threat: scenario.threat,
        action: scenario.action,
        label: scenario.label,
        detail: variant.detail,
    };
}

/** A full feed of back-dated rows, newest first, so the panel opens populated. */
function createSeed(): { cursor: Cursor; rows: PacketEvent[] } {
    const cursor: Cursor = { step: 0, nextId: 0, variants: {} };
    const now = Date.now();
    const rows: PacketEvent[] = [];
    for (let i = 0; i < MAX_ROWS; i += 1) {
        rows.push(nextEvent(cursor, now - (MAX_ROWS - i) * 2400));
    }
    return { cursor, rows: rows.reverse() };
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                      */
/* ------------------------------------------------------------------ */

function Counter({
    icon: Icon,
    label,
    value,
    tone,
}: {
    icon: LucideIcon;
    label: string;
    value: number;
    tone: string;
}) {
    return (
        <div className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-2.5 sm:px-4 sm:py-3">
            <dt className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-slate-500 sm:text-[11px]">
                <Icon className="h-3 w-3 shrink-0" aria-hidden="true" />
                <span className="truncate">{label}</span>
            </dt>
            <dd
                className={cn(
                    "mt-1.5 font-mono text-base font-bold tabular-nums sm:text-2xl",
                    tone,
                )}
            >
                {value.toLocaleString("en-US")}
            </dd>
        </div>
    );
}

function FeedRow({ event, isNewest }: { event: PacketEvent; isNewest: boolean }) {
    const style = ACTION_STYLES[event.action];
    return (
        <li
            className={cn(
                "relative border-b border-white/5 py-2.5 pl-4 pr-3 last:border-b-0 sm:pl-5 sm:pr-4",
                isNewest && "motion-safe:animate-feed-in",
            )}
        >
            <span
                aria-hidden="true"
                className={cn("absolute inset-y-2 left-0 w-0.5 rounded-full", style.rule)}
            />

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <time className="font-mono text-[11px] tabular-nums text-slate-500">
                    {event.time}
                </time>
                <span className="font-mono text-[11px] text-slate-300 sm:text-xs">
                    <span className="text-slate-500">src</span> {event.src}
                    <span className="text-slate-600"> → </span>
                    <span className="text-slate-500">dst</span> :{event.port}
                </span>
                <span className="rounded border border-white/10 px-1.5 py-px font-mono text-[10px] text-slate-400">
                    {event.protocol}
                </span>
                <span
                    className={cn(
                        "ml-auto rounded border px-2 py-0.5 font-mono text-[10px] font-bold tracking-wide sm:text-[11px]",
                        style.badge,
                    )}
                >
                    {event.label}
                </span>
            </div>

            <p className="mt-1 text-[11px] leading-snug text-slate-500 sm:text-xs">
                {event.detail}
            </p>
        </li>
    );
}

/* ------------------------------------------------------------------ */
/* Panel                                                               */
/* ------------------------------------------------------------------ */

export function LiveFeed({ className }: { className?: string }) {
    /*
     * Seeded once per mount and held in a ref: StrictMode runs the useState
     * initialiser twice in development, and the cursor must not advance twice
     * for a feed that is only rendered once.
     */
    const seedRef = useRef<{ cursor: Cursor; rows: PacketEvent[] } | null>(null);
    if (seedRef.current === null) seedRef.current = createSeed();
    const cursor = seedRef.current.cursor;

    const [events, setEvents] = useState<PacketEvent[]>(seedRef.current.rows);
    const [counters, setCounters] = useState<Counters>({ ...FEED_SEED });
    const [paused, setPaused] = useState(false);
    const [onScreen, setOnScreen] = useState(false);

    const panelRef = useRef<HTMLDivElement | null>(null);

    const running = onScreen && !paused;

    /* Timers only run while the panel is actually in view. */
    useEffect(() => {
        const node = panelRef.current;
        if (!node) return;
        const observer = new IntersectionObserver(
            ([entry]) => setOnScreen(entry.isIntersecting),
            { threshold: 0.15 },
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const pushEvent = useCallback(() => {
        const event = nextEvent(cursor, Date.now());

        setEvents((current) => [event, ...current].slice(0, MAX_ROWS));
        setCounters((current) => ({
            ...current,
            threatsBlocked:
                current.threatsBlocked + (event.action === "DROPPED" ? 1 : 0),
            // Drifts around the seed value rather than climbing forever.
            activeConnections: Math.min(
                268,
                Math.max(164, current.activeConnections + randomBetween(-9, 9)),
            ),
        }));
    }, [cursor]);

    /*
     * Self-rescheduling timeout rather than an interval: the gap rotates
     * through 2.0 / 2.4 / 2.8s so the feed lands inside the 2 to 3s window
     * without ticking like a metronome.
     */
    useEffect(() => {
        if (!running) return;
        let timer: ReturnType<typeof setTimeout>;
        const schedule = () => {
            timer = setTimeout(
                () => {
                    pushEvent();
                    schedule();
                },
                2000 + (cursor.step % 3) * 400,
            );
        };
        schedule();
        return () => clearTimeout(timer);
    }, [running, pushEvent, cursor]);

    /* Packets are counted continuously, not once per logged event. */
    useEffect(() => {
        if (!running) return;
        const timer = setInterval(() => {
            setCounters((current) => ({
                ...current,
                packetsInspected: current.packetsInspected + randomBetween(180, 440),
            }));
        }, COUNTER_INTERVAL_MS);
        return () => clearInterval(timer);
    }, [running]);

    return (
        <div
            ref={panelRef}
            className={cn(
                // Deliberately a step lighter than the section behind it, so the
                // panel reads as a raised screen rather than a hole in the page.
                "overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 shadow-2xl shadow-sky-950/40 backdrop-blur",
                className,
            )}
        >
            {/* Title bar */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-white/10 bg-white/[0.03] px-3 py-2.5 sm:px-4">
                <span aria-hidden="true" className="hidden gap-1.5 sm:flex">
                    <i className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                    <i className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
                    <i className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
                </span>

                <p className="font-mono text-[11px] text-slate-400 sm:text-xs">
                    {PRODUCT.hostname}
                    <span className="text-slate-600">/</span>
                    live-feed
                </p>

                <span className="ml-auto flex items-center gap-2">
                    <span className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-amber-300">
                        Simulated
                    </span>
                    <button
                        type="button"
                        onClick={() => setPaused((value) => !value)}
                        aria-pressed={paused}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 py-1
                        font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-300 transition-colors duration-200
                        hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                    >
                        {paused ? (
                            <Play className="h-3 w-3" aria-hidden="true" />
                        ) : (
                            <Pause className="h-3 w-3" aria-hidden="true" />
                        )}
                        {paused ? "Resume" : "Pause"}
                    </button>
                </span>
            </div>

            {/* Counters */}
            <dl className="grid grid-cols-3 gap-2 border-b border-white/10 p-3 sm:gap-3 sm:p-4">
                <Counter
                    icon={Activity}
                    label="Packets Inspected"
                    value={counters.packetsInspected}
                    tone="text-sky-300"
                />
                <Counter
                    icon={ShieldBan}
                    label="Threats Blocked"
                    value={counters.threatsBlocked}
                    tone="text-red-300"
                />
                <Counter
                    icon={Waypoints}
                    label="Active Connections"
                    value={counters.activeConnections}
                    tone="text-slate-200"
                />
            </dl>

            {/* Feed */}
            <p className="sr-only">
                A scripted sample of inspection results. The list updates on its own
                every few seconds and does not describe real network traffic.
            </p>
            <ol
                aria-label="Simulated packet inspection log"
                className="divide-y divide-white/5"
            >
                {events.map((event, index) => (
                    <FeedRow key={event.id} event={event} isNewest={index === 0} />
                ))}
            </ol>

            {/* Status strip */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/10 bg-white/[0.02] px-3 py-2.5 font-mono text-[10px] text-slate-500 sm:px-4 sm:text-[11px]">
                <span className="flex items-center gap-1.5">
                    <i
                        aria-hidden="true"
                        className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            running
                                ? "bg-emerald-400 motion-safe:animate-pulse"
                                : "bg-slate-600",
                        )}
                    />
                    {running ? "streaming" : "paused"}
                </span>
                <span>iface: wan0 → lan0</span>
                <span>mode: inline bridge</span>
                <span className="hidden sm:inline">policy: auto-block</span>
            </div>
        </div>
    );
}
