import { Link } from 'react-router-dom';
import { Clock, Globe, Mail, MapPin, MessageCircle, Phone, Rss } from 'lucide-react';
import logo from '../assets/images/logo.png';
import { FOOTER_LINKS, LEGAL_LINKS, SITE, SOCIAL_LINKS } from '@/constants/site';

/**
 * Dark navy anchor at the bottom of every page.
 *
 * `dark` on the <footer> inverts the design tokens for this subtree only, so
 * everything inside styles itself with the same token names the light pages
 * use (text-foreground, text-muted-foreground, border-border) and nothing
 * hardcodes a light-on-dark colour.
 */

const linkClasses =
  'rounded text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const headingClasses =
  'mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-foreground';

const LINK_COLUMNS = [
  { heading: 'Product', links: FOOTER_LINKS.product },
  { heading: 'Company', links: FOOTER_LINKS.company },
  { heading: 'Resources', links: FOOTER_LINKS.resources },
];

/*
 * This build of lucide-react ships no brand icons, so the social row uses
 * generic glyphs. They are placeholders pointing at `#` (see SOCIAL_LINKS);
 * the aria-label is what carries the meaning.
 */
const SOCIAL_ICONS = [Globe, MessageCircle, Rss, Mail];

const CONTACT_ROWS = [
  { icon: MapPin, content: SITE.address },
  { icon: Phone, content: SITE.phone, href: `tel:${SITE.phoneHref}` },
  { icon: Mail, content: SITE.email, href: `mailto:${SITE.email}`, breakAll: true },
  { icon: Clock, content: SITE.hours },
];

const Footer = () => {
  return (
    <footer className="dark bg-background text-muted-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-12 lg:px-10">
        {/* Branding */}
        <div className="lg:col-span-4">
          <div className="mb-4 flex items-center gap-2">
            <img
              src={logo}
              alt=""
              width="40"
              height="40"
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="font-heading text-lg font-bold text-foreground">
              {SITE.name}
            </span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed">
            Since {SITE.foundedYear}, {SITE.name} has been a trusted partner in
            cybersecurity, protecting networks, endpoints, cloud workloads and
            the people who use them.
          </p>

          <ul className="mt-6 flex items-center gap-3">
            {SOCIAL_LINKS.map((social, index) => {
              const Icon = SOCIAL_ICONS[index % SOCIAL_ICONS.length];
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground
                    transition-colors duration-200 hover:border-primary hover:text-foreground
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {LINK_COLUMNS.map((column) => (
          <nav
            key={column.heading}
            aria-label={column.heading}
            className="lg:col-span-2"
          >
            <h2 className={headingClasses}>{column.heading}</h2>
            <ul className="space-y-2.5">
              {column.links.map((link) => (
                <li key={`${link.label}-${link.to}`}>
                  <Link to={link.to} className={linkClasses}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        {/* Contact. Every entry is a working action, not a placeholder. */}
        <div className="lg:col-span-2">
          <h2 className={headingClasses}>Contact</h2>
          <ul className="space-y-3 text-sm">
            {CONTACT_ROWS.map(({ icon: Icon, content, href, breakAll }) => (
              <li key={content} className="flex items-start gap-2.5">
                <Icon
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                {href ? (
                  <a
                    href={href}
                    className={breakAll ? `${linkClasses} break-all` : linkClasses}
                  >
                    {content}
                  </a>
                ) : (
                  <span>{content}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm sm:flex-row sm:px-6 lg:px-10">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  {/* Placeholder until these pages exist. See constants/site.ts */}
                  <a href={link.href} className={linkClasses}>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/contact" className={linkClasses}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
