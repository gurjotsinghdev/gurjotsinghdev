import "./globals.css";
import { Clock } from "../components/bits";
import Loader from "../components/loader";
import { studio, links } from "../lib/content";

export const metadata = {
  metadataBase: new URL("https://gurjotsinghdev.vercel.app"),
  title: `${studio.name} — Web Design, SEO & Hosting`,
  description: studio.sub,
  openGraph: {
    title: `${studio.name} — Web Design, SEO & Hosting`,
    description: studio.sub,
    type: "website",
    locale: "en_CA",
  },
  icons: { icon: "/favicon.png" },
};

export const viewport = {
  themeColor: "#0b0f12",
  width: "device-width",
  initialScale: 1,
};

const NAV = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Loader />

        <a className="skip" href="#main">
          Skip to content
        </a>

        <header className="nav">
          <div className="wrap nav__in">
            <a className="nav__brand" href="#top">
              <span className="nav__dot" aria-hidden="true" />
              {studio.name}
            </a>

            <nav className="nav__links" aria-label="Primary">
              {NAV.map((n) => (
                <a key={n.href} href={n.href}>
                  {n.label}
                </a>
              ))}
            </nav>

            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <Clock />
              <a
                className="mono"
                href={links.whatsapp}
                rel="noopener noreferrer"
                target="_blank"
                style={{ borderBottom: "2px solid var(--accent)", paddingBottom: 2 }}
              >
                GET IN TOUCH
              </a>
            </div>
          </div>
        </header>

        <main id="main">{children}</main>
      </body>
    </html>
  );
}
