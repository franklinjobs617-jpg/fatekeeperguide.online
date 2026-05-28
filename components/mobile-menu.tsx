"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/lib/site";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="btn-ghost min-h-11 px-4"
        aria-expanded={open}
        aria-controls="mobile-guide-menu"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close" : "Menu"}
      </button>

      {open && (
        <div id="mobile-guide-menu" className="mobile-menu-panel p-4">
          <div className="border-b border-graphite pb-3">
            <span className="mono-label">Fatekeeper sections</span>
          </div>
          <nav className="mt-4 grid gap-2" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="pill justify-start" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href="/fatekeeper/beginner-guide" className="btn-primary justify-start" onClick={() => setOpen(false)}>
              Beginner guide
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
