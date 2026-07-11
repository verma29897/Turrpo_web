import { Link } from "react-router-dom";
import {
    ArrowRight,
    GraduationCap,
    Lock,
    Search,
    ShieldCheck,
    Siren,
    Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const SERVICES = [
    {
        icon: ShieldCheck,
        title: "Cybersecurity Consulting",
        description:
            "Our expert consultants assess your organization's security posture, identify vulnerabilities, and develop tailored strategies.",
    },
    {
        icon: Siren,
        title: "Threat Detection and Response",
        description:
            "Our advanced threat detection systems monitor your network 24/7, identifying and mitigating risks proactively.",
    },
    {
        icon: Search,
        title: "Vulnerability Assessment",
        description:
            "We simulate real-world attacks to uncover vulnerabilities in your systems, applications, and networks.",
    },
    {
        icon: Zap,
        title: "Incident Response and Recovery",
        description:
            "When a security incident occurs, our rapid response team contains the breach and restores system integrity.",
    },
    {
        icon: GraduationCap,
        title: "Security Awareness Training",
        description:
            "We empower employees with the knowledge and skills to recognize and prevent cyber threats effectively.",
    },
    {
        icon: Lock,
        title: "Data Security Services",
        description:
            "Our data security solutions protect your organization's sensitive data from unauthorized access and breaches.",
    },
];

const AT_A_GLANCE = [
    { value: "2021", label: "Founded" },
    { value: "1k+", label: "Customers Globally" },
    { value: "50+", label: "Projects Completed" },
    { value: "95%", label: "Client Retention Rate" },
];

const About = () => {
    return (
        <main className="bg-background text-foreground">
            {/* Header */}
            <section className="bg-slate-900/50 border-b border-border">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
                        About Us
                    </p>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 max-w-3xl mx-auto">
                        Learn More About Turrpo Ideas
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        Turrpo Ideas has been a leader in the cybersecurity
                        industry since 2021. Our mission is to provide
                        top-notch security solutions to protect your digital
                        assets.
                    </p>
                </div>
            </section>

            {/* Story + at a glance */}
            <section className="bg-background">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
                    <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 items-start">
                        <div className="rounded-xl border border-border bg-card p-8 md:p-10 shadow-sm">
                            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-5">
                                Staying ahead of an ever-evolving threat
                                landscape
                            </h2>
                            <div className="space-y-4 text-slate-300 leading-relaxed">
                                <p>
                                    Our team of experts is dedicated to staying
                                    ahead of the latest threats and ensuring
                                    that your business remains secure in an
                                    ever-evolving digital landscape.
                                </p>
                                <p>
                                    We offer a wide range of services,
                                    including network security, endpoint
                                    security, cloud security, and application
                                    security. Our customized solutions are
                                    designed to meet the unique needs of each
                                    client.
                                </p>
                            </div>
                        </div>

                        <aside className="rounded-xl border border-sky-500/30 bg-sky-500/10 p-8 shadow-sm">
                            <h2 className="text-sm font-semibold uppercase tracking-widest text-sky-400 mb-6">
                                At a Glance
                            </h2>
                            <dl className="grid grid-cols-2 gap-6">
                                {AT_A_GLANCE.map((item) => (
                                    <div key={item.label}>
                                        <dd className="font-heading text-3xl font-bold text-white">
                                            {item.value}
                                        </dd>
                                        <dt className="mt-1 text-sm text-slate-300">
                                            {item.label}
                                        </dt>
                                    </div>
                                ))}
                            </dl>
                        </aside>
                    </div>
                </div>
            </section>

            {/* What we do */}
            <section className="bg-slate-900/50 border-y border-border">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                            Comprehensive Cybersecurity Solutions
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Six practice areas, one goal: keeping your
                            organization secure.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {SERVICES.map(({ icon: Icon, title, description }) => (
                            <div
                                key={title}
                                className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-sky-500/60"
                            >
                                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-sky-500/10">
                                    <Icon
                                        className="h-5 w-5 text-primary"
                                        aria-hidden="true"
                                    />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    {title}
                                </h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    {description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA band */}
            <section className="bg-slate-900">
                <div className="max-w-4xl mx-auto px-4 md:px-6 py-16 md:py-20 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                        Work with a team that treats your security as its own
                    </h2>
                    <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
                        Tell us about your environment and we&apos;ll show you
                        where we can help.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Button
                            asChild
                            size="lg"
                            className="px-8 text-base font-semibold transition-colors duration-200"
                        >
                            <Link to="/contact">
                                Contact Sales
                                <ArrowRight
                                    className="ml-2 h-4 w-4"
                                    aria-hidden="true"
                                />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="px-8 text-base font-semibold bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white transition-colors duration-200"
                        >
                            <Link to="/services">Explore Services</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default About;
