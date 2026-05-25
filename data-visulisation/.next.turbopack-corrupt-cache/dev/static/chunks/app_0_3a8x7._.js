(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/lib/data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Types for ALD extracted data
__turbopack_context__.s([
    "papers",
    ()=>papers
]);
const papers = [
    {
        id: "paper1",
        label: "Paper 1 — TiO₂ via LPCVD",
        summary: {
            target_material: "Titanium dioxide",
            process_type: "Low Pressure CVD (LPCVD)",
            main_precursors: [
                "Tetranitratotitanium(IV) (TNT)"
            ],
            temperature_range: "184-330 °C",
            summary: "Low Temperature CVD of Crystalline Titanium Dioxide Films Using Tetranitratotitanium(IV)",
            evidence: "The continuing push to decrease the size of microelectronic devices is hampered by some of the physical properties of the current materials. Silicon dioxide is currently used as the gate dielectric in metal oxide semiconductor field effect transistors (MOSFETs), and operation of this device requires that the thickness of the dielectric be scaled along with the length of the gate between the source and drain."
        },
        target_material: {
            target_material: {
                chemical_formula: "TiO2",
                material_name: "Titanium dioxide",
                material_class: "Oxide"
            },
            evidence: "The composition of all films was TiO2.0–0.1 as measured by RBS."
        },
        substrate_info: {
            substrate_material: "Silicon",
            substrate_orientation: "",
            pretreatment: "Hydrogen-terminated, single crystalline p-Si(100)",
            surface_functionalization: "",
            evidence: "The 2 inch, circular substrates were hydrogen-terminated, single crystalline p-Si(100), with resistivity r = 1 to 10 Ω cm, maintained at temperatures ranging from 230 to 330 °C."
        },
        deposition_conditions: {
            deposition_temperature_C: 184,
            pressure: "1 torr",
            precursor_pulse_time_s: null,
            coreactant_pulse_time_s: null,
            purge_time_s: null,
            number_of_cycles: null,
            reactor_type: "UHV-CVD reactor",
            evidence: "The large-grain morphology, especially evident in the UHV-CVD-grown films, was further verified by cross-sectional transmission electron microscopy (TEM) as shown in Figure 3. Also evident is an amorphous region, approximately 2 nm in thickness, at the interface between silicon and the TiO2. This appears to be silicon oxide or a mixture of silicon and titanium oxide, but attempts to determine its exact composition using energy dispersive X-ray (EDX) analysis and RBS were precluded by its limited thickness."
        },
        precursor_coreactant: {
            precursors: [
                {
                    abbreviation: "TNT",
                    full_name: "Tetranitratotitanium(IV)"
                }
            ],
            coreactants: [
                {
                    abbreviation: "H₂O",
                    full_name: "Water"
                },
                {
                    abbreviation: "O₂",
                    full_name: "Oxygen"
                }
            ],
            purge_gas: [
                {
                    abbreviation: "Ar",
                    full_name: "Argon"
                }
            ],
            carrier_gas: [
                {
                    abbreviation: "Ar",
                    full_name: "Argon"
                }
            ],
            evidence: "Ultra high purity (99.998 %) Ar was used as the carrier gas at a flow rate of 60 sccm."
        },
        reaction_conditions: {
            reaction_equations: [],
            surface_mechanism_description: "Ligand exchange between TMA and surface hydroxyl groups followed by water pulse to regenerate OH sites",
            intermediate_species: [],
            evidence: "The large-grain morphology, especially evident in the UHV-CVD-grown films, was further verified by cross-sectional transmission electron microscopy (TEM) as shown in Figure 3. Also evident is an amorphous region, approximately 2 nm in thickness, at the interface between silicon and the TiO2. This appears to be silicon oxide or a mixture of silicon and titanium oxide, but attempts to determine its exact composition using energy dispersive X-ray (EDX) analysis and RBS were precluded by its limited thickness."
        },
        film_properties: {
            film_thickness_nm: null,
            density_g_cm3: null,
            refractive_index: null,
            surface_roughness_nm: null,
            crystal_phase: "Anatase",
            evidence: "X-ray diffraction (XRD) established that even those films grown at 184 °C by UHV-CVD (Fig. 2) were polycrystalline TiO2 with the structure of the anatase phase."
        },
        characterization: {
            characterization_methods: [
                "X-ray Photoelectron Spectroscopy (XPS)",
                "Rutherford Backscattering Spectrometry (RBS)",
                "Ellipsometry",
                "Atomic Force Microscopy (AFM)",
                "Transmission Electron Microscopy (TEM)",
                "X-ray Diffraction (XRD)",
                "Energy Dispersive X-ray (EDX)",
                "Four-point probe",
                "Hall Effect measurement",
                "C-V measurement"
            ],
            evidence: "The composition of all films was TiO2.0–0.1 as measured by RBS. No evidence for the presence of nitrogen was found using particle-induced X-ray emission (PIXE) or Auger electron spectroscopy. X-ray diffraction (XRD) established that even those films grown at 184 °C by UHV-CVD (Fig. 2) were polycrystalline TiO2 with the structure of the anatase phase. Atomic force microscopy (AFM) indicated the root mean square (rms) roughness for as-deposited, LPCVD-grown, 10–35 nm thick films was 0.12–0.15 nm and the average grain diameter for a 35 nm thick film was approximately 500 nm."
        }
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/data.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
// ─── Helpers ───
function Evidence({ text }) {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
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
                            lineNumber: 45,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/Dashboard.tsx",
                        lineNumber: 31,
                        columnNumber: 17
                    }, this),
                    "Evidence"
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/Dashboard.tsx",
                lineNumber: 26,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `evidence-text mt-2 rounded-lg text-sm leading-relaxed ${open ? "open" : ""}`,
                style: {
                    background: "rgba(15,23,42,0.5)",
                    border: "1px solid rgba(100,116,139,0.1)",
                    color: "var(--text-secondary)"
                },
                children: text
            }, void 0, false, {
                fileName: "[project]/app/components/Dashboard.tsx",
                lineNumber: 49,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/Dashboard.tsx",
        lineNumber: 25,
        columnNumber: 9
    }, this);
}
_s(Evidence, "xG1TONbKtDWtdOTrXaTAsNhPg/Q=");
_c = Evidence;
function NullValue() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "data-null",
        children: "— not reported"
    }, void 0, false, {
        fileName: "[project]/app/components/Dashboard.tsx",
        lineNumber: 64,
        columnNumber: 12
    }, this);
}
_c1 = NullValue;
function DataField({ label, value, accent }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "stat-card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "data-label mb-2",
                children: label
            }, void 0, false, {
                fileName: "[project]/app/components/Dashboard.tsx",
                lineNumber: 78,
                columnNumber: 13
            }, this),
            value !== null && value !== "" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "data-value",
                style: accent ? {
                    color: accent
                } : {},
                children: value
            }, void 0, false, {
                fileName: "[project]/app/components/Dashboard.tsx",
                lineNumber: 80,
                columnNumber: 17
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NullValue, {}, void 0, false, {
                fileName: "[project]/app/components/Dashboard.tsx",
                lineNumber: 84,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/Dashboard.tsx",
        lineNumber: 77,
        columnNumber: 9
    }, this);
}
_c2 = DataField;
// ─── Particles Background ───
function Particles() {
    const particles = [
        {
            size: 3,
            x: "10%",
            y: "20%",
            delay: 0,
            duration: 6,
            color: "rgba(45,212,191,0.4)"
        },
        {
            size: 2,
            x: "25%",
            y: "60%",
            delay: 1,
            duration: 8,
            color: "rgba(167,139,250,0.35)"
        },
        {
            size: 4,
            x: "70%",
            y: "15%",
            delay: 2,
            duration: 7,
            color: "rgba(45,212,191,0.3)"
        },
        {
            size: 2,
            x: "85%",
            y: "45%",
            delay: 0.5,
            duration: 9,
            color: "rgba(167,139,250,0.25)"
        },
        {
            size: 3,
            x: "50%",
            y: "75%",
            delay: 3,
            duration: 6,
            color: "rgba(34,211,238,0.3)"
        },
        {
            size: 2,
            x: "40%",
            y: "30%",
            delay: 1.5,
            duration: 10,
            color: "rgba(244,114,182,0.25)"
        },
        {
            size: 3,
            x: "92%",
            y: "70%",
            delay: 4,
            duration: 7,
            color: "rgba(45,212,191,0.35)"
        },
        {
            size: 2,
            x: "15%",
            y: "85%",
            delay: 2.5,
            duration: 8,
            color: "rgba(167,139,250,0.3)"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: particles.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "particle",
                style: {
                    width: p.size,
                    height: p.size,
                    left: p.x,
                    top: p.y,
                    background: p.color,
                    animationDelay: `${p.delay}s`,
                    animationDuration: `${p.duration}s`
                }
            }, i, false, {
                fileName: "[project]/app/components/Dashboard.tsx",
                lineNumber: 106,
                columnNumber: 17
            }, this))
    }, void 0, false);
}
_c3 = Particles;
// ─── Section Wrapper ───
function Section({ title, icon, children, delay = 0 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass-card p-6 animate-in",
        style: {
            animationDelay: `${delay}ms`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "section-title",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-lg",
                        children: icon
                    }, void 0, false, {
                        fileName: "[project]/app/components/Dashboard.tsx",
                        lineNumber: 142,
                        columnNumber: 17
                    }, this),
                    title
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/Dashboard.tsx",
                lineNumber: 141,
                columnNumber: 13
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/Dashboard.tsx",
        lineNumber: 137,
        columnNumber: 9
    }, this);
}
_c4 = Section;
// ─── Chart Colors ───
const chartColors = [
    "#2dd4bf",
    "#a78bfa",
    "#22d3ee",
    "#f472b6",
    "#fbbf24",
    "#34d399",
    "#fb7185",
    "#818cf8",
    "#38bdf8",
    "#c084fc"
];
function Dashboard() {
    _s1();
    const [selectedPaper, setSelectedPaper] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const paper = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["papers"][selectedPaper];
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "hero-bg px-6 py-16 md:py-24 relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Particles, {}, void 0, false, {
                        fileName: "[project]/app/components/Dashboard.tsx",
                        lineNumber: 235,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-6xl mx-auto relative z-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-10 h-10 rounded-xl flex items-center justify-center",
                                        style: {
                                            background: "var(--gradient-accent)",
                                            animation: "pulse-glow 3s infinite"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "20",
                                            height: "20",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "#0f172a",
                                            strokeWidth: "2.5",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                    cx: "12",
                                                    cy: "12",
                                                    r: "3"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Dashboard.tsx",
                                                    lineNumber: 255,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M12 2a10 10 0 0 1 0 20"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Dashboard.tsx",
                                                    lineNumber: 256,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M12 2a10 10 0 0 0 0 20"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Dashboard.tsx",
                                                    lineNumber: 257,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                    x1: "2",
                                                    y1: "12",
                                                    x2: "22",
                                                    y2: "12"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Dashboard.tsx",
                                                    lineNumber: 258,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/Dashboard.tsx",
                                            lineNumber: 245,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 238,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-semibold uppercase tracking-widest",
                                        style: {
                                            color: "var(--accent-teal)"
                                        },
                                        children: "ALD / CVD Data Explorer"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 261,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 237,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight",
                                style: {
                                    letterSpacing: "-0.02em"
                                },
                                children: [
                                    "Material Deposition",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 273,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            background: "var(--gradient-accent)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent"
                                        },
                                        children: "Data Visualizer"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 274,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 268,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg max-w-2xl leading-relaxed",
                                style: {
                                    color: "var(--text-secondary)"
                                },
                                children: "Explore extracted research data from ALD and CVD thin film deposition papers — materials, conditions, characterization, and more."
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 284,
                                columnNumber: 21
                            }, this),
                            __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["papers"].length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-8",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    className: "px-4 py-3 rounded-xl text-sm font-medium cursor-pointer outline-none",
                                    style: {
                                        background: "rgba(15,23,42,0.8)",
                                        border: "1px solid rgba(45,212,191,0.2)",
                                        color: "var(--text-primary)"
                                    },
                                    value: selectedPaper,
                                    onChange: (e)=>setSelectedPaper(Number(e.target.value)),
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["papers"].map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: i,
                                            children: p.label
                                        }, p.id, false, {
                                            fileName: "[project]/app/components/Dashboard.tsx",
                                            lineNumber: 307,
                                            columnNumber: 37
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/components/Dashboard.tsx",
                                    lineNumber: 296,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 295,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/Dashboard.tsx",
                        lineNumber: 236,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/Dashboard.tsx",
                lineNumber: 234,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-6xl w-full mx-auto px-6 -mt-8 relative z-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 md:grid-cols-4 gap-4",
                    children: [
                        {
                            label: "Target Material",
                            value: paper.summary.target_material,
                            color: "var(--accent-teal)",
                            icon: "🎯"
                        },
                        {
                            label: "Process Type",
                            value: paper.summary.process_type,
                            color: "var(--accent-purple)",
                            icon: "⚙️"
                        },
                        {
                            label: "Temperature Range",
                            value: paper.summary.temperature_range,
                            color: "var(--accent-amber)",
                            icon: "🌡️"
                        },
                        {
                            label: "Characterization Methods",
                            value: `${paper.characterization.characterization_methods.length} methods`,
                            color: "var(--accent-cyan)",
                            icon: "🔬"
                        }
                    ].map((metric, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "glass-card p-5 animate-in",
                            style: {
                                animationDelay: `${i * 100}ms`
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xl",
                                            children: metric.icon
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/Dashboard.tsx",
                                            lineNumber: 352,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "data-label",
                                            children: metric.label
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/Dashboard.tsx",
                                            lineNumber: 353,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/Dashboard.tsx",
                                    lineNumber: 351,
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
                                    lineNumber: 355,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/app/components/Dashboard.tsx",
                            lineNumber: 346,
                            columnNumber: 25
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/components/Dashboard.tsx",
                    lineNumber: 319,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/Dashboard.tsx",
                lineNumber: 318,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "max-w-6xl w-full mx-auto px-6 py-10 flex flex-col gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                        title: "Paper Summary",
                        icon: "📄",
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
                                lineNumber: 369,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2 mb-2",
                                children: paper.summary.main_precursors.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "badge badge-teal",
                                        children: [
                                            "🧪 ",
                                            p
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 377,
                                        columnNumber: 29
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 375,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Evidence, {
                                text: paper.summary.evidence
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 382,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/Dashboard.tsx",
                        lineNumber: 368,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                        title: "Target Material",
                        icon: "🎯",
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
                                        lineNumber: 388,
                                        columnNumber: 25
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
                                                    lineNumber: 393,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "badge badge-purple",
                                                    children: paper.target_material.target_material.material_class
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Dashboard.tsx",
                                                    lineNumber: 396,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/Dashboard.tsx",
                                            lineNumber: 392,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 391,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 387,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Evidence, {
                                text: paper.target_material.evidence
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 402,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/Dashboard.tsx",
                        lineNumber: 386,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                        title: "Substrate Information",
                        icon: "🏗️",
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
                                        lineNumber: 408,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataField, {
                                        label: "Orientation",
                                        value: paper.substrate_info.substrate_orientation
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 413,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataField, {
                                        label: "Pretreatment",
                                        value: paper.substrate_info.pretreatment
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 417,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataField, {
                                        label: "Functionalization",
                                        value: paper.substrate_info.surface_functionalization
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 421,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 407,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Evidence, {
                                text: paper.substrate_info.evidence
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 426,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/Dashboard.tsx",
                        lineNumber: 406,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                        title: "Deposition Conditions",
                        icon: "🔥",
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
                                        lineNumber: 432,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataField, {
                                        label: "Pressure",
                                        value: paper.deposition_conditions.pressure,
                                        accent: "var(--accent-cyan)"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 437,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataField, {
                                        label: "Reactor Type",
                                        value: paper.deposition_conditions.reactor_type,
                                        accent: "var(--accent-purple)"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 442,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataField, {
                                        label: "Precursor Pulse (s)",
                                        value: paper.deposition_conditions.precursor_pulse_time_s
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 447,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataField, {
                                        label: "Coreactant Pulse (s)",
                                        value: paper.deposition_conditions.coreactant_pulse_time_s
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 451,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataField, {
                                        label: "Purge Time (s)",
                                        value: paper.deposition_conditions.purge_time_s
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 455,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataField, {
                                        label: "Cycles",
                                        value: paper.deposition_conditions.number_of_cycles
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 459,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 431,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "chart-container",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "data-label mb-4",
                                        children: "Process Overview Radar"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 467,
                                        columnNumber: 25
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
                                                    lineNumber: 475,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarAngleAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PolarAngleAxis"], {
                                                    dataKey: "property",
                                                    tick: {
                                                        fill: "#94a3b8",
                                                        fontSize: 12
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Dashboard.tsx",
                                                    lineNumber: 476,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Radar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Radar"], {
                                                    dataKey: "value",
                                                    stroke: "#2dd4bf",
                                                    fill: "#2dd4bf",
                                                    fillOpacity: 0.2,
                                                    strokeWidth: 2
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Dashboard.tsx",
                                                    lineNumber: 480,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/Dashboard.tsx",
                                            lineNumber: 469,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 468,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 466,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Evidence, {
                                text: paper.deposition_conditions.evidence
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 490,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/Dashboard.tsx",
                        lineNumber: 430,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                        title: "Precursors & Coreactants",
                        icon: "🧪",
                        delay: 500,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stat-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "data-label mb-3",
                                                style: {
                                                    color: "var(--accent-teal)"
                                                },
                                                children: "● Precursors"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                lineNumber: 498,
                                                columnNumber: 29
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
                                                                lineNumber: 507,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    color: "var(--text-muted)",
                                                                    fontSize: "0.75rem"
                                                                },
                                                                children: c.full_name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                                lineNumber: 510,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/app/components/Dashboard.tsx",
                                                        lineNumber: 506,
                                                        columnNumber: 37
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                lineNumber: 504,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 497,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stat-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "data-label mb-3",
                                                style: {
                                                    color: "var(--accent-purple)"
                                                },
                                                children: "● Coreactants"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                lineNumber: 519,
                                                columnNumber: 29
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
                                                                lineNumber: 528,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    color: "var(--text-muted)",
                                                                    fontSize: "0.75rem"
                                                                },
                                                                children: c.full_name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                                lineNumber: 531,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/app/components/Dashboard.tsx",
                                                        lineNumber: 527,
                                                        columnNumber: 37
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                lineNumber: 525,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 518,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stat-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "data-label mb-3",
                                                style: {
                                                    color: "var(--accent-amber)"
                                                },
                                                children: "● Purge Gas"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                lineNumber: 540,
                                                columnNumber: 29
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
                                                                lineNumber: 549,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    color: "var(--text-muted)",
                                                                    fontSize: "0.75rem"
                                                                },
                                                                children: c.full_name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                                lineNumber: 552,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/app/components/Dashboard.tsx",
                                                        lineNumber: 548,
                                                        columnNumber: 37
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                lineNumber: 546,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 539,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stat-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "data-label mb-3",
                                                style: {
                                                    color: "var(--accent-cyan)"
                                                },
                                                children: "● Carrier Gas"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                lineNumber: 561,
                                                columnNumber: 29
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
                                                                lineNumber: 570,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    color: "var(--text-muted)",
                                                                    fontSize: "0.75rem"
                                                                },
                                                                children: c.full_name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                                lineNumber: 573,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/app/components/Dashboard.tsx",
                                                        lineNumber: 569,
                                                        columnNumber: 37
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                lineNumber: 567,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 560,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 495,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Evidence, {
                                text: paper.precursor_coreactant.evidence
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 581,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/Dashboard.tsx",
                        lineNumber: 494,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                        title: "Reaction Conditions",
                        icon: "⚗️",
                        delay: 600,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "stat-card mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "data-label mb-2",
                                        children: "Surface Mechanism"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 587,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-base leading-relaxed",
                                        style: {
                                            color: "var(--text-secondary)"
                                        },
                                        children: paper.reaction_conditions.surface_mechanism_description || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NullValue, {}, void 0, false, {
                                            fileName: "[project]/app/components/Dashboard.tsx",
                                            lineNumber: 593,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 588,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 586,
                                columnNumber: 21
                            }, this),
                            paper.reaction_conditions.reaction_equations.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "stat-card mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "data-label mb-2",
                                        children: "Reaction Equations"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 599,
                                        columnNumber: 29
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
                                                lineNumber: 603,
                                                columnNumber: 41
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 600,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 598,
                                columnNumber: 25
                            }, this),
                            paper.reaction_conditions.intermediate_species.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2 mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "data-label mr-2",
                                        children: "Intermediate Species:"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 620,
                                        columnNumber: 29
                                    }, this),
                                    paper.reaction_conditions.intermediate_species.map((sp, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "badge badge-rose",
                                            children: sp
                                        }, i, false, {
                                            fileName: "[project]/app/components/Dashboard.tsx",
                                            lineNumber: 625,
                                            columnNumber: 37
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 619,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Evidence, {
                                text: paper.reaction_conditions.evidence
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 632,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/Dashboard.tsx",
                        lineNumber: 585,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                        title: "Film Properties",
                        icon: "💎",
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
                                                    lineNumber: 640,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataField, {
                                                    label: "Density (g/cm³)",
                                                    value: filmProps.density_g_cm3,
                                                    accent: "var(--accent-purple)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Dashboard.tsx",
                                                    lineNumber: 645,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataField, {
                                                    label: "Refractive Index",
                                                    value: filmProps.refractive_index,
                                                    accent: "var(--accent-cyan)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Dashboard.tsx",
                                                    lineNumber: 650,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataField, {
                                                    label: "Surface Roughness (nm)",
                                                    value: filmProps.surface_roughness_nm,
                                                    accent: "var(--accent-amber)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Dashboard.tsx",
                                                    lineNumber: 655,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataField, {
                                                    label: "Crystal Phase",
                                                    value: filmProps.crystal_phase,
                                                    accent: "var(--accent-emerald)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Dashboard.tsx",
                                                    lineNumber: 660,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/Dashboard.tsx",
                                            lineNumber: 639,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 638,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "chart-container flex flex-col items-center justify-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "data-label mb-3",
                                                children: "Data Completeness"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                lineNumber: 668,
                                                columnNumber: 29
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
                                                                    lineNumber: 682,
                                                                    columnNumber: 45
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/Dashboard.tsx",
                                                            lineNumber: 671,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                            contentStyle: {
                                                                background: "#1e293b",
                                                                border: "1px solid rgba(255,255,255,0.1)",
                                                                borderRadius: 8,
                                                                color: "#f1f5f9",
                                                                fontSize: 13
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/Dashboard.tsx",
                                                            lineNumber: 685,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/Dashboard.tsx",
                                                    lineNumber: 670,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/Dashboard.tsx",
                                                lineNumber: 669,
                                                columnNumber: 29
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
                                                lineNumber: 696,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 667,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 637,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Evidence, {
                                text: filmProps.evidence
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 701,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/Dashboard.tsx",
                        lineNumber: 636,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                        title: "Characterization Methods",
                        icon: "🔬",
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
                                        lineNumber: 709,
                                        columnNumber: 33
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 706,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "chart-container",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "data-label mb-4",
                                        children: "Methods Inventory"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 725,
                                        columnNumber: 25
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
                                                    lineNumber: 732,
                                                    columnNumber: 33
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
                                                    lineNumber: 733,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                    contentStyle: {
                                                        background: "#1e293b",
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
                                                                background: "#1e293b",
                                                                border: "1px solid rgba(255,255,255,0.1)",
                                                                borderRadius: 8,
                                                                padding: "8px 12px",
                                                                color: "#f1f5f9",
                                                                fontSize: 13
                                                            },
                                                            children: data.fullName
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/Dashboard.tsx",
                                                            lineNumber: 753,
                                                            columnNumber: 45
                                                        }, this);
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Dashboard.tsx",
                                                    lineNumber: 741,
                                                    columnNumber: 33
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
                                                            lineNumber: 768,
                                                            columnNumber: 41
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Dashboard.tsx",
                                                    lineNumber: 766,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/Dashboard.tsx",
                                            lineNumber: 727,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Dashboard.tsx",
                                        lineNumber: 726,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 724,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Evidence, {
                                text: paper.characterization.evidence
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.tsx",
                                lineNumber: 777,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/Dashboard.tsx",
                        lineNumber: 705,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "shimmer-line"
                    }, void 0, false, {
                        fileName: "[project]/app/components/Dashboard.tsx",
                        lineNumber: 780,
                        columnNumber: 17
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
                                    lineNumber: 789,
                                    columnNumber: 25
                                }, this),
                                " ",
                                "tracked across",
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: "var(--accent-purple)"
                                    },
                                    children: [
                                        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["papers"].length,
                                        " paper",
                                        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["papers"].length !== 1 ? "s" : ""
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/Dashboard.tsx",
                                    lineNumber: 794,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/Dashboard.tsx",
                            lineNumber: 784,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/Dashboard.tsx",
                        lineNumber: 783,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/Dashboard.tsx",
                lineNumber: 367,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/Dashboard.tsx",
        lineNumber: 232,
        columnNumber: 9
    }, this);
}
_s1(Dashboard, "qK9S7Vlk8tiEKmVpq2E6cW4tphw=");
_c5 = Dashboard;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "Evidence");
__turbopack_context__.k.register(_c1, "NullValue");
__turbopack_context__.k.register(_c2, "DataField");
__turbopack_context__.k.register(_c3, "Particles");
__turbopack_context__.k.register(_c4, "Section");
__turbopack_context__.k.register(_c5, "Dashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_0_3a8x7._.js.map