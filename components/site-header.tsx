import Link from "next/link";
import { navLinks } from "@/lib/site";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container flex min-h-[72px] items-center justify-between gap-5">
        <Link href="/" className="brand-mark" aria-label="Fatekeeper Guide home">
          Fatekeeper Guide
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[14px] font-medium text-silver-text transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/#guide-search" className="hidden btn-ghost lg:inline-flex">
          Search guides
        </Link>

        <MobileMenu />
      </div>
    </header>
  );
}
