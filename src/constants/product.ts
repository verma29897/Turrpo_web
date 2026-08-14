/**
 * Content for the inline IDS/IPS appliance landing page
 * (src/pages/Product.tsx).
 *
 * Every string the page renders lives here so the marketing copy can be
 * rewritten without touching JSX. To brand the product, change `PRODUCT.name`
 * in one place: the hero, the dashboard panel and the signup section all
 * read from it.
 */

import {
    Ban,
    Building2,
    CloudOff,
    House,
    Plug,
    Router,
    ScanLine,
    Settings2,
    ShieldBan,
    Store,
    Tags,
    Timer,
    Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Brand + hero                                                        */
/* ------------------------------------------------------------------ */

export const PRODUCT = {
    name: "Bomis",
    /** Same brand, for the two places too narrow for a long name: the hero
        diagram node and the dashboard title bar. */
    shortName: "Bomis",
    /** What the name stands for. Shown once, under the hero headline. */
    expansion: "Boundary Oriented Malware Inspection System",
    /** Short descriptor shown beside the name in the hero and the panel chrome. */
    kind: "Inline IDS / IPS appliance",
    /** Lowercase slug used for the fake hostname in the dashboard panel. */
    hostname: "bomis",
    headline:
        "Plug-and-play network protection: stop threats before they reach your router",
    subheadline:
        "A small box that sits between your modem and your router, reads every packet as it passes, and drops malicious traffic in-line, before it ever reaches a device on your network.",
    /** Claims restated as chips under the hero copy. */
    highlights: [
        "Under 2 minutes to install",
        "No cloud account",
        "Works with any router",
    ],
} as const;

/* ------------------------------------------------------------------ */
/* Problem / solution                                                  */
/* ------------------------------------------------------------------ */

export const PROBLEM = {
    title: "The problem",
    body: [
        "Your router was built to move traffic, not to judge it. Command-and-control beacons, port sweeps and DNS tunnelling all look like ordinary packets to it, so they pass straight through to the laptops, phones and cameras behind it.",
        "Endpoint antivirus only gets a say once the connection already exists, and it never gets installed on the smart TV, the printer or the IP camera at all.",
    ],
} as const;

export const SOLUTION = {
    title: "The fix",
    body: [
        `${PRODUCT.name} sits in front of the router, in the path every packet has to take. It parses each one as it crosses, scores it against signature and behaviour rules, and drops anything malicious mid-flight.`,
        "Nothing to install on your devices, nothing to configure on your router, and no traffic leaving your premises. Everything that isn't a threat passes through untouched.",
    ],
} as const;

/* ------------------------------------------------------------------ */
/* How it works                                                        */
/* ------------------------------------------------------------------ */

export type Step = {
    step: string;
    icon: LucideIcon;
    title: string;
    description: string;
};

export const STEPS: readonly Step[] = [
    {
        step: "01",
        icon: Plug,
        title: "Plug in",
        description:
            "Pull the ethernet cable out of your router, run it into the box, and run the second cable out to the router. One power adapter. Under two minutes, no tools.",
    },
    {
        step: "02",
        icon: Settings2,
        title: "Auto-configures",
        description:
            "It comes up as a transparent bridge, learns your subnet and starts passing traffic on its own. No IP to assign, no port forwarding, no router settings to change.",
    },
    {
        step: "03",
        icon: ScanLine,
        title: "Inspects every packet",
        description:
            "Traffic is parsed in both directions at line rate and scored against signature rules and connection behaviour, not just a blocklist of addresses.",
    },
    {
        step: "04",
        icon: ShieldBan,
        title: "Blocks & logs threats",
        description:
            "Malicious flows are dropped in-line and written to the local log with the reason they were dropped. Clean traffic never notices the box is there.",
    },
];

/* ------------------------------------------------------------------ */
/* Features                                                            */
/* ------------------------------------------------------------------ */

export type Feature = {
    icon: LucideIcon;
    title: string;
    description: string;
};

export const FEATURES: readonly Feature[] = [
    {
        icon: Zap,
        title: "Real-time inspection",
        description:
            "Deep packet inspection in both directions at line rate. Traffic is judged as it crosses the wire, not sampled after the fact from a mirror port.",
    },
    {
        icon: Tags,
        title: "Threat classification",
        description:
            "Every flagged flow is labelled with what it actually is (port scan, C2 beacon, DNS tunnelling, exploit attempt) instead of a generic 'suspicious activity' line.",
    },
    {
        icon: Ban,
        title: "Auto-block",
        description:
            "Confirmed threats are dropped in-line by default. There is no alert waiting for someone to read it and no button anyone has to press at 2 a.m.",
    },
    {
        icon: CloudOff,
        title: "Local dashboard, no cloud",
        description:
            "The dashboard is served from the box itself over your own LAN. Your traffic logs stay on the device. There is no account to create and nothing to upload.",
    },
    {
        icon: Timer,
        title: "One-time setup",
        description:
            "Detection rules refresh themselves in the background. After the first two minutes there is no settings page you are expected to open again.",
    },
    {
        icon: Router,
        title: "Works with any router",
        description:
            "A vendor-agnostic transparent bridge: ISP-supplied box, mesh system or enterprise gateway. If it speaks ethernet, the device sits in front of it.",
    },
];

/* ------------------------------------------------------------------ */
/* Trust signals                                                       */
/* ------------------------------------------------------------------ */

/**
 * Headline figures for the stats strip.
 *
 * These are illustrative, not measured: the product has not shipped, so there
 * is no fleet to measure. The page prints that caveat under the strip. Do not
 * quietly drop the caveat when the numbers become real, replace it.
 */
export const STATS = [
    { value: "10M+", label: "Packets inspected daily" },
    { value: "99.9%", label: "Threat detection accuracy" },
    { value: "<1ms", label: "Latency added" },
    { value: "Zero", label: "Cloud dependency" },
] as const;

/** Customer logo slots for the trust bar. Replace with real marks or cut. */
export const TRUST_LOGOS = [
    "Logo One",
    "Logo Two",
    "Logo Three",
    "Logo Four",
    "Logo Five",
] as const;

/**
 * Compliance badges. Placeholders: none of these have been audited or awarded.
 * The page marks them as such, which matters more here than anywhere else on
 * the site, because an unearned SOC 2 or ISO badge is a claim a buyer will act
 * on. Remove them or earn them before launch.
 */
export const CERTIFICATIONS = ["SOC 2 Type II", "ISO 27001", "GDPR ready"] as const;

/* ------------------------------------------------------------------ */
/* Solutions by segment                                                */
/* ------------------------------------------------------------------ */

export type Segment = {
    icon: LucideIcon;
    title: string;
    description: string;
    points: readonly string[];
};

export const SEGMENTS: readonly Segment[] = [
    {
        icon: House,
        title: "For Home Networks",
        description:
            "One box between the modem and the router covers every device in the house, including the ones you cannot install software on.",
        points: [
            "Covers smart TVs, cameras and consoles",
            "No per-device agent to install",
            "Set up once, then leave it alone",
        ],
    },
    {
        icon: Store,
        title: "For Small Business",
        description:
            "Perimeter inspection without a firewall appliance, a support contract or somebody on staff to tune rules.",
        points: [
            "Blocks C2 traffic before it establishes",
            "Local log for incident write-ups",
            "No monthly per-seat licence",
        ],
    },
    {
        icon: Building2,
        title: "For Enterprise",
        description:
            "Branch and remote-site coverage where shipping a full firewall stack to every location is not worth the cost.",
        points: [
            "Consistent policy across every branch",
            "Fits behind existing SD-WAN kit",
            "Central rollout, per-site quoting",
        ],
    },
];

/* ------------------------------------------------------------------ */
/* Comparison                                                          */
/* ------------------------------------------------------------------ */

/** `true` = yes, `false` = no, string = a qualified answer. */
export type Cell = boolean | string;

export type ComparisonRow = {
    capability: string;
    product: Cell;
    firewall: Cell;
    nothing: Cell;
};

export const COMPARISON_COLUMNS = [
    PRODUCT.name,
    "Traditional firewall",
    "No protection",
] as const;

export const COMPARISON: readonly ComparisonRow[] = [
    {
        capability: "Real-time packet inspection",
        product: true,
        firewall: true,
        nothing: false,
    },
    {
        capability: "Automatic blocking, no analyst",
        product: true,
        firewall: "Rules only",
        nothing: false,
    },
    {
        capability: "Local dashboard, no cloud account",
        product: true,
        firewall: "Usually cloud",
        nothing: false,
    },
    {
        capability: "Works with any router",
        product: true,
        firewall: "Replaces it",
        nothing: "n/a",
    },
    { capability: "Setup time", product: "2 minutes", firewall: "Days", nothing: "None" },
    {
        capability: "Cost",
        product: "One-time",
        firewall: "Licence + support",
        nothing: "Free until it isn't",
    },
];

/* ------------------------------------------------------------------ */
/* Specs                                                               */
/* ------------------------------------------------------------------ */

export type Spec = { label: string; value: string };

/** Placeholder hardware figures. The page states this next to the table. */
export const SPECS: readonly Spec[] = [
    { label: "CPU", value: "Quad-core ARM Cortex-A55 @ 1.8 GHz" },
    { label: "Memory", value: "2 GB LPDDR4" },
    { label: "Storage", value: "16 GB eMMC, rolling local logs" },
    { label: "Ports", value: "2x RJ45 Gigabit (WAN in / LAN out)" },
    { label: "Throughput", value: "Up to 1 Gbps inspected" },
    { label: "Latency added", value: "Under 1 ms typical" },
    { label: "Power draw", value: "Under 7 W typical, 12 W peak" },
    { label: "Dimensions", value: "112 x 78 x 26 mm, fanless" },
];

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

/**
 * SAMPLE COPY. Nobody said any of this. These are layout placeholders and the
 * page labels them as such on every card. Swap in real, attributed quotes with
 * permission, or delete the section. Shipping invented quotes as if they were
 * customers is the one thing on this page that would actually be dishonest.
 */
export const TESTIMONIALS = [
    {
        quote: "Placeholder quote. Describe the problem the customer had before, in their words, and what changed after.",
        name: "Name Placeholder",
        role: "Role, Company Placeholder",
    },
    {
        quote: "Placeholder quote. A specific number works better here than an adjective: hours saved, incidents caught, cost avoided.",
        name: "Name Placeholder",
        role: "Role, Company Placeholder",
    },
    {
        quote: "Placeholder quote. Keep it to two sentences, and keep the customer's own phrasing rather than marketing language.",
        name: "Name Placeholder",
        role: "Role, Company Placeholder",
    },
] as const;

/* ------------------------------------------------------------------ */
/* Pricing                                                             */
/* ------------------------------------------------------------------ */

/**
 * Placeholder figure. The page says so beside the number. Replace before the
 * page goes anywhere near a buyer.
 */
export const PRICING = {
    amount: "$299",
    unit: "one-time",
    includes: [
        "The appliance, both cables and the power adapter",
        "Local dashboard, no subscription to watch your own traffic",
        "Detection-rule updates for the first year",
        "Thirty days to send it back if it doesn't suit your setup",
    ],
    quote: "Multi-site rollouts and reseller pricing are quoted per deployment. Tell us how many links you need covered and we'll come back with a number.",
} as const;

/* ------------------------------------------------------------------ */
/* Signup                                                              */
/* ------------------------------------------------------------------ */

export const USE_CASES = [
    "Home network",
    "Small business",
    "Enterprise",
    "Just curious",
] as const;

export type UseCase = (typeof USE_CASES)[number];

export const COMPANY_SIZES = [
    "Just me",
    "2 to 10",
    "11 to 50",
    "51 to 250",
    "251 to 1000",
    "1000+",
] as const;

export type CompanySize = (typeof COMPANY_SIZES)[number];

/* ------------------------------------------------------------------ */
/* Live view: scripted packet feed                                     */
/* ------------------------------------------------------------------ */

/**
 * Source addresses are drawn only from RFC 5737 documentation ranges
 * (198.51.100.0/24 TEST-NET-2 and 203.0.113.0/24 TEST-NET-3). These blocks
 * exist so examples never point at somebody's real host. Do not swap in
 * addresses that look routable.
 */
const ALLOWED_SOURCES = [
    "203.0.113.14",
    "203.0.113.52",
    "203.0.113.77",
    "198.51.100.31",
    "198.51.100.146",
];

export type FeedAction = "ALLOWED" | "FLAGGED" | "DROPPED";

export type ScenarioVariant = {
    src: string;
    port: number;
    protocol: string;
    detail: string;
};

export type Scenario = {
    action: FeedAction;
    /** Threat classification for the row; "none" when nothing was flagged. */
    threat: string;
    /** Full badge text, e.g. "DROPPED: Malware C2". */
    label: string;
    variants: readonly ScenarioVariant[];
};

export const SCENARIOS = {
    allowed: {
        action: "ALLOWED",
        threat: "none",
        label: "ALLOWED",
        variants: [
            {
                src: ALLOWED_SOURCES[0],
                port: 443,
                protocol: "TCP",
                detail: "TLS 1.3 handshake, destination reputation clean.",
            },
            {
                src: ALLOWED_SOURCES[1],
                port: 443,
                protocol: "UDP",
                detail: "QUIC session resumed, flow matches host baseline.",
            },
            {
                src: ALLOWED_SOURCES[2],
                port: 80,
                protocol: "TCP",
                detail: "HTTP redirect to TLS, payload inspected and benign.",
            },
            {
                src: ALLOWED_SOURCES[3],
                port: 123,
                protocol: "UDP",
                detail: "NTP sync, request rate within normal range.",
            },
            {
                src: ALLOWED_SOURCES[4],
                port: 993,
                protocol: "TCP",
                detail: "IMAP over TLS, recurring flow from a known client.",
            },
        ],
    },
    portScan: {
        action: "FLAGGED",
        threat: "Port Scan",
        label: "FLAGGED: Port Scan",
        variants: [
            {
                src: "203.0.113.66",
                port: 22,
                protocol: "TCP",
                detail: "14 ports touched from one host in 3s, SYN sweep signature.",
            },
            {
                src: "203.0.113.66",
                port: 3389,
                protocol: "TCP",
                detail: "RDP probe from the same host, rate-limited and logged.",
            },
            {
                src: "198.51.100.9",
                port: 445,
                protocol: "TCP",
                detail: "SMB probe sequence, no session established.",
            },
        ],
    },
    malwareC2: {
        action: "DROPPED",
        threat: "Malware C2",
        label: "DROPPED: Malware C2",
        variants: [
            {
                src: "203.0.113.201",
                port: 8443,
                protocol: "TCP",
                detail: "Beacon interval + JA3 fingerprint match known C2 profile.",
            },
            {
                src: "203.0.113.188",
                port: 4444,
                protocol: "TCP",
                detail: "Reverse-shell handshake to a flagged control server.",
            },
        ],
    },
    dnsTunnel: {
        action: "DROPPED",
        threat: "DNS Tunneling",
        label: "DROPPED: DNS Tunneling",
        variants: [
            {
                src: "203.0.113.90",
                port: 53,
                protocol: "UDP",
                detail: "Oversized TXT queries encoding payload data.",
            },
            {
                src: "203.0.113.117",
                port: 53,
                protocol: "UDP",
                detail: "High-entropy subdomain labels, 40× baseline query rate.",
            },
        ],
    },
} as const satisfies Record<string, Scenario>;

export type ScenarioKey = keyof typeof SCENARIOS;

/**
 * Playback order. Weighted towards clean traffic so the feed
 * reads like a real link rather than a highlight reel, while still cycling
 * through all four scenarios roughly every 20 seconds.
 */
export const FEED_CYCLE: readonly ScenarioKey[] = [
    "allowed",
    "allowed",
    "portScan",
    "allowed",
    "malwareC2",
    "allowed",
    "allowed",
    "dnsTunnel",
];

/** Opening values for the feed counters: arbitrary, just not round numbers. */
export const FEED_SEED = {
    packetsInspected: 4_182_637,
    threatsBlocked: 219,
    activeConnections: 214,
} as const;

