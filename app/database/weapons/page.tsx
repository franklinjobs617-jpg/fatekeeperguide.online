'use client';

import { useState } from 'react';
import Link from 'next/link';
import { weapons, spells, mechanics, TOOL_NOTICE, type DataConfidence } from '@/lib/game-data';

function Badge({ c }: { c: DataConfidence }) {
  return <span className={`pill text-[11px] ${c==='verified'?'status-verified':'status-analysis'}`}>{c==='verified'?'✓ Verified':'Community'}</span>;
}

export default function WeaponsDb() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const allItems = [
    ...weapons.map(w => ({ ...w, kind: 'weapon' as const })),
    ...spells.map(s => ({ ...s, kind: 'spell' as const, type: s.type })),
  ];

  const filtered = allItems.filter(item => {
    if (filter === 'weapons' && item.kind !== 'weapon') return false;
    if (filter === 'spells' && item.kind !== 'spell') return false;
    if (search) { const q = search.toLowerCase(); if (!item.name.toLowerCase().includes(q) && !item.effect.toLowerCase().includes(q)) return false; }
    return true;
  });

  return (
    <main className="container py-8">
      <div className="surface p-4 mb-6"><p className="text-[13px] leading-6 text-silver-text">{TOOL_NOTICE}</p></div>
      <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl border border-graphite mb-8">
        <img src="/images/fatekeeper-gameplay-reveal.jpg" alt="Fatekeeper weapons and spells database" className="h-full w-full object-cover" />
      </div>
      <Link href="/" className="btn-ghost mb-6 inline-block">← Home</Link>
      <h1 className="section-title mt-4">Weapons & Spells Database</h1>
      <p className="mt-3 text-[16px] leading-7 text-off-white max-w-3xl">All verified weapons, spells, and relics from Fatekeeper Early Access. Data sourced from Xmodhub guide and community testing.</p>

      <div className="mt-6 flex flex-wrap gap-3 items-center">
        <input type="text" placeholder="Search by name or effect..." value={search} onChange={e => setSearch(e.target.value)} className="surface-tight flex-1 min-w-[200px] p-3 text-[14px] text-white placeholder-silver-text/40" />
        <button onClick={() => setFilter('all')} className={`pill px-4 py-2 text-[13px] ${filter==='all'?'status-verified':''}`}>All ({allItems.length})</button>
        <button onClick={() => setFilter('weapons')} className={`pill px-4 py-2 text-[13px] ${filter==='weapons'?'status-verified':''}`}>Weapons ({weapons.length})</button>
        <button onClick={() => setFilter('spells')} className={`pill px-4 py-2 text-[13px] ${filter==='spells'?'status-verified':''}`}>Spells & Relics ({spells.length})</button>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {filtered.map(item => (
          <div key={item.id} className="surface surface-link p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-[20px] font-medium text-white">{item.name}</h3>
                  <Badge c={item.confidence} />
                </div>
                <p className="mt-2 text-[14px] leading-6 text-silver-text">{item.effect}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="mono-label">{item.kind === 'weapon' ? (item as any).type : (item as any).type}</span>
              <span className="mono-label">{item.location}</span>
              {item.kind === 'weapon' && (item as any).scaling && <span className="mono-label">{(item as any).scaling}</span>}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
