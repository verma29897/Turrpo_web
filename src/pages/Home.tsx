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
import { InlineDiagram } from "@/components/product/InlineDiagram";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { Button } from "@/components/ui/button";
import { Card, CardIcon } from "@/components/ui/card";
import { CtaBand } from "@/components/ui/cta-band";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { StatGrid } from "@/components/ui/stat-grid";
import { PRODUCT } from "@/constants/product";
import { SITE } from "@/constants/site";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* 1. Hero                                                             */
/* ------------------------------------------------------------------ */

/*
 * Full-height opening hero with the animated network canvas, and the only
 * near-black surface on the site. Everything below it, on this page and every
 * other, is light.
 *
 * `dark` opts the subtree into the dark-variant utilities BackgroundPaths uses
 * for its headline and canvas; `dark-slate` then swaps the navy token values
 * for the near-black ones (see tailwind.css). Both are needed, in that order.
 */
function HeroSection() {
    return (
        <div className="dark dark-slate">
            <BackgroundPaths
                title={SITE.name}
                subtitle={SITE.tagline}
                description="From network and cloud security to 24/7 threat monitoring, our experts stay ahead of the latest threats so your business remains secure."
                className="min-h-[calc(100vh-75px)] bg-background"
                variant="network"
                actions={
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Button
                            asChild
                            size="lg"
                            className="px-8 text-base font-semibold transition-colors duration-200"
                        >
                            <Link to="/product">
                                See the Product
                                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="border-2 border-primary bg-transparent px-8 text-base font-semibold text-primary transition-colors duration-200 hover:bg-primary/10 hover:text-primary"
                        >
                            <Link to="/contact">Contact Sales</Link>
                        </Button>
                    </div>
                }
            />
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* 2. Trust signals                                                    */
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
        <Section tone="muted" border="y">
            <p className="mb-10 text-center text-sm font-semibold uppercase tracking-widest text-primary">
                Security you can verify
            </p>

            <StatGrid stats={STATS} className="mb-12" />

            <ul className="flex flex-wrap justify-center gap-3">
                {CAPABILITIES.map(({ icon: Icon, label }) => (
                    <li
                        key={label}
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm"
                    >
                        <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                        {label}
                    </li>
                ))}
            </ul>
        </Section>
    );
}

/* ------------------------------------------------------------------ */
/* 3. Solutions by Industry: accessible tabs                          */
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
        <Section tone="muted" border="y" padding="lg">
            <PageHeader
                title="Solutions by industry"
                description="Every industry has its own threat landscape. Pick yours to see how we protect it."
                className="mb-10"
            />

            <div
                role="tablist"
                aria-label="Industries"
                className="mb-8 flex flex-wrap justify-center gap-2"
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
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                            active === industry.id
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-primary/50",
                        )}
                    >
                        {industry.label}
                    </button>
                ))}
            </div>

            <Card
                asChild
                padding="lg"
                id={`panel-${current.id}`}
                aria-labelledby={`tab-${current.id}`}
            >
                <div role="tabpanel" tabIndex={0}>
                    <div className="mb-6 flex items-start gap-4">
                        <CardIcon icon={current.icon} />
                        <div>
                            <h3 className="mb-2 text-xl md:text-2xl font-semibold text-foreground">
                                {current.headline}
                            </h3>
                            <p className="max-w-3xl text-muted-foreground leading-relaxed">
                                {current.body}
                            </p>
                        </div>
                    </div>

                    <ul className="mb-8 grid gap-3 sm:grid-cols-2">
                        {current.points.map((point) => (
                            <li
                                key={point}
                                className="flex items-start gap-3 text-muted-foreground"
                            >
                                <ShieldCheck
                                    className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                                    aria-hidden="true"
                                />
                                {point}
                            </li>
                        ))}
                    </ul>

                    <Link
                        to="/solutions"
                        className="group inline-flex cursor-pointer items-center gap-2 rounded-md text-sm font-semibold text-primary
                        transition-colors duration-200 hover:text-primary/80
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                        Explore {current.label} solutions
                        <ArrowRight
                            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                            aria-hidden="true"
                        />
                    </Link>
                </div>
            </Card>
        </Section>
    );
}

/* ------------------------------------------------------------------ */
/* 3.5 Product spotlight                                               */
/* ------------------------------------------------------------------ */

/*
 * The site exists to promote the appliance, so the home page says what it is
 * before it talks about consulting. Copy is pulled from constants/product.ts
 * rather than restated, so the pitch can never drift from the product page.
 */
function ProductSection() {
    return (
        <Section border="y" padding="lg">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
                <div>
                    <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
                        Our product
                    </p>
                    <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        Stop threats before they reach your router
                    </h2>
                    <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                        {PRODUCT.subheadline}
                    </p>

                    <ul className="mt-7 flex flex-wrap gap-2">
                        {PRODUCT.highlights.map((item) => (
                            <li
                                key={item}
                                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground"
                            >
                                <ShieldCheck
                                    className="h-3.5 w-3.5 text-primary"
                                    aria-hidden="true"
                                />
                                {item}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-9 flex flex-wrap items-center gap-4">
                        <Button asChild size="lg" className="px-8 text-base font-semibold">
                            <Link to="/product">
                                See the product
                                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="px-8 text-base font-semibold"
                        >
                            <Link to="/product#live">Watch it working</Link>
                        </Button>
                    </div>
                </div>

                <InlineDiagram />
            </div>
        </Section>
    );
}

/* ------------------------------------------------------------------ */
/* 4. Solutions by Role: "I am a…" path selection                     */
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
        to: "/services",
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
        <Section border="b" padding="lg">
            <PageHeader
                title="Where should you start?"
                description="Tell us who you are and we'll point you at the right first step."
                className="mb-10"
            />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {ROLES.map(({ icon, title, description, to }) => (
                    <Card key={title} asChild interactive>
                        <Link to={to} className="group flex flex-col">
                            <CardIcon icon={icon} className="mb-4" />
                            <h3 className="mb-2 text-base font-semibold text-foreground">
                                I am a {title}
                            </h3>
                            <p className="mb-4 flex-1 text-sm text-muted-foreground leading-relaxed">
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
                    </Card>
                ))}
            </div>
        </Section>
    );
}

/* ------------------------------------------------------------------ */

const Home = () => {
    return (
        <main className="bg-background text-foreground">
            <HeroSection />
            <TrustSection />
            <ProductSection />
            <IndustrySection />
            <RoleSection />
            <CtaBand
                title="Ready to secure your organization?"
                description="Talk to our security experts about your environment, your risks, and the fastest path to a stronger posture."
                primary={{ label: "Contact Sales", to: "/contact" }}
                secondary={{ label: "See the Product", to: "/product" }}
            />
        </main>
    );
};

export default Home;
