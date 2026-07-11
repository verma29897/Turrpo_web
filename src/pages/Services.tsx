import { Link } from "react-router-dom";
import {
    ArrowRight,
    Cloud,
    Code,
    Cpu,
    MonitorSmartphone,
    Network,
    SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const FEATURES = [
    {
        icon: Cpu,
        title: "Cutting-Edge Technology",
        description:
            "We leverage the latest cybersecurity tools and techniques to safeguard your business. Our advanced threat detection systems ensure comprehensive protection.",
    },
    {
        icon: SlidersHorizontal,
        title: "Customized Solutions",
        description:
            "Our tailored approach ensures that your security needs are met, regardless of your industry or size.",
    },
];

const SERVICES = [
    {
        icon: Network,
        title: "Network Security",
        description:
            "Protect your network infrastructure with our advanced network security solutions. We offer firewall management, intrusion detection, and prevention systems.",
    },
    {
        icon: MonitorSmartphone,
        title: "Endpoint Security",
        description:
            "Secure all endpoints including desktops, laptops, and mobile devices. Our endpoint security solutions include antivirus, anti-malware, and device management.",
    },
    {
        icon: Cloud,
        title: "Cloud Security",
        description:
            "Ensure the security of your cloud environments with our comprehensive cloud security services. We provide cloud access security brokers (CASB), encryption, and compliance management.",
    },
    {
        icon: Code,
        title: "Application Security",
        description:
            "Protect your applications from vulnerabilities and attacks. Our application security services include code reviews, penetration testing, and secure development practices.",
    },
];

const ACHIEVEMENTS = [
    { value: "50+", label: "Projects Completed" },
    { value: "95%", label: "Client Retention Rate" },
    { value: "1k+", label: "Customers Globally" },
    { value: "2+", label: "Years of Experience" },
];

const Services = () => {
    return (
        <main className="bg-background text-foreground">
            {/* Header */}
            <section className="bg-slate-900/50 border-b border-border">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
                        Why Choose Turrpo Ideas
                    </p>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 max-w-3xl mx-auto">
                        Advanced Security Solutions for a Digital Age
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        Turrpo Ideas has been at the forefront of cybersecurity,
                        adapting to the ever-evolving threat landscape. Our
                        seasoned professionals have a deep understanding of the
                        latest attack vectors.
                    </p>
                </div>
            </section>

            {/* Differentiators */}
            <section className="bg-background">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
                    <div className="grid md:grid-cols-2 gap-6">
                        {FEATURES.map(({ icon: Icon, title, description }) => (
                            <div
                                key={title}
                                className="rounded-xl border border-border bg-card p-8 shadow-sm"
                            >
                                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-sky-500/10">
                                    <Icon
                                        className="h-5 w-5 text-primary"
                                        aria-hidden="true"
                                    />
                                </div>
                                <h2 className="text-xl font-semibold text-white mb-3">
                                    {title}
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services grid */}
            <section className="bg-slate-900/50 border-y border-border">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                            Our Cyber Security Services
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Layered protection across your network, devices,
                            cloud, and applications.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {SERVICES.map(({ icon: Icon, title, description }) => (
                            <div
                                key={title}
                                className="group rounded-xl border border-border bg-card p-8 shadow-sm transition-all duration-200 hover:shadow-md hover:border-sky-500/60"
                            >
                                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-sky-500/10">
                                    <Icon
                                        className="h-5 w-5 text-primary"
                                        aria-hidden="true"
                                    />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-3">
                                    {title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed mb-5">
                                    {description}
                                </p>
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                >
                                    Talk to an expert
                                    <ArrowRight
                                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                                        aria-hidden="true"
                                    />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Achievements + CTA band */}
            <section className="bg-slate-900">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
                    <h2 className="text-center text-3xl md:text-4xl font-bold text-white tracking-tight mb-12">
                        Our Achievements
                    </h2>
                    <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14">
                        {ACHIEVEMENTS.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <dt className="sr-only">{stat.label}</dt>
                                <dd className="font-heading text-4xl md:text-5xl font-bold text-sky-400">
                                    {stat.value}
                                </dd>
                                <p className="mt-2 text-sm md:text-base text-slate-300">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </dl>
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
                            <Link to="/solutions">Explore Solutions</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Services;
