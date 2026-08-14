import {
    Cloud,
    Crosshair,
    FileLock2,
    LockKeyhole,
    MonitorSmartphone,
    Radar,
    ShieldCheck,
} from "lucide-react";
import { Card, CardDescription, CardIcon, CardTitle } from "@/components/ui/card";
import { CtaBand } from "@/components/ui/cta-band";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";

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
            <PageHero
                eyebrow="Cybersecurity Solutions"
                title="Comprehensive protection for your digital assets"
                description="Cutting-edge solutions designed to protect your organization from evolving threats. Our comprehensive approach keeps your digital infrastructure secure, compliant, and resilient."
            />

            <Section padding="lg">
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {SOLUTIONS.map(({ icon, title, description, features }) => (
                        <Card key={title} hover className="flex flex-col">
                            <CardIcon icon={icon} className="mb-4" />
                            <CardTitle as="h2" className="mb-2">
                                {title}
                            </CardTitle>
                            <CardDescription className="mb-5">
                                {description}
                            </CardDescription>
                            <ul className="mt-auto space-y-2 border-t border-border pt-4">
                                {features.map((feature) => (
                                    <li
                                        key={feature}
                                        className="flex items-center gap-2 text-sm text-muted-foreground"
                                    >
                                        <ShieldCheck
                                            className="h-4 w-4 shrink-0 text-primary"
                                            aria-hidden="true"
                                        />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    ))}
                </div>
            </Section>

            <CtaBand
                title="Ready to secure your organization?"
                description="Contact us today to discuss how these solutions map onto your environment."
                primary={{ label: "Get Started", to: "/contact" }}
                secondary={{ label: "See the Product", to: "/product" }}
            />
        </main>
    );
};

export default Solutions;
