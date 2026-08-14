# Turrpo Ideas website

Product site for Turrpo Ideas. The site exists to promote one thing, an inline
IDS/IPS appliance, with the consulting pages supporting it.
React 19 + Vite 6 + React Router 7 + Tailwind CSS v4.

## Commands

```bash
npm install
npm run dev      # dev server with HMR
npm run build    # production build to dist/
npm run preview  # serve the production build locally
npm run lint     # ESLint (.js/.jsx only, see "Type checking" below)
npx tsc --noEmit # type-check the .ts/.tsx sources
```

There is no test suite in this project.

## Routes

| Route        | Page                                                       |
| ------------ | ---------------------------------------------------------- |
| `/`          | Home: hero, trust signals, product spotlight, industries   |
| `/product`   | The appliance landing page (see below)                     |
| `/services`  | Service lines                                              |
| `/solutions` | Solution areas                                             |
| `/about`     | Company                                                    |
| `/contact`   | Contact form                                               |

`/device`, `/blog`, `/resources`, `/case-studies`, `/compliance` and `/soc`
were removed. `App.jsx` redirects each to its nearest surviving page rather
than 404ing, so any link already out in the world keeps working. Delete those
redirects once you're confident nothing points at them.

## Structure

```
src/
├── components/
│   ├── ui/          design-system primitives (see below)
│   ├── product/     pieces used only by the product page
│   ├── Navbar.jsx   header + mobile drawer
│   ├── Footer.jsx
│   ├── ErrorBoundary.tsx
│   ├── ScrollToTop.tsx
│   └── RouteFallback.tsx
├── pages/           one component per route
├── services/        contact submission
├── constants/       site.ts (brand, nav) · product.ts (all product copy)
├── lib/utils.ts     cn() is clsx + tailwind-merge
└── tailwind.css     design tokens (@theme), fonts, keyframes
```

## Design system

The site is **dark end to end**. `index.html` puts `dark` on `<html>`, which
flips the token block in `tailwind.css` for the whole document. Pages therefore
style themselves from tokens (`bg-background`, `text-foreground`, `bg-card`,
`border-border`) and never hardcode a light-on-dark colour. The light palette
is still defined under `:root`. Remove the class from `<html>` and the whole
site returns to it without a single page changing.

**Surface ladder**, darkest to lightest: `--background` < `--band-muted` <
`--band-deep` < `--card`. Card is the highest surface, so it lifts off every
band.

The dark values are navy-tinted, not Tailwind's neutral slate steps. The
original set (`#020617` / `#0b1120` / `#0f172a` / `#0f172a`) put every level
within ~3 L\* of the next and made `--card` **identical** to `--band-deep`, so
pages read as one flat black slab and cards had no surface. Keep the steps at
roughly ΔL\* 2 to 4 if you retune them, and keep `--border` about 9 L\* above
`--card` or card edges disappear.

**Band rhythm**: no two adjacent Sections share a tone, and the band above a
`CtaBand` is never `deep` (they would merge into one slab).

`src/components/ui/` holds the shared primitives. Prefer composing these over
writing new class strings:

| Component                       | Purpose                                             |
| ------------------------------- | --------------------------------------------------- |
| `PageHero`                      | Opening band of every page, owns the `h1`           |
| `Section`                       | Page band: `tone`, `border`, `width`, `padding`      |
| `PageHeader`                    | Eyebrow / title / description stack, for sections    |
| `Card`, `CardIcon`, `CardTitle` | Surfaces. `interactive` = clickable, `hover` = lift  |
| `Button`                        | shadcn button (cva variants)                         |
| `StatGrid`                      | Metric rows                                          |
| `CtaBand`                       | Closing "talk to us" band                            |
| `Field`                         | Labelled input + inline validation wiring            |
| `ToastProvider` / `useToast`    | Notifications                                        |
| `Reveal`                        | Fade-in-on-scroll wrapper (+ `scrollToSection`)      |

`PageHero` renders the page's only `h1`, so pages must not render another.
Pass `aside` for a two-column hero (the product page puts its diagram there),
omit it for a centred one.

`Card` distinguishes `interactive` (the whole card is a link, adds
`cursor-pointer` and a focus ring) from `hover` (visual lift only). Use
`interactive` only where a click actually does something.

## The product page (`/product`)

**Bomis**, Boundary Oriented Malware Inspection System. Hero with an animated
modem → device → router diagram, problem/solution, live view, how-it-works,
features, pricing, and an early-access signup.

```
src/pages/Product.tsx             the page, sections in order
src/constants/product.ts          all copy, pricing, packet-feed script
src/components/product/
├── InlineDiagram.tsx             hero diagram, CSS-animated (also on Home)
├── LiveFeed.tsx                  simulated dashboard (the centrepiece)
└── EarlyAccessForm.tsx           signup + success state
```

**Branding** lives entirely in `PRODUCT` (`src/constants/product.ts`): `name`,
`shortName`, `expansion`, `kind`, `hostname`. Nothing else hardcodes the name.
`shortName` is used where a long name would not fit: the hero diagram node and
the dashboard title bar.

**The live view is fake, on purpose.** `LiveFeed` generates its feed in the
browser from the scripted cycle in `product.ts`; no packets are captured and
nothing is fetched. Source addresses come only from the RFC 5737 documentation
ranges (`198.51.100.0/24`, `203.0.113.0/24`) so no example ever points at a
real host. The panel is labelled "Simulated" in its own chrome, and the line
under it reads "Simulated data, not a real capture". Keep both if you edit it:
without them a dark feed of IP addresses and DROPPED verdicts reads as genuine
captured traffic. Its timers stop when the panel scrolls out of view or the
visitor pauses it.

**Copy conventions**: no em dashes and no en dashes anywhere, and the word
"demo" is not used in visitor-facing text. Use a colon, comma, full stop or
parentheses instead.

**The signup form is a front-end mock.** It validates and shows a success
state; it does not post or persist anything. Wire it to an endpoint (see
`src/services/contact.ts` for the pattern) before collecting real signups.

**Pricing is a placeholder.** The figure in `PRICING` is indicative and the
page says so under it.

## Type checking

ESLint is configured for `.js`/`.jsx` only, so most of `src/` is not linted.
Run `npx tsc --noEmit` as the type gate before committing. Add
`--noUnusedLocals` to catch dead imports, which nothing else in this project
will. Adding `typescript-eslint` would close the gap properly.

## Contact form

The site has no backend. The contact form opens the visitor's mail client
unless `VITE_CONTACT_ENDPOINT` is set, in which case it POSTs JSON there.
See [CONTACT-FORM.md](./CONTACT-FORM.md) for the endpoint contract.

## Assets

Size source images to roughly 2× their largest rendered size, then stop.

The only image the site ships now is `logo.png`. `bomis-shield.jpg` went with
the old Bomis page that used it. The product page draws its hero as animated
markup instead, so there is no hero image to keep in sync.

## Deployment

`vercel.json` rewrites all paths to `index.html` so client-side routes resolve
on direct visits.
