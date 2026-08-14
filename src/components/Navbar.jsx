import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/images/logo.png';
import { NAV_LINKS, SITE } from '@/constants/site';
import { cn } from '@/lib/utils';

/**
 * Sticky site header, 75px tall. Anchored sections rely on that height for
 * their `scroll-mt`, so changing it means changing those too.
 *
 * All six nav links fit on one desktop line, so there is no overflow dropdown:
 * the desktop bar and the mobile drawer render the same NAV_LINKS list. A
 * seventh link would need that dropdown back rather than a wrapping bar.
 */

/*
 * Enterprise-vendor header: white bar, dark links, one solid blue CTA. The
 * active page is marked with an underline rule rather than a filled pill,
 * which is the convention this style of site uses.
 */
const linkClasses = ({ isActive }) =>
  cn(
    'relative block whitespace-nowrap px-3 py-2 text-[0.95rem] font-medium transition-colors duration-200 rounded',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card',
    'after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:rounded-full after:transition-colors after:duration-200',
    isActive
      ? 'text-primary after:bg-primary'
      : 'text-foreground/80 hover:text-primary after:bg-transparent',
  );

const ctaClasses =
  'cursor-pointer whitespace-nowrap rounded-md bg-primary font-semibold text-primary-foreground ' +
  'transition-colors duration-200 hover:bg-[#0b3c88] ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);
  const drawerId = useId();
  const { pathname } = useLocation();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Navigating away should always leave the drawer closed.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // While the drawer covers the page, the page behind it must not scroll.
  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-[1000] border-b border-border bg-card/95 shadow-sm backdrop-blur-xl backdrop-saturate-150">
      <nav
        aria-label="Main"
        className="mx-auto flex h-[75px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10"
      >
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        >
          <img
            src={logo}
            alt=""
            width="40"
            height="40"
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="font-heading text-xl font-bold tracking-tight text-foreground">
            {SITE.name}
          </span>
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden shrink-0 items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === '/'} className={linkClasses}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            to="/product#signup"
            className={cn(
              ctaClasses,
              'hidden shrink-0 px-5 py-2.5 text-[0.95rem] md:inline-block',
            )}
          >
            Request a Demo
          </Link>

          <button
            ref={toggleRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls={drawerId}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((value) => !value)}
            className="cursor-pointer rounded-md border border-border p-2.5 text-foreground/80 transition-colors duration-200 hover:bg-secondary hover:text-foreground
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card lg:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-x-0 bottom-0 top-[75px] z-40 bg-navy/40 lg:hidden"
            onClick={closeMenu}
            aria-hidden="true"
          />
          <div
            id={drawerId}
            className="absolute inset-x-0 top-full z-50 max-h-[calc(100vh-75px)] overflow-y-auto border-t border-border bg-card p-4 shadow-2xl motion-safe:animate-drawer-in lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={closeMenu}
                    className={linkClasses}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <Link
              to="/product#signup"
              onClick={closeMenu}
              className={cn(ctaClasses, 'mt-5 block px-5 py-3 text-center text-[0.95rem]')}
            >
              Request a Demo
            </Link>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
