"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type SearchItem = {
  title: string;
  href: string;
  category: string;
  description: string;
  status: string;
};

export function GuideSearch({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState("");

  const matches = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return items.slice(0, 6);
    }

    return items
      .filter((item) =>
        [item.title, item.category, item.description, item.status]
          .join(" ")
          .toLowerCase()
          .includes(normalized)
      )
      .slice(0, 8);
  }, [items, query]);

  return (
    <div className="surface p-5 md:p-6">
      <label className="kicker" htmlFor="guide-search">
        Guide search
      </label>
      <div className="mt-3">
        <input
          id="guide-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="under-input"
          placeholder="Search builds, weapons, spells, bosses..."
        />
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {matches.map((item) => (
          <Link key={item.href} href={item.href} className="surface-tight surface-link p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="mono-label">{item.category}</span>
              <span className="status-pill">
                {item.status}
              </span>
            </div>
            <div className="mt-3 text-[17px] font-medium leading-tight text-white">{item.title}</div>
            <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-silver-text">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
