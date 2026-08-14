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
import { Card, CardDescription, CardIcon, CardTitle } from "@/components/ui/card";
import { CtaBand } from "@/components/ui/cta-band";
import { PageHeader } from "@/components/ui/page-header";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { StatGrid } from "@/components/ui/stat-grid";
import { SITE } from "@/constants/site";

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
            <PageHero
                eyebrow={`Why Choose ${SITE.name}`}
                title="Advanced security solutions for a digital age"
                description={`${SITE.name} has been at the forefront of cybersecurity, adapting to the ever-evolving threat landscape. Our seasoned professionals have a deep understanding of the latest attack vectors.`}
            />

            {/* Differentiators */}
            <Section>
                <div className="grid gap-6 md:grid-cols-2">
                    {FEATURES.map(({ icon, title, description }) => (
                        <Card key={title} padding="lg">
                            <CardIcon icon={icon} className="mb-4" />
                            <CardTitle as="h2" className="text-xl mb-3">
                                {title}
                            </CardTitle>
                            <p className="text-muted-foreground leading-relaxed">
                                {description}
                            </p>
                        </Card>
                    ))}
                </div>
            </Section>

            {/* Services grid */}
            <Section tone="muted" border="y" padding="lg">
                <PageHeader
                    title="Our cyber security services"
                    description="Layered protection across your network, devices, cloud, and applications."
                    className="mb-12"
                />
                <div className="grid gap-6 sm:grid-cols-2">
                    {SERVICES.map(({ icon, title, description }) => (
                        <Card key={title} padding="lg" hover className="group">
                            <CardIcon icon={icon} className="mb-4" />
                            <CardTitle className="mb-3">{title}</CardTitle>
                            <CardDescription className="mb-5 text-base text-muted-foreground">
                                {description}
                            </CardDescription>
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-1.5 rounded-md text-sm font-semibold text-primary
                                transition-colors duration-200 hover:text-primary/80
                                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                            >
                                Talk to an expert about {title.toLowerCase()}
                                <ArrowRight
                                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                                    aria-hidden="true"
                                />
                            </Link>
                        </Card>
                    ))}
                </div>
            </Section>

            {/* Achievements */}
            <Section border="y" padding="lg">
                <h2 className="mb-12 text-center text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                    Our achievements
                </h2>
                <StatGrid stats={ACHIEVEMENTS} tone="accent" />
            </Section>

            <CtaBand
                title="Ready to strengthen your defenses?"
                description="Talk to our security experts about your environment, your risks, and the fastest path to a stronger posture."
                primary={{ label: "Contact Sales", to: "/contact" }}
                secondary={{ label: "Explore Solutions", to: "/solutions" }}
            />
        </main>
    );
};

export default Services;
