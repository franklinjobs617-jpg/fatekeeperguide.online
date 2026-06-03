'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { areas, weapons, spells, TOOL_NOTICE } from '@/lib/game-data';

const STORAGE_KEY = 'fatekeeper-progress';

interface Progress { clearedAreas: string[]; foundWeapons: string[]; foundSpells: string[]; level: number; vig: number; mainStat: number; notes: string; }

function ld(): Progress { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)??'{}'); } catch { return {clearedAreas:[],foundWeapons:[],foundSpells:[],level:1,vig:10,mainStat:10,notes:''}; } }
function sv(p: Progress) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch {} }

export default function ProgressTracker() {
  const [p, setP] = useState<Progress>(() => ld());

  const up = (patch: Partial<Progress>) => { const n = {...p, ...patch}; setP(n); sv(n); };
  const ta = (id: string) => up({clearedAreas: p.clearedAreas.includes(id) ? p.clearedAreas.filter(x=>x!==id) : [...p.clearedAreas, id]});
  const tw = (id: string) => up({foundWeapons: p.foundWeapons.includes(id) ? p.foundWeapons.filter(x=>x!==id) : [...p.foundWeapons, id]});
  const ts = (id: string) => up({foundSpells: p.foundSpells.includes(id) ? p.foundSpells.filter(x=>x!==id) : [...p.foundSpells, id]});

  const areaPct = Math.round((p.clearedAreas.length / areas.length) * 100);

  return (
    <main className="container py-8">
      <div className="surface p-4 mb-6"><p className="text-[13px] leading-6 text-silver-text">{TOOL_NOTICE}</p></div>
      <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl border border-graphite mb-8">
        <Image src="/images/fatekeeper-extended-demo.jpg" alt="Fatekeeper Progress Tracker - track your campaign" fill sizes="(max-width: 768px) 100vw, 1200px" className="object-cover" />
      </div>
      <Link href="/" className="btn-ghost mb-6 inline-block">← Home</Link>
      <h1 className="section-title mt-4">Progress Tracker</h1>
      <p className="mt-3 text-[16px] leading-7 text-off-white max-w-3xl">Track your Fatekeeper campaign. Check off areas, weapons, and spells as you progress. Data saved to your browser.</p>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-4">
        {[
          { l: 'Level', v: p.level, up: () => up({level: p.level+1}), dn: () => up({level: Math.max(1, p.level-1)}) },
          { l: 'Vigor', v: p.vig, up: () => up({vig: p.vig+1}), dn: () => up({vig: Math.max(1, p.vig-1)}) },
          { l: 'Main Stat', v: p.mainStat, up: () => up({mainStat: p.mainStat+1}), dn: () => up({mainStat: Math.max(1, p.mainStat-1)}) },
          { l: 'Areas', v: `${areaPct}%` },
        ].map(s => (
          <div key={s.l} className="surface p-4 text-center">
            <p className="mono-label">{s.l}</p>
            <p className="text-[28px] font-medium text-white mt-2">{s.v}</p>
            {s.up && <div className="flex justify-center gap-2 mt-2"><button onClick={s.dn} className="text-[18px] text-silver-text hover:text-white">−</button><button onClick={s.up} className="text-[18px] text-silver-text hover:text-white">+</button></div>}
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Areas */}
        <div className="surface p-5">
          <h2 className="text-[20px] font-medium text-white mb-4">Areas ({p.clearedAreas.length}/{areas.length})</h2>
          <div className="space-y-2">
            {areas.map(a => (
              <label key={a.id} className={`flex items-start gap-3 p-3 rounded cursor-pointer transition ${p.clearedAreas.includes(a.id) ? 'bg-cadmium-green/10 ring-1 ring-cadmium-green/30' : 'surface-tight surface-link'}`}>
                <input type="checkbox" checked={p.clearedAreas.includes(a.id)} onChange={() => ta(a.id)} className="mt-1 accent-cadmium-green" />
                <div>
                  <span className="text-[15px] font-medium text-white">{a.name}</span>
                  <span className="mono-label ml-2">#{a.order}</span>
                  <p className="mt-1 text-[12px] text-silver-text">{a.tip}</p>
                  {a.boss && <p className="mt-1 text-[11px] text-cadmium-green">Boss: {a.boss}</p>}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Collection + Notes */}
        <div className="space-y-4">
          <div className="surface p-5">
            <h2 className="text-[20px] font-medium text-white mb-4">Weapons ({p.foundWeapons.length}/{weapons.length})</h2>
            {weapons.map(w => (
              <label key={w.id} className={`flex items-center gap-3 py-2 cursor-pointer ${p.foundWeapons.includes(w.id) ? 'text-cadmium-green' : 'text-silver-text'}`}>
                <input type="checkbox" checked={p.foundWeapons.includes(w.id)} onChange={() => tw(w.id)} className="accent-cadmium-green" />
                <span className="text-[14px]">{w.name}</span>
                <span className="mono-label text-[10px]">{w.location}</span>
              </label>
            ))}
          </div>

          <div className="surface p-5">
            <h2 className="text-[20px] font-medium text-white mb-4">Spells & Relics ({p.foundSpells.length}/{spells.length})</h2>
            {spells.map(s => (
              <label key={s.id} className={`flex items-center gap-3 py-2 cursor-pointer ${p.foundSpells.includes(s.id) ? 'text-cadmium-green' : 'text-silver-text'}`}>
                <input type="checkbox" checked={p.foundSpells.includes(s.id)} onChange={() => ts(s.id)} className="accent-cadmium-green" />
                <span className="text-[14px]">{s.name}</span>
              </label>
            ))}
          </div>

          <div className="surface p-5">
            <h2 className="text-[20px] font-medium text-white mb-4">Notes</h2>
            <textarea value={p.notes} onChange={e => up({notes: e.target.value})} placeholder="Boss strats, farming routes, quest notes..."
              className="surface-tight w-full p-3 text-[13px] text-white placeholder-silver-text/40 h-28 resize-y" />
          </div>
        </div>
      </div>
    </main>
  );
}
