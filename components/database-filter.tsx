import Link from "next/link";

const items = [
  { label: "Weapons", href: "/fatekeeper/weapons" },
  { label: "Spells", href: "/fatekeeper/spells" },
  { label: "Relics", href: "/fatekeeper/relics" },
  { label: "Enemies", href: "/fatekeeper/enemies" },
  { label: "World", href: "/fatekeeper/world" }
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
