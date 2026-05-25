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
    Legend,
} from "recharts";
import { type Chemical, type PaperData } from "@/app/lib/data-fetcher";

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

function isReportedValue(value: string | number | null | undefined) {
    if (value === null || value === undefined) {
        return false;
    }

    const normalized = String(value).trim().toLowerCase();
    return normalized !== "" && normalized !== "n/a" && normalized !== "na" && normalized !== "null" && normalized !== "not reported" && normalized !== "unknown";
}

function getMaterialFormula(paper: PaperData) {
    return paper.target_material.target_material.chemical_formula || "Others";
}

function getMethodLabel(method: string) {
    const match = method.match(/\(([^)]+)\)/);
    return match ? match[1] : method;
}

const CHEMICAL_ALIASES = [
    {
        label: "H2O",
        aliases: ["h2o", "h20", "water", "deionized water", "di water", "distilled water", "h2o vapor", "water vapor"],
    },
    {
        label: "O3",
        aliases: ["o3", "ozone"],
    },
    {
        label: "O2",
        aliases: ["o2", "oxygen", "molecular oxygen"],
    },
    {
        label: "O2 plasma",
        aliases: ["o2 plasma", "oxygen plasma", "o2-plasma"],
    },
    {
        label: "H2O2",
        aliases: ["h2o2", "hydrogen peroxide"],
    },
    {
        label: "NH3",
        aliases: ["nh3", "ammonia"],
    },
    {
        label: "N2",
        aliases: ["n2", "nitrogen"],
    },
    {
        label: "Ar",
        aliases: ["ar", "argon"],
    },
    {
        label: "TMA",
        aliases: ["tma", "trimethylaluminum", "trimethyl aluminium", "aluminum trimethyl", "aluminium trimethyl"],
    },
    {
        label: "TDMAT",
        aliases: ["tdmat", "tetrakis(dimethylamido)titanium", "tetrakis(dimethylamino)titanium"],
    },
    {
        label: "TiCl4",
        aliases: ["ticl4", "titanium tetrachloride"],
    },
    {
        label: "TTIP",
        aliases: ["ttip", "titanium isopropoxide", "titanium(iv) isopropoxide", "titanium tetraisopropoxide"],
    },
    {
        label: "DEZ",
        aliases: ["dez", "diethylzinc", "diethyl zinc"],
    },
    {
        label: "ZnO",
        aliases: ["zno", "zinc oxide"],
    },
];

function normalizeChemicalName(value: string) {
    return value
        .toLowerCase()
        .replace(/[₀-₉]/g, (digit) => "0123456789"["₀₁₂₃₄₅₆₇₈₉".indexOf(digit)])
        .replace(/\s+/g, " ")
        .replace(/\s*\(\s*/g, "(")
        .replace(/\s*\)\s*/g, ")")
        .trim();
}

function getChemicalLabel(chemical: Chemical) {
    const abbreviation = chemical.abbreviation?.trim() ?? "";
    const fullName = chemical.full_name?.trim() ?? "";
    const candidates = [abbreviation, fullName].filter(isReportedValue).map(normalizeChemicalName);

    for (const group of CHEMICAL_ALIASES) {
        if (group.aliases.some((alias) => candidates.includes(alias))) {
            return group.label;
        }
    }

    return abbreviation || fullName;
}

function incrementCount(map: Map<string, number>, key: string) {
    const cleanKey = key.trim();
    if (!isReportedValue(cleanKey)) {
        return;
    }
    map.set(cleanKey, (map.get(cleanKey) ?? 0) + 1);
}

