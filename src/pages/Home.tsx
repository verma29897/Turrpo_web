import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    Briefcase,
    Building2,
    ClipboardCheck,
    Cloud,
    FileCheck2,
    HeartPulse,
    Landmark,
    Lock,
    Radar,
    ShieldCheck,
    ShoppingCart,
    UserCog,
} from "lucide-react";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* 1. Hero                                                             */
/* ------------------------------------------------------------------ */

function HeroSection() {
    return (
        <BackgroundPaths
            title="Turrpo Ideas"
            subtitle="Your Trusted Cyber Security Partner"
            description="From network and cloud security to 24/7 threat monitoring, our experts stay ahead of the latest threats so your business remains secure."
            className="min-h-[calc(100vh-75px)] bg-background"
            variant="network"
            actions={
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Button
                        asChild
                        size="lg"
                        className="px-8 text-base font-semibold shadow-lg shadow-sky-900/20 transition-colors duration-200"
                    >
                        <Link to="/contact">
                            Contact Sales
                            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                        </Link>
                    </Button>
                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="px-8 text-base font-semibold bg-white/5 text-white border-white/20 hover:bg-white/10 hover:text-white backdrop-blur transition-colors duration-200"
                    >
                        <Link to="/services">Explore Services</Link>
                    </Button>
                </div>
            }
        />
    );
}

/* ------------------------------------------------------------------ */
/* 2. Trust signals — stats reused from the Services page              */
/* ------------------------------------------------------------------ */

const STATS = [
    { value: "50+", label: "Projects Completed" },
    { value: "95%", label: "Client Retention Rate" },
    { value: "1k+", label: "Customers Globally" },
    { value: "2+", label: "Years of Experience" },
];

const CAPABILITIES = [
    { icon: Radar, label: "24/7 SOC Monitoring" },
    { icon: Lock, label: "Zero Trust Architecture" },
    { icon: ShieldCheck, label: "Penetration Testing" },
    { icon: FileCheck2, label: "Compliance & Audit Support" },
];

