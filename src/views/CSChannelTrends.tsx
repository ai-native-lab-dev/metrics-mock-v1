import React, { useMemo, useState, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const STARTS = [
  "CS Landing Page","CS Homepage","Help Pages",
  "CS Chatbot","CS Voicebot","AI-enabled Email","Legacy Chatbot","Legacy Voicebot",
  "CSA Chat","CSA Voice","CSA Email",
];

const ENDS = [...STARTS];
const BOTS = new Set(["CS Chatbot","CS Voicebot","AI-enabled Email","Legacy Chatbot","Legacy Voicebot"]);
const CSAS = new Set(["CSA Chat","CSA Voice","CSA Email"]);
const VISITS = new Set(["CS Landing Page","CS Homepage","Help Pages"]);

function isAllowed(start: string, end: string) {
  if (start === "CS Landing Page" && end === "CS Homepage") return false;
  if (start === "CS Homepage" && end === "CS Landing Page") return false;
  if (CSAS.has(start) && BOTS.has(end)) return false;
  return true;
}

function endCategory(end: string) {
  if (VISITS.has(end)) return "Visit";
  if (BOTS.has(end)) return "Bot";
  return "CSA";
}

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// Deterministic hash → 5..20 range
function hashCode(str: string) { 
  let h = 0; 
  for (let i = 0; i < str.length; i++) { 
    h = ((h << 5) - h) + str.charCodeAt(i); 
    h |= 0;
  } 
  return Math.abs(h);
} 

function staticMonthlyValues(start: string, end: string, year: number) {
  return MONTHS.map((m, idx) => {
    const seed = hashCode(`${start}-${end}-${year}-${idx}`);
    return 5 + (seed % 16); // 5..20 (MM)
  });
}

function StickyTh({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <th className={`px-2 py-1 border-b text-right sticky top-0 ${className}`}>{children}</th>
  );
}

function groupColors(groupName: string) {
  if (groupName.includes('Total Interactions')) {
    return { bg: 'bg-teal-50', border: 'border-teal-200', header: 'bg-teal-100', dot: 'bg-teal-400' };
  } else if (groupName.includes('Bot')) {
    return { bg: 'bg-blue-50', border: 'border-blue-200', header: 'bg-blue-100', dot: 'bg-blue-400' };
  } else if (groupName.includes('CSA') || groupName.includes('Human')) {
    return { bg: 'bg-orange-50', border: 'border-orange-200', header: 'bg-orange-100', dot: 'bg-orange-400' };
  } else if (groupName.includes('Visit') || groupName.includes('Page')) {
    return { bg: 'bg-purple-50', border: 'border-purple-200', header: 'bg-purple-100', dot: 'bg-purple-400' };
  }
  return { bg: 'bg-gray-50', border: 'border-gray-200', header: 'bg-gray-100', dot: 'bg-gray-400' };
}

interface SectionProps {
  title: string;
  rows: Array<{ start: string; end: string; endCat: string }>;
  sectionRef: React.RefObject<HTMLDetailsElement | null>;
}

function Section({ title, rows, sectionRef, view }: SectionProps & { view: string }) {
  const colors = groupColors(title);
  const vals2024 = rows.map(r => staticMonthlyValues(r.start, r.end, 2024));
  const vals2025 = rows.map(r => staticMonthlyValues(r.start, r.end, 2025));

  const subtotalRow = (() => {
    if (view === "2024") {
      const sums = MONTHS.map((_, i) => vals2024.reduce((acc, a) => acc + a[i], 0));
      return (
        <tr className={`${colors.header} font-semibold`}>
          <td className="px-3 py-2 border-t" colSpan={3}>Subtotal — {title} (2024)</td>
          {sums.map((v, i) => (<td key={`sub24-${i}`} className="px-2 py-1 border-t text-right">{v}</td>))}
        </tr>
      );
    } else if (view === "2025") {
      const sums = MONTHS.map((_, i) => vals2025.reduce((acc, a) => acc + a[i], 0));
      return (
        <tr className={`${colors.header} font-semibold`}>
          <td className="px-3 py-2 border-t" colSpan={3}>Subtotal — {title} (2025)</td>
          {sums.map((v, i) => (<td key={`sub25-${i}`} className="px-2 py-1 border-t text-right">{v}</td>))}
        </tr>
      );
    } else {
      const sums24 = MONTHS.map((_, i) => vals2024.reduce((acc, a) => acc + a[i], 0));
      const sums25 = MONTHS.map((_, i) => vals2025.reduce((acc, a) => acc + a[i], 0));
      const deltas = MONTHS.map((_, i) => sums25[i] - sums24[i]);
      return (
        <tr className={`${colors.header} font-semibold`}>
          <td className="px-3 py-2 border-t" colSpan={3}>Subtotal — {title} (YoY Δ MM)</td>
          {deltas.map((v, i) => (<td key={`suby-${i}`} className={`px-2 py-1 border-t text-right ${v > 0 ? 'text-green-700' : v < 0 ? 'text-red-700' : 'text-gray-700'}`}>{v}</td>))}
        </tr>
      );
    }
  })();

  return (
    <details ref={sectionRef} open className={`border ${colors.border} rounded-2xl overflow-hidden`}>
      <summary className={`px-4 py-3 ${colors.header} font-semibold flex items-center gap-2`}>
        <span className={`${colors.dot} w-2 h-2 rounded-full inline-block`}></span>
        {title} <span className="text-gray-500 text-xs">({rows.length})</span>
      </summary>
      <div className={`${colors.bg} overflow-auto`}>
        <table className="min-w-[1200px] w-full text-sm">
          <thead>
            <tr>
              <StickyTh className="text-left">Started in</StickyTh>
              <StickyTh className="text-left">Ended in</StickyTh>
              <StickyTh className="text-left">Unit (Count MM)</StickyTh>
              {MONTHS.map(m => (
                <StickyTh key={`${view}-${m}`}>{view === "YoY" ? `${m} Δ / %` : `${m}`}</StickyTh>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => {
              const v24 = staticMonthlyValues(r.start, r.end, 2024);
              const v25 = staticMonthlyValues(r.start, r.end, 2025);
              return (
                <tr key={`${r.start}→${r.end}`} className={idx % 2 ? "bg-white" : "bg-gray-50/40"}>
                  <td className="px-3 py-2 border-b whitespace-nowrap font-medium text-left">{r.start}</td>
                  <td className="px-3 py-2 border-b whitespace-nowrap text-left">{r.end}</td>
                  <td className="px-3 py-2 border-b text-left">Count MM</td>
                  {MONTHS.map((_, i) => {
                    if (view === "2024") return (<td key={`c24-${i}`} className="px-2 py-1 border-b text-right">{v24[i]}</td>);
                    if (view === "2025") return (<td key={`c25-${i}`} className="px-2 py-1 border-b text-right">{v25[i]}</td>);
                    const delta = v25[i] - v24[i];
                    const pct = v24[i] === 0 ? (v25[i] > 0 ? Infinity : 0) : ((v25[i] - v24[i]) / v24[i]) * 100;
                    const label = v24[i] === 0 ? (v25[i] > 0 ? "+∞" : "0%") : `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%`;
                    const cls = delta > 0 ? 'text-green-700' : delta < 0 ? 'text-red-700' : 'text-gray-700';
                    return (
                      <td key={`cy-${i}`} className={`px-2 py-1 border-b text-right ${cls}`}>
                        {delta} / {label}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {subtotalRow}
          </tbody>
        </table>
      </div>
    </details>
  );
}

export default function CSChannelTrends() {
  const [view, setView] = useState("2025"); // "2024" | "2025" | "YoY"

  const botRef = useRef<HTMLDetailsElement>(null);
  const csaRef = useRef<HTMLDetailsElement>(null);
  const visitRef = useRef<HTMLDetailsElement>(null);

  const rows = useMemo(() => {
    const out: Array<{ start: string; end: string; endCat: string }> = [];
    for (const s of STARTS) {
      for (const e of ENDS) {
        if (isAllowed(s, e)) out.push({ start: s, end: e, endCat: endCategory(e) });
      }
    }
    return out;
  }, []);

  const grouped = useMemo(() => ({
    Bot: rows.filter(r => r.endCat === "Bot"),
    CSA: rows.filter(r => r.endCat === "CSA"),
    Visit: rows.filter(r => r.endCat === "Visit"),
  }), [rows]);

  // Prepare data for summary graph
  const chartData = useMemo(() => {
    return MONTHS.map((m, i) => {
      const sum = (group: Array<{ start: string; end: string; endCat: string }>) => group.reduce((acc, r) => {
        const vals = staticMonthlyValues(r.start, r.end, 2025); // default 2025 view for chart
        return acc + vals[i];
      }, 0);
      return {
        month: m,
        Bot: sum(grouped.Bot),
        CSA: sum(grouped.CSA),
        Visit: sum(grouped.Visit)
      };
    });
  }, [grouped]);

  function ViewToggle() {
    const opts = ["2024", "2025", "YoY"];
    return (
      <div className="inline-flex rounded-2xl border overflow-hidden">
        {opts.map(o => (
          <button
            key={o}
            onClick={() => setView(o)}
            className={`px-4 py-2 text-sm ${view === o ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
            aria-pressed={view === o}
          >{o}</button>
        ))}
      </div>
    );
  }

  function QuickNav() {
    return (
      <div className="flex gap-2">
        <button onClick={() => botRef.current?.scrollIntoView({ behavior: 'smooth' })} className="px-3 py-1 rounded-xl border bg-blue-50 hover:bg-blue-100">Go to Bot</button>
        <button onClick={() => csaRef.current?.scrollIntoView({ behavior: 'smooth' })} className="px-3 py-1 rounded-xl border bg-orange-50 hover:bg-orange-100">Go to CSA</button>
        <button onClick={() => visitRef.current?.scrollIntoView({ behavior: 'smooth' })} className="px-3 py-1 rounded-xl border bg-purple-50 hover:bg-purple-100">Go to Visit</button>
      </div>
    );
  }

  return (
    <div className="w-full p-4 space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">CS Channel Trends</h1>
          <p className="text-sm text-gray-600">Toggle between <strong>2024</strong>, <strong>2025</strong>, or <strong>YoY</strong>. Units are <strong>Count (MM)</strong>. Sections are color-coded: Teal=Total Interactions, Blue=Bot, Orange=CSA, Purple=Visit.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <ViewToggle />
          <QuickNav />
        </div>
      </header>

      {/* Summary Graph */}
      <div className="w-full h-80 border rounded-2xl bg-white shadow-sm p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Bot" stroke="#3b82f6" strokeWidth={2} />
            <Line type="monotone" dataKey="CSA" stroke="#f97316" strokeWidth={2} />
            <Line type="monotone" dataKey="Visit" stroke="#a855f7" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <Section title="Bot" rows={grouped.Bot} sectionRef={botRef} view={view} />
      <Section title="CSA" rows={grouped.CSA} sectionRef={csaRef} view={view} />
      <Section title="Visit" rows={grouped.Visit} sectionRef={visitRef} view={view} />
    </div>
  );
}
