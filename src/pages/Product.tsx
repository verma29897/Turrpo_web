import { Link } from "react-router-dom";
import { ArrowRight, Check, Minus, Play, Quote, ShieldCheck, X } from "lucide-react";
import { DemoRequestForm } from "@/components/product/DemoRequestForm";
import { InlineDiagram } from "@/components/product/InlineDiagram";
import { LiveFeed } from "@/components/product/LiveFeed";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardIcon, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal, scrollToSection } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import {
    CERTIFICATIONS,
    COMPARISON,
    COMPARISON_COLUMNS,
    PRICING,
    PRODUCT,
    SEGMENTS,
    SPECS,
    STATS,
    STEPS,
    TESTIMONIALS,
    TRUST_LOGOS,
    type Cell,
} from "@/constants/product";

/**
 * Product landing page, in the enterprise security-vendor idiom: light page,
 * deep blue primary, and the one dark element reserved for the live traffic
 * panel so it reads as a product screenshot.
 *
 * All copy, figures and the packet-feed script live in constants/product.ts.
 * Three blocks there are deliberately unfinished and labelled as such on the
 * page: STATS (illustrative), CERTIFICATIONS (not audited) and TESTIMONIALS
 * (sample copy, nobody said any of it).
 *
 * `scroll-mt-24` on the anchored sections clears the 75px sticky navbar.
 */

/* ------------------------------------------------------------------ */
/* 1. Hero                                                             */
/* ------------------------------------------------------------------ */

