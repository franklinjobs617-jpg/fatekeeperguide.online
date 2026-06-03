'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { builds, weapons, spells, mechanics, TOOL_NOTICE } from '@/lib/game-data';

const STORAGE_KEY = 'fatekeeper-builds';

interface SavedBuild { name: string; buildId: string; weaponIds: string[]; spellIds: string[]; notes: string; }

function load(): SavedBuild[] { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]'); } catch { return []; } }
function save(b: SavedBuild[]) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(b)); } catch {} }

export default function BuildPlanner() {
  const [selectedBuild, setSelectedBuild] = useState('shadow_dancer');
  const [selWeapons, setSelWeapons] = useState<string[]>(['obsidian_dagger']);
  const [selSpells, setSelSpells] = useState<string[]>(['ring_of_leech']);
  const [buildName, setBuildName] = useState('');
  const [savedBuilds, setSavedBuilds] = useState<SavedBuild[]>(() => load());
  const [notes, setNotes] = useState('');

  const toggleW = (id: string) => setSelWeapons(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const toggleS = (id: string) => setSelSpells(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const applyBuild = (id: string) => {
    setSelectedBuild(id);
    const b = builds.find(x => x.id === id);
    if (b) {
      setSelWeapons(b.keyGear.filter(g => weapons.some(w => w.id === g)));
      setSelSpells(b.keyGear.filter(g => spells.some(s => s.id === g)));
    }
  };

  const saveBuild = () => {
    if (!buildName.trim()) return;
    const sb: SavedBuild = { name: buildName.trim(), buildId: selectedBuild, weaponIds: [...selWeapons], spellIds: [...selSpells], notes };
    const updated = [...savedBuilds.filter(x => x.name !== sb.name), sb];
    setSavedBuilds(updated);
    save(updated);
    setBuildName('');
  };

  const loadBuild = (name: string) => {
    const sb = savedBuilds.find(x => x.name === name);
    if (sb) { setSelectedBuild(sb.buildId); setSelWeapons(sb.weaponIds); setSelSpells(sb.spellIds); setNotes(sb.notes); }
  };

  const delBuild = (name: string) => {
    const updated = savedBuilds.filter(x => x.name !== name);
    setSavedBuilds(updated);
    save(updated);
  };

  const build = builds.find(b => b.id === selectedBuild)!;

  return (
    <main className="container py-8">
      <div className="surface p-4 mb-6"><p className="text-[13px] leading-6 text-silver-text">{TOOL_NOTICE}</p></div>
      <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl border border-graphite mb-8">
        <Image src="/images/fatekeeper-announcement.jpg" alt="Fatekeeper Build Planner - plan your character build" fill sizes="(max-width: 768px) 100vw, 1200px" className="object-cover" />
      </div>
      <Link href="/" className="btn-ghost mb-6 inline-block">← Home</Link>
      <h1 className="section-title mt-4">Build Planner</h1>
      <p className="mt-3 text-[16px] leading-7 text-off-white max-w-3xl">Plan your Fatekeeper build. Select a starter template, customize weapons and relics, and save your loadout. Data saved to your browser.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Build selection + gear */}
        <div className="space-y-6">
          {/* Build templates */}
          <div className="grid gap-3 sm:grid-cols-3">
            {builds.map(b => (
              <button key={b.id} onClick={() => applyBuild(b.id)}
                className={`surface-tight text-left p-4 transition ${selectedBuild === b.id ? 'ring-2 ring-cadmium-green' : 'surface-link'}`}>
                <span className="mono-label text-cadmium-green">{b.class}</span>
                <h3 className="mt-2 text-[18px] font-medium text-white">{b.name}</h3>
                <span className="mt-2 inline-block pill text-[11px]">{b.difficulty}</span>
              </button>
            ))}
          </div>

          {/* Build details */}
          <div className="surface p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-[24px] font-medium text-white">{build.name}</h2>
              <span className="pill">{build.difficulty}</span>
            </div>
            <p className="mt-2 text-[14px] text-silver-text"><span className="text-white font-medium">Class:</span> {build.class}</p>
            <p className="mt-1 text-[14px] text-silver-text"><span className="text-white font-medium">Stats:</span> {build.statPriority}</p>
            <p className="mt-3 text-[14px] leading-6 text-off-white">{build.playstyle}</p>
          </div>

          {/* Weapon selection */}
          <div className="surface p-5">
            <h3 className="text-[18px] font-medium text-white mb-4">Weapons & Gear ({selWeapons.length})</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {weapons.map(w => {
                const active = selWeapons.includes(w.id);
                return (
                  <button key={w.id} onClick={() => toggleW(w.id)}
                    className={`text-left p-3 rounded transition ${active ? 'bg-cadmium-green/15 ring-1 ring-cadmium-green/40' : 'surface-tight surface-link'}`}>
                    <div className="flex items-center justify-between"><span className="text-[15px] font-medium text-white">{w.name}</span><span className="mono-label text-[10px]">{w.type}</span></div>
                    <p className="mt-1 text-[12px] text-silver-text">{w.effect}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Spell selection */}
          <div className="surface p-5">
            <h3 className="text-[18px] font-medium text-white mb-4">Spells & Relics ({selSpells.length})</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {spells.map(s => {
                const active = selSpells.includes(s.id);
                return (
                  <button key={s.id} onClick={() => toggleS(s.id)}
                    className={`text-left p-3 rounded transition ${active ? 'bg-cadmium-green/15 ring-1 ring-cadmium-green/40' : 'surface-tight surface-link'}`}>
                    <div className="flex items-center justify-between"><span className="text-[15px] font-medium text-white">{s.name}</span><span className="mono-label text-[10px]">{s.type}</span></div>
                    <p className="mt-1 text-[12px] text-silver-text">{s.effect}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mechanics reference */}
          <div className="surface p-5">
            <h3 className="text-[18px] font-medium text-white mb-4">Key Mechanics</h3>
            <div className="space-y-3">
              {mechanics.map(m => (
                <div key={m.name} className="surface-tight p-3">
                  <h4 className="text-[14px] font-medium text-white">{m.name}</h4>
                  <p className="mt-1 text-[12px] leading-5 text-silver-text">{m.description}</p>
                  <p className="mt-1 text-[12px] text-cadmium-green">Tip: {m.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Save/Load panel */}
        <div className="space-y-4">
          <div className="surface p-5 sticky top-6">
            <h3 className="text-[18px] font-medium text-white mb-4">Save Build</h3>
            <div className="flex gap-2">
              <input type="text" placeholder="Build name..." value={buildName} onChange={e => setBuildName(e.target.value)}
                className="surface-tight flex-1 p-3 text-[14px] text-white placeholder-silver-text/40" />
              <button onClick={saveBuild} disabled={!buildName.trim()} className="btn-primary">Save</button>
            </div>

            <div className="mt-4">
              <p className="text-[12px] text-silver-text mb-2">Notes</p>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Strategy notes, stat targets, upgrade priorities..."
                className="surface-tight w-full p-3 text-[13px] text-white placeholder-silver-text/40 h-24 resize-y" />
            </div>

            {savedBuilds.length > 0 && (
              <div className="mt-6">
                <p className="text-[13px] font-medium text-white mb-3">Saved Builds ({savedBuilds.length})</p>
                <div className="space-y-2">
                  {savedBuilds.map(sb => (
                    <div key={sb.name} className="surface-tight p-3 flex items-center justify-between gap-2">
                      <button onClick={() => loadBuild(sb.name)} className="text-[14px] text-white hover:text-cadmium-green text-left">{sb.name}<span className="block text-[11px] text-silver-text">{builds.find(b=>b.id===sb.buildId)?.name} · {sb.weaponIds.length+sb.spellIds.length} items</span></button>
                      <button onClick={() => delBuild(sb.name)} className="text-[11px] text-red-400 hover:underline">Del</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="surface p-5">
            <h3 className="text-[14px] font-medium text-white mb-2">Loadout Summary</h3>
            <p className="text-[12px] text-silver-text">Weapons: {selWeapons.map(id => weapons.find(w => w.id === id)?.name).filter(Boolean).join(', ') || 'None'}</p>
            <p className="mt-2 text-[12px] text-silver-text">Spells: {selSpells.map(id => spells.find(s => s.id === id)?.name).filter(Boolean).join(', ') || 'None'}</p>
            <p className="mt-2 text-[12px] text-silver-text">Build: {build.name} ({build.class})</p>
          </div>
        </div>
      </div>
    </main>
  );
}
