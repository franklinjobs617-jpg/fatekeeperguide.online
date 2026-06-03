import Link from "next/link";
import { navLinks } from "@/lib/site";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container flex min-h-[72px] items-center justify-between gap-5">
        <Link href="/" className="brand-mark" aria-label="Fatekeeper Wiki home">
          Fatekeeper Wiki
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

        <Link href="/wiki" className="hidden btn-ghost lg:inline-flex">
          Open wiki
        </Link>

        <MobileMenu />
      </div>
    </header>
  );
}
