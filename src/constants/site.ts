/**
 * Single source of truth for brand + contact details and navigation.
 * Navbar, Footer, Contact and the PDF generator all read from here so the
 * company details can never drift apart between pages.
 */

export const SITE = {
    name: "Turrpo Ideas",
    tagline: "Your Trusted Cyber Security Partner",
    foundedYear: 2021,
    email: "krishna@turrpo.com",
    phone: "+91 7905968734",
    /** tel: href, digits only and no spaces */
    phoneHref: "+917905968734",
    address: "Noida Sector 62, Uttar Pradesh, India",
    hours: "Mon to Sat: 10:00 AM to 4:00 PM",
    website: "www.turrpo.com",
} as const;

/**
 * Primary navigation. Every entry resolves to a real route in App.jsx.
 *
 * Six links fit on one desktop line, which is why the navbar carries no
 * overflow dropdown any more. Adding a seventh means bringing one back.
 */
export const NAV_LINKS = [
    { label: "Home", to: "/" },
    { label: "Product", to: "/product" },
    { label: "Services", to: "/services" },
    { label: "Solutions", to: "/solutions" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
] as const;

/**
 * Footer columns. Every entry must resolve to a route that exists in App.jsx.
 * When a page is removed its link has to come out of here too, or the footer
 * starts shipping visitors to the 404.
 */
export const FOOTER_LINKS = {
    product: [
        { label: "Overview", to: "/product" },
        { label: "Live demo", to: "/product#demo" },
        { label: "Specifications", to: "/product#specs" },
        { label: "Pricing", to: "/product#pricing" },
    ],
    company: [
        { label: "About Us", to: "/about" },
        { label: "Services", to: "/services" },
        { label: "Solutions", to: "/solutions" },
        { label: "Contact Us", to: "/contact" },
    ],
    resources: [
        { label: "How it works", to: "/product#how-it-works" },
        { label: "Compare", to: "/product#compare" },
        { label: "Request a demo", to: "/product#signup" },
    ],
} as const;

/**
 * Social placeholders. This build of lucide-react ships no brand icons, and
 * these accounts do not exist yet, so they are generic glyphs on `#`. Give
 * them real URLs or delete the row before launch.
 */
export const SOCIAL_LINKS = [
    { label: "LinkedIn", href: "#" },
    { label: "X", href: "#" },
    { label: "GitHub", href: "#" },
    { label: "YouTube", href: "#" },
] as const;

/**
 * Legal links in the footer's bottom bar. `href: "#"` marks a page that does
 * not exist yet. Point these at real routes before launch rather than
 * shipping a link that goes nowhere.
 */
export const LEGAL_LINKS = [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
] as const;

/** Prefilled mailto used by the "Get a Free Consultation" CTA. */
export function consultationMailto(): string {
    const subject = encodeURIComponent("Free Consultation Request");
    const body = encodeURIComponent(
        `Hello ${SITE.name},\n\nI would like to request a free consultation regarding your cybersecurity services.\n\nCompany:\nMy role:\nWhat I need help with:\n\nThank you!`,
    );
    return `mailto:${SITE.email}?subject=${subject}&body=${body}`;
}
