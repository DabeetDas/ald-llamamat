(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/components/Dashboard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Dashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Cell.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$RadarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/RadarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/PolarGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarAngleAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/PolarAngleAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Radar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/Radar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/PieChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/Pie.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
// ─── Helpers ───
function Evidence({ text }) {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    if (!text || text === "" || text === "N/A" || text === "No evidence found" || text === "null") {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "evidence-toggle",
                onClick: ()=>setOpen(!open),
                "aria-expanded": open,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        width: "14",
                        height: "14",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        style: {
                            transform: open ? "rotate(90deg)" : "rotate(0deg)",
                            transition: "transform 0.2s"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                            points: "9 18 15 12 9 6"
                        }, void 0, false, {
                            fileName: "[project]/app/components/Dashboard.tsx",
                            lineNumber: 48,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/Dashboard.tsx",
                        lineNumber: 34,
                        columnNumber: 17
                    }, this),
                    "Evidence"
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/Dashboard.tsx",
                lineNumber: 29,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `evidence-text mt-3 rounded-2xl text-sm leading-relaxed ${open ? "open" : ""}`,
                style: {
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "var(--text-secondary)"
                },
                children: text
            }, void 0, false, {
                fileName: "[project]/app/components/Dashboard.tsx",
                lineNumber: 52,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/Dashboard.tsx",
        lineNumber: 28,
        columnNumber: 9
    }, this);
}
_s(Evidence, "xG1TONbKtDWtdOTrXaTAsNhPg/Q=");
_c = Evidence;
function DataField({ label, value, accent }) {
    if (value === null || value === undefined || value === "" || value === "N/A" || value === "not reported" || value === "null") {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "stat-card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "data-label mb-2",
                children: label
            }, void 0, false, {
                fileName: "[project]/app/components/Dashboard.tsx",
                lineNumber: 81,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "data-value",
                style: accent ? {
                    color: accent
                } : {},
                children: value
            }, void 0, false, {
                fileName: "[project]/app/components/Dashboard.tsx",
                lineNumber: 82,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/Dashboard.tsx",
        lineNumber: 80,
        columnNumber: 9
    }, this);
}
_c1 = DataField;
// ─── Particles Background ───
// ─── Section Wrapper ───
function Section({ title, children, delay = 0 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass-card p-6 animate-in",
        style: {
            animationDelay: `${delay}ms`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "section-title",
                children: title
            }, void 0, false, {
                fileName: "[project]/app/components/Dashboard.tsx",
                lineNumber: 106,
                columnNumber: 13
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/Dashboard.tsx",
        lineNumber: 102,
        columnNumber: 9
    }, this);
}
_c2 = Section;
function normalizeSearchText(value) {
    if (value === null || value === undefined) {
        return "";
    }
    return String(value).toLowerCase().trim();
}
function matchesSearch(query, values) {
    const normalizedQuery = normalizeSearchText(query);
    if (!normalizedQuery) {
        return true;
    }
    return values.some((value)=>normalizeSearchText(value).includes(normalizedQuery));
}
function SearchField({ value, onChange, placeholder, resultsLabel }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass-card p-4 md:p-5",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col lg:flex-row lg:items-center gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "relative flex-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "sr-only",
                            children: placeholder
                        }, void 0, false, {
                            fileName: "[project]/app/components/Dashboard.tsx",
                            lineNumber: 147,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "16",
                            height: "16",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "11",
                                    cy: "11",
                                    r: "8"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/Dashboard.tsx",
                                    lineNumber: 159,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "m21 21-4.35-4.35"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/Dashboard.tsx",
                                    lineNumber: 160,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/Dashboard.tsx",
                            lineNumber: 148,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "search",
                            value: value,
                            onChange: (event)=>onChange(event.target.value),
                            placeholder: placeholder,
                            className: "w-full rounded-2xl border border-white/10 bg-black/40 py-3 pl-11 pr-12 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-teal-400/40 focus:ring-2 focus:ring-teal-400/10"
                        }, void 0, false, {
                            fileName: "[project]/app/components/Dashboard.tsx",
                            lineNumber: 162,
                            columnNumber: 21
                        }, this),
                        value && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>onChange(""),
                            className: "absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-300 transition hover:border-teal-400/30 hover:text-teal-300",
                            "aria-label": "Clear search",
                            children: "Clear"
                        }, void 0, false, {
                            fileName: "[project]/app/components/Dashboard.tsx",
                            lineNumber: 170,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/Dashboard.tsx",
                    lineNumber: 146,
                    columnNumber: 17
                }, this),
                resultsLabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs uppercase tracking-[0.2em] text-slate-500",
                    children: resultsLabel
                }, void 0, false, {
                    fileName: "[project]/app/components/Dashboard.tsx",
                    lineNumber: 181,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/Dashboard.tsx",
            lineNumber: 145,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/Dashboard.tsx",
        lineNumber: 144,
        columnNumber: 9
    }, this);
}
_c3 = SearchField;
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
    "#c084fc"
];
function Dashboard({ papers, selectedPaperIndex, onSelectPaper }) {
    _s1();
    const [pdfOpenPaperIndex, setPdfOpenPaperIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedMaterial, setSelectedMaterial] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [materialSearch, setMaterialSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const showPdf = selectedPaperIndex !== null && pdfOpenPaperIndex === selectedPaperIndex;
    const openMaterialArchive = (formula)=>{
        setSelectedMaterial(formula);
    };
    const returnToMaterials = ()=>{
        setSelectedMaterial(null);
    };
    const openPaper = (idx)=>{
        setPdfOpenPaperIndex(null);
        onSelectPaper(idx);
    };
    const closePaper = ()=>{
        setPdfOpenPaperIndex(null);
        onSelectPaper(null);
    };
    if (!papers || papers.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center p-6 text-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass-card p-8 max-w-md w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-bold mb-4 text-rose-400",
                        children: "No Data Found"
                    }, void 0, false, {
                        fileName: "[project]/app/components/Dashboard.tsx",
                        lineNumber: 241,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-slate-400",
                        children: "Could not find any paper data in the extracted_data directory."
                    }, void 0, false, {
                        fileName: "[project]/app/components/Dashboard.tsx",
                        lineNumber: 242,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/Dashboard.tsx",
                lineNumber: 240,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/Dashboard.tsx",
            lineNumber: 239,
            columnNumber: 13
        }, this);
    }
    if (selectedPaperIndex === null) {
        // Handle material level filtering
        if (selectedMaterial === null) {
            // Tier 1: Material Groups
            const materialGroups = papers.reduce((acc, p)=>{
                const formula = p.target_material.target_material.chemical_formula || "Others";
                if (!acc[formula]) {
                    acc[formula] = {
                        formula,
                        name: p.target_material.target_material.material_name,
                        class: p.target_material.target_material.material_class,
                        count: 0,
                        processTypes: new Set()
                    };
                }
                acc[formula].count++;
                if (p.summary.process_type) acc[formula].processTypes.add(p.summary.process_type);
                return acc;
            }, {});
            const filteredMaterialGroups = Object.values(materialGroups).filter((group)=>matchesSearch(materialSearch, [
                    group.formula,
                    group.name,
                    group.class,
                    ...Array.from(group.processTypes)
                ])).sort((a, b)=>b.count - a.count);
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-8 md:p-12 max-w-6xl mx-auto w-full animate-in fade-in duration-700",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl font-black text-white mb-3",
                                children: [
                                    "Materials ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-teal-400",
                                        children: "Library"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 280,
                                        columnNumber: 39
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 279,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-slate-400 text-sm",
                                children: "Select a material system to browse its processed knowledge."
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 282,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/Dashboard.tsx",
                        lineNumber: 278,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SearchField, {
                            value: materialSearch,
                            onChange: setMaterialSearch,
                            placeholder: "Search by formula, material name, class, or process type",
                            resultsLabel: `${filteredMaterialGroups.length} of ${Object.keys(materialGroups).length} materials`
                        }, void 0, false, {
                            fileName: "[project]/app/components/Dashboard.tsx",
                            lineNumber: 285,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/Dashboard.tsx",
                        lineNumber: 284,
                        columnNumber: 21
                    }, this),
                    filteredMaterialGroups.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass-card p-8 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg font-semibold text-slate-100 mb-2",
                                children: "No materials matched that search."
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 294,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-400",
                                children: "Try a chemical formula, material name, or process keyword."
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 295,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/Dashboard.tsx",
                        lineNumber: 293,
                        columnNumber: 25
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                        children: filteredMaterialGroups.map((group, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>openMaterialArchive(group.formula),
                                className: "glass-card p-6 cursor-pointer hover:border-teal-400/30 group flex flex-col h-full transition-all hover:translate-y-[-4px] animate-in",
                                style: {
                                    animationDelay: `${i * 100}ms`
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-start mb-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-teal-400 text-[10px] font-bold uppercase tracking-wider",
                                            children: [
                                                group.count,
                                                " papers"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/Dashboard.tsx",
                                            lineNumber: 307,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 306,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-2xl font-black mb-1 text-slate-100 group-hover:text-cyan-400 transition-colors",
                                        children: group.formula
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 309,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-slate-400 mb-6 italic",
                                        children: group.name
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 312,
                                        columnNumber: 33
                                    }, this),
                                    group.class && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs uppercase tracking-[0.18em] text-slate-500 mt-auto",
                                        children: group.class
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 316,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, group.formula, true, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 300,
                                columnNumber: 29
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/components/Dashboard.tsx",
                        lineNumber: 298,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/Dashboard.tsx",
                lineNumber: 277,
                columnNumber: 17
            }, this);
        }
        // Tier 2: Papers for Selected Material
        const filteredPapers = papers.map((p, originalIdx)=>({
                p,
                originalIdx
            })).filter((item)=>(item.p.target_material.target_material.chemical_formula || "Others") === selectedMaterial);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-8 md:p-12 max-w-6xl mx-auto w-full animate-in fade-in duration-700",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: returnToMaterials,
                                    className: "text-teal-400 text-sm font-bold flex items-center gap-2 mb-4 hover:translate-x-[-4px] transition-transform",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "14",
                                            height: "14",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: "3",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M19 12H5M12 19l-7-7 7-7"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                lineNumber: 341,
                                                columnNumber: 172
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/Dashboard.tsx",
                                            lineNumber: 341,
                                            columnNumber: 29
                                        }, this),
                                        "Back to Materials"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/Dashboard.tsx",
                                    lineNumber: 337,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-black text-white",
                                    children: [
                                        selectedMaterial,
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-slate-500 font-light",
                                            children: "Archive"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/Dashboard.tsx",
                                            lineNumber: 345,
                                            columnNumber: 48
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/Dashboard.tsx",
                                    lineNumber: 344,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/Dashboard.tsx",
                            lineNumber: 336,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-slate-400 text-sm bg-neutral-900 border border-white/10 px-4 py-2 rounded-xl",
                            children: [
                                "Found ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-teal-400 font-bold",
                                    children: filteredPapers.length
                                }, void 0, false, {
                                    fileName: "[project]/app/components/Dashboard.tsx",
                                    lineNumber: 349,
                                    columnNumber: 31
                                }, this),
                                " contributions"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/Dashboard.tsx",
                            lineNumber: 348,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/Dashboard.tsx",
                    lineNumber: 335,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                    children: filteredPapers.map(({ p, originalIdx }, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: ()=>openPaper(originalIdx),
                            className: "glass-card p-6 cursor-pointer hover:border-teal-400/30 group flex flex-col h-full transition-all hover:translate-y-[-4px] animate-in",
                            style: {
                                animationDelay: `${i * 100}ms`
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-start mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "px-3 py-1 bg-neutral-900 rounded-full text-[10px] font-bold text-slate-400 border border-white/15 uppercase tracking-widest",
                                            children: p.id
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/Dashboard.tsx",
                                            lineNumber: 361,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-teal-400 text-[10px] font-bold uppercase tracking-wider",
                                            children: [
                                                p.characterization.characterization_methods.length,
                                                " methods"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/Dashboard.tsx",
                                            lineNumber: 364,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/Dashboard.tsx",
                                    lineNumber: 360,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-bold mb-4 text-slate-100 group-hover:text-cyan-400 transition-colors leading-snug",
                                    children: p.label?.includes(" — ") ? p.label.split(" — ")[1] : p.label || p.target_material.target_material.chemical_formula
                                }, void 0, false, {
                                    fileName: "[project]/app/components/Dashboard.tsx",
                                    lineNumber: 366,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-slate-500 mb-6 line-clamp-2 leading-relaxed",
                                    children: p.summary.summary || "No summary provided for this paper."
                                }, void 0, false, {
                                    fileName: "[project]/app/components/Dashboard.tsx",
                                    lineNumber: 371,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] uppercase font-bold px-2 py-1 bg-purple-500/10 text-purple-300 rounded-lg",
                                            children: p.summary.process_type || "ALD"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/Dashboard.tsx",
                                            lineNumber: 375,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] uppercase font-bold px-2 py-1 bg-amber-500/10 text-amber-300 rounded-lg",
                                            children: p.deposition_conditions.deposition_temperature_C ? `${p.deposition_conditions.deposition_temperature_C}°C` : "N/A Temp"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/Dashboard.tsx",
                                            lineNumber: 378,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/Dashboard.tsx",
                                    lineNumber: 374,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, p.id, true, {
                            fileName: "[project]/app/components/Dashboard.tsx",
                            lineNumber: 354,
                            columnNumber: 25
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/components/Dashboard.tsx",
                    lineNumber: 352,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/Dashboard.tsx",
            lineNumber: 334,
            columnNumber: 13
        }, this);
    }
    const paper = papers[selectedPaperIndex];
    // Chart data for characterization methods
    const charMethodData = paper.characterization.characterization_methods.map((method, i)=>{
        // Extract abbreviation from parentheses
        const match = method.match(/\(([^)]+)\)/);
        return {
            name: match ? match[1] : method.slice(0, 15),
            fullName: method,
            value: 1,
            index: i
        };
    });
    // Deposition radar data
    const depositionRadarData = [
        {
            property: "Temp",
            value: paper.deposition_conditions.deposition_temperature_C ?? 0,
            fullMark: 500
        },
        {
            property: "Precursors",
            value: paper.precursor_coreactant.precursors.length * 30,
            fullMark: 100
        },
        {
            property: "Coreactants",
            value: paper.precursor_coreactant.coreactants.length * 30,
            fullMark: 100
        },
        {
            property: "Char. Methods",
            value: paper.characterization.characterization_methods.length * 10,
            fullMark: 100
        },
        {
            property: "Gases",
            value: (paper.precursor_coreactant.purge_gas.length + paper.precursor_coreactant.carrier_gas.length) * 30,
            fullMark: 100
        }
    ];
    // Film property completeness for pie
    const filmProps = paper.film_properties;
    const filmFields = [
        {
            name: "Thickness",
            val: filmProps.film_thickness_nm
        },
        {
            name: "Density",
            val: filmProps.density_g_cm3
        },
        {
            name: "Ref. Index",
            val: filmProps.refractive_index
        },
        {
            name: "Roughness",
            val: filmProps.surface_roughness_nm
        },
        {
            name: "Crystal Phase",
            val: filmProps.crystal_phase
        }
    ];
    const reported = filmFields.filter((f)=>f.val !== null).length;
    const notReported = filmFields.length - reported;
    const filmPieData = [
        {
            name: "Reported",
            value: reported,
            color: "#2dd4bf"
        },
        {
            name: "Not Reported",
            value: notReported,
            color: "#1e293b"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-6xl w-full mx-auto px-6 py-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-4 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: closePaper,
                                className: "px-5 py-2.5 rounded-2xl text-sm font-semibold bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "16",
                                        height: "16",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "2.5",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M19 12H5M12 19l-7-7 7-7"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/Dashboard.tsx",
                                            lineNumber: 462,
                                            columnNumber: 170
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 462,
                                        columnNumber: 25
                                    }, this),
                                    "Back to ",
                                    selectedMaterial ? selectedMaterial : "Catalog"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 458,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setPdfOpenPaperIndex(showPdf ? null : selectedPaperIndex),
                                className: "px-5 py-2.5 rounded-2xl text-sm font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/20 hover:bg-teal-500/20 transition-all flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "16",
                                        height: "16",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "2.5",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                lineNumber: 469,
                                                columnNumber: 170
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                points: "14 2 14 8 20 8"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                lineNumber: 469,
                                                columnNumber: 246
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                x1: "16",
                                                y1: "13",
                                                x2: "8",
                                                y2: "13"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                lineNumber: 469,
                                                columnNumber: 291
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                x1: "16",
                                                y1: "17",
                                                x2: "8",
                                                y2: "17"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                lineNumber: 469,
                                                columnNumber: 335
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                points: "10 9 9 9 8 9"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                lineNumber: 469,
                                                columnNumber: 379
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 469,
                                        columnNumber: 25
                                    }, this),
                                    showPdf ? "Hide PDF" : "View Original PDF"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 465,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/Dashboard.tsx",
                        lineNumber: 457,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 md:grid-cols-4 gap-4",
                        children: [
                            {
                                label: "Target Material",
                                value: paper.summary.target_material,
                                color: "var(--accent-teal)"
                            },
                            {
                                label: "Process Type",
                                value: paper.summary.process_type,
                                color: "var(--accent-purple)"
                            },
                            {
                                label: "Temperature Range",
                                value: paper.summary.temperature_range,
                                color: "var(--accent-amber)"
                            },
                            {
                                label: "Characterization Methods",
                                value: paper.characterization.characterization_methods.length > 0 ? `${paper.characterization.characterization_methods.length} methods` : null,
                                color: "var(--accent-cyan)"
                            }
                        ].filter((metric)=>metric.value && metric.value !== "N/A" && metric.value !== "null").map((metric, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass-card p-5 animate-in",
                                style: {
                                    animationDelay: `${i * 100}ms`
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 mb-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "data-label",
                                            children: metric.label
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/Dashboard.tsx",
                                            lineNumber: 504,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 503,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-bold text-lg",
                                        style: {
                                            color: metric.color
                                        },
                                        children: metric.value
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 506,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 498,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/components/Dashboard.tsx",
                        lineNumber: 473,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/Dashboard.tsx",
                lineNumber: 456,
                columnNumber: 13
            }, this),
            showPdf ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "max-w-6xl w-full mx-auto px-4 md:px-6 py-6 md:py-10 flex flex-col flex-1",
                style: {
                    minHeight: '80vh'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                    src: paper.pdf_url || `/api/pdf/${paper.id}`,
                    className: "w-full h-full rounded-xl border border-white/15 flex-1 min-h-[60vh] md:min-h-[1000px]",
                    title: `PDF for ${paper.id}`
                }, void 0, false, {
                    fileName: "[project]/app/components/Dashboard.tsx",
                    lineNumber: 520,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/Dashboard.tsx",
                lineNumber: 519,
                columnNumber: 17
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "max-w-6xl w-full mx-auto px-6 py-10 flex flex-col gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                        title: "Paper Summary",
                        delay: 100,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-base leading-relaxed mb-4",
                                style: {
                                    color: "var(--text-secondary)"
                                },
                                children: paper.summary.summary
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 529,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2 mb-2",
                                children: paper.summary.main_precursors.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "badge badge-teal",
                                        children: p
                                    }, i, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 537,
                                        columnNumber: 33
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 535,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Evidence, {
                                text: paper.summary.evidence
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 542,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/Dashboard.tsx",
                        lineNumber: 528,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                        title: "Target Material",
                        delay: 200,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col md:flex-row items-start md:items-center gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "formula",
                                        children: paper.target_material.target_material.chemical_formula
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 548,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-3 mb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "badge badge-teal",
                                                    children: paper.target_material.target_material.material_name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Dashboard.tsx",
                                                    lineNumber: 553,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "badge badge-purple",
                                                    children: paper.target_material.target_material.material_class
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Dashboard.tsx",
                                                    lineNumber: 556,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/Dashboard.tsx",
                                            lineNumber: 552,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 551,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 547,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Evidence, {
                                text: paper.target_material.evidence
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 562,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/Dashboard.tsx",
                        lineNumber: 546,
                        columnNumber: 21
                    }, this),
                    (paper.substrate_info.substrate_material || paper.substrate_info.substrate_orientation || paper.substrate_info.pretreatment || paper.substrate_info.surface_functionalization || paper.substrate_info.evidence) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                        title: "Substrate Information",
                        delay: 300,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "stat-grid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataField, {
                                        label: "Material",
                                        value: paper.substrate_info.substrate_material,
                                        accent: "var(--accent-teal)"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 569,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataField, {
                                        label: "Orientation",
                                        value: paper.substrate_info.substrate_orientation
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 574,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataField, {
                                        label: "Pretreatment",
                                        value: paper.substrate_info.pretreatment
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 578,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataField, {
                                        label: "Functionalization",
                                        value: paper.substrate_info.surface_functionalization
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 582,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 568,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Evidence, {
                                text: paper.substrate_info.evidence
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 587,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/Dashboard.tsx",
                        lineNumber: 567,
                        columnNumber: 25
                    }, this),
                    (paper.deposition_conditions.deposition_temperature_C || paper.deposition_conditions.pressure || paper.deposition_conditions.reactor_type || paper.deposition_conditions.precursor_pulse_time_s || paper.deposition_conditions.coreactant_pulse_time_s || paper.deposition_conditions.purge_time_s || paper.deposition_conditions.number_of_cycles || paper.deposition_conditions.evidence) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                        title: "Deposition Conditions",
                        delay: 400,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "stat-grid mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataField, {
                                        label: "Temperature (°C)",
                                        value: paper.deposition_conditions.deposition_temperature_C,
                                        accent: "var(--accent-amber)"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 595,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataField, {
                                        label: "Pressure",
                                        value: paper.deposition_conditions.pressure,
                                        accent: "var(--accent-cyan)"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 600,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataField, {
                                        label: "Reactor Type",
                                        value: paper.deposition_conditions.reactor_type,
                                        accent: "var(--accent-purple)"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 605,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataField, {
                                        label: "Precursor Pulse (s)",
                                        value: paper.deposition_conditions.precursor_pulse_time_s
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 610,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataField, {
                                        label: "Coreactant Pulse (s)",
                                        value: paper.deposition_conditions.coreactant_pulse_time_s
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 614,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataField, {
                                        label: "Purge Time (s)",
                                        value: paper.deposition_conditions.purge_time_s
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 618,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataField, {
                                        label: "Cycles",
                                        value: paper.deposition_conditions.number_of_cycles
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 622,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 594,
                                columnNumber: 29
                            }, this),
                            depositionRadarData.some((d)=>d.value > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "chart-container",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "data-label mb-4",
                                        children: "Process Overview Radar"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 631,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                        width: "100%",
                                        height: 280,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$RadarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadarChart"], {
                                            data: depositionRadarData,
                                            cx: "50%",
                                            cy: "50%",
                                            outerRadius: "70%",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PolarGrid"], {
                                                    stroke: "rgba(148,163,184,0.15)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Dashboard.tsx",
                                                    lineNumber: 639,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarAngleAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PolarAngleAxis"], {
                                                    dataKey: "property",
                                                    tick: {
                                                        fill: "#94a3b8",
                                                        fontSize: 12
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Dashboard.tsx",
                                                    lineNumber: 640,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Radar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Radar"], {
                                                    dataKey: "value",
                                                    stroke: "#2dd4bf",
                                                    fill: "#2dd4bf",
                                                    fillOpacity: 0.2,
                                                    strokeWidth: 2
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Dashboard.tsx",
                                                    lineNumber: 644,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/Dashboard.tsx",
                                            lineNumber: 633,
                                            columnNumber: 41
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 632,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 630,
                                columnNumber: 33
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Evidence, {
                                text: paper.deposition_conditions.evidence
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 655,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/Dashboard.tsx",
                        lineNumber: 593,
                        columnNumber: 25
                    }, this),
                    (paper.precursor_coreactant.precursors.length > 0 || paper.precursor_coreactant.coreactants.length > 0 || paper.precursor_coreactant.purge_gas.length > 0 || paper.precursor_coreactant.carrier_gas.length > 0 || paper.precursor_coreactant.evidence) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                        title: "Precursors & Coreactants",
                        delay: 500,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                                children: [
                                    paper.precursor_coreactant.precursors.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stat-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "data-label mb-3",
                                                style: {
                                                    color: "var(--accent-teal)"
                                                },
                                                children: "Precursors"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                lineNumber: 666,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-2",
                                                children: paper.precursor_coreactant.precursors.map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "badge badge-teal",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono font-bold",
                                                                children: c.abbreviation
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                                lineNumber: 675,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    color: "var(--text-muted)",
                                                                    fontSize: "0.75rem"
                                                                },
                                                                children: c.full_name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                                lineNumber: 678,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/app/components/Dashboard.tsx",
                                                        lineNumber: 674,
                                                        columnNumber: 49
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                lineNumber: 672,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 665,
                                        columnNumber: 37
                                    }, this),
                                    paper.precursor_coreactant.coreactants.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stat-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "data-label mb-3",
                                                style: {
                                                    color: "var(--accent-purple)"
                                                },
                                                children: "Coreactants"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                lineNumber: 689,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-2",
                                                children: paper.precursor_coreactant.coreactants.map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "badge badge-purple",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono font-bold",
                                                                children: c.abbreviation
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                                lineNumber: 698,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    color: "var(--text-muted)",
                                                                    fontSize: "0.75rem"
                                                                },
                                                                children: c.full_name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                                lineNumber: 701,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/app/components/Dashboard.tsx",
                                                        lineNumber: 697,
                                                        columnNumber: 49
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                lineNumber: 695,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 688,
                                        columnNumber: 37
                                    }, this),
                                    paper.precursor_coreactant.purge_gas.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stat-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "data-label mb-3",
                                                style: {
                                                    color: "var(--accent-amber)"
                                                },
                                                children: "Purge Gas"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                lineNumber: 712,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-2",
                                                children: paper.precursor_coreactant.purge_gas.map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "badge badge-amber",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono font-bold",
                                                                children: c.abbreviation
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                                lineNumber: 721,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    color: "var(--text-muted)",
                                                                    fontSize: "0.75rem"
                                                                },
                                                                children: c.full_name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                                lineNumber: 724,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/app/components/Dashboard.tsx",
                                                        lineNumber: 720,
                                                        columnNumber: 49
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                lineNumber: 718,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 711,
                                        columnNumber: 37
                                    }, this),
                                    paper.precursor_coreactant.carrier_gas.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stat-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "data-label mb-3",
                                                style: {
                                                    color: "var(--accent-cyan)"
                                                },
                                                children: "Carrier Gas"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                lineNumber: 735,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-2",
                                                children: paper.precursor_coreactant.carrier_gas.map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "badge badge-cyan",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono font-bold",
                                                                children: c.abbreviation
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                                lineNumber: 744,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    color: "var(--text-muted)",
                                                                    fontSize: "0.75rem"
                                                                },
                                                                children: c.full_name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                                lineNumber: 747,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/app/components/Dashboard.tsx",
                                                        lineNumber: 743,
                                                        columnNumber: 49
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                lineNumber: 741,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 734,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 662,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Evidence, {
                                text: paper.precursor_coreactant.evidence
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 756,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/Dashboard.tsx",
                        lineNumber: 661,
                        columnNumber: 25
                    }, this),
                    (paper.reaction_conditions.surface_mechanism_description || paper.reaction_conditions.reaction_equations.length > 0 || paper.reaction_conditions.intermediate_species.length > 0 || paper.reaction_conditions.evidence) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                        title: "Reaction Conditions",
                        delay: 600,
                        children: [
                            paper.reaction_conditions.surface_mechanism_description && paper.reaction_conditions.surface_mechanism_description !== "N/A" && paper.reaction_conditions.surface_mechanism_description !== "null" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "stat-card mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "data-label mb-2",
                                        children: "Surface Mechanism"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 767,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-base leading-relaxed",
                                        style: {
                                            color: "var(--text-secondary)"
                                        },
                                        children: paper.reaction_conditions.surface_mechanism_description
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 768,
                                        columnNumber: 41
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 766,
                                columnNumber: 37
                            }, this),
                            paper.reaction_conditions.reaction_equations.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "stat-card mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "data-label mb-2",
                                        children: "Reaction Equations"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 778,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-2",
                                        children: paper.reaction_conditions.reaction_equations.map((eq, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                className: "text-sm font-mono px-3 py-2 rounded-lg",
                                                style: {
                                                    background: "rgba(45,212,191,0.08)",
                                                    color: "var(--accent-teal)"
                                                },
                                                children: eq
                                            }, i, false, {
                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                lineNumber: 782,
                                                columnNumber: 49
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 779,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 777,
                                columnNumber: 33
                            }, this),
                            paper.reaction_conditions.intermediate_species.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2 mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "data-label mr-2",
                                        children: "Intermediate Species:"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 799,
                                        columnNumber: 37
                                    }, this),
                                    paper.reaction_conditions.intermediate_species.map((sp, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "badge badge-rose",
                                            children: sp
                                        }, i, false, {
                                            fileName: "[project]/app/components/Dashboard.tsx",
                                            lineNumber: 804,
                                            columnNumber: 45
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 798,
                                columnNumber: 33
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Evidence, {
                                text: paper.reaction_conditions.evidence
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 811,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/Dashboard.tsx",
                        lineNumber: 762,
                        columnNumber: 25
                    }, this),
                    (filmFields.some((f)=>f.val !== null && f.val !== "" && f.val !== "N/A") || filmProps.evidence) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                        title: "Film Properties",
                        delay: 700,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-3 gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "md:col-span-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "stat-grid",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataField, {
                                                    label: "Thickness (nm)",
                                                    value: filmProps.film_thickness_nm,
                                                    accent: "var(--accent-teal)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Dashboard.tsx",
                                                    lineNumber: 821,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataField, {
                                                    label: "Density (g/cm³)",
                                                    value: filmProps.density_g_cm3,
                                                    accent: "var(--accent-purple)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Dashboard.tsx",
                                                    lineNumber: 826,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataField, {
                                                    label: "Refractive Index",
                                                    value: filmProps.refractive_index,
                                                    accent: "var(--accent-cyan)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Dashboard.tsx",
                                                    lineNumber: 831,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataField, {
                                                    label: "Surface Roughness (nm)",
                                                    value: filmProps.surface_roughness_nm,
                                                    accent: "var(--accent-amber)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Dashboard.tsx",
                                                    lineNumber: 836,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataField, {
                                                    label: "Crystal Phase",
                                                    value: filmProps.crystal_phase,
                                                    accent: "var(--accent-emerald)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Dashboard.tsx",
                                                    lineNumber: 841,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/Dashboard.tsx",
                                            lineNumber: 820,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 819,
                                        columnNumber: 33
                                    }, this),
                                    reported > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "chart-container flex flex-col items-center justify-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "data-label mb-3",
                                                children: "Data Completeness"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                lineNumber: 850,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                                width: "100%",
                                                height: 180,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieChart"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pie"], {
                                                            data: filmPieData,
                                                            cx: "50%",
                                                            cy: "50%",
                                                            innerRadius: 50,
                                                            outerRadius: 70,
                                                            paddingAngle: 4,
                                                            dataKey: "value",
                                                            stroke: "none",
                                                            children: filmPieData.map((entry, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                                                                    fill: entry.color
                                                                }, index, false, {
                                                                    fileName: "[project]/app/components/Dashboard.tsx",
                                                                    lineNumber: 864,
                                                                    columnNumber: 57
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/Dashboard.tsx",
                                                            lineNumber: 853,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                            contentStyle: {
                                                                background: "#0a0a0a",
                                                                border: "1px solid rgba(255,255,255,0.15)",
                                                                borderRadius: 8,
                                                                color: "#f1f5f9",
                                                                fontSize: 13
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/Dashboard.tsx",
                                                            lineNumber: 867,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/Dashboard.tsx",
                                                    lineNumber: 852,
                                                    columnNumber: 45
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                lineNumber: 851,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-semibold",
                                                style: {
                                                    color: "var(--accent-teal)"
                                                },
                                                children: [
                                                    reported,
                                                    "/",
                                                    filmFields.length,
                                                    " reported"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                lineNumber: 878,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 849,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 818,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Evidence, {
                                text: filmProps.evidence
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 884,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/Dashboard.tsx",
                        lineNumber: 817,
                        columnNumber: 25
                    }, this),
                    (paper.characterization.characterization_methods.length > 0 || paper.characterization.evidence) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                        title: "Characterization Methods",
                        delay: 800,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2 mb-6",
                                children: paper.characterization.characterization_methods.map((method, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "badge animate-in",
                                        style: {
                                            animationDelay: `${850 + i * 60}ms`,
                                            background: `${chartColors[i % chartColors.length]}15`,
                                            color: chartColors[i % chartColors.length],
                                            borderColor: `${chartColors[i % chartColors.length]}33`
                                        },
                                        children: method
                                    }, i, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 894,
                                        columnNumber: 41
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 891,
                                columnNumber: 29
                            }, this),
                            charMethodData.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "chart-container",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "data-label mb-4",
                                        children: "Methods Inventory"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 911,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                        width: "100%",
                                        height: 320,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                                            data: charMethodData,
                                            layout: "vertical",
                                            margin: {
                                                left: 10,
                                                right: 20,
                                                top: 5,
                                                bottom: 5
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                    type: "number",
                                                    hide: true
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Dashboard.tsx",
                                                    lineNumber: 918,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                                    type: "category",
                                                    dataKey: "name",
                                                    width: 60,
                                                    tick: {
                                                        fill: "#94a3b8",
                                                        fontSize: 12
                                                    },
                                                    axisLine: false,
                                                    tickLine: false
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Dashboard.tsx",
                                                    lineNumber: 919,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                    contentStyle: {
                                                        background: "#0a0a0a",
                                                        border: "1px solid rgba(255,255,255,0.1)",
                                                        borderRadius: 8,
                                                        color: "#f1f5f9",
                                                        fontSize: 13
                                                    },
                                                    content: ({ payload })=>{
                                                        if (!payload || !payload[0]) return null;
                                                        const data = payload[0].payload;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                background: "#0a0a0a",
                                                                border: "1px solid rgba(255,255,255,0.15)",
                                                                borderRadius: 8,
                                                                padding: "8px 12px",
                                                                color: "#f1f5f9",
                                                                fontSize: 13
                                                            },
                                                            children: data.fullName
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/Dashboard.tsx",
                                                            lineNumber: 939,
                                                            columnNumber: 57
                                                        }, this);
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Dashboard.tsx",
                                                    lineNumber: 927,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                                    dataKey: "value",
                                                    radius: [
                                                        0,
                                                        6,
                                                        6,
                                                        0
                                                    ],
                                                    barSize: 20,
                                                    children: charMethodData.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                                                            fill: chartColors[i % chartColors.length]
                                                        }, i, false, {
                                                            fileName: "[project]/app/components/Dashboard.tsx",
                                                            lineNumber: 954,
                                                            columnNumber: 53
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Dashboard.tsx",
                                                    lineNumber: 952,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/Dashboard.tsx",
                                            lineNumber: 913,
                                            columnNumber: 41
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 912,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 910,
                                columnNumber: 33
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Evidence, {
                                text: paper.characterization.evidence
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 964,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/Dashboard.tsx",
                        lineNumber: 890,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "shimmer-line"
                    }, void 0, false, {
                        fileName: "[project]/app/components/Dashboard.tsx",
                        lineNumber: 968,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                        className: "text-center pb-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm",
                            style: {
                                color: "var(--text-muted)"
                            },
                            children: [
                                "ALD-LLaMat Data Visualization •",
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: "var(--accent-teal)"
                                    },
                                    children: [
                                        paper.characterization.characterization_methods.length,
                                        " ",
                                        "characterization methods"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/Dashboard.tsx",
                                    lineNumber: 977,
                                    columnNumber: 29
                                }, this),
                                " ",
                                "tracked across",
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: "var(--accent-purple)"
                                    },
                                    children: [
                                        papers.length,
                                        " paper",
                                        papers.length !== 1 ? "s" : ""
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/Dashboard.tsx",
                                    lineNumber: 982,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/Dashboard.tsx",
                            lineNumber: 972,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/Dashboard.tsx",
                        lineNumber: 971,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/Dashboard.tsx",
                lineNumber: 527,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/Dashboard.tsx",
        lineNumber: 454,
        columnNumber: 9
    }, this);
}
_s1(Dashboard, "2vRFRfFq3CO54oh7J6cnkTZMwCE=");
_c4 = Dashboard;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "Evidence");
__turbopack_context__.k.register(_c1, "DataField");
__turbopack_context__.k.register(_c2, "Section");
__turbopack_context__.k.register(_c3, "SearchField");
__turbopack_context__.k.register(_c4, "Dashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/ChatAssistant.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatAssistant
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const QUICK_ACTIONS = [
    "What are some common methods to deposit NiO?",
    "Mention the deposition conditions for MoSe2",
    "Describe the common characterization techniques used",
    "What are the precursors and coreactants used in deposition of NiO?"
];
const RAG_API_URL = ("TURBOPACK compile-time value", "http://127.0.0.1:8000")?.replace(/\/$/, "") || "http://127.0.0.1:8000";
function formatScore(score) {
    if (typeof score !== "number" || Number.isNaN(score)) return null;
    return score.toFixed(3);
}
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength).trimEnd()}...`;
}
function statusPill(status) {
    if (status === "pass" || status === "completed") {
        return "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20";
    }
    if (status === "warning" || status === "skipped") {
        return "bg-amber-500/10 text-amber-200 border border-amber-500/20";
    }
    return "bg-rose-500/10 text-rose-200 border border-rose-500/20";
}
/* ── Gemini-style sparkle SVG ── */ function GeminiSparkle({ size = 20 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 28 28",
        fill: "none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                    id: "gemini-g",
                    x1: "0",
                    y1: "0",
                    x2: "28",
                    y2: "28",
                    gradientUnits: "userSpaceOnUse",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            stopColor: "#5eead4"
                        }, void 0, false, {
                            fileName: "[project]/app/components/ChatAssistant.tsx",
                            lineNumber: 133,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "1",
                            stopColor: "#c4b5fd"
                        }, void 0, false, {
                            fileName: "[project]/app/components/ChatAssistant.tsx",
                            lineNumber: 134,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/ChatAssistant.tsx",
                    lineNumber: 132,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/ChatAssistant.tsx",
                lineNumber: 131,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M14 2 C14 2 16.5 10 18.5 12.5 C20.5 15 28 14 28 14 C28 14 20.5 15 18.5 17.5 C16.5 20 14 28 14 28 C14 28 11.5 20 9.5 17.5 C7.5 15 0 14 0 14 C0 14 7.5 13 9.5 10.5 C11.5 8 14 2 14 2Z",
                fill: "url(#gemini-g)"
            }, void 0, false, {
                fileName: "[project]/app/components/ChatAssistant.tsx",
                lineNumber: 137,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/ChatAssistant.tsx",
        lineNumber: 130,
        columnNumber: 9
    }, this);
}
_c = GeminiSparkle;
function FormattedAnswer({ content }) {
    const lines = content.split("\n");
    const elements = [];
    let bulletBuffer = [];
    const flushBullets = ()=>{
        if (!bulletBuffer.length) return;
        elements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
            className: "space-y-2 pl-5",
            children: bulletBuffer.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                    className: "text-[15px] leading-[1.75] text-slate-200 list-disc",
                    children: item
                }, `${item}-${index}`, false, {
                    fileName: "[project]/app/components/ChatAssistant.tsx",
                    lineNumber: 152,
                    columnNumber: 21
                }, this))
        }, `bullets-${elements.length}`, false, {
            fileName: "[project]/app/components/ChatAssistant.tsx",
            lineNumber: 150,
            columnNumber: 13
        }, this));
        bulletBuffer = [];
    };
    lines.forEach((rawLine, index)=>{
        const line = rawLine.trim();
        if (!line) {
            flushBullets();
            return;
        }
        if (line.startsWith("- ") || line.startsWith("* ")) {
            bulletBuffer.push(line.slice(2).trim());
            return;
        }
        flushBullets();
        if (line.endsWith(":") && line.length < 40) {
            elements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs font-bold uppercase tracking-widest text-teal-400 mt-1",
                children: line.slice(0, -1)
            }, `heading-${index}`, false, {
                fileName: "[project]/app/components/ChatAssistant.tsx",
                lineNumber: 178,
                columnNumber: 17
            }, this));
            return;
        }
        elements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-[15px] leading-[1.75] text-slate-100",
            children: line
        }, `paragraph-${index}`, false, {
            fileName: "[project]/app/components/ChatAssistant.tsx",
            lineNumber: 189,
            columnNumber: 13
        }, this));
    });
    flushBullets();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: elements
    }, void 0, false, {
        fileName: "[project]/app/components/ChatAssistant.tsx",
        lineNumber: 197,
        columnNumber: 12
    }, this);
}
_c1 = FormattedAnswer;
function SourceCard({ source, index }) {
    const excerptPreview = truncateText(source.excerpt, 200);
    const sourceLabel = source.source_type === "wikipedia" ? source.title || "Wikipedia" : source.paper_id || "unknown paper";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
        className: "group rounded-2xl border border-slate-700/70 bg-black/50 open:border-teal-500/30",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                className: "list-none cursor-pointer p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start justify-between gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-0 flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-2 mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.18em] bg-teal-500/10 text-teal-300 border border-teal-500/20",
                                            children: [
                                                "S",
                                                index + 1
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/ChatAssistant.tsx",
                                            lineNumber: 218,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-200",
                                            children: sourceLabel
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/ChatAssistant.tsx",
                                            lineNumber: 221,
                                            columnNumber: 29
                                        }, this),
                                        source.source_type === "wikipedia" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] uppercase tracking-wider text-sky-300",
                                            children: "Background"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/ChatAssistant.tsx",
                                            lineNumber: 225,
                                            columnNumber: 33
                                        }, this),
                                        source.source_type === "rag" && source.target_material && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] uppercase tracking-wider text-cyan-300",
                                            children: source.target_material
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/ChatAssistant.tsx",
                                            lineNumber: 230,
                                            columnNumber: 33
                                        }, this),
                                        source.source_type === "rag" && source.process_type && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] uppercase tracking-wider text-amber-300",
                                            children: source.process_type
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/ChatAssistant.tsx",
                                            lineNumber: 235,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/ChatAssistant.tsx",
                                    lineNumber: 217,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs leading-relaxed text-slate-300",
                                    children: excerptPreview
                                }, void 0, false, {
                                    fileName: "[project]/app/components/ChatAssistant.tsx",
                                    lineNumber: 240,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/ChatAssistant.tsx",
                            lineNumber: 216,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-end gap-2 shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-right space-y-1",
                                    children: [
                                        formatScore(source.rerank_score) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] text-teal-300 font-bold uppercase tracking-wider",
                                            children: [
                                                "Rerank ",
                                                formatScore(source.rerank_score)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/ChatAssistant.tsx",
                                            lineNumber: 247,
                                            columnNumber: 33
                                        }, this),
                                        formatScore(source.retrieval_score) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] text-slate-500 font-bold uppercase tracking-wider",
                                            children: [
                                                "Fusion ",
                                                formatScore(source.retrieval_score)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/ChatAssistant.tsx",
                                            lineNumber: 252,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/ChatAssistant.tsx",
                                    lineNumber: 245,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] text-slate-500 font-bold uppercase tracking-[0.16em] group-open:text-teal-300",
                                    children: "Expand"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/ChatAssistant.tsx",
                                    lineNumber: 257,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/ChatAssistant.tsx",
                            lineNumber: 244,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/ChatAssistant.tsx",
                    lineNumber: 215,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/ChatAssistant.tsx",
                lineNumber: 214,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 pb-4 pt-0 border-t border-slate-800/80",
                children: [
                    source.url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: source.url,
                        target: "_blank",
                        rel: "noreferrer",
                        className: "mt-4 inline-flex text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors",
                        children: "Open source ↗"
                    }, void 0, false, {
                        fileName: "[project]/app/components/ChatAssistant.tsx",
                        lineNumber: 265,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-4 text-sm leading-relaxed text-slate-200 whitespace-pre-wrap",
                        children: source.excerpt
                    }, void 0, false, {
                        fileName: "[project]/app/components/ChatAssistant.tsx",
                        lineNumber: 274,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/ChatAssistant.tsx",
                lineNumber: 263,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/ChatAssistant.tsx",
        lineNumber: 213,
        columnNumber: 9
    }, this);
}
_c2 = SourceCard;
function PlannerCard({ plan }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
        className: "group rounded-2xl border border-cyan-500/20 bg-black/50 open:border-cyan-400/40",
        open: true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                className: "list-none cursor-pointer p-5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-bold uppercase tracking-widest text-cyan-400",
                                    children: " Strategic Agent"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/ChatAssistant.tsx",
                                    lineNumber: 288,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1.5 text-[15px] leading-relaxed text-slate-200",
                                    children: plan.planner_summary
                                }, void 0, false, {
                                    fileName: "[project]/app/components/ChatAssistant.tsx",
                                    lineNumber: 289,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/ChatAssistant.tsx",
                            lineNumber: 287,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "px-3 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 whitespace-nowrap",
                            children: [
                                plan.steps.length,
                                " planned"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/ChatAssistant.tsx",
                            lineNumber: 291,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/ChatAssistant.tsx",
                    lineNumber: 286,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/ChatAssistant.tsx",
                lineNumber: 285,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-slate-800/80 px-5 pb-5 pt-4 space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-slate-800/80 bg-neutral-900/40 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-bold uppercase tracking-widest text-slate-400",
                                children: "Analysis"
                            }, void 0, false, {
                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                lineNumber: 298,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm leading-relaxed text-slate-300",
                                children: plan.analysis
                            }, void 0, false, {
                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                lineNumber: 299,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/ChatAssistant.tsx",
                        lineNumber: 297,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: plan.steps.map((step)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-slate-800/80 bg-neutral-900/35 p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "px-2.5 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-200",
                                                children: step.step_id
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                                lineNumber: 305,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `px-2.5 py-1 rounded-full text-xs font-semibold ${step.step_type === "tool" ? "bg-teal-500/10 text-teal-300 border border-teal-500/20" : "bg-violet-500/10 text-violet-300 border border-violet-500/20"}`,
                                                children: step.step_type
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                                lineNumber: 308,
                                                columnNumber: 33
                                            }, this),
                                            step.tool_name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-slate-400 font-medium",
                                                children: step.tool_name
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                                lineNumber: 312,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/ChatAssistant.tsx",
                                        lineNumber: 304,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2.5 text-[15px] text-slate-100",
                                        children: step.title
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/ChatAssistant.tsx",
                                        lineNumber: 315,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-sm leading-relaxed text-slate-400",
                                        children: step.objective
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/ChatAssistant.tsx",
                                        lineNumber: 316,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, step.step_id, true, {
                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                lineNumber: 303,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/components/ChatAssistant.tsx",
                        lineNumber: 301,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/ChatAssistant.tsx",
                lineNumber: 296,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/ChatAssistant.tsx",
        lineNumber: 284,
        columnNumber: 9
    }, this);
}
_c3 = PlannerCard;
function ExecutionTimeline({ execution }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
        className: "group rounded-2xl border border-teal-500/20 bg-black/50 open:border-teal-400/40",
        open: true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                className: "list-none cursor-pointer p-5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-bold uppercase tracking-widest text-teal-400",
                                    children: "Executor"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/ChatAssistant.tsx",
                                    lineNumber: 331,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1.5 text-[15px] text-slate-200",
                                    children: "ReWOO-style execution trace"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/ChatAssistant.tsx",
                                    lineNumber: 332,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/ChatAssistant.tsx",
                            lineNumber: 330,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "px-3 py-1.5 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/20 whitespace-nowrap",
                            children: [
                                execution.length,
                                " steps"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/ChatAssistant.tsx",
                            lineNumber: 334,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/ChatAssistant.tsx",
                    lineNumber: 329,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/ChatAssistant.tsx",
                lineNumber: 328,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-slate-800/80 px-5 pb-5 pt-4 space-y-3",
                children: execution.map((step)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-slate-800/80 bg-neutral-900/35 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "px-2.5 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-200",
                                        children: step.step_id
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/ChatAssistant.tsx",
                                        lineNumber: 343,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `px-2.5 py-1 rounded-full text-xs font-semibold ${statusPill(step.status)}`,
                                        children: step.status
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/ChatAssistant.tsx",
                                        lineNumber: 346,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-slate-400 font-medium",
                                        children: step.tool_name || step.step_type
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/ChatAssistant.tsx",
                                        lineNumber: 349,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                lineNumber: 342,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2.5 text-[15px] text-slate-100",
                                children: step.title
                            }, void 0, false, {
                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                lineNumber: 353,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-sm leading-relaxed text-slate-300",
                                children: step.output_summary
                            }, void 0, false, {
                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                lineNumber: 354,
                                columnNumber: 25
                            }, this)
                        ]
                    }, step.step_id, true, {
                        fileName: "[project]/app/components/ChatAssistant.tsx",
                        lineNumber: 341,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/components/ChatAssistant.tsx",
                lineNumber: 339,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/ChatAssistant.tsx",
        lineNumber: 327,
        columnNumber: 9
    }, this);
}
_c4 = ExecutionTimeline;
function ValidationCard({ validation }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
        className: "group rounded-2xl border border-amber-500/20 bg-black/50 open:border-amber-400/40",
        open: true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                className: "list-none cursor-pointer p-5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-bold uppercase tracking-widest text-amber-400",
                                    children: " Validation Agent"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/ChatAssistant.tsx",
                                    lineNumber: 368,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1.5 text-[15px] text-slate-200",
                                    children: validation.summary
                                }, void 0, false, {
                                    fileName: "[project]/app/components/ChatAssistant.tsx",
                                    lineNumber: 369,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/ChatAssistant.tsx",
                            lineNumber: 367,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: `px-3 py-1.5 rounded-full text-xs font-semibold ${statusPill(validation.verdict)}`,
                            children: validation.verdict
                        }, void 0, false, {
                            fileName: "[project]/app/components/ChatAssistant.tsx",
                            lineNumber: 371,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/ChatAssistant.tsx",
                    lineNumber: 366,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/ChatAssistant.tsx",
                lineNumber: 365,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-slate-800/80 px-5 pb-5 pt-4 space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `px-3 py-1.5 rounded-full text-xs font-semibold ${statusPill(validation.factual_grounding)}`,
                                children: [
                                    "Grounding ",
                                    validation.factual_grounding
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                lineNumber: 378,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `px-3 py-1.5 rounded-full text-xs font-semibold ${statusPill(validation.logical_consistency)}`,
                                children: [
                                    "Logic ",
                                    validation.logical_consistency
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                lineNumber: 381,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `px-3 py-1.5 rounded-full text-xs font-semibold ${statusPill(validation.cross_verification)}`,
                                children: [
                                    "Cross-check ",
                                    validation.cross_verification
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                lineNumber: 384,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/ChatAssistant.tsx",
                        lineNumber: 377,
                        columnNumber: 17
                    }, this),
                    validation.issues.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-slate-800/80 bg-neutral-900/35 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-bold uppercase tracking-widest text-slate-400",
                                children: "Observed Issues"
                            }, void 0, false, {
                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                lineNumber: 390,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 space-y-2",
                                children: validation.issues.map((issue, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm leading-relaxed text-slate-300",
                                        children: issue
                                    }, `${issue}-${index}`, false, {
                                        fileName: "[project]/app/components/ChatAssistant.tsx",
                                        lineNumber: 393,
                                        columnNumber: 33
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                lineNumber: 391,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/ChatAssistant.tsx",
                        lineNumber: 389,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/ChatAssistant.tsx",
                lineNumber: 376,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/ChatAssistant.tsx",
        lineNumber: 364,
        columnNumber: 9
    }, this);
}
_c5 = ValidationCard;
function ChatAssistant({ selectedPaper, onSelectPaper }) {
    _s();
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: 1,
            role: "assistant",
            content: "I’m the GemaMat assistant, an AI for ALD related queries. Ask for summaries, comparisons, deposition-specific insights."
        }
    ]);
    const [inputValue, setInputValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isTyping, setIsTyping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Auto-scroll to bottom of messages
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatAssistant.useEffect": ()=>{
            messagesEndRef.current?.scrollIntoView({
                behavior: "smooth"
            });
        }
    }["ChatAssistant.useEffect"], [
        messages,
        isTyping
    ]);
    const sendMessage = async (content)=>{
        const trimmedContent = content.trim();
        if (!trimmedContent) return;
        const newUserMsg = {
            id: Date.now(),
            role: "user",
            content: trimmedContent
        };
        const conversationForRequest = [
            ...messages,
            newUserMsg
        ].filter((message)=>message.role === "user" || message.role === "assistant").slice(-8).map((message)=>({
                role: message.role,
                content: message.content
            }));
        setMessages((prev)=>[
                ...prev,
                newUserMsg
            ]);
        setIsTyping(true);
        try {
            const response = await fetch(`${RAG_API_URL}/api/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    query: trimmedContent,
                    conversation: conversationForRequest,
                    scope_paper_id: selectedPaper?.id ?? null
                })
            });
            let payload = null;
            try {
                payload = await response.json();
            } catch  {
                payload = null;
            }
            if (!response.ok) {
                const detail = payload && "detail" in payload && payload.detail ? payload.detail : `The RAG backend returned status ${response.status}.`;
                throw new Error(detail);
            }
            const data = payload;
            const botMsg = {
                id: Date.now() + 1,
                role: "assistant",
                content: data.answer,
                sources: data.sources,
                diagnostics: data.diagnostics,
                plan: data.plan ?? null,
                execution: data.execution ?? [],
                validation: data.validation ?? null
            };
            setMessages((prev)=>[
                    ...prev,
                    botMsg
                ]);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "The chat request failed before the RAG response was returned.";
            const botMsg = {
                id: Date.now() + 1,
                role: "assistant",
                content: `I couldn’t reach the agentic RAG backend.\n\n${errorMessage}\n\n` + `Make sure \`uvicorn agentic_rag_pipeline.main:app --reload --port 8000\` is running and that \`NEXT_PUBLIC_RAG_API_URL\` points to it.`,
                isError: true
            };
            setMessages((prev)=>[
                    ...prev,
                    botMsg
                ]);
        } finally{
            setIsTyping(false);
        }
    };
    const handleFormSubmit = (e)=>{
        e.preventDefault();
        if (!inputValue.trim()) return;
        sendMessage(inputValue);
        setInputValue("");
    };
    const handleQuickAction = (action)=>{
        sendMessage(action);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full bg-white/[0.01] backdrop-blur-[40px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col px-5 md:px-7 py-5 md:py-6 border-b border-white/5 bg-white/[0.02]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4 mb-5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-xl font-black text-white tracking-tight",
                                    children: "GemaMat"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/ChatAssistant.tsx",
                                    lineNumber: 520,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-teal-400 font-semibold tracking-widest uppercase mt-0.5",
                                    children: "Atomic Layer Deposition (ALD) Intelligence"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/ChatAssistant.tsx",
                                    lineNumber: 521,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/ChatAssistant.tsx",
                            lineNumber: 519,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/ChatAssistant.tsx",
                        lineNumber: 518,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `w-2.5 h-2.5 rounded-full shrink-0 ${selectedPaper ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse' : 'bg-slate-600'}`
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/ChatAssistant.tsx",
                                        lineNumber: 528,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "overflow-hidden",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] text-slate-400 font-semibold uppercase tracking-wider leading-none mb-1",
                                                children: "Target Context"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                                lineNumber: 530,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-slate-200 truncate pr-4",
                                                children: selectedPaper ? selectedPaper.id.toUpperCase() : "Global Catalog Scope"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                                lineNumber: 531,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/ChatAssistant.tsx",
                                        lineNumber: 529,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                lineNumber: 527,
                                columnNumber: 21
                            }, this),
                            selectedPaper && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>onSelectPaper(null),
                                className: "text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 transition-all font-semibold",
                                children: "Reset"
                            }, void 0, false, {
                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                lineNumber: 537,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/ChatAssistant.tsx",
                        lineNumber: 526,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/ChatAssistant.tsx",
                lineNumber: 517,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto px-5 md:px-7 py-6 space-y-7 custom-scrollbar",
                children: [
                    messages.map((msg)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: msg.role === "user" ? /* ─ User bubble ─ */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-end",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "max-w-[80%] px-5 py-3.5 rounded-3xl rounded-br-lg text-[15px] leading-relaxed font-semibold text-slate-950 shadow-md",
                                    style: {
                                        background: "var(--gradient-accent)"
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FormattedAnswer, {
                                        content: msg.content
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/ChatAssistant.tsx",
                                        lineNumber: 556,
                                        columnNumber: 37
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/ChatAssistant.tsx",
                                    lineNumber: 554,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                lineNumber: 553,
                                columnNumber: 29
                            }, this) : /* ─ Assistant (Gemini-style) ─ */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-3.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 border border-white/10 bg-slate-900/60",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GeminiSparkle, {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/ChatAssistant.tsx",
                                            lineNumber: 564,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/ChatAssistant.tsx",
                                        lineNumber: 563,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            msg.isError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-2xl px-5 py-4 bg-rose-950/40 border border-rose-500/20",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FormattedAnswer, {
                                                    content: msg.content
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/ChatAssistant.tsx",
                                                    lineNumber: 571,
                                                    columnNumber: 45
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                                lineNumber: 570,
                                                columnNumber: 41
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FormattedAnswer, {
                                                    content: msg.content
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/ChatAssistant.tsx",
                                                    lineNumber: 575,
                                                    columnNumber: 45
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                                lineNumber: 574,
                                                columnNumber: 41
                                            }, this),
                                            msg.diagnostics && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-5 flex flex-wrap gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "px-3 py-1.5 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/20",
                                                        children: msg.diagnostics.hyde_enabled ? "HyDE Active" : "Direct Query"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/ChatAssistant.tsx",
                                                        lineNumber: 582,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "px-3 py-1.5 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/20",
                                                        children: msg.diagnostics.planner_used ? "Planner LLM" : "Fallback Plan"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/ChatAssistant.tsx",
                                                        lineNumber: 585,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "px-3 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20",
                                                        children: [
                                                            "Scope: ",
                                                            msg.diagnostics.scope
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/ChatAssistant.tsx",
                                                        lineNumber: 588,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-800/80 text-slate-300 border border-slate-700/80",
                                                        children: [
                                                            msg.diagnostics.reranked_count,
                                                            "/",
                                                            msg.diagnostics.retrieved_count,
                                                            " kept"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/ChatAssistant.tsx",
                                                        lineNumber: 591,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `px-3 py-1.5 rounded-full text-xs font-semibold ${statusPill(msg.diagnostics.validation_status)}`,
                                                        children: [
                                                            "Validation ",
                                                            msg.diagnostics.validation_status
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/ChatAssistant.tsx",
                                                        lineNumber: 594,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                                lineNumber: 581,
                                                columnNumber: 41
                                            }, this),
                                            (msg.plan || msg.execution && msg.execution.length > 0 || msg.validation) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-5 space-y-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between gap-3 px-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs uppercase font-bold text-slate-400 tracking-widest",
                                                                children: "Agent Execution"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                                                lineNumber: 604,
                                                                columnNumber: 49
                                                            }, this),
                                                            msg.diagnostics && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-slate-500 font-medium",
                                                                children: [
                                                                    msg.diagnostics.executed_steps,
                                                                    " steps · ",
                                                                    msg.diagnostics.tool_calls,
                                                                    " tools"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                                                lineNumber: 608,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/ChatAssistant.tsx",
                                                        lineNumber: 603,
                                                        columnNumber: 45
                                                    }, this),
                                                    msg.plan && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlannerCard, {
                                                        plan: msg.plan
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/ChatAssistant.tsx",
                                                        lineNumber: 614,
                                                        columnNumber: 58
                                                    }, this),
                                                    msg.execution && msg.execution.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ExecutionTimeline, {
                                                        execution: msg.execution
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/ChatAssistant.tsx",
                                                        lineNumber: 615,
                                                        columnNumber: 91
                                                    }, this),
                                                    msg.validation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ValidationCard, {
                                                        validation: msg.validation
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/ChatAssistant.tsx",
                                                        lineNumber: 616,
                                                        columnNumber: 64
                                                    }, this),
                                                    msg.diagnostics && msg.diagnostics.validation_queries.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "rounded-2xl border border-slate-800/80 bg-black/50 p-5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs font-bold uppercase tracking-widest text-slate-400",
                                                                children: "Cross-Verification Queries"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                                                lineNumber: 620,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-3 flex flex-wrap gap-2",
                                                                children: msg.diagnostics.validation_queries.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "px-3 py-1.5 rounded-full text-xs font-medium bg-slate-900 text-slate-300 border border-slate-700/80",
                                                                        children: item
                                                                    }, `${item}-${index}`, false, {
                                                                        fileName: "[project]/app/components/ChatAssistant.tsx",
                                                                        lineNumber: 623,
                                                                        columnNumber: 61
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                                                lineNumber: 621,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/ChatAssistant.tsx",
                                                        lineNumber: 619,
                                                        columnNumber: 49
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                                lineNumber: 602,
                                                columnNumber: 41
                                            }, this),
                                            msg.sources && msg.sources.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-5 space-y-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between gap-3 px-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs uppercase font-bold text-slate-400 tracking-widest",
                                                                children: "Evidence Pack"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                                                lineNumber: 640,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-slate-500 font-medium",
                                                                children: [
                                                                    msg.sources.length,
                                                                    " chunks"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                                                lineNumber: 643,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/ChatAssistant.tsx",
                                                        lineNumber: 639,
                                                        columnNumber: 45
                                                    }, this),
                                                    msg.sources.map((source, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SourceCard, {
                                                            source: source,
                                                            index: index
                                                        }, `${msg.id}-${source.source_id}`, false, {
                                                            fileName: "[project]/app/components/ChatAssistant.tsx",
                                                            lineNumber: 648,
                                                            columnNumber: 49
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                                lineNumber: 638,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/ChatAssistant.tsx",
                                        lineNumber: 568,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                lineNumber: 561,
                                columnNumber: 29
                            }, this)
                        }, msg.id, false, {
                            fileName: "[project]/app/components/ChatAssistant.tsx",
                            lineNumber: 550,
                            columnNumber: 21
                        }, this)),
                    isTyping && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-3.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-white/10 bg-slate-900/60",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GeminiSparkle, {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/app/components/ChatAssistant.tsx",
                                    lineNumber: 666,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                lineNumber: 665,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 px-5 py-4 rounded-2xl bg-white/[0.04] border border-white/5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-2 h-2 bg-teal-400 rounded-full animate-bounce",
                                        style: {
                                            animationDelay: "0ms"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/ChatAssistant.tsx",
                                        lineNumber: 669,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-2 h-2 bg-violet-400 rounded-full animate-bounce",
                                        style: {
                                            animationDelay: "150ms"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/ChatAssistant.tsx",
                                        lineNumber: 670,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-2 h-2 bg-cyan-400 rounded-full animate-bounce",
                                        style: {
                                            animationDelay: "300ms"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/ChatAssistant.tsx",
                                        lineNumber: 671,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                lineNumber: 668,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/ChatAssistant.tsx",
                        lineNumber: 664,
                        columnNumber: 21
                    }, this),
                    messages.length === 1 && !isTyping && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-3 pt-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs uppercase font-bold text-slate-500 tracking-widest mb-1 px-1",
                                children: "Discover Insights"
                            }, void 0, false, {
                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                lineNumber: 679,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 gap-2.5",
                                children: QUICK_ACTIONS.map((action, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleQuickAction(action),
                                        className: "text-sm px-5 py-3.5 rounded-2xl bg-white/[0.03] border border-white/5 text-slate-300 hover:border-teal-500/30 hover:text-teal-300 hover:bg-white/[0.06] transition-all text-left flex items-center justify-between group",
                                        children: [
                                            action,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeWidth: "2.5",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M5 12h14M12 5l7 7-7 7"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/ChatAssistant.tsx",
                                                    lineNumber: 688,
                                                    columnNumber: 269
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                                lineNumber: 688,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/app/components/ChatAssistant.tsx",
                                        lineNumber: 682,
                                        columnNumber: 33
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                lineNumber: 680,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/ChatAssistant.tsx",
                        lineNumber: 678,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: messagesEndRef
                    }, void 0, false, {
                        fileName: "[project]/app/components/ChatAssistant.tsx",
                        lineNumber: 694,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/ChatAssistant.tsx",
                lineNumber: 548,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-5 md:px-7 py-5 bg-white/[0.02] border-t border-white/5 shadow-[0_-20px_40px_rgba(0,0,0,0.3)]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleFormSubmit,
                    className: "relative flex items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            placeholder: selectedPaper ? `Ask about ${selectedPaper.id}…` : "Ask GemaMat anything…",
                            className: "w-full bg-white/[0.04] border border-white/10 text-slate-100 rounded-2xl px-6 py-4 pr-14 text-[15px] focus:outline-none focus:border-teal-500/40 focus:ring-2 focus:ring-teal-500/20 transition-all placeholder-slate-500 shadow-inner",
                            value: inputValue,
                            onChange: (e)=>setInputValue(e.target.value),
                            disabled: isTyping
                        }, void 0, false, {
                            fileName: "[project]/app/components/ChatAssistant.tsx",
                            lineNumber: 700,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: !inputValue.trim() || isTyping,
                            className: "absolute right-3 w-10 h-10 flex items-center justify-center rounded-xl bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 hover:text-teal-300 disabled:opacity-40 disabled:hover:bg-teal-500/10 transition-all",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "18",
                                height: "18",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2.5",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                        x1: "22",
                                        y1: "2",
                                        x2: "11",
                                        y2: "13"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/ChatAssistant.tsx",
                                        lineNumber: 713,
                                        columnNumber: 170
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                        points: "22 2 15 22 11 13 2 9 22 2"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/ChatAssistant.tsx",
                                        lineNumber: 713,
                                        columnNumber: 209
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/ChatAssistant.tsx",
                                lineNumber: 713,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/ChatAssistant.tsx",
                            lineNumber: 708,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/ChatAssistant.tsx",
                    lineNumber: 699,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/ChatAssistant.tsx",
                lineNumber: 698,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/ChatAssistant.tsx",
        lineNumber: 515,
        columnNumber: 9
    }, this);
}
_s(ChatAssistant, "+jNQEKbm71q4TKPR1MikQVvIkGo=");
_c6 = ChatAssistant;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "GeminiSparkle");
__turbopack_context__.k.register(_c1, "FormattedAnswer");
__turbopack_context__.k.register(_c2, "SourceCard");
__turbopack_context__.k.register(_c3, "PlannerCard");
__turbopack_context__.k.register(_c4, "ExecutionTimeline");
__turbopack_context__.k.register(_c5, "ValidationCard");
__turbopack_context__.k.register(_c6, "ChatAssistant");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/ClientShell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ClientShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Dashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/Dashboard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ChatAssistant$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ChatAssistant.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function ClientShell({ initialPapers }) {
    _s();
    const [selectedPaperIndex, setSelectedPaperIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "flex flex-col md:flex-row h-[100dvh] overflow-hidden bg-black",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full md:w-[400px] xl:w-[450px] h-[45vh] md:h-full border-t md:border-t-0 md:border-r border-white/5 flex-shrink-0 bg-white/[0.02] backdrop-blur-[40px] overflow-hidden flex flex-col order-last md:order-first",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ChatAssistant$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    selectedPaper: selectedPaperIndex !== null ? initialPapers[selectedPaperIndex] : null,
                    onSelectPaper: (idx)=>setSelectedPaperIndex(idx)
                }, void 0, false, {
                    fileName: "[project]/app/components/ClientShell.tsx",
                    lineNumber: 19,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/ClientShell.tsx",
                lineNumber: 18,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 h-[55vh] md:h-full overflow-y-auto custom-scrollbar relative order-first md:order-last",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Dashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    papers: initialPapers,
                    selectedPaperIndex: selectedPaperIndex,
                    onSelectPaper: (idx)=>setSelectedPaperIndex(idx)
                }, void 0, false, {
                    fileName: "[project]/app/components/ClientShell.tsx",
                    lineNumber: 27,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/ClientShell.tsx",
                lineNumber: 26,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/ClientShell.tsx",
        lineNumber: 16,
        columnNumber: 9
    }, this);
}
_s(ClientShell, "pEtwp2G99Hml8LT0A27VI+nHMj0=");
_c = ClientShell;
var _c;
__turbopack_context__.k.register(_c, "ClientShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_components_0z7nzi4._.js.map