function Hero() {
    return (
        <div className="border-b border-border bg-card">
            <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
                <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
                    <div>
                        <p className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                            {PRODUCT.name} · {PRODUCT.kind}
                        </p>

                        <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.08] tracking-tight text-foreground md:text-5xl lg:text-6xl">
                            {PRODUCT.headline}
                        </h1>

                        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                            {PRODUCT.subheadline}
                        </p>

                        <div className="mt-9 flex flex-wrap items-center gap-4">
                            <Button
                                size="lg"
                                onClick={() => scrollToSection("signup")}
                                className="px-8 text-base font-semibold"
                            >
                                Request a Demo
                                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => scrollToSection("demo")}
                                className="border-2 border-primary px-8 text-base font-semibold text-primary hover:bg-secondary hover:text-primary"
                            >
                                <Play className="mr-2 h-4 w-4" aria-hidden="true" />
                                Watch Demo
                            </Button>
                        </div>
                    </div>

                    <InlineDiagram />
                </div>

                {/* Trust bar */}
                <div className="mt-14 border-t border-border pt-8">
                    <p className="text-center text-xs font-semibold uppercase tracking-wider text-subtle">
                        Trusted by IT teams at
                    </p>
                    <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
                        {TRUST_LOGOS.map((logo) => (
                            /* Placeholder marks. Swap for real customer logos or cut the
                               bar: a row of invented brands is worse than no bar. */
                            <li
                                key={logo}
                                className="flex h-9 items-center rounded border border-dashed border-border px-4 text-sm font-semibold text-subtle"
                            >
                                {logo}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* 2. Stats strip                                                      */
/* ------------------------------------------------------------------ */

function Stats() {
    return (
        <Section tone="deep" padding="sm">
            <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                {STATS.map((stat) => (
                    <div key={stat.label} className="text-center">
                        <dd className="font-heading text-3xl font-bold text-primary md:text-4xl">
                            {stat.value}
                        </dd>
                        <dt className="mt-2 text-sm text-muted-foreground">
                            {stat.label}
                        </dt>
                    </div>
                ))}
            </dl>
            <p className="mt-8 text-center text-xs text-subtle">
                Illustrative figures. The product has not shipped, so there is no
                deployed fleet to measure yet.
            </p>
        </Section>
    );
}

/* ------------------------------------------------------------------ */
/* 3. Live traffic panel                                               */
/* ------------------------------------------------------------------ */

function LiveSection() {
    return (
        <Section
            id="demo"
            tone="muted"
            border="b"
            padding="lg"
            width="wide"
            className="scroll-mt-24"
        >
            <PageHeader
                eyebrow="Live Demo: Simulated Data"
                title="See what it catches"
                description="This is the dashboard the box serves on your own LAN, replaying a scripted sample of an evening on a small network."
                className="mb-10"
            />

            <Reveal>
                <LiveFeed className="mx-auto max-w-4xl" />
            </Reveal>

            <p className="mx-auto mt-5 max-w-2xl text-center text-xs leading-relaxed text-subtle">
                <strong className="font-semibold text-muted-foreground">
                    Simulated data, not a real capture.
                </strong>{" "}
                Nothing here comes off a real network. The feed is a scripted loop
                running in your browser, and every address shown is from the RFC 5737
                documentation ranges reserved for exactly this purpose.
            </p>
        </Section>
    );
}

/* ------------------------------------------------------------------ */
/* 4. Solutions by segment                                             */
/* ------------------------------------------------------------------ */

function Segments() {
    return (
        <Section border="b" padding="lg">
            <PageHeader
                eyebrow="Solutions"
                title="One appliance, three very different jobs"
                description="The hardware does not change. What changes is how many links you put it in front of."
                className="mb-12"
            />

            <ul className="grid gap-6 lg:grid-cols-3">
                {SEGMENTS.map(({ icon, title, description, points }, index) => (
                    <Reveal as="li" key={title} delay={index * 90} className="h-full">
                        <Card padding="lg" hover className="flex h-full flex-col">
                            <CardIcon icon={icon} className="mb-5" />
                            <CardTitle className="mb-3 text-xl">{title}</CardTitle>
                            <CardDescription className="mb-6">
                                {description}
                            </CardDescription>
                            <ul className="mt-auto space-y-3 border-t border-border pt-5">
                                {points.map((point) => (
                                    <li key={point} className="flex items-start gap-2.5">
                                        <Check
                                            className="mt-0.5 h-4 w-4 shrink-0 text-cyan-ink"
                                            aria-hidden="true"
                                        />
                                        <span className="text-sm text-muted-foreground">
                                            {point}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </Reveal>
                ))}
            </ul>
        </Section>
    );
}

/* ------------------------------------------------------------------ */
/* 5. How it works                                                     */
/* ------------------------------------------------------------------ */

function HowItWorks() {
    return (
        <Section
            id="how-it-works"
            tone="muted"
            border="b"
            padding="lg"
            className="scroll-mt-24"
        >
            <PageHeader
                eyebrow="How it works"
                title="Four steps, and only the first one needs you"
                description="From unboxing to blocking, with nothing installed on a single device behind it."
                className="mb-14"
            />

            <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                {/* The connecting rule, drawn behind the numbered markers. */}
                <span
                    aria-hidden="true"
                    className="absolute left-6 right-6 top-6 hidden h-px bg-border lg:block"
                />

                {STEPS.map(({ step, icon: Icon, title, description }, index) => (
                    <Reveal as="li" key={step} delay={index * 90} className="relative">
                        <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-card font-heading text-base font-bold text-primary">
                            {step}
                        </span>
                        <Icon className="mt-5 h-6 w-6 text-cyan-ink" aria-hidden="true" />
                        <h3 className="mt-3 text-lg font-semibold text-foreground">
                            {title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {description}
                        </p>
                    </Reveal>
                ))}
            </ol>
        </Section>
    );
}

/* ------------------------------------------------------------------ */
/* 6. Comparison table                                                 */
/* ------------------------------------------------------------------ */

/**
 * Booleans render as a tick or a cross, strings as a qualified answer. Each
 * glyph ships an sr-only word, so the column is never colour or shape alone.
 */
function CompareCell({ value, emphasis }: { value: Cell; emphasis: boolean }) {
    if (value === true) {
        return (
            <>
                <Check className="mx-auto h-5 w-5 text-success" aria-hidden="true" />
                <span className="sr-only">Yes</span>
            </>
        );
    }
    if (value === false) {
        return (
            <>
                <X className="mx-auto h-5 w-5 text-danger" aria-hidden="true" />
                <span className="sr-only">No</span>
            </>
        );
    }
    if (value === "n/a") {
        return (
            <>
                <Minus className="mx-auto h-5 w-5 text-subtle" aria-hidden="true" />
                <span className="sr-only">Not applicable</span>
            </>
        );
    }
    return (
        <span
            className={emphasis ? "font-semibold text-foreground" : "text-muted-foreground"}
        >
            {value}
        </span>
    );
}

function Comparison() {
    return (
        <Section id="compare" border="b" padding="lg" className="scroll-mt-24">
            <PageHeader
                eyebrow="Comparison"
                title={`Where ${PRODUCT.name} sits`}
                description="Against the two things most networks actually have: a traditional firewall, or nothing at the boundary at all."
                className="mb-12"
            />

            <Reveal>
                {/* Narrow screens scroll the table rather than the whole page. */}
                <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
                    <table className="w-full min-w-[42rem] border-collapse text-sm">
                        <caption className="sr-only">
                            Capability comparison between {COMPARISON_COLUMNS.join(", ")}
                        </caption>
                        <thead>
                            <tr className="border-b border-border">
                                <th
                                    scope="col"
                                    className="px-5 py-4 text-left font-semibold text-foreground"
                                >
                                    Capability
                                </th>
                                {COMPARISON_COLUMNS.map((column, index) => (
                                    <th
                                        key={column}
                                        scope="col"
                                        className={
                                            index === 0
                                                ? "bg-secondary px-5 py-4 text-center font-semibold text-primary"
                                                : "px-5 py-4 text-center font-semibold text-muted-foreground"
                                        }
                                    >
                                        {column}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {COMPARISON.map((row) => (
                                <tr
                                    key={row.capability}
                                    className="border-b border-border last:border-b-0"
                                >
                                    <th
                                        scope="row"
                                        className="px-5 py-4 text-left font-medium text-foreground"
                                    >
                                        {row.capability}
                                    </th>
                                    <td className="bg-secondary/60 px-5 py-4 text-center">
                                        <CompareCell value={row.product} emphasis />
                                    </td>
                                    <td className="px-5 py-4 text-center">
                                        <CompareCell value={row.firewall} emphasis={false} />
                                    </td>
                                    <td className="px-5 py-4 text-center">
                                        <CompareCell value={row.nothing} emphasis={false} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Reveal>
        </Section>
    );
}

/* ------------------------------------------------------------------ */
/* 7. Specs                                                            */
/* ------------------------------------------------------------------ */

function Specs() {
    return (
        <Section id="specs" tone="muted" border="b" padding="lg" className="scroll-mt-24">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
                <div>
                    <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
                        Technical specifications
                    </p>
                    <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        The hardware
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                        Fanless, wall-mountable, and small enough to sit behind the
                        modem. Ships with two ethernet cables and a power adapter.
                    </p>
                    <p className="mt-6 text-xs leading-relaxed text-subtle">
                        Placeholder figures. Final hardware is not locked yet, so treat
                        everything here as indicative until the spec sheet ships.
                    </p>
                </div>

                <Reveal>
                    <dl className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                        {SPECS.map(({ label, value }) => (
                            <div
                                key={label}
                                className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-border px-5 py-4 last:border-b-0"
                            >
                                <dt className="text-sm font-medium text-muted-foreground">
                                    {label}
                                </dt>
                                <dd className="font-mono text-sm text-foreground">
                                    {value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </Reveal>
            </div>
        </Section>
    );
}

/* ------------------------------------------------------------------ */
/* 8. Testimonials and certifications                                  */
/* ------------------------------------------------------------------ */

function Testimonials() {
    return (
        <Section border="b" padding="lg">
            <PageHeader
                eyebrow="Sample content"
                title="What customers would say here"
                description="Placeholder cards showing the layout. No customer has said any of this. Replace with real, attributed quotes or remove the section before launch."
                className="mb-12"
            />

            <ul className="grid gap-6 lg:grid-cols-3">
                {TESTIMONIALS.map((item, index) => (
                    <Reveal as="li" key={item.quote} delay={index * 90} className="h-full">
                        <Card padding="lg" className="flex h-full flex-col">
                            <span className="mb-4 inline-flex w-fit rounded bg-secondary px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-subtle">
                                Placeholder
                            </span>
                            <Quote
                                className="mb-4 h-6 w-6 text-primary/40"
                                aria-hidden="true"
                            />
                            <blockquote className="flex-1 text-base leading-relaxed text-foreground">
                                {item.quote}
                            </blockquote>
                            <div className="mt-6 border-t border-border pt-4">
                                <p className="text-sm font-semibold text-foreground">
                                    {item.name}
                                </p>
                                <p className="text-sm text-muted-foreground">{item.role}</p>
                            </div>
                        </Card>
                    </Reveal>
                ))}
            </ul>

            {/* Compliance badges, marked as unearned. */}
            <div className="mt-12 border-t border-border pt-8">
                <p className="text-center text-xs font-semibold uppercase tracking-wider text-subtle">
                    Certification targets, not yet audited
                </p>
                <ul className="mt-5 flex flex-wrap items-center justify-center gap-4">
                    {CERTIFICATIONS.map((cert) => (
                        <li
                            key={cert}
                            className="inline-flex items-center gap-2 rounded border border-dashed border-border px-4 py-2 text-sm font-semibold text-subtle"
                        >
                            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                            {cert}
                        </li>
                    ))}
                </ul>
            </div>
        </Section>
    );
}

/* ------------------------------------------------------------------ */
/* 9. Pricing and CTA banner                                           */
/* ------------------------------------------------------------------ */

function Pricing() {
    return (
        <Section id="pricing" tone="muted" border="b" padding="lg" className="scroll-mt-24">
            <div className="grid gap-6 lg:grid-cols-2">
                <Reveal className="h-full">
                    <Card padding="lg" className="flex h-full flex-col">
                        <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
                            Pricing
                        </p>
                        <p className="font-heading text-5xl font-bold text-foreground">
                            {PRICING.amount}
                            <span className="ml-2 text-lg font-medium text-muted-foreground">
                                {PRICING.unit}
                            </span>
                        </p>
                        <ul className="mt-6 space-y-3">
                            {PRICING.includes.map((item) => (
                                <li key={item} className="flex items-start gap-2.5">
                                    <Check
                                        className="mt-1 h-4 w-4 shrink-0 text-cyan-ink"
                                        aria-hidden="true"
                                    />
                                    <span className="text-sm leading-relaxed text-muted-foreground">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-6 border-t border-border pt-4 text-xs leading-relaxed text-subtle">
                            Placeholder figure, like the hardware specs. Pricing is not
                            final.
                        </p>
                    </Card>
                </Reveal>

                <Reveal delay={90} className="h-full">
                    <Card padding="lg" className="flex h-full flex-col justify-center">
                        <CardTitle className="mb-3 text-xl">
                            Buying more than one?
                        </CardTitle>
                        <CardDescription className="mb-7">{PRICING.quote}</CardDescription>
                        <Button asChild className="self-start font-semibold">
                            <Link to="/contact">
                                Get a tailored quote
                                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                            </Link>
                        </Button>
                    </Card>
                </Reveal>
            </div>
        </Section>
    );
}

function CtaBanner() {
    return (
        <div className="bg-primary">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-14 text-center md:flex-row md:justify-between md:px-6 md:text-left">
                <div>
                    <h2 className="font-heading text-2xl font-bold tracking-tight text-white md:text-3xl">
                        Ready to secure your network?
                    </h2>
                    <p className="mt-2 text-base text-white/80">
                        Two minutes to install. Nothing to configure.
                    </p>
                </div>
                <Button
                    size="lg"
                    onClick={() => scrollToSection("signup")}
                    className="shrink-0 bg-white px-8 text-base font-semibold text-primary hover:bg-white/90"
                >
                    Request a Demo
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* 10. Demo request form                                               */
/* ------------------------------------------------------------------ */

function Signup() {
    return (
        <Section id="signup" padding="lg" width="narrow" className="scroll-mt-24">
            <PageHeader
                eyebrow="Request a demo"
                title="See it running against your traffic"
                description="Tell us about your setup and we will come back with a straight answer about whether this fits."
                className="mb-10"
            />
            <DemoRequestForm />
        </Section>
    );
}

/* ------------------------------------------------------------------ */

const Product = () => {
    return (
        <main className="bg-background text-foreground">
            <Hero />
            <Stats />
            <LiveSection />
            <Segments />
            <HowItWorks />
            <Comparison />
            <Specs />
            <Testimonials />
            <Pricing />
            <CtaBanner />
            <Signup />
        </main>
    );
};

export default Product;
