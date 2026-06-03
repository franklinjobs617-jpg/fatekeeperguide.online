import Link from "next/link";

const items = [
  { label: "Weapons", href: "/wiki/weapons" },
  { label: "Spells", href: "/wiki/spells" },
  { label: "Relics", href: "/wiki/relics" },
  { label: "Bosses", href: "/wiki/bosses" },
  { label: "Locations", href: "/wiki/locations" }
];

export function DatabaseFilter() {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {items.map((item) => {
        return (
          <Link key={item.href} href={item.href} className="pill">
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
