import React, { useMemo, useState, useRef } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import HowWeCountInteractions from "../components/HowWeCountInteractions";
import { CHART_COLORS, getTypeColors, getChannelGroupColors } from "../utils/colors";

const STARTS = [
  "CS Landing Page","CS Homepage","Help Pages",
  "CS Chatbot","CS Voicebot","Legacy Chatbot","Legacy Voicebot",
  "CSA Chat","CSA Voice","CSA Email",
];

const ENDS = [...STARTS];
const BOTS = new Set(["CS Chatbot","CS Voicebot","Legacy Chatbot","Legacy Voicebot"]);
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

function staticMonthlyValues(start: string, end: string, year: number, type: "repeat" | "no-repeat") {
  return MONTHS.map((m, idx) => {
    const seed = hashCode(`${start}-${end}-${year}-${idx}`);
    const baseValue = type === "repeat" ? 3 + (seed % 12) : 8 + (seed % 15); // Repeat: 3-15, No-repeat: 8-23
    return baseValue;
  });
}

function StickyTh({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <th className={`px-2 py-1 border-b sticky top-0 ${className}`}>{children}</th>
  );
}

// Use centralized color system
const groupColors = getChannelGroupColors;

interface CSChannelMatrixProps {
  type: "repeat" | "no-repeat";
  onNavigate: (view: any) => void;
}

