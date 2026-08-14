import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

type CtaLink = { label: string; to: string };

/**
 * Closing "talk to us" band. Eight pages ended with a hand-rolled copy of this
 * markup; they now all render this component.
 */
export function CtaBand({
    title,
    description,
    primary = { label: "Contact Sales", to: "/contact" },
    secondary,
}: {
    title: string;
    description: string;
    primary?: CtaLink;
    secondary?: CtaLink;
}) {
    return (
        <Section tone="deep" width="narrow" containerClassName="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
                {title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
                {description}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                    asChild
                    size="lg"
                    className="px-8 text-base font-semibold transition-colors duration-200"
                >
                    <Link to={primary.to}>
                        {primary.label}
                        <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                </Button>
                {secondary && (
                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="px-8 text-base font-semibold bg-transparent text-foreground border-white/30 hover:bg-white/10 hover:text-foreground transition-colors duration-200"
                    >
                        <Link to={secondary.to}>{secondary.label}</Link>
                    </Button>
                )}
            </div>
        </Section>
    );
}