function toCountData(map: Map<string, number>, limit = 8) {
    return Array.from(map.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
        .slice(0, limit);
}

function getAverage(values: number[]) {
    if (values.length === 0) {
        return null;
    }

    const sum = values.reduce((total, value) => total + value, 0);
    return Math.round(sum / values.length);
}

function buildCountDistribution(values: number[], label: string) {
    const counts = new Map<string, number>();
    values.forEach((value) => incrementCount(counts, `${value} ${label}${value === 1 ? "" : "s"}`));
    return toCountData(counts, 8);
}

function buildTemperatureDistribution(temperatures: number[]) {
    if (temperatures.length === 0) {
        return [];
    }

    const binSize = 50;
    const bins = new Map<number, number>();

    temperatures.forEach((temperature) => {
        const start = Math.floor(temperature / binSize) * binSize;
        bins.set(start, (bins.get(start) ?? 0) + 1);
    });

    return Array.from(bins.entries())
        .sort(([a], [b]) => a - b)
        .map(([start, count]) => ({
            name: `${start}-${start + binSize - 1}°C`,
            count,
        }));
}

function uniqueReportedValues(values: string[]) {
    return Array.from(new Set(values.filter(isReportedValue)));
}

function getPhaseLabel(value: string | null | undefined) {
    if (!isReportedValue(value)) {
        return "Not reported";
    }

    const normalized = String(value).trim().replace(/\s+/g, " ");
    const lower = normalized.toLowerCase();

    if (lower.includes("amorphous")) {
        return "Amorphous";
    }
    if (lower.includes("anatase")) {
        return "Anatase";
    }
    if (lower.includes("rutile")) {
        return "Rutile";
    }
    if (lower.includes("brookite")) {
        return "Brookite";
    }
    if (lower.includes("gamma") || lower.includes("γ")) {
        return "Gamma";
    }
    if (lower.includes("alpha") || lower.includes("α")) {
        return "Alpha";
    }
    if (lower.includes("crystalline") || lower.includes("polycrystalline")) {
        return "Crystalline";
    }

    return normalized;
}

function buildTemperaturePhaseDistribution(materialPapers: PaperData[]) {
    const binSize = 50;
    const phaseCounts = new Map<string, number>();
    const records = materialPapers
        .map((paper) => ({
            temperature: paper.deposition_conditions.deposition_temperature_C,
            phase: getPhaseLabel(paper.film_properties.crystal_phase),
        }))
        .filter((record): record is { temperature: number; phase: string } =>
            typeof record.temperature === "number" &&
            Number.isFinite(record.temperature) &&
            record.phase !== "Not reported"
        );

    records.forEach((record) => incrementCount(phaseCounts, record.phase));

    const topPhases = topNames(phaseCounts, 6);
    const topPhaseSet = new Set(topPhases);
    const phases = phaseCounts.size > topPhases.length ? [...topPhases, "Other"] : topPhases;
    const bins = new Map<number, Record<string, string | number>>();

    records.forEach((record) => {
        const start = Math.floor(record.temperature / binSize) * binSize;
        const phase = topPhaseSet.has(record.phase) ? record.phase : "Other";
        const current = bins.get(start) ?? {
            name: `${start}-${start + binSize - 1}°C`,
            total: 0,
        };

        current[phase] = Number(current[phase] ?? 0) + 1;
        current.total = Number(current.total) + 1;
        bins.set(start, current);
    });

    const data = Array.from(bins.entries())
        .sort(([a], [b]) => a - b)
        .map(([, value]) => value);

    return { data, phases };
}

function topNames(counts: Map<string, number>, limit: number) {
    return Array.from(counts.entries())
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .slice(0, limit)
        .map(([name]) => name);
}

function addPairCount(map: Map<string, number>, source: string, target: string) {
    const key = `${source}|||${target}`;
    map.set(key, (map.get(key) ?? 0) + 1);
}

function parsePairKey(key: string) {
    const [source, target] = key.split("|||");
    return { source, target };
}

function truncateLabel(label: string, maxLength = 18) {
    return label.length > maxLength ? `${label.slice(0, maxLength - 1)}...` : label;
}

function buildChemistrySankey(materialPapers: PaperData[]) {
    const precursorTotals = new Map<string, number>();
    const coreactantTotals = new Map<string, number>();
    const phaseTotals = new Map<string, number>();
    const precursorCoreactantEdges = new Map<string, number>();
    const coreactantPhaseEdges = new Map<string, number>();

    materialPapers.forEach((paper) => {
        const precursors = uniqueReportedValues(
            paper.precursor_coreactant.precursors.map(getChemicalLabel)
        );
        const coreactants = uniqueReportedValues(
            paper.precursor_coreactant.coreactants.map(getChemicalLabel)
        );
        const phase = getPhaseLabel(paper.film_properties.crystal_phase);

        if (precursors.length === 0 || coreactants.length === 0) {
            return;
        }

        precursors.forEach((precursor) => {
            incrementCount(precursorTotals, precursor);
            coreactants.forEach((coreactant) => {
                addPairCount(precursorCoreactantEdges, precursor, coreactant);
            });
        });

        coreactants.forEach((coreactant) => {
            incrementCount(coreactantTotals, coreactant);
            incrementCount(phaseTotals, phase);
            addPairCount(coreactantPhaseEdges, coreactant, phase);
        });
    });

    const precursorNames = topNames(precursorTotals, 6);
    const coreactantNames = topNames(coreactantTotals, 6);
    const phaseNames = topNames(phaseTotals, 6);
    const precursorSet = new Set(precursorNames);
    const coreactantSet = new Set(coreactantNames);
    const phaseSet = new Set(phaseNames);
    const edges = [
        ...Array.from(precursorCoreactantEdges.entries())
            .map(([key, count]) => ({ ...parsePairKey(key), count, type: "precursor-coreactant" as const }))
            .filter((edge) => precursorSet.has(edge.source) && coreactantSet.has(edge.target)),
        ...Array.from(coreactantPhaseEdges.entries())
            .map(([key, count]) => ({ ...parsePairKey(key), count, type: "coreactant-phase" as const }))
            .filter((edge) => coreactantSet.has(edge.source) && phaseSet.has(edge.target)),
    ];

    return {
        precursorNames,
        coreactantNames,
        phaseNames,
        precursorTotals,
        coreactantTotals,
        phaseTotals,
        edges,
    };
}

function buildMaterialInsights(materialPapers: PaperData[]) {
    const temperatures = materialPapers
        .map((paper) => paper.deposition_conditions.deposition_temperature_C)
        .filter((value): value is number => typeof value === "number" && Number.isFinite(value));
    const methodCounts = new Map<string, number>();
    const phaseCounts = new Map<string, number>();
    const precursorCounts = new Map<string, number>();
    const coreactantCounts = new Map<string, number>();
    const precursorCountDistribution = materialPapers.map((paper) => paper.precursor_coreactant.precursors.length);
    const coreactantCountDistribution = materialPapers.map((paper) => paper.precursor_coreactant.coreactants.length);

    materialPapers.forEach((paper) => {
        paper.characterization.characterization_methods.forEach((method) => incrementCount(methodCounts, getMethodLabel(method)));
        incrementCount(phaseCounts, paper.film_properties.crystal_phase ?? "");
        paper.precursor_coreactant.precursors.forEach((chemical) => incrementCount(precursorCounts, getChemicalLabel(chemical)));
        paper.precursor_coreactant.coreactants.forEach((chemical) => incrementCount(coreactantCounts, getChemicalLabel(chemical)));
    });

    return {
        temperatures,
        averageTemperature: getAverage(temperatures),
        temperatureDistribution: buildTemperatureDistribution(temperatures),
        methodData: toCountData(methodCounts, 10),
        phaseData: toCountData(phaseCounts, 8),
        precursorData: toCountData(precursorCounts, 8),
        coreactantData: toCountData(coreactantCounts, 8),
        precursorCountData: buildCountDistribution(precursorCountDistribution, "precursor"),
        coreactantCountData: buildCountDistribution(coreactantCountDistribution, "coreactant"),
        uniqueMethods: methodCounts.size,
        uniquePrecursors: precursorCounts.size,
        uniqueCoreactants: coreactantCounts.size,
        reportedPhases: Array.from(phaseCounts.values()).reduce((total, count) => total + count, 0),
    };
}

function EmptyInsight({ label }: { label: string }) {
    return (
        <div className="chart-empty">
            {label}
        </div>
    );
}

function CountBarChart({
    data,
    color = "#5eead4",
    height = 280,
}: {
    data: Array<{ name: string; count: number }>;
    color?: string;
    height?: number;
}) {
    if (data.length === 0) {
        return <EmptyInsight label="No reported data" />;
    }

    return (
        <ResponsiveContainer width="100%" height={height}>
            <BarChart
                data={data}
                layout="vertical"
                margin={{ left: 8, right: 16, top: 8, bottom: 8 }}
            >
                <XAxis type="number" allowDecimals={false} hide />
                <YAxis
                    type="category"
                    dataKey="name"
                    width={92}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.04)" }}
                    contentStyle={{
                        background: "#0a0a0a",
                        border: "1px solid rgba(255,255,255,0.15)",
                        borderRadius: 8,
                        color: "#f1f5f9",
                        fontSize: 13,
                    }}
                />
                <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={18} fill={color} />
            </BarChart>
        </ResponsiveContainer>
    );
}

