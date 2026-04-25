"use client";

import { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    Radar,
    PieChart,
    Pie,
} from "recharts";
import { type PaperData } from "@/app/lib/data-fetcher";

// ─── Helpers ───
function Evidence({ text }: { text: string | null | undefined }) {
    const [open, setOpen] = useState(false);
    if (!text || text === "" || text === "N/A" || text === "No evidence found" || text === "null") {
        return null;
    }
    return (
        <div className="mt-3">
            <button
                className="evidence-toggle"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
            >
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                        transform: open ? "rotate(90deg)" : "rotate(0deg)",
                        transition: "transform 0.2s",
                    }}
                >
                    <polyline points="9 18 15 12 9 6" />
                </svg>
                Evidence
            </button>
            <div
                className={`evidence-text mt-3 rounded-2xl text-sm leading-relaxed ${open ? "open" : ""}`}
                style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "var(--text-secondary)",
                }}
            >
                {text}
            </div>
        </div>
    );
}

function DataField({
    label,
    value,
    accent,
}: {
    label: string;
    value: string | number | null | undefined;
    accent?: string;
}) {
    if (value === null || value === undefined || value === "" || value === "N/A" || value === "not reported" || value === "null") {
        return null;
    }

    return (
        <div className="stat-card">
            <p className="data-label mb-2">{label}</p>
            <p className="data-value" style={accent ? { color: accent } : {}}>
                {value}
            </p>
        </div>
    );
}

// ─── Particles Background ───

// ─── Section Wrapper ───
function Section({
    title,
    children,
    delay = 0,
}: {
    title: string;
    children: React.ReactNode;
    delay?: number;
}) {
    return (
        <div
            className="glass-card p-6 animate-in"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="section-title">
                {title}
            </div>
            {children}
        </div>
    );
}

function normalizeSearchText(value: string | number | null | undefined) {
    if (value === null || value === undefined) {
        return "";
    }

    return String(value).toLowerCase().trim();
}

function matchesSearch(query: string, values: Array<string | number | null | undefined>) {
    const normalizedQuery = normalizeSearchText(query);

    if (!normalizedQuery) {
        return true;
    }

    return values.some((value) => normalizeSearchText(value).includes(normalizedQuery));
}

