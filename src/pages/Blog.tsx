import { Link } from "react-router-dom";
import {
    ArrowLeftRight,
    ArrowRight,
    Bug,
    Database,
    Filter,
    LockKeyhole,
    Mail,
    ServerCrash,
    ShieldCheck,
    ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ATTACKS = [
    {
        icon: Mail,
        title: "Phishing",
        description:
            "A technique where attackers trick individuals into providing sensitive information by pretending to be a trustworthy entity.",
        countermeasure:
            "Educate users about phishing tactics, use email filtering, and implement multi-factor authentication.",
    },
    {
        icon: Bug,
        title: "Malware",
        description:
            "Malicious software designed to harm or exploit any programmable device, service, or network.",
        countermeasure:
            "Use antivirus software, keep systems updated, and avoid downloading software from untrusted sources.",
    },
    {
        icon: LockKeyhole,
        title: "Ransomware",
        description:
            "A type of malware that encrypts the victim's files and demands a ransom to restore access.",
        countermeasure:
            "Regularly back up data, use robust security software, and educate users on safe email practices.",
    },
    {
        icon: ServerCrash,
        title: "Denial of Service (DoS)",
        description:
            "An attack that aims to make a machine or network resource unavailable to its intended users by overwhelming it with a flood of internet traffic.",
        countermeasure:
            "Implement network security measures such as firewalls and intrusion detection systems, and use traffic analysis tools.",
    },
    {
        icon: ArrowLeftRight,
        title: "Man-in-the-Middle (MitM)",
        description:
            "An attack where the attacker secretly intercepts and relays messages between two parties who believe they are directly communicating with each other.",
        countermeasure:
            "Use encryption protocols like HTTPS, implement VPNs, and educate users on secure communication practices.",
    },
    {
        icon: Database,
        title: "SQL Injection",
        description:
            "A code injection technique that might destroy your database. It is one of the most common web hacking techniques.",
        countermeasure:
            "Use parameterized queries, validate user inputs, and implement web application firewalls.",
    },
];

function TopicTag({ children }: { children: string }) {
    return (
        <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-slate-300">
            {children}
        </span>
    );
}

const Blog = () => {
    return (
        <main className="bg-background text-foreground">
            {/* Header */}
            <section className="bg-slate-900/50 border-b border-border">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
                        Cyber Security Blog
                    </p>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 max-w-3xl mx-auto">
                        Stay Updated with the Latest in Cyber Security
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        Insights, fundamentals, and practical countermeasures
                        from the Turrpo Ideas team.
                    </p>
                </div>
            </section>

            {/* Article: Netfilter */}
            <section className="bg-background">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
                    <article className="rounded-xl border border-border bg-card p-8 md:p-10 shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="hidden sm:inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-sky-500/10">
                                <Filter
                                    className="h-5 w-5 text-primary"
                                    aria-hidden="true"
                                />
                            </div>
                            <div>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    <TopicTag>Linux</TopicTag>
                                    <TopicTag>Networking</TopicTag>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
                                    What is Netfilter?
                                </h2>
                                <p className="max-w-3xl text-slate-300 leading-relaxed">
                                    Netfilter is a framework provided by the
                                    Linux kernel that allows various
                                    networking-related operations to be
                                    implemented in the form of customized
                                    handlers. It provides functionalities such
                                    as packet filtering, network address
                                    translation (NAT), and port translation.
                                    Netfilter is a crucial component in
                                    building firewalls and managing network
                                    traffic.
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </section>

            {/* Article: Attack types */}
            <section className="bg-slate-900/50 border-y border-border">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
                    <article>
                        <header className="text-center max-w-2xl mx-auto mb-12">
                            <div className="flex justify-center gap-2 mb-4">
                                <TopicTag>Threats</TopicTag>
                                <TopicTag>Best Practices</TopicTag>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                                Types of Cyber Attacks and Countermeasures
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Cyber attacks come in various forms, each with
                                its own methods and objectives. Here are some
                                common types of cyber attacks and their
                                countermeasures.
                            </p>
                        </header>

                        <div className="grid md:grid-cols-2 gap-5">
                            {ATTACKS.map(
                                ({
                                    icon: Icon,
                                    title,
                                    description,
                                    countermeasure,
                                }) => (
                                    <div
                                        key={title}
                                        className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-sky-500/60"
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-500/10">
                                                <Icon
                                                    className="h-5 w-5 text-primary"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                            <h3 className="text-lg font-semibold text-white">
                                                {title}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-1">
                                            {description}
                                        </p>
                                        <div className="rounded-lg bg-sky-500/10 p-4">
                                            <p className="flex items-start gap-2 text-sm text-slate-300 leading-relaxed">
                                                <ShieldCheck
                                                    className="h-4 w-4 mt-0.5 shrink-0 text-primary"
                                                    aria-hidden="true"
                                                />
                                                <span>
                                                    <strong className="font-semibold text-white">
                                                        Countermeasure:{" "}
                                                    </strong>
                                                    {countermeasure}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    </article>
                </div>
            </section>

            {/* CTA band */}
            <section className="bg-slate-900">
                <div className="max-w-4xl mx-auto px-4 md:px-6 py-16 md:py-20 text-center">
                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                        <ShieldAlert
                            className="h-6 w-6 text-sky-400"
                            aria-hidden="true"
                        />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                        Put these insights into action
                    </h2>
                    <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
                        Download our guides, checklists, and frameworks — or
                        talk to our team about defending your organization.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Button
                            asChild
                            size="lg"
                            className="px-8 text-base font-semibold transition-colors duration-200"
                        >
                            <Link to="/resources">
                                Browse Resource Library
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
                            <Link to="/contact">Contact Sales</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Blog;