function TemperaturePhaseChart({ materialPapers }: { materialPapers: PaperData[] }) {
    const { data, phases } = buildTemperaturePhaseDistribution(materialPapers);

    if (data.length === 0 || phases.length === 0) {
        return <EmptyInsight label="No paired temperature and crystal phase data" />;
    }

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ left: 0, right: 16, top: 8, bottom: 8 }}>
                <XAxis
                    dataKey="name"
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                />
                <YAxis
                    allowDecimals={false}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.04)" }}
                    contentStyle={{
                        background: "#0a0a0a",
                        border: "1px solid rgba(255,255,255,0.15)",
                        borderRadius: 8,
                        color: "#f1f5f9",
                        fontSize: 13,
                    }}
                />
                <Legend
                    wrapperStyle={{
                        color: "#a3a3a3",
                        fontSize: 12,
                        paddingTop: 8,
                    }}
                />
                {phases.map((phase, index) => (
                    <Bar
                        key={phase}
                        dataKey={phase}
                        stackId="phase"
                        fill={chartColors[index % chartColors.length]}
                        radius={index === phases.length - 1 ? [6, 6, 0, 0] : [0, 0, 0, 0]}
                    />
                ))}
            </BarChart>
        </ResponsiveContainer>
    );
}

function ChemistrySankey({ materialPapers }: { materialPapers: PaperData[] }) {
    const sankey = buildChemistrySankey(materialPapers);
    const maxRows = Math.max(
        sankey.precursorNames.length,
        sankey.coreactantNames.length,
        sankey.phaseNames.length,
        1
    );
    const height = Math.max(300, maxRows * 54 + 72);
    const width = 900;
    const nodeWidth = 132;
    const nodeHeight = 34;
    const top = 58;
    const columns = {
        precursor: { x: 24, color: "#5eead4", title: "Precursor" },
        coreactant: { x: 384, color: "#fda4af", title: "Coreactant" },
        phase: { x: 744, color: "#c4b5fd", title: "Crystal Phase" },
    };
    const maxEdgeCount = Math.max(...sankey.edges.map((edge) => edge.count), 1);

    const makeNodes = (
        names: string[],
        column: keyof typeof columns,
        totals: Map<string, number>
    ) => {
        const gap = names.length <= 1 ? 0 : (height - top - nodeHeight - 28) / (names.length - 1);
        return names.map((name, index) => ({
            id: `${column}:${name}`,
            name,
            count: totals.get(name) ?? 0,
            x: columns[column].x,
            y: top + index * gap,
            color: columns[column].color,
        }));
    };

    const nodes = [
        ...makeNodes(sankey.precursorNames, "precursor", sankey.precursorTotals),
        ...makeNodes(sankey.coreactantNames, "coreactant", sankey.coreactantTotals),
        ...makeNodes(sankey.phaseNames, "phase", sankey.phaseTotals),
    ];
    const nodeMap = new Map(nodes.map((node) => [node.id, node]));
    const visibleEdges = sankey.edges
        .map((edge) => {
            const sourceColumn = edge.type === "precursor-coreactant" ? "precursor" : "coreactant";
            const targetColumn = edge.type === "precursor-coreactant" ? "coreactant" : "phase";
            const source = nodeMap.get(`${sourceColumn}:${edge.source}`);
            const target = nodeMap.get(`${targetColumn}:${edge.target}`);

            if (!source || !target) {
                return null;
            }

            return { ...edge, source, target };
        })
        .filter((edge): edge is NonNullable<typeof edge> => edge !== null);

    if (visibleEdges.length === 0) {
        return <EmptyInsight label="Not enough precursor-coreactant-phase data" />;
    }

    return (
        <div className="chemistry-sankey">
            <svg
                viewBox={`0 0 ${width} ${height}`}
                role="img"
                aria-label="ALD chemistry flow from precursor to coreactant to crystal phase"
            >
                {Object.values(columns).map((column) => (
                    <text
                        key={column.title}
                        x={column.x}
                        y={24}
                        fill="#737373"
                        fontSize="12"
                        fontWeight="700"
                        letterSpacing="0.08em"
                    >
                        {column.title}
                    </text>
                ))}

                <g fill="none">
                    {visibleEdges.map((edge, index) => {
                        const x1 = edge.source.x + nodeWidth;
                        const y1 = edge.source.y + nodeHeight / 2;
                        const x2 = edge.target.x;
                        const y2 = edge.target.y + nodeHeight / 2;
                        const controlOffset = Math.max(120, (x2 - x1) * 0.45);
                        const strokeWidth = Math.max(3, (edge.count / maxEdgeCount) * 18);
                        const stroke = edge.type === "precursor-coreactant" ? "#5eead4" : "#fda4af";

                        return (
                            <path
                                key={`${edge.source.id}-${edge.target.id}-${index}`}
                                d={`M ${x1} ${y1} C ${x1 + controlOffset} ${y1}, ${x2 - controlOffset} ${y2}, ${x2} ${y2}`}
                                stroke={stroke}
                                strokeWidth={strokeWidth}
                                strokeOpacity="0.28"
                                strokeLinecap="round"
                            >
                                <title>{`${edge.source.name} to ${edge.target.name}: ${edge.count}`}</title>
                            </path>
                        );
                    })}
                </g>

                <g>
                    {nodes.map((node) => (
                        <g key={node.id}>
                            <rect
                                x={node.x}
                                y={node.y}
                                width={nodeWidth}
                                height={nodeHeight}
                                rx="8"
                                fill={`${node.color}18`}
                                stroke={`${node.color}66`}
                            />
                            <text
                                x={node.x + 12}
                                y={node.y + 21}
                                fill="#f1f5f9"
                                fontSize="13"
                                fontWeight="700"
                            >
                                {truncateLabel(node.name)}
                            </text>
                            <text
                                x={node.x + nodeWidth - 10}
                                y={node.y + 21}
                                fill={node.color}
                                fontSize="12"
                                fontWeight="700"
                                textAnchor="end"
                            >
                                {node.count}
                            </text>
                        </g>
                    ))}
                </g>
            </svg>
        </div>
    );
}

