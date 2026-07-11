import { Link } from "react-router-dom";
import {
    ArrowRight,
    Cloud,
    Crosshair,
    FileLock2,
    LockKeyhole,
    MonitorSmartphone,
    Radar,
    ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const SOLUTIONS = [
    {
        icon: LockKeyhole,
        title: "Zero Trust Architecture",
        description:
            "Implement a comprehensive zero-trust security model that verifies every user and device before granting access to your network resources.",
        features: [
            "Identity verification",
            "Micro-segmentation",
            "Continuous monitoring",
            "Least privilege access",
        ],
    },
    {
        icon: Cloud,
        title: "Cloud Security",
        description:
            "Protect your cloud infrastructure with advanced security controls, compliance management, and threat detection across all cloud platforms.",
        features: [
            "Multi-cloud security",
            "CASB integration",
            "Data encryption",
            "Compliance automation",
        ],
    },
    {
        icon: MonitorSmartphone,
        title: "Endpoint Protection",
        description:
            "Comprehensive endpoint security solution that protects all devices from advanced threats, malware, and unauthorized access.",
        features: [
            "EDR capabilities",
            "Behavioral analysis",
            "Device management",
            "Threat hunting",
        ],
    },
    {
        icon: Radar,
        title: "Security Operations Center (SOC)",
        description:
            "24/7 monitoring and response services with our advanced Security Operations Center to detect and respond to threats in real-time.",
        features: [
            "24/7 monitoring",
            "Threat intelligence",
            "Incident response",
            "Security analytics",
        ],
    },
    {
        icon: Crosshair,
        title: "Penetration Testing",
        description:
            "Regular security assessments and penetration testing to identify vulnerabilities before attackers can exploit them.",
        features: [
            "Vulnerability assessment",
            "Red team exercises",
            "Compliance testing",
            "Remediation guidance",
        ],
    },
    {
        icon: FileLock2,
        title: "Data Loss Prevention",
        description:
            "Prevent sensitive data from leaving your organization with advanced DLP solutions that monitor and control data movement.",
        features: [
            "Data classification",
            "Policy enforcement",
            "Content inspection",
            "Incident reporting",
        ],
    },
];

const Solutions = () => {
    return (
        <main className="bg-background text-foreground">
            {/* Header */}
            <section className="bg-slate-900/50 border-b border-border">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
                        Cybersecurity Solutions
                    </p>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 max-w-3xl mx-auto">
                        Comprehensive Protection for Your Digital Assets
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        At Turrpo Ideas, we offer cutting-edge cybersecurity
                        solutions designed to protect your organization from
                        evolving threats. Our comprehensive approach ensures
                        your digital infrastructure remains secure, compliant,
                        and resilient.
                    </p>
                </div>
            </section>

            {/* Solutions grid */}
            <section className="bg-background">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {SOLUTIONS.map(
                            ({ icon: Icon, title, description, features }) => (
                                <div
                                    key={title}
                                    className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-sky-500/60"
                                >
                                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-sky-500/10">
                                        <Icon
                                            className="h-5 w-5 text-primary"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <h2 className="text-lg font-semibold text-white mb-2">
                                        {title}
                                    </h2>
                                    <p className="text-sm text-slate-400 leading-relaxed mb-5">
                                        {description}
                                    </p>
                                    <ul className="mt-auto space-y-2 border-t border-border pt-4">
                                        {features.map((feature) => (
                                            <li
                                                key={feature}
                                                className="flex items-center gap-2 text-sm text-slate-300"
                                            >
                                                <ShieldCheck
                                                    className="h-4 w-4 shrink-0 text-primary"
                                                    aria-hidden="true"
                                                />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ),
                        )}
                    </div>
                </div>
            </section>

            {/* CTA band */}
            <section className="bg-slate-900">
                <div className="max-w-4xl mx-auto px-4 md:px-6 py-16 md:py-20 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                        Ready to Secure Your Organization?
                    </h2>
                    <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
                        Contact us today to discuss how our solutions can
                        protect your business.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Button
                            asChild
                            size="lg"
                            className="px-8 text-base font-semibold transition-colors duration-200"
                        >
                            <Link to="/contact">
                                Get Started
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
                            <Link to="/case-studies">View Case Studies</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Solutions;