export default function CSChannelMatrix({ type, onNavigate }: CSChannelMatrixProps) {
  const [view, setView] = useState("2025"); // "2024" | "2025" | "YoY"
  const [chartType, setChartType] = useState<"horizontal" | "vertical">("horizontal");
  const [reportingVertical, setReportingVertical] = useState("All");

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
        const vals = staticMonthlyValues(r.start, r.end, 2025, type); // default 2025 view for chart
        
        // Apply reporting vertical filter
        let verticalMultiplier = 1;
        if (reportingVertical !== "All") {
          switch (reportingVertical) {
            case "Vertical 1":
              verticalMultiplier = 0.8;
              break;
            case "Vertical 2":
              verticalMultiplier = 0.6;
              break;
            case "Vertical 3":
              verticalMultiplier = 0.4;
              break;
            case "Vertical 4":
              verticalMultiplier = 0.2;
              break;
          }
        }
        
        return acc + Math.round(vals[i] * verticalMultiplier);
      }, 0);
      return {
        month: m,
        Bot: sum(grouped.Bot),
        CSA: sum(grouped.CSA),
        Visit: sum(grouped.Visit)
      };
    });
  }, [grouped, type, reportingVertical]);

  function Section({ title, rows, sectionRef }: { title: string; rows: Array<{ start: string; end: string; endCat: string }>; sectionRef: React.RefObject<HTMLDetailsElement | null> }) {
    const colors = groupColors(title);
    
    // Group rows by "Ended In" channel
    const groupedByEnd = rows.reduce((acc, row) => {
      if (!acc[row.end]) {
        acc[row.end] = [];
      }
      acc[row.end].push(row);
      return acc;
    }, {} as Record<string, Array<{ start: string; end: string; endCat: string }>>);
    
    // Apply reporting vertical filter to section data
    const getFilteredValues = (r: any, year: number) => {
      const baseValues = staticMonthlyValues(r.start, r.end, year, type);
      let verticalMultiplier = 1;
      
      if (reportingVertical !== "All") {
        switch (reportingVertical) {
          case "Vertical 1":
            verticalMultiplier = 0.8;
            break;
          case "Vertical 2":
            verticalMultiplier = 0.6;
            break;
          case "Vertical 3":
            verticalMultiplier = 0.4;
            break;
          case "Vertical 4":
            verticalMultiplier = 0.2;
            break;
        }
      }
      
      return baseValues.map(val => Math.round(val * verticalMultiplier));
    };
    
    const vals2024 = rows.map(r => getFilteredValues(r, 2024));
    const vals2025 = rows.map(r => getFilteredValues(r, 2025));

    const subtotalRow = (() => {
      if (view === "2024") {
        const sums = MONTHS.map((_, i) => vals2024.reduce((acc, a) => acc + a[i], 0));
        return (
          <tr className={`${colors.bg} font-semibold`}>
            <td className="px-3 py-2 border-t border-r border-gray-200" colSpan={2}>Subtotal — {title} (2024)</td>
            <td className="px-3 py-2 border-t bg-gray-50 font-medium w-32 text-center text-gray-700">Count MM</td>
            {sums.map((v, i) => (<td key={`sub24-${i}`} className="px-2 py-1 border-t text-right w-20">{v}</td>))}
          </tr>
        );
      } else if (view === "2025") {
        const sums = MONTHS.map((_, i) => vals2025.reduce((acc, a) => acc + a[i], 0));
        return (
          <tr className={`${colors.bg} font-semibold`}>
            <td className="px-3 py-2 border-t border-r border-gray-200" colSpan={2}>Subtotal — {title} (2025)</td>
            <td className="px-3 py-2 border-t bg-gray-50 font-medium w-32 text-center text-gray-700">Count MM</td>
            {sums.map((v, i) => (<td key={`sub25-${i}`} className="px-2 py-1 border-t text-right w-20">{v}</td>))}
          </tr>
        );
      } else {
        const sums24 = MONTHS.map((_, i) => vals2024.reduce((acc, a) => acc + a[i], 0));
        const sums25 = MONTHS.map((_, i) => vals2025.reduce((acc, a) => acc + a[i], 0));
        const deltas = MONTHS.map((_, i) => sums25[i] - sums24[i]);
        return (
          <tr className={`${colors.bg} font-semibold`}>
            <td className="px-3 py-2 border-t border-r border-gray-200" colSpan={2}>Subtotal — {title} (YoY Δ)</td>
            <td className="px-3 py-2 border-t bg-gray-50 font-medium w-32 text-center text-gray-700">Basis points (%)</td>
            {deltas.map((v, i) => (<td key={`suby-${i}`} className={`px-2 py-1 border-t text-right w-20 ${v > 0 ? 'text-green-700' : v < 0 ? 'text-red-700' : 'text-gray-700'}`}>{v}</td>))}
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
                <StickyTh className="text-center w-48 border-r border-gray-200 font-semibold">Started in</StickyTh>
                <StickyTh className="text-center w-48 border-r border-gray-200 font-semibold">Ended in</StickyTh>
                <StickyTh className="text-center w-32 bg-gray-100 font-semibold">Unit</StickyTh>
                {MONTHS.map(m => (
                  <StickyTh key={`${view}-${m}`} className="w-20 text-center font-semibold">{view === "YoY" ? `${m} Δ / %` : `${m}`}</StickyTh>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedByEnd).map(([endChannel, endRows]) => (
                <React.Fragment key={endChannel}>
                  {/* Sub-section header for each "Ended In" channel */}
                  <tr className={`${colors.header} border-b-2 border-gray-300`}>
                    <td className="px-3 py-2 font-semibold text-left w-48 border-r border-gray-200" colSpan={2}>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Ended in:</span>
                        <span className="font-bold text-base">{endChannel}</span>
                        <span className="text-xs text-gray-500">({endRows.length} paths)</span>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-center w-32 bg-gray-100 font-medium text-gray-700">{view === "YoY" ? "Basis points (%)" : "Count MM"}</td>
                    {MONTHS.map((_, i) => {
                      // Calculate subtotal for this end channel
                      const endVals2024 = endRows.map(r => getFilteredValues(r, 2024));
                      const endVals2025 = endRows.map(r => getFilteredValues(r, 2025));
                      const endSum2024 = endVals2024.reduce((acc, vals) => acc + vals[i], 0);
                      const endSum2025 = endVals2025.reduce((acc, vals) => acc + vals[i], 0);
                      
                      if (view === "2024") return (<td key={`end24-${i}`} className="px-2 py-1 text-right w-20 font-semibold bg-gray-100">{endSum2024}</td>);
                      if (view === "2025") return (<td key={`end25-${i}`} className="px-2 py-1 text-right w-20 font-semibold bg-gray-100">{endSum2025}</td>);
                      const delta = endSum2025 - endSum2024;
                      const pct = endSum2024 === 0 ? (endSum2025 > 0 ? Infinity : 0) : ((endSum2025 - endSum2024) / endSum2024) * 100;
                      const label = endSum2024 === 0 ? (endSum2025 > 0 ? "+∞" : "0%") : `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%`;
                      const cls = delta > 0 ? 'text-green-700' : delta < 0 ? 'text-red-700' : 'text-gray-700';
                      return (
                        <td key={`endy-${i}`} className={`px-2 py-1 text-right w-20 font-semibold bg-gray-100 ${cls}`}>
                          {delta} / {label}
                        </td>
                      );
                    })}
                  </tr>
                  
                  {/* Individual rows for this end channel */}
                  {endRows.map((r, idx) => {
                    const v24 = getFilteredValues(r, 2024);
                    const v25 = getFilteredValues(r, 2025);
                    return (
                      <tr key={`${r.start}→${r.end}`} className={idx % 2 ? "bg-white" : "bg-gray-50/40"}>
                        <td className="px-6 py-2 border-b whitespace-nowrap font-medium text-left w-48 border-r border-gray-200">{r.start}</td>
                        <td className="px-3 py-2 border-b whitespace-nowrap text-left w-48 border-r border-gray-200">{r.end}</td>
                        <td className="px-3 py-2 border-b text-center w-32 bg-gray-50 font-medium text-gray-700">{view === "YoY" ? "Basis points (%)" : "Count MM"}</td>
                        {MONTHS.map((_, i) => {
                          if (view === "2024") return (<td key={`c24-${i}`} className="px-2 py-1 border-b text-right w-20">{v24[i]}</td>);
                          if (view === "2025") return (<td key={`c25-${i}`} className="px-2 py-1 border-b text-right w-20">{v25[i]}</td>);
                          const delta = v25[i] - v24[i];
                          const pct = v24[i] === 0 ? (v25[i] > 0 ? Infinity : 0) : ((v25[i] - v24[i]) / v24[i]) * 100;
                          const label = v24[i] === 0 ? (v25[i] > 0 ? "+∞" : "0%") : `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%`;
                          const cls = delta > 0 ? 'text-green-700' : delta < 0 ? 'text-red-700' : 'text-gray-700';
                          return (
                            <td key={`cy-${i}`} className={`px-2 py-1 border-b text-right w-20 ${cls}`}>
                              {delta} / {label}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
              {subtotalRow}
            </tbody>
          </table>
        </div>
      </details>
    );
  }

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

  function ChartTypeToggle() {
    return (
      <div className="inline-flex rounded-lg border border-gray-300 overflow-hidden bg-white">
        <button
          onClick={() => setChartType("horizontal")}
          className={`px-3 py-2 text-sm flex items-center gap-2 ${
            chartType === "horizontal" ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
          }`}
          aria-pressed={chartType === "horizontal"}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4" />
          </svg>
          Line
        </button>
        <button
          onClick={() => setChartType("vertical")}
          className={`px-3 py-2 text-sm flex items-center gap-2 ${
            chartType === "vertical" ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
          }`}
          aria-pressed={chartType === "vertical"}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Bar
        </button>
      </div>
    );
  }

  function ReportingVerticalDropdown() {
    return (
      <div className="relative">
        <select
          value={reportingVertical}
          onChange={(e) => setReportingVertical(e.target.value)}
          className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="All">All Verticals</option>
          <option value="Vertical 1">Vertical 1</option>
          <option value="Vertical 2">Vertical 2</option>
          <option value="Vertical 3">Vertical 3</option>
          <option value="Vertical 4">Vertical 4</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
    );
  }

  function QuickNav() {
    return (
      <div className="flex gap-3">
        <button onClick={() => botRef.current?.scrollIntoView({ behavior: 'smooth' })} className="px-4 py-2 rounded-lg border bg-blue-50 hover:bg-blue-100 text-blue-800 font-medium flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400"></span>
          Bot ({grouped.Bot.length} metrics)
        </button>
        <button onClick={() => csaRef.current?.scrollIntoView({ behavior: 'smooth' })} className="px-4 py-2 rounded-lg border bg-orange-50 hover:bg-orange-100 text-orange-800 font-medium flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-400"></span>
          CSA ({grouped.CSA.length} metrics)
        </button>
        <button onClick={() => visitRef.current?.scrollIntoView({ behavior: 'smooth' })} className="px-4 py-2 rounded-lg border bg-purple-50 hover:bg-purple-100 text-purple-800 font-medium flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-400"></span>
          Visit ({grouped.Visit.length} metrics)
        </button>
      </div>
    );
  }

  return (
    <div className="w-full p-4 space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">CS Channel Trends: {type === "repeat" ? "Repeat" : "No Repeat"}</h1>
          {/* Description intentionally minimal per request */}
          <div className="mt-2">
            <button
              onClick={() => onNavigate('channel-matrix-rules')}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 transition-colors"
              aria-label="View CS Channel Combination Possibilities"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              View CS Channel Combination Possibilities
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <ViewToggle />
          <ChartTypeToggle />
          <ReportingVerticalDropdown />
        </div>
      </header>

      {/* Section Navigation */}
      <div className="bg-gray-50 rounded-xl p-4">
        {/* Removed counts/labels per request */}
        <div className="flex justify-center">
          <QuickNav />
        </div>
      </div>

      {/* Summary Graph */}
      <div className="w-full border rounded-2xl bg-white shadow-sm p-6">
        <div className="mb-6">
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-3 h-3 rounded-full ${getTypeColors(type).dot}`}></div>
              <h3 className="text-xl font-bold text-gray-900">
                {type === "repeat" ? "Repeat Interactions" : "Single Interactions"}
                {reportingVertical !== "All" && (
                  <span className="ml-2 text-sm font-normal text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {reportingVertical}
                  </span>
                )}
              </h3>
            </div>
            <p className="text-sm text-gray-600 italic ml-6">
              Of the {type === "repeat" ? "repeat" : "single-visit"} authenticated customers, what are the total number of contacts and/or visits within the trailing 7-day window?
              {reportingVertical !== "All" && (
                <span className="block mt-1 text-blue-600 font-medium">
                  Filtered for {reportingVertical} only
                </span>
              )}
            </p>
          </div>
          
          <HowWeCountInteractions className="mb-4" type={type} />
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "horizontal" ? (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Bot" stroke={CHART_COLORS.bot} strokeWidth={2} />
                <Line type="monotone" dataKey="CSA" stroke={CHART_COLORS.csa} strokeWidth={2} />
                <Line type="monotone" dataKey="Visit" stroke={CHART_COLORS.visit} strokeWidth={2} />
              </LineChart>
            ) : (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Bot" fill={CHART_COLORS.bot} />
                <Bar dataKey="CSA" fill={CHART_COLORS.csa} />
                <Bar dataKey="Visit" fill={CHART_COLORS.visit} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
        
        {/* Channel Type Indicators - Below Chart */}
        <div className="mt-4 bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{backgroundColor: CHART_COLORS.bot}}></span>
              <span className="text-sm font-medium text-gray-700">Self-Service</span>
              <span className="text-xs text-gray-500">(Bot)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{backgroundColor: CHART_COLORS.csa}}></span>
              <span className="text-sm font-medium text-gray-700">Human-led</span>
              <span className="text-xs text-gray-500">(CSA)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{backgroundColor: CHART_COLORS.visit}}></span>
              <span className="text-sm font-medium text-gray-700">Self-Guided</span>
              <span className="text-xs text-gray-500">(Visit)</span>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-3">
            <p className="text-sm text-gray-600 leading-relaxed">
              <strong>Coverage:</strong> Interactions started in any channel, ended in CS Landing Page/CS Homepage/Help Pages (Visit), 
              Bot channels (excluding CS LP/CS Homepage/Help Pages), or CSA channels.
            </p>
            <p className="text-sm text-gray-600 mt-2">
              <strong>Definition:</strong> Authenticated customers who visited pages or contacted us{" "}
              <span className={`font-semibold ${getTypeColors(type).text}`}>
                {type === "repeat" ? "2 or more times" : "only 1 time"}
              </span>{" "}
              within the 7-day trailing window.
            </p>
          </div>
        </div>
      </div>

      <Section title="Bot" rows={grouped.Bot} sectionRef={botRef} />
      <Section title="CSA" rows={grouped.CSA} sectionRef={csaRef} />
      <Section title="Visit" rows={grouped.Visit} sectionRef={visitRef} />
    </div>
  );
}