function InfoHint({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);

    return (
        <span className="info-hint">
            <button
                type="button"
                className="info-hint-button"
                onClick={() => setOpen(!open)}
                aria-label="How to interpret this graph"
                aria-expanded={open}
            >
                i
            </button>
            {open && (
                <span className="info-hint-popover">
                    {children}
                </span>
            )}
        </span>
    );
}

function MaterialInsights({
    selectedMaterial,
    materialPapers,
}: {
    selectedMaterial: string;
    materialPapers: PaperData[];
}) {
    const insights = buildMaterialInsights(materialPapers);
    const statItems = [
        { label: "Papers", value: materialPapers.length, color: "var(--accent-teal)" },
        { label: "Avg. temperature", value: insights.averageTemperature !== null ? `${insights.averageTemperature}°C` : null, color: "var(--accent-amber)" },
        { label: "Reported temps", value: insights.temperatures.length, color: "var(--accent-cyan)" },
        { label: "Methods", value: insights.uniqueMethods, color: "var(--accent-purple)" },
        { label: "Precursors", value: insights.uniquePrecursors, color: "var(--accent-emerald)" },
        { label: "Coreactants", value: insights.uniqueCoreactants, color: "var(--accent-rose)" },
    ];

    return (
        <div className="flex flex-col gap-6 mb-8">
            <Section title={`${selectedMaterial} Insights`}>
                <div className="stat-grid mb-6">
                    {statItems.map((item) => (
                        <DataField
                            key={item.label}
                            label={item.label}
                            value={item.value}
                            accent={item.color}
                        />
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="chart-container lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <p className="data-label">ALD Chemistry Flow</p>
                            <InfoHint>
                                Read left to right: precursor to coreactant to reported crystal phase. Thicker curves mean that route appears in more papers.
                            </InfoHint>
                        </div>
                        <ChemistrySankey materialPapers={materialPapers} />
                    </div>

                    <div className="chart-container">
                        <p className="data-label mb-4">Temperature Distribution</p>
                        {insights.temperatureDistribution.length > 0 ? (
                            <ResponsiveContainer width="100%" height={260}>
                                <BarChart data={insights.temperatureDistribution} margin={{ left: 0, right: 16, top: 8, bottom: 8 }}>
                                    <XAxis
                                        dataKey="name"
                                        tick={{ fill: "#94a3b8", fontSize: 11 }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        allowDecimals={false}
                                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        cursor={{ fill: "rgba(255,255,255,0.04)" }}
                                        contentStyle={{
                                            background: "#0a0a0a",
                                            border: "1px solid rgba(255,255,255,0.15)",
                                            borderRadius: 8,
                                            color: "#f1f5f9",
                                            fontSize: 13,
                                        }}
                                    />
                                    <Bar dataKey="count" fill="#fde68a" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <EmptyInsight label="No reported temperatures" />
                        )}
                    </div>

                    <div className="chart-container">
                        <p className="data-label mb-4">Common Characterization</p>
                        <CountBarChart data={insights.methodData} color="#67e8f9" />
                    </div>

                    <div className="chart-container lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <p className="data-label">Temperature vs Crystal Phase</p>
                            <InfoHint>
                                Each bar is a temperature range. Colored segments show how many papers report each crystal phase in that range.
                            </InfoHint>
                        </div>
                        <TemperaturePhaseChart materialPapers={materialPapers} />
                    </div>

                    <div className="chart-container">
                        <p className="data-label mb-4">Precursor Count Per Paper</p>
                        <CountBarChart data={insights.precursorCountData} color="#5eead4" height={220} />
                    </div>

                    <div className="chart-container">
                        <p className="data-label mb-4">Coreactant Count Per Paper</p>
                        <CountBarChart data={insights.coreactantCountData} color="#c4b5fd" height={220} />
                    </div>

                    <div className="chart-container">
                        <p className="data-label mb-4">Crystal Phases</p>
                        {insights.phaseData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={260}>
                                <PieChart>
                                    <Pie
                                        data={insights.phaseData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={48}
                                        outerRadius={86}
                                        paddingAngle={3}
                                        dataKey="count"
                                        nameKey="name"
                                        stroke="none"
                                    >
                                        {insights.phaseData.map((_, index) => (
                                            <Cell key={index} fill={chartColors[index % chartColors.length]} />
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
                        ) : (
                            <EmptyInsight label="No reported crystal phases" />
                        )}
                    </div>

                    <div className="chart-container">
                        <p className="data-label mb-4">Common Precursors</p>
                        <CountBarChart data={insights.precursorData} color="#6ee7b7" />
                    </div>

                    <div className="chart-container">
                        <p className="data-label mb-4">Common Coreactants</p>
                        <CountBarChart data={insights.coreactantData} color="#fda4af" />
                    </div>
                </div>
            </Section>
        </div>
    );
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
                const formula = getMaterialFormula(p);
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
            .filter(item => getMaterialFormula(item.p) === selectedMaterial);
        const materialPapers = filteredPapers.map(({ p }) => p);

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
                <MaterialInsights
                    selectedMaterial={selectedMaterial}
                    materialPapers={materialPapers}
                />
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
{/*                     
                    <button
                        onClick={() => setPdfOpenPaperIndex(showPdf ? null : selectedPaperIndex)}
                        className="px-5 py-2.5 rounded-2xl text-sm font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/20 hover:bg-teal-500/20 transition-all flex items-center gap-2"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                        {showPdf ? "Hide PDF" : "View Original PDF"}
                    </button>
                     */}
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
