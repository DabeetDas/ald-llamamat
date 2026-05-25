module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/lib/data-fetcher.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAllPapers",
    ()=>getAllPapers
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongodb$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs, [project]/node_modules/mongodb)");
;
const DEFAULT_PAPER = {
    id: "",
    label: "",
    summary: {
        target_material: "",
        process_type: "",
        main_precursors: [],
        temperature_range: "",
        summary: "",
        evidence: ""
    },
    target_material: {
        target_material: {
            chemical_formula: "",
            material_name: "",
            material_class: ""
        },
        evidence: ""
    },
    substrate_info: {
        substrate_material: "",
        substrate_orientation: "",
        pretreatment: "",
        surface_functionalization: "",
        evidence: ""
    },
    deposition_conditions: {
        deposition_temperature_C: null,
        pressure: null,
        precursor_pulse_time_s: null,
        coreactant_pulse_time_s: null,
        purge_time_s: null,
        number_of_cycles: null,
        reactor_type: null,
        evidence: ""
    },
    precursor_coreactant: {
        precursors: [],
        coreactants: [],
        purge_gas: [],
        carrier_gas: [],
        evidence: ""
    },
    reaction_conditions: {
        reaction_equations: [],
        surface_mechanism_description: "",
        intermediate_species: [],
        evidence: ""
    },
    film_properties: {
        film_thickness_nm: null,
        density_g_cm3: null,
        refractive_index: null,
        surface_roughness_nm: null,
        crystal_phase: null,
        evidence: ""
    },
    characterization: {
        characterization_methods: [],
        evidence: ""
    }
};
function asStringArray(value) {
    if (!Array.isArray(value)) {
        return [];
    }
    return value.filter((item)=>typeof item === "string");
}
function normalizeChemicalList(value) {
    if (!Array.isArray(value)) {
        return [];
    }
    return value.map((item)=>{
        if (typeof item === "string") {
            return {
                abbreviation: item,
                full_name: item
            };
        }
        if (item && typeof item === "object") {
            const chemical = item;
            const abbreviation = typeof chemical.abbreviation === "string" ? chemical.abbreviation : "";
            const full_name = typeof chemical.full_name === "string" ? chemical.full_name : abbreviation;
            return {
                abbreviation,
                full_name
            };
        }
        return null;
    }).filter((item)=>item !== null);
}
function normalizePaper(doc) {
    return {
        ...DEFAULT_PAPER,
        ...doc,
        summary: {
            ...DEFAULT_PAPER.summary,
            ...doc.summary ?? {},
            main_precursors: asStringArray(doc.summary?.main_precursors)
        },
        target_material: {
            ...DEFAULT_PAPER.target_material,
            ...doc.target_material ?? {},
            target_material: {
                ...DEFAULT_PAPER.target_material.target_material,
                ...doc.target_material?.target_material ?? {}
            }
        },
        substrate_info: {
            ...DEFAULT_PAPER.substrate_info,
            ...doc.substrate_info ?? {}
        },
        deposition_conditions: {
            ...DEFAULT_PAPER.deposition_conditions,
            ...doc.deposition_conditions ?? {}
        },
        precursor_coreactant: {
            ...DEFAULT_PAPER.precursor_coreactant,
            ...doc.precursor_coreactant ?? {},
            precursors: normalizeChemicalList(doc.precursor_coreactant?.precursors),
            coreactants: normalizeChemicalList(doc.precursor_coreactant?.coreactants),
            purge_gas: normalizeChemicalList(doc.precursor_coreactant?.purge_gas),
            carrier_gas: normalizeChemicalList(doc.precursor_coreactant?.carrier_gas)
        },
        reaction_conditions: {
            ...DEFAULT_PAPER.reaction_conditions,
            ...doc.reaction_conditions ?? {},
            reaction_equations: asStringArray(doc.reaction_conditions?.reaction_equations),
            intermediate_species: asStringArray(doc.reaction_conditions?.intermediate_species)
        },
        film_properties: {
            ...DEFAULT_PAPER.film_properties,
            ...doc.film_properties ?? {}
        },
        characterization: {
            ...DEFAULT_PAPER.characterization,
            ...doc.characterization ?? {},
            characterization_methods: asStringArray(doc.characterization?.characterization_methods)
        }
    };
}
const uri = process.env.MONGODB_URI || "";
let cachedClient = null;
let cachedDb = null;
async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return {
            client: cachedClient,
            db: cachedDb
        };
    }
    const client = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongodb$29$__["MongoClient"](uri);
    await client.connect();
    const db = client.db("ALD_Data");
    cachedClient = client;
    cachedDb = db;
    return {
        client,
        db
    };
}
async function getAllPapers() {
    if (!uri) {
        console.error("MONGODB_URI is not set!");
        return [];
    }
    try {
        const { db } = await connectToDatabase();
        const collection = db.collection("Papers");
        // Fetch all documents. Sort by 'id' appropriately
        const papers = await collection.find({}).collation({
            locale: "en",
            numericOrdering: true
        }).sort({
            id: 1
        }).toArray();
        // Remove the internal _id so it can be serialized easily by Next.js Server Components
        return papers.map((doc)=>{
            const { _id, ...paperData } = doc;
            return normalizePaper(paperData);
        });
    } catch (err) {
        console.error("Failed to fetch papers from MongoDB", err);
        return [];
    }
}
}),
"[project]/app/components/ClientShell.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/app/components/ClientShell.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/components/ClientShell.tsx <module evaluation>", "default");
}),
"[project]/app/components/ClientShell.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/app/components/ClientShell.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/components/ClientShell.tsx", "default");
}),
"[project]/app/components/ClientShell.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ClientShell$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/app/components/ClientShell.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ClientShell$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/app/components/ClientShell.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ClientShell$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$data$2d$fetcher$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/data-fetcher.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ClientShell$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ClientShell.tsx [app-rsc] (ecmascript)");
;
;
;
async function Home() {
    const papers = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$data$2d$fetcher$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAllPapers"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ClientShell$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
        initialPapers: papers
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 7,
        columnNumber: 10
    }, this);
}
}),
"[project]/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0~yvem_._.js.map