function SearchField({
    value,
    onChange,
    placeholder,
    resultsLabel,
}: {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    resultsLabel?: string;
}) {
    return (
        <div className="glass-card p-4 md:p-5">
            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                <label className="relative flex-1">
                    <span className="sr-only">{placeholder}</span>
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                    </svg>
                    <input
                        type="search"
                        value={value}
                        onChange={(event) => onChange(event.target.value)}
                        placeholder={placeholder}
                        className="w-full rounded-2xl border border-white/10 bg-black/40 py-3 pl-11 pr-12 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-teal-400/40 focus:ring-2 focus:ring-teal-400/10"
                    />
                    {value && (
                        <button
                            type="button"
                            onClick={() => onChange("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-300 transition hover:border-teal-400/30 hover:text-teal-300"
                            aria-label="Clear search"
                        >
                            Clear
                        </button>
                    )}
                </label>
                {resultsLabel && (
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        {resultsLabel}
                    </p>
                )}
            </div>
        </div>
    );
}

// ─── Chart Colors ───
const chartColors = [
    "#5eead4",
    "#c4b5fd",
    "#67e8f9",
    "#fbcfe8",
    "#fde68a",
    "#6ee7b7",
    "#fda4af",
    "#818cf8",
    "#38bdf8",
    "#c084fc",
];

// ─── Main Dashboard ───
export default function Dashboard({
    papers,
    selectedPaperIndex,
    onSelectPaper
}: {
    papers: PaperData[],
    selectedPaperIndex: number | null,
    onSelectPaper: (idx: number | null) => void
}) {
    const [pdfOpenPaperIndex, setPdfOpenPaperIndex] = useState<number | null>(null);
    const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
    const [materialSearch, setMaterialSearch] = useState("");
    const showPdf = selectedPaperIndex !== null && pdfOpenPaperIndex === selectedPaperIndex;

    const openMaterialArchive = (formula: string) => {
        setSelectedMaterial(formula);
    };

    const returnToMaterials = () => {
        setSelectedMaterial(null);
    };

    const openPaper = (idx: number) => {
        setPdfOpenPaperIndex(null);
        onSelectPaper(idx);
    };

    const closePaper = () => {
        setPdfOpenPaperIndex(null);
        onSelectPaper(null);
    };

    if (!papers || papers.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 text-center">
                <div className="glass-card p-8 max-w-md w-full">
                    <h2 className="text-xl font-bold mb-4 text-rose-400">No Data Found</h2>
                    <p className="text-slate-400">Could not find any paper data in the extracted_data directory.</p>
                </div>
            </div>
        );
    }

    if (selectedPaperIndex === null) {
        // Handle material level filtering
        if (selectedMaterial === null) {
            // Tier 1: Material Groups
            const materialGroups = papers.reduce((acc, p) => {
                const formula = p.target_material.target_material.chemical_formula || "Unknown";
                if (!acc[formula]) {
                    acc[formula] = {
                        formula,
                        name: p.target_material.target_material.material_name,
                        class: p.target_material.target_material.material_class,
                        count: 0,
                        processTypes: new Set<string>()
                    };
                }
                acc[formula].count++;
                if (p.summary.process_type) acc[formula].processTypes.add(p.summary.process_type);
                return acc;
            }, {} as Record<string, { formula: string, name: string, class: string, count: number, processTypes: Set<string> }>);
            const filteredMaterialGroups = Object.values(materialGroups)
                .filter((group) => matchesSearch(materialSearch, [
                    group.formula,
                    group.name,
                    group.class,
                    ...Array.from(group.processTypes),
                ]))
                .sort((a, b) => b.count - a.count);

            return (
                <div className="p-8 md:p-12 max-w-6xl mx-auto w-full animate-in fade-in duration-700">
                    <div className="mb-10">
                        <h2 className="text-3xl font-black text-white mb-3">
                            Materials <span className="text-teal-400">Library</span>
                        </h2>
                        <p className="text-slate-400 text-sm">Select a material system to browse its processed knowledge.</p>
                    </div>
                    <div className="mb-6">
                        <SearchField
                            value={materialSearch}
                            onChange={setMaterialSearch}
                            placeholder="Search by formula, material name, class, or process type"
                            resultsLabel={`${filteredMaterialGroups.length} of ${Object.keys(materialGroups).length} materials`}
                        />
                    </div>
                    {filteredMaterialGroups.length === 0 ? (
                        <div className="glass-card p-8 text-center">
                            <p className="text-lg font-semibold text-slate-100 mb-2">No materials matched that search.</p>
                            <p className="text-sm text-slate-400">Try a chemical formula, material name, or process keyword.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredMaterialGroups.map((group, i) => (
                            <div
                                key={group.formula}
                                onClick={() => openMaterialArchive(group.formula)}
                                className="glass-card p-6 cursor-pointer hover:border-teal-400/30 group flex flex-col h-full transition-all hover:translate-y-[-4px] animate-in"
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-teal-400 text-[10px] font-bold uppercase tracking-wider">{group.count} papers</span>
                                </div>
                                <h3 className="text-2xl font-black mb-1 text-slate-100 group-hover:text-cyan-400 transition-colors">
                                    {group.formula}
                                </h3>
                                <p className="text-sm text-slate-400 mb-6 italic">
                                    {group.name}
                                </p>
                                {group.class && (
                                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500 mt-auto">
                                        {group.class}
                                    </p>
                                )}
                            </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        // Tier 2: Papers for Selected Material
        const filteredPapers = papers
            .map((p, originalIdx) => ({ p, originalIdx }))
            .filter(item => (item.p.target_material.target_material.chemical_formula || "Unknown") === selectedMaterial);

        return (
            <div className="p-8 md:p-12 max-w-6xl mx-auto w-full animate-in fade-in duration-700">
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <button
                            onClick={returnToMaterials}
                            className="text-teal-400 text-sm font-bold flex items-center gap-2 mb-4 hover:translate-x-[-4px] transition-transform"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                            Back to Materials
                        </button>
                        <h2 className="text-3xl font-black text-white">
                            {selectedMaterial} <span className="text-slate-500 font-light">Archive</span>
                        </h2>
                    </div>
                    <p className="text-slate-400 text-sm bg-neutral-900 border border-white/10 px-4 py-2 rounded-xl">
                        Found <span className="text-teal-400 font-bold">{filteredPapers.length}</span> contributions
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredPapers.map(({ p, originalIdx }, i) => (
                        <div
                            key={p.id}
                            onClick={() => openPaper(originalIdx)}
                            className="glass-card p-6 cursor-pointer hover:border-teal-400/30 group flex flex-col h-full transition-all hover:translate-y-[-4px] animate-in"
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="px-3 py-1 bg-neutral-900 rounded-full text-[10px] font-bold text-slate-400 border border-white/15 uppercase tracking-widest">
                                    {p.id}
                                </span>
                                <span className="text-teal-400 text-[10px] font-bold uppercase tracking-wider">{p.characterization.characterization_methods.length} methods</span>
                            </div>
                            <h3 className="text-lg font-bold mb-4 text-slate-100 group-hover:text-cyan-400 transition-colors leading-snug">
                                {p.label?.includes(" — ")
                                    ? p.label.split(" — ")[1]
                                    : (p.label || p.target_material.target_material.chemical_formula)}
                            </h3>
                            <p className="text-xs text-slate-500 mb-6 line-clamp-2 leading-relaxed">
                                {p.summary.summary || "No summary provided for this paper."}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                                <span className="text-[10px] uppercase font-bold px-2 py-1 bg-purple-500/10 text-purple-300 rounded-lg">
                                    {p.summary.process_type || "ALD"}
                                </span>
                                <span className="text-[10px] uppercase font-bold px-2 py-1 bg-amber-500/10 text-amber-300 rounded-lg">
                                    {p.deposition_conditions.deposition_temperature_C ? `${p.deposition_conditions.deposition_temperature_C}°C` : "N/A Temp"}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const paper: PaperData = papers[selectedPaperIndex];

    // Chart data for characterization methods
    const charMethodData = paper.characterization.characterization_methods.map(
        (method, i) => {
            // Extract abbreviation from parentheses
            const match = method.match(/\(([^)]+)\)/);
            return {
                name: match ? match[1] : method.slice(0, 15),
                fullName: method,
                value: 1,
                index: i,
            };
        }
    );

    // Deposition radar data
    const depositionRadarData = [
        {
            property: "Temp",
            value: paper.deposition_conditions.deposition_temperature_C ?? 0,
            fullMark: 500,
        },
        {
            property: "Precursors",
            value: paper.precursor_coreactant.precursors.length * 30,
            fullMark: 100,
        },
        {
            property: "Coreactants",
            value: paper.precursor_coreactant.coreactants.length * 30,
            fullMark: 100,
        },
        {
            property: "Char. Methods",
            value: paper.characterization.characterization_methods.length * 10,
            fullMark: 100,
        },
        {
            property: "Gases",
            value:
                (paper.precursor_coreactant.purge_gas.length +
                    paper.precursor_coreactant.carrier_gas.length) *
                30,
            fullMark: 100,
        },
    ];

    // Film property completeness for pie
    const filmProps = paper.film_properties;
    const filmFields = [
        { name: "Thickness", val: filmProps.film_thickness_nm },
        { name: "Density", val: filmProps.density_g_cm3 },
        { name: "Ref. Index", val: filmProps.refractive_index },
        { name: "Roughness", val: filmProps.surface_roughness_nm },
        { name: "Crystal Phase", val: filmProps.crystal_phase },
    ];
    const reported = filmFields.filter((f) => f.val !== null).length;
    const notReported = filmFields.length - reported;
    const filmPieData = [
        { name: "Reported", value: reported, color: "#2dd4bf" },
        { name: "Not Reported", value: notReported, color: "#1e293b" },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            {/* ─── Summary Metrics Strip ─── */}
            <div className="max-w-6xl w-full mx-auto px-6 py-10">
                <div className="flex flex-wrap gap-4 mb-6">
                    <button
                        onClick={closePaper}
                        className="px-5 py-2.5 rounded-2xl text-sm font-semibold bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                        Back to {selectedMaterial ? selectedMaterial : "Catalog"}
                    </button>
                    <button
                        onClick={() => setPdfOpenPaperIndex(showPdf ? null : selectedPaperIndex)}
                        className="px-5 py-2.5 rounded-2xl text-sm font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/20 hover:bg-teal-500/20 transition-all flex items-center gap-2"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                        {showPdf ? "Hide PDF" : "View Original PDF"}
                    </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        {
                            label: "Target Material",
                            value: paper.summary.target_material,
                            color: "var(--accent-teal)",
                        },
                        {
                            label: "Process Type",
                            value: paper.summary.process_type,
                            color: "var(--accent-purple)",
                        },
                        {
                            label: "Temperature Range",
                            value: paper.summary.temperature_range,
                            color: "var(--accent-amber)",
                        },
                        {
                            label: "Characterization Methods",
                            value: paper.characterization.characterization_methods.length > 0
                                ? `${paper.characterization.characterization_methods.length} methods`
                                : null,
                            color: "var(--accent-cyan)",
                        },
                    ].filter(metric => metric.value && metric.value !== "N/A" && metric.value !== "null").map((metric, i) => (
                        <div
                            key={i}
                            className="glass-card p-5 animate-in"
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span className="data-label">{metric.label}</span>
                            </div>
                            <p
                                className="font-bold text-lg"
                                style={{ color: metric.color }}
                            >
                                {metric.value}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ─── Paper Content / PDF ─── */}
            {showPdf ? (
                <main className="max-w-6xl w-full mx-auto px-4 md:px-6 py-6 md:py-10 flex flex-col flex-1" style={{ minHeight: '80vh' }}>
                    <iframe
                        src={paper.pdf_url || `/api/pdf/${paper.id}`}
                        className="w-full h-full rounded-xl border border-white/15 flex-1 min-h-[60vh] md:min-h-[1000px]"
                        title={`PDF for ${paper.id}`}
                    />
                </main>
            ) : (
                <main className="max-w-6xl w-full mx-auto px-6 py-10 flex flex-col gap-6">
                    <Section title="Paper Summary" delay={100}>
                        <p
                            className="text-base leading-relaxed mb-4"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            {paper.summary.summary}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {paper.summary.main_precursors.map((p, i) => (
                                <span key={i} className="badge badge-teal">
                                    {p}
                                </span>
                            ))}
                        </div>
                        <Evidence text={paper.summary.evidence} />
                    </Section>

                    {/* ─── Target Material ─── */}
                    <Section title="Target Material" delay={200}>
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                            <div className="formula">
                                {paper.target_material.target_material.chemical_formula}
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-wrap gap-3 mb-2">
                                    <span className="badge badge-teal">
                                        {paper.target_material.target_material.material_name}
                                    </span>
                                    <span className="badge badge-purple">
                                        {paper.target_material.target_material.material_class}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <Evidence text={paper.target_material.evidence} />
                    </Section>

                    {/* ─── Substrate Info ─── */}
                    {(paper.substrate_info.substrate_material || paper.substrate_info.substrate_orientation || paper.substrate_info.pretreatment || paper.substrate_info.surface_functionalization || paper.substrate_info.evidence) && (
                        <Section title="Substrate Information" delay={300}>
                            <div className="stat-grid">
                                <DataField
                                    label="Material"
                                    value={paper.substrate_info.substrate_material}
                                    accent="var(--accent-teal)"
                                />
                                <DataField
                                    label="Orientation"
                                    value={paper.substrate_info.substrate_orientation}
                                />
                                <DataField
                                    label="Pretreatment"
                                    value={paper.substrate_info.pretreatment}
                                />
                                <DataField
                                    label="Functionalization"
                                    value={paper.substrate_info.surface_functionalization}
                                />
                            </div>
                            <Evidence text={paper.substrate_info.evidence} />
                        </Section>
                    )}

                    {/* ─── Deposition Conditions ─── */}
                    {(paper.deposition_conditions.deposition_temperature_C || paper.deposition_conditions.pressure || paper.deposition_conditions.reactor_type || paper.deposition_conditions.precursor_pulse_time_s || paper.deposition_conditions.coreactant_pulse_time_s || paper.deposition_conditions.purge_time_s || paper.deposition_conditions.number_of_cycles || paper.deposition_conditions.evidence) && (
                        <Section title="Deposition Conditions" delay={400}>
                            <div className="stat-grid mb-6">
                                <DataField
                                    label="Temperature (°C)"
                                    value={paper.deposition_conditions.deposition_temperature_C}
                                    accent="var(--accent-amber)"
                                />
                                <DataField
                                    label="Pressure"
                                    value={paper.deposition_conditions.pressure}
                                    accent="var(--accent-cyan)"
                                />
                                <DataField
                                    label="Reactor Type"
                                    value={paper.deposition_conditions.reactor_type}
                                    accent="var(--accent-purple)"
                                />
                                <DataField
                                    label="Precursor Pulse (s)"
                                    value={paper.deposition_conditions.precursor_pulse_time_s}
                                />
                                <DataField
                                    label="Coreactant Pulse (s)"
                                    value={paper.deposition_conditions.coreactant_pulse_time_s}
                                />
                                <DataField
                                    label="Purge Time (s)"
                                    value={paper.deposition_conditions.purge_time_s}
                                />
                                <DataField
                                    label="Cycles"
                                    value={paper.deposition_conditions.number_of_cycles}
                                />
                            </div>

                            {/* Radar Chart show only if we have multiple numeric points */}
                            {depositionRadarData.some(d => d.value > 0) && (
                                <div className="chart-container">
                                    <p className="data-label mb-4">Process Overview Radar</p>
                                    <ResponsiveContainer width="100%" height={280}>
                                        <RadarChart
                                            data={depositionRadarData}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius="70%"
                                        >
                                            <PolarGrid stroke="rgba(148,163,184,0.15)" />
                                            <PolarAngleAxis
                                                dataKey="property"
                                                tick={{ fill: "#94a3b8", fontSize: 12 }}
                                            />
                                            <Radar
                                                dataKey="value"
                                                stroke="#2dd4bf"
                                                fill="#2dd4bf"
                                                fillOpacity={0.2}
                                                strokeWidth={2}
                                            />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
                            <Evidence text={paper.deposition_conditions.evidence} />
                        </Section>
                    )}

                    {/* ─── Precursor & Coreactant ─── */}
                    {(paper.precursor_coreactant.precursors.length > 0 || paper.precursor_coreactant.coreactants.length > 0 || paper.precursor_coreactant.purge_gas.length > 0 || paper.precursor_coreactant.carrier_gas.length > 0 || paper.precursor_coreactant.evidence) && (
                        <Section title="Precursors & Coreactants" delay={500}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Precursors */}
                                {paper.precursor_coreactant.precursors.length > 0 && (
                                    <div className="stat-card">
                                        <p
                                            className="data-label mb-3"
                                            style={{ color: "var(--accent-teal)" }}
                                        >
                                            Precursors
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {paper.precursor_coreactant.precursors.map((c, i) => (
                                                <div key={i} className="badge badge-teal">
                                                    <span className="font-mono font-bold">
                                                        {c.abbreviation}
                                                    </span>
                                                    <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
                                                        {c.full_name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {/* Coreactants */}
                                {paper.precursor_coreactant.coreactants.length > 0 && (
                                    <div className="stat-card">
                                        <p
                                            className="data-label mb-3"
                                            style={{ color: "var(--accent-purple)" }}
                                        >
                                            Coreactants
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {paper.precursor_coreactant.coreactants.map((c, i) => (
                                                <div key={i} className="badge badge-purple">
                                                    <span className="font-mono font-bold">
                                                        {c.abbreviation}
                                                    </span>
                                                    <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
                                                        {c.full_name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {/* Purge Gas */}
                                {paper.precursor_coreactant.purge_gas.length > 0 && (
                                    <div className="stat-card">
                                        <p
                                            className="data-label mb-3"
                                            style={{ color: "var(--accent-amber)" }}
                                        >
                                            Purge Gas
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {paper.precursor_coreactant.purge_gas.map((c, i) => (
                                                <div key={i} className="badge badge-amber">
                                                    <span className="font-mono font-bold">
                                                        {c.abbreviation}
                                                    </span>
                                                    <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
                                                        {c.full_name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {/* Carrier Gas */}
                                {paper.precursor_coreactant.carrier_gas.length > 0 && (
                                    <div className="stat-card">
                                        <p
                                            className="data-label mb-3"
                                            style={{ color: "var(--accent-cyan)" }}
                                        >
                                            Carrier Gas
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {paper.precursor_coreactant.carrier_gas.map((c, i) => (
                                                <div key={i} className="badge badge-cyan">
                                                    <span className="font-mono font-bold">
                                                        {c.abbreviation}
                                                    </span>
                                                    <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
                                                        {c.full_name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <Evidence text={paper.precursor_coreactant.evidence} />
                        </Section>
                    )}

                    {/* ─── Reaction Conditions ─── */}
                    {(paper.reaction_conditions.surface_mechanism_description || paper.reaction_conditions.reaction_equations.length > 0 || paper.reaction_conditions.intermediate_species.length > 0 || paper.reaction_conditions.evidence) && (
                        <Section title="Reaction Conditions" delay={600}>
                            {paper.reaction_conditions.surface_mechanism_description &&
                                paper.reaction_conditions.surface_mechanism_description !== "N/A" &&
                                paper.reaction_conditions.surface_mechanism_description !== "null" && (
                                    <div className="stat-card mb-4">
                                        <p className="data-label mb-2">Surface Mechanism</p>
                                        <p
                                            className="text-base leading-relaxed"
                                            style={{ color: "var(--text-secondary)" }}
                                        >
                                            {paper.reaction_conditions.surface_mechanism_description}
                                        </p>
                                    </div>
                                )}
                            {paper.reaction_conditions.reaction_equations.length > 0 && (
                                <div className="stat-card mb-4">
                                    <p className="data-label mb-2">Reaction Equations</p>
                                    <div className="flex flex-col gap-2">
                                        {paper.reaction_conditions.reaction_equations.map(
                                            (eq, i) => (
                                                <code
                                                    key={i}
                                                    className="text-sm font-mono px-3 py-2 rounded-lg"
                                                    style={{
                                                        background: "rgba(45,212,191,0.08)",
                                                        color: "var(--accent-teal)",
                                                    }}
                                                >
                                                    {eq}
                                                </code>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                            {paper.reaction_conditions.intermediate_species.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                    <span className="data-label mr-2">
                                        Intermediate Species:
                                    </span>
                                    {paper.reaction_conditions.intermediate_species.map(
                                        (sp, i) => (
                                            <span key={i} className="badge badge-rose">
                                                {sp}
                                            </span>
                                        )
                                    )}
                                </div>
                            )}
                            <Evidence text={paper.reaction_conditions.evidence} />
                        </Section>
                    )}

                    {/* ─── Film Properties ─── */}
                    {(filmFields.some(f => f.val !== null && f.val !== "" && f.val !== "N/A") || filmProps.evidence) && (
                        <Section title="Film Properties" delay={700}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-2">
                                    <div className="stat-grid">
                                        <DataField
                                            label="Thickness (nm)"
                                            value={filmProps.film_thickness_nm}
                                            accent="var(--accent-teal)"
                                        />
                                        <DataField
                                            label="Density (g/cm³)"
                                            value={filmProps.density_g_cm3}
                                            accent="var(--accent-purple)"
                                        />
                                        <DataField
                                            label="Refractive Index"
                                            value={filmProps.refractive_index}
                                            accent="var(--accent-cyan)"
                                        />
                                        <DataField
                                            label="Surface Roughness (nm)"
                                            value={filmProps.surface_roughness_nm}
                                            accent="var(--accent-amber)"
                                        />
                                        <DataField
                                            label="Crystal Phase"
                                            value={filmProps.crystal_phase}
                                            accent="var(--accent-emerald)"
                                        />
                                    </div>
                                </div>
                                {reported > 0 && (
                                    <div className="chart-container flex flex-col items-center justify-center">
                                        <p className="data-label mb-3">Data Completeness</p>
                                        <ResponsiveContainer width="100%" height={180}>
                                            <PieChart>
                                                <Pie
                                                    data={filmPieData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={50}
                                                    outerRadius={70}
                                                    paddingAngle={4}
                                                    dataKey="value"
                                                    stroke="none"
                                                >
                                                    {filmPieData.map((entry, index) => (
                                                        <Cell key={index} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    contentStyle={{
                                                        background: "#0a0a0a",
                                                        border: "1px solid rgba(255,255,255,0.15)",
                                                        borderRadius: 8,
                                                        color: "#f1f5f9",
                                                        fontSize: 13,
                                                    }}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <p className="text-sm font-semibold" style={{ color: "var(--accent-teal)" }}>
                                            {reported}/{filmFields.length} reported
                                        </p>
                                    </div>
                                )}
                            </div>
                            <Evidence text={filmProps.evidence} />
                        </Section>
                    )}

                    {/* ─── Characterization Methods ─── */}
                    {(paper.characterization.characterization_methods.length > 0 || paper.characterization.evidence) && (
                        <Section title="Characterization Methods" delay={800}>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {paper.characterization.characterization_methods.map(
                                    (method, i) => (
                                        <span
                                            key={i}
                                            className="badge animate-in"
                                            style={{
                                                animationDelay: `${850 + i * 60}ms`,
                                                background: `${chartColors[i % chartColors.length]}15`,
                                                color: chartColors[i % chartColors.length],
                                                borderColor: `${chartColors[i % chartColors.length]}33`,
                                            }}
                                        >
                                            {method}
                                        </span>
                                    )
                                )}
                            </div>
                            {charMethodData.length > 0 && (
                                <div className="chart-container">
                                    <p className="data-label mb-4">Methods Inventory</p>
                                    <ResponsiveContainer width="100%" height={320}>
                                        <BarChart
                                            data={charMethodData}
                                            layout="vertical"
                                            margin={{ left: 10, right: 20, top: 5, bottom: 5 }}
                                        >
                                            <XAxis type="number" hide />
                                            <YAxis
                                                type="category"
                                                dataKey="name"
                                                width={60}
                                                tick={{ fill: "#94a3b8", fontSize: 12 }}
                                                axisLine={false}
                                                tickLine={false}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    background: "#0a0a0a",
                                                    border: "1px solid rgba(255,255,255,0.1)",
                                                    borderRadius: 8,
                                                    color: "#f1f5f9",
                                                    fontSize: 13,
                                                }}
                                                content={({ payload }) => {
                                                    if (!payload || !payload[0]) return null;
                                                    const data = payload[0].payload as { fullName: string };
                                                    return (
                                                        <div style={{
                                                            background: "#0a0a0a",
                                                            border: "1px solid rgba(255,255,255,0.15)",
                                                            borderRadius: 8,
                                                            padding: "8px 12px",
                                                            color: "#f1f5f9",
                                                            fontSize: 13,
                                                        }}>
                                                            {data.fullName}
                                                        </div>
                                                    );
                                                }}
                                            />
                                            <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={20}>
                                                {charMethodData.map((_, i) => (
                                                    <Cell
                                                        key={i}
                                                        fill={chartColors[i % chartColors.length]}
                                                    />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
                            <Evidence text={paper.characterization.evidence} />
                        </Section>
                    )}

                    <div className="shimmer-line" />

                    {/* ─── Footer ─── */}
                    <footer className="text-center pb-10">
                        <p
                            className="text-sm"
                            style={{ color: "var(--text-muted)" }}
                        >
                            ALD-LLaMat Data Visualization •{" "}
                            <span style={{ color: "var(--accent-teal)" }}>
                                {paper.characterization.characterization_methods.length}{" "}
                                characterization methods
                            </span>{" "}
                            tracked across{" "}
                            <span style={{ color: "var(--accent-purple)" }}>
                                {papers.length} paper{papers.length !== 1 ? "s" : ""}
                            </span>
                        </p>
                    </footer>
                </main>
            )}
        </div>
    );
}
