import {
    GraduationCap,
    Lock,
    Search,
    ShieldCheck,
    Siren,
    Zap,
} from "lucide-react";
import { Card, CardDescription, CardIcon, CardTitle } from "@/components/ui/card";
import { CtaBand } from "@/components/ui/cta-band";
import { PageHeader } from "@/components/ui/page-header";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { SITE } from "@/constants/site";

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
    { value: String(SITE.foundedYear), label: "Founded" },
    { value: "1k+", label: "Customers Globally" },
    { value: "50+", label: "Projects Completed" },
    { value: "95%", label: "Client Retention Rate" },
];

const About = () => {
    return (
        <main className="bg-background text-foreground">
            <PageHero
                eyebrow="About Us"
                title={`Learn more about ${SITE.name}`}
                description={`${SITE.name} has been a leader in the cybersecurity industry since ${SITE.foundedYear}. Our mission is to provide top-notch security solutions to protect your digital assets.`}
            />

            {/* Story + at a glance */}
            <Section>
                <div className="grid items-start gap-8 lg:grid-cols-[1.4fr_1fr]">
                    <Card padding="lg">
                        <h2 className="mb-5 text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                            Staying ahead of an ever-evolving threat landscape
                        </h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                                Our team of experts is dedicated to staying ahead
                                of the latest threats and ensuring that your
                                business remains secure in an ever-evolving
                                digital landscape.
                            </p>
                            <p>
                                We offer a wide range of services, including
                                network security, endpoint security, cloud
                                security, and application security. Our
                                customized solutions are designed to meet the
                                unique needs of each client.
                            </p>
                        </div>
                    </Card>

                    <Card
                        asChild
                        padding="lg"
                        className="border-sky-500/30 bg-sky-500/10"
                    >
                        <aside>
                            <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-primary">
                                At a Glance
                            </h2>
                            <dl className="grid grid-cols-2 gap-6">
                                {AT_A_GLANCE.map((item) => (
                                    <div key={item.label}>
                                        <dd className="font-heading text-3xl font-bold text-foreground">
                                            {item.value}
                                        </dd>
                                        <dt className="mt-1 text-sm text-muted-foreground">
                                            {item.label}
                                        </dt>
                                    </div>
                                ))}
                            </dl>
                        </aside>
                    </Card>
                </div>
            </Section>

            {/* What we do */}
            <Section tone="muted" border="y" padding="lg">
                <PageHeader
                    title="Comprehensive cybersecurity solutions"
                    description="Six practice areas, one goal: keeping your organization secure."
                    className="mb-12"
                />
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {SERVICES.map(({ icon, title, description }) => (
                        <Card key={title} hover>
                            <CardIcon icon={icon} className="mb-4" />
                            <CardTitle className="mb-2">{title}</CardTitle>
                            <CardDescription>{description}</CardDescription>
                        </Card>
                    ))}
                </div>
            </Section>

            <CtaBand
                title="Work with a team that treats your security as its own"
                description="Tell us about your environment and we'll show you where we can help."
                primary={{ label: "Contact Sales", to: "/contact" }}
                secondary={{ label: "Explore Services", to: "/services" }}
            />
        </main>
    );
};

export default About;
