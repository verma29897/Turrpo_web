import { useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import {
    ArrowRight,
    BookOpen,
    Briefcase,
    ClipboardList,
    Download,
    FileCheck2,
    Layers,
    ListChecks,
    Loader2,
    Newspaper,
    ScrollText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Resource = {
    title: string;
    type: string;
    description: string;
    category: string;
    filename: string;
};

const RESOURCES: Resource[] = [
    {
        title: "Cybersecurity Best Practices Guide",
        type: "PDF Guide",
        description:
            "A comprehensive guide covering essential cybersecurity practices for businesses of all sizes.",
        category: "Guides",
        filename: "cybersecurity-best-practices-guide.pdf",
    },
    {
        title: "Zero Trust Architecture Whitepaper",
        type: "Whitepaper",
        description:
            "Learn how to implement zero-trust security models to protect your organization from modern threats.",
        category: "Whitepapers",
        filename: "zero-trust-architecture-whitepaper.pdf",
    },
    {
        title: "Ransomware Prevention Checklist",
        type: "Checklist",
        description:
            "Essential steps to protect your organization from ransomware attacks and data breaches.",
        category: "Checklists",
        filename: "ransomware-prevention-checklist.pdf",
    },
    {
        title: "Cloud Security Framework",
        type: "Framework",
        description:
            "A detailed framework for securing cloud infrastructure across multiple platforms.",
        category: "Frameworks",
        filename: "cloud-security-framework.pdf",
    },
    {
        title: "Incident Response Playbook",
        type: "Playbook",
        description:
            "Step-by-step guide for responding to security incidents effectively and minimizing damage.",
        category: "Playbooks",
        filename: "incident-response-playbook.pdf",
    },
    {
        title: "Compliance Requirements Guide",
        type: "Guide",
        description:
            "Understanding GDPR, HIPAA, PCI-DSS, and other compliance requirements for your industry.",
        category: "Compliance",
        filename: "compliance-requirements-guide.pdf",
    },
];

const CATEGORIES = [
    "All",
    "Guides",
    "Whitepapers",
    "Checklists",
    "Frameworks",
    "Playbooks",
    "Compliance",
];

const CATEGORY_ICONS: Record<string, typeof BookOpen> = {
    Guides: BookOpen,
    Whitepapers: ScrollText,
    Checklists: ListChecks,
    Frameworks: Layers,
    Playbooks: ClipboardList,
    Compliance: FileCheck2,
};

const RELATED_PAGES = [
    {
        icon: Briefcase,
        title: "Case Studies",
        description:
            "See how organizations across industries strengthened their security posture with Turrpo Ideas.",
        to: "/case-studies",
    },
    {
        icon: FileCheck2,
        title: "Compliance",
        description:
            "GDPR, HIPAA, PCI-DSS, SOC 2, ISO 27001, and NIST — how we help you meet regulatory requirements.",
        to: "/compliance",
    },
    {
        icon: Newspaper,
        title: "Blog",
        description:
            "The latest insights, trends, and best practices in cybersecurity from our team.",
        to: "/blog",
    },
];

const Resources = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [downloading, setDownloading] = useState<Record<number, boolean>>({});

    const handleDownload = async (resource: Resource, index: number) => {
        setDownloading((prev) => ({ ...prev, [index]: true }));

        try {
            const pdf = new jsPDF();

            pdf.setFontSize(20);
            pdf.setTextColor(3, 105, 161);
            pdf.text(resource.title, 20, 30);

            pdf.setFontSize(12);
            pdf.setTextColor(100, 100, 100);
            pdf.text("Turrpo Ideas - Cybersecurity Solutions", 20, 40);
            pdf.text("www.turrpo.com | krishna@turrpo.com", 20, 46);

            pdf.setDrawColor(3, 105, 161);
            pdf.line(20, 50, 190, 50);

            pdf.setFontSize(14);
            pdf.setTextColor(0, 0, 0);
            pdf.text("Description:", 20, 60);

            pdf.setFontSize(11);
            pdf.setTextColor(50, 50, 50);
            const descriptionLines = pdf.splitTextToSize(
                resource.description,
                170,
            );
            pdf.text(descriptionLines, 20, 70);

            let yPosition = 90;
            pdf.setFontSize(14);
            pdf.setTextColor(0, 0, 0);
            pdf.text("Overview:", 20, yPosition);

            yPosition += 10;
            pdf.setFontSize(11);
            pdf.setTextColor(50, 50, 50);

            const contentText = `This ${resource.type.toLowerCase()} provides comprehensive information about ${resource.title.toLowerCase()}.

Key topics covered:
• Best practices and industry standards
• Implementation guidelines
• Security considerations
• Compliance requirements
• Risk management strategies

This document is part of Turrpo Ideas' comprehensive cybersecurity resource library. For more detailed information or to discuss how we can help secure your organization, please contact us.

For inquiries, please email: krishna@turrpo.com

© ${new Date().getFullYear()} Turrpo Ideas. All rights reserved.`;

            const contentLines = pdf.splitTextToSize(contentText, 170);
            pdf.text(contentLines, 20, yPosition);

            const pageCount = pdf.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                pdf.setPage(i);
                pdf.setFontSize(10);
                pdf.setTextColor(150, 150, 150);
                pdf.text(`Page ${i} of ${pageCount}`, 190, 285, {
                    align: "right",
                });
            }

            pdf.save(resource.filename);
            await new Promise((resolve) => setTimeout(resolve, 500));
        } catch (error) {
            console.error("Download error:", error);
            alert(
                "Error generating PDF. Please try again or contact us at krishna@turrpo.com",
            );
        } finally {
            setDownloading((prev) => ({ ...prev, [index]: false }));
        }
    };

    const filteredResources =
        selectedCategory === "All"
            ? RESOURCES
            : RESOURCES.filter(
                  (resource) => resource.category === selectedCategory,
              );

    return (
        <main className="bg-background text-foreground">
            {/* Header */}
            <section className="bg-slate-900/50 border-b border-border">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
                        Resource Library
                    </p>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
                        Expert Insights and Tools for Cybersecurity
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        Access our library of cybersecurity resources, including
                        whitepapers, guides, frameworks, and tools to help
                        strengthen your organization&apos;s security posture.
                    </p>
                </div>
            </section>

            {/* Library */}
            <section className="bg-background">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
                    <div
                        role="group"
                        aria-label="Filter resources by category"
                        className="flex flex-wrap justify-center gap-2 mb-10"
                    >
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                type="button"
                                aria-pressed={selectedCategory === category}
                                onClick={() => setSelectedCategory(category)}
                                className={cn(
                                    "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                    selectedCategory === category
                                        ? "bg-sky-400 text-slate-950 border-sky-400"
                                        : "bg-card text-slate-400 border-border hover:text-white hover:border-slate-500",
                                )}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredResources.map((resource, index) => {
                            const Icon =
                                CATEGORY_ICONS[resource.category] ?? BookOpen;
                            const isDownloading = Boolean(downloading[index]);
                            return (
                                <article
                                    key={resource.title}
                                    className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-sky-500/60"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10">
                                            <Icon
                                                className="h-5 w-5 text-primary"
                                                aria-hidden="true"
                                            />
                                        </span>
                                        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-slate-300">
                                            {resource.type}
                                        </span>
                                    </div>
                                    <h2 className="text-lg font-semibold text-white mb-2">
                                        {resource.title}
                                    </h2>
                                    <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-1">
                                        {resource.description}
                                    </p>
                                    <Button
                                        onClick={() =>
                                            handleDownload(resource, index)
                                        }
                                        disabled={isDownloading}
                                        aria-busy={isDownloading}
                                        className="w-full transition-colors duration-200"
                                    >
                                        {isDownloading ? (
                                            <>
                                                <Loader2
                                                    className="mr-2 h-4 w-4 animate-spin"
                                                    aria-hidden="true"
                                                />
                                                Preparing PDF…
                                            </>
                                        ) : (
                                            <>
                                                <Download
                                                    className="mr-2 h-4 w-4"
                                                    aria-hidden="true"
                                                />
                                                Download
                                            </>
                                        )}
                                    </Button>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Related pages (formerly duplicated tabs) */}
            <section className="bg-slate-900/50 border-y border-border">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                            More from Turrpo Ideas
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Proof, compliance depth, and ongoing insights —
                            each in its own dedicated section.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-5">
                        {RELATED_PAGES.map(
                            ({ icon: Icon, title, description, to }) => (
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
                                        {title}
                                    </h3>
                                    <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-1">
                                        {description}
                                    </p>
                                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                                        Visit {title}
                                        <ArrowRight
                                            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </Link>
                            ),
                        )}
                    </div>
                </div>
            </section>

            {/* CTA band */}
            <section className="bg-slate-900">
                <div className="max-w-4xl mx-auto px-4 md:px-6 py-16 md:py-20 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                        Need help putting these into practice?
                    </h2>
                    <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
                        Our security experts can turn frameworks and checklists
                        into a working program for your organization.
                    </p>
                    <Button
                        asChild
                        size="lg"
                        className="px-8 text-base font-semibold transition-colors duration-200"
                    >
                        <Link to="/contact">
                            Schedule a Consultation
                            <ArrowRight
                                className="ml-2 h-4 w-4"
                                aria-hidden="true"
                            />
                        </Link>
                    </Button>
                </div>
            </section>
        </main>
    );
};

export default Resources;