function TrustSection() {
    return (
        <section className="bg-slate-900/50 border-y border-border">
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
                <p className="text-center text-sm font-semibold uppercase tracking-widest text-primary mb-10">
                    Security you can verify
                </p>

                <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    {STATS.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <dt className="sr-only">{stat.label}</dt>
                            <dd className="font-heading text-4xl md:text-5xl font-bold text-white">
                                {stat.value}
                            </dd>
                            <p className="mt-2 text-sm md:text-base text-muted-foreground">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </dl>

                <ul className="flex flex-wrap justify-center gap-3">
                    {CAPABILITIES.map(({ icon: Icon, label }) => (
                        <li
                            key={label}
                            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-slate-300 shadow-sm"
                        >
                            <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                            {label}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* 3. Solutions by Industry — accessible tabs                          */
/* ------------------------------------------------------------------ */

const INDUSTRIES = [
    {
        id: "finance",
        label: "Finance & Banking",
        icon: Landmark,
        headline: "Protect transactions and customer trust",
        body: "Banks and fintechs are prime targets for credential theft and fraud. We harden your perimeter and your people with layered, audit-ready controls.",
        points: [
            "Zero Trust access to core banking systems",
            "24/7 SOC monitoring for fraud and intrusion signals",
            "Regular penetration testing of customer-facing apps",
            "Compliance support for audits and regulators",
        ],
    },
    {
        id: "healthcare",
        label: "Healthcare",
        icon: HeartPulse,
        headline: "Keep patient data private and systems available",
        body: "Clinical systems can't afford downtime or leaks. We secure electronic records and connected devices without slowing down care delivery.",
        points: [
            "Endpoint protection across clinical workstations",
            "Data encryption for records at rest and in transit",
            "Incident response planning for care continuity",
            "Privacy compliance and audit preparation",
        ],
    },
    {
        id: "government",
        label: "Government & PSU",
        icon: Building2,
        headline: "Defend critical infrastructure and citizen data",
        body: "Public institutions face persistent, well-resourced attackers. We bring defense-in-depth architectures suited to sensitive environments.",
        points: [
            "Network segmentation and least-privilege access",
            "Threat intelligence tuned to state-level actors",
            "Security operations for legacy and modern systems",
            "Vulnerability assessments on a fixed cadence",
        ],
    },
    {
        id: "retail",
        label: "Retail & E-commerce",
        icon: ShoppingCart,
        headline: "Secure every checkout, season after season",
        body: "Payment data and uptime are your business. We protect storefronts and supply chains from skimming, bots, and account takeover.",
        points: [
            "Payment infrastructure hardening",
            "Bot and account-takeover mitigation",
            "Cloud security for scalable storefronts",
            "Peak-season incident response readiness",
        ],
    },
    {
        id: "saas",
        label: "SaaS & Technology",
        icon: Cloud,
        headline: "Ship fast without shipping vulnerabilities",
        body: "Your customers trust you with their data. We embed security into your cloud, pipelines, and endpoints so growth never outpaces protection.",
        points: [
            "Multi-cloud security posture management",
            "EDR and behavioral analysis on every endpoint",
            "Secure SDLC and pre-release penetration tests",
            "SOC 2 / ISO 27001 readiness support",
        ],
    },
];

function IndustrySection() {
    const [active, setActive] = useState(INDUSTRIES[0].id);
    const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
    const current = INDUSTRIES.find((i) => i.id === active) ?? INDUSTRIES[0];

    const onTabKeyDown = (
        event: React.KeyboardEvent<HTMLButtonElement>,
        index: number,
    ) => {
        const last = INDUSTRIES.length - 1;
        let next: number | null = null;
        if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
        else if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = last;
        if (next !== null) {
            event.preventDefault();
            setActive(INDUSTRIES[next].id);
            tabRefs.current[next]?.focus();
        }
    };

    return (
        <section className="bg-background">
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                        Solutions by Industry
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Every industry has its own threat landscape. Pick yours
                        to see how we protect it.
                    </p>
                </div>

                <div
                    role="tablist"
                    aria-label="Industries"
                    className="flex flex-wrap justify-center gap-2 mb-8"
                >
                    {INDUSTRIES.map((industry, index) => (
                        <button
                            key={industry.id}
                            ref={(el) => {
                                tabRefs.current[index] = el;
                            }}
                            role="tab"
                            id={`tab-${industry.id}`}
                            aria-selected={active === industry.id}
                            aria-controls={`panel-${industry.id}`}
                            tabIndex={active === industry.id ? 0 : -1}
                            onClick={() => setActive(industry.id)}
                            onKeyDown={(e) => onTabKeyDown(e, index)}
                            className={cn(
                                "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                active === industry.id
                                    ? "bg-sky-400 text-slate-950 border-sky-400"
                                    : "bg-card text-slate-400 border-border hover:text-white hover:border-slate-500",
                            )}
                        >
                            {industry.label}
                        </button>
                    ))}
                </div>

                <div
                    role="tabpanel"
                    id={`panel-${current.id}`}
                    aria-labelledby={`tab-${current.id}`}
                    className="rounded-xl border border-border bg-card p-8 md:p-10 shadow-sm"
                >
                    <div className="flex items-start gap-4 mb-6">
                        <div className="rounded-lg bg-sky-500/10 p-3">
                            <current.icon
                                className="h-6 w-6 text-primary"
                                aria-hidden="true"
                            />
                        </div>
                        <div>
                            <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                                {current.headline}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed max-w-3xl">
                                {current.body}
                            </p>
                        </div>
                    </div>

                    <ul className="grid sm:grid-cols-2 gap-3 mb-8">
                        {current.points.map((point) => (
                            <li
                                key={point}
                                className="flex items-start gap-3 text-slate-300"
                            >
                                <ShieldCheck
                                    className="h-5 w-5 mt-0.5 shrink-0 text-primary"
                                    aria-hidden="true"
                                />
                                {point}
                            </li>
                        ))}
                    </ul>

                    <Link
                        to="/solutions"
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-primary cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        Explore {current.label} solutions
                        <ArrowRight
                            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                            aria-hidden="true"
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* 4. Solutions by Role — "I am a…" path selection                     */
/* ------------------------------------------------------------------ */

const ROLES = [
    {
        icon: ShieldCheck,
        title: "CISO / Security Leader",
        description:
            "Get a defense-in-depth roadmap, measurable posture improvements, and board-ready reporting.",
        to: "/solutions",
    },
    {
        icon: UserCog,
        title: "IT Manager",
        description:
            "Offload monitoring, patching pressure, and incident response to a 24/7 security operations team.",
        to: "/services",
    },
    {
        icon: ClipboardCheck,
        title: "Compliance Officer",
        description:
            "Map controls to frameworks, prepare for audits, and keep evidence organized year-round.",
        to: "/compliance",
    },
    {
        icon: Briefcase,
        title: "Business Owner",
        description:
            "Protect revenue and reputation with enterprise-grade security sized for your budget.",
        to: "/contact",
    },
];

function RoleSection() {
    return (
        <section className="bg-slate-900/50 border-y border-border">
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                        Where should you start?
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Tell us who you are and we&apos;ll point you at the
                        right first step.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {ROLES.map(({ icon: Icon, title, description, to }) => (
                        <Link
                            key={title}
                            to={to}
                            className="group flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm cursor-pointer
                            transition-all duration-200 hover:shadow-md hover:border-sky-500/60
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-sky-500/10">
                                <Icon
                                    className="h-5 w-5 text-primary"
                                    aria-hidden="true"
                                />
                            </div>
                            <h3 className="text-base font-semibold text-white mb-2">
                                I am a {title}
                            </h3>
                            <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-1">
                                {description}
                            </p>
                            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                                See how we help
                                <ArrowRight
                                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                                    aria-hidden="true"
                                />
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* 5. Contact Sales band                                               */
/* ------------------------------------------------------------------ */

function ContactSection() {
    return (
        <section className="bg-slate-900">
            <div className="max-w-4xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                    Ready to Secure Your Organization?
                </h2>
                <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
                    Talk to our security experts about your environment, your
                    risks, and the fastest path to a stronger posture.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Button
                        asChild
                        size="lg"
                        className="px-8 text-base font-semibold transition-colors duration-200"
                    >
                        <Link to="/contact">
                            Contact Sales
                            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                        </Link>
                    </Button>
                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="px-8 text-base font-semibold bg-transparent text-white border-white/30
                        hover:bg-white/10 hover:text-white transition-colors duration-200"
                    >
                        <Link to="/case-studies">View Case Studies</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */

const Home = () => {
    return (
        <main className="bg-background text-foreground">
            <HeroSection />
            <TrustSection />
            <IndustrySection />
            <RoleSection />
            <ContactSection />
        </main>
    );
};

export default Home;
