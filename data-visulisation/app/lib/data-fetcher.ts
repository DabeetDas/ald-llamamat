import { MongoClient, type Db } from "mongodb";

// Let's re-use the types from the previous data.ts and export them from here.
export interface TargetMaterial {
    target_material: {
        chemical_formula: string;
        material_name: string;
        material_class: string;
    };
    evidence: string;
}

export interface SubstrateInfo {
    substrate_material: string;
    substrate_orientation: string;
    pretreatment: string;
    surface_functionalization: string;
    evidence: string;
}

export interface DepositionConditions {
    deposition_temperature_C: number | null;
    pressure: string | null;
    precursor_pulse_time_s: number | null;
    coreactant_pulse_time_s: number | null;
    purge_time_s: number | null;
    number_of_cycles: number | null;
    reactor_type: string | null;
    evidence: string;
}

export interface Chemical {
    abbreviation: string;
    full_name: string;
}

export interface PrecursorCoreactant {
    precursors: Chemical[];
    coreactants: Chemical[];
    purge_gas: Chemical[];
    carrier_gas: Chemical[];
    evidence: string;
}

export interface ReactionConditions {
    reaction_equations: string[];
    surface_mechanism_description: string;
    intermediate_species: string[];
    evidence: string;
}

export interface FilmProperties {
    film_thickness_nm: number | null;
    density_g_cm3: number | null;
    refractive_index: number | null;
    surface_roughness_nm: number | null;
    crystal_phase: string | null;
    evidence: string;
}

export interface Characterization {
    characterization_methods: string[];
    evidence: string;
}

export interface Summary {
    target_material: string;
    process_type: string;
    main_precursors: string[];
    temperature_range: string;
    summary: string;
    evidence: string;
}

export interface PaperData {
    id: string;
    label: string;
    summary: Summary;
    target_material: TargetMaterial;
    substrate_info: SubstrateInfo;
    deposition_conditions: DepositionConditions;
    precursor_coreactant: PrecursorCoreactant;
    reaction_conditions: ReactionConditions;
    film_properties: FilmProperties;
    characterization: Characterization;
    pdf_url?: string;
}

const CATALOG_SUMMARY_MAX_LENGTH = 700;
const DETAIL_EVIDENCE_MAX_LENGTH = 6000;

const CATALOG_PROJECTION = {
    _id: 0,
    id: 1,
    label: 1,
    pdf_url: 1,
    "summary.target_material": 1,
    "summary.process_type": 1,
    "summary.main_precursors": 1,
    "summary.temperature_range": 1,
    "summary.summary": 1,
    "target_material.target_material.chemical_formula": 1,
    "target_material.target_material.material_name": 1,
    "target_material.target_material.material_class": 1,
    "substrate_info.substrate_material": 1,
    "substrate_info.substrate_orientation": 1,
    "substrate_info.pretreatment": 1,
    "substrate_info.surface_functionalization": 1,
    "deposition_conditions.deposition_temperature_C": 1,
    "deposition_conditions.pressure": 1,
    "deposition_conditions.precursor_pulse_time_s": 1,
    "deposition_conditions.coreactant_pulse_time_s": 1,
    "deposition_conditions.purge_time_s": 1,
    "deposition_conditions.number_of_cycles": 1,
    "deposition_conditions.reactor_type": 1,
    "precursor_coreactant.precursors": 1,
    "precursor_coreactant.coreactants": 1,
    "precursor_coreactant.purge_gas": 1,
    "precursor_coreactant.carrier_gas": 1,
    "reaction_conditions.reaction_equations": 1,
    "reaction_conditions.surface_mechanism_description": 1,
    "reaction_conditions.intermediate_species": 1,
    "film_properties.film_thickness_nm": 1,
    "film_properties.density_g_cm3": 1,
    "film_properties.refractive_index": 1,
    "film_properties.surface_roughness_nm": 1,
    "film_properties.crystal_phase": 1,
    "characterization.characterization_methods": 1,
};

const DEFAULT_PAPER: PaperData = {
    id: "",
    label: "",
    summary: {
        target_material: "",
        process_type: "",
        main_precursors: [],
        temperature_range: "",
        summary: "",
        evidence: "",
    },
    target_material: {
        target_material: {
            chemical_formula: "",
            material_name: "",
            material_class: "",
        },
        evidence: "",
    },
    substrate_info: {
        substrate_material: "",
        substrate_orientation: "",
        pretreatment: "",
        surface_functionalization: "",
        evidence: "",
    },
    deposition_conditions: {
        deposition_temperature_C: null,
        pressure: null,
        precursor_pulse_time_s: null,
        coreactant_pulse_time_s: null,
        purge_time_s: null,
        number_of_cycles: null,
        reactor_type: null,
        evidence: "",
    },
    precursor_coreactant: {
        precursors: [],
        coreactants: [],
        purge_gas: [],
        carrier_gas: [],
        evidence: "",
    },
    reaction_conditions: {
        reaction_equations: [],
        surface_mechanism_description: "",
        intermediate_species: [],
        evidence: "",
    },
    film_properties: {
        film_thickness_nm: null,
        density_g_cm3: null,
        refractive_index: null,
        surface_roughness_nm: null,
        crystal_phase: null,
        evidence: "",
    },
    characterization: {
        characterization_methods: [],
        evidence: "",
    },
};

function asStringArray(value: unknown): string[] {
    if (!Array.isArray(value)) {
        return [];
    }
    return value.filter((item): item is string => typeof item === "string");
}

function asRecord(value: unknown): Record<string, unknown> {
    return value && typeof value === "object" && !Array.isArray(value)
        ? value as Record<string, unknown>
        : {};
}

function asString(value: unknown, fallback = ""): string {
    return typeof value === "string" ? value : fallback;
}

function asNullableString(value: unknown): string | null {
    if (value === null || value === undefined) {
        return null;
    }

    return typeof value === "string" ? value : String(value);
}

function asNullableNumber(value: unknown): number | null {
    if (typeof value === "number" && Number.isFinite(value)) {
        return value;
    }

    if (typeof value === "string" && value.trim() !== "") {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : null;
    }

    return null;
}

function normalizeChemicalList(value: unknown): Chemical[] {
    if (!Array.isArray(value)) {
        return [];
    }

    return value
        .map((item) => {
            if (typeof item === "string") {
                return {
                    abbreviation: item,
                    full_name: item,
                };
            }

            if (item && typeof item === "object") {
                const chemical = item as Partial<Chemical>;
                const abbreviation = typeof chemical.abbreviation === "string" ? chemical.abbreviation : "";
                const full_name = typeof chemical.full_name === "string" ? chemical.full_name : abbreviation;
                return {
                    abbreviation,
                    full_name,
                };
            }

            return null;
        })
        .filter((item): item is Chemical => item !== null);
}

function normalizePaper(value: unknown): PaperData {
    const doc = asRecord(value);
    const summary = asRecord(doc.summary);
    const targetMaterialDoc = asRecord(doc.target_material);
    const targetMaterial = asRecord(targetMaterialDoc.target_material);
    const substrateInfo = asRecord(doc.substrate_info);
    const depositionConditions = asRecord(doc.deposition_conditions);
    const precursorCoreactant = asRecord(doc.precursor_coreactant);
    const reactionConditions = asRecord(doc.reaction_conditions);
    const filmProperties = asRecord(doc.film_properties);
    const characterization = asRecord(doc.characterization);

    return {
        id: asString(doc.id),
        label: asString(doc.label),
        pdf_url: typeof doc.pdf_url === "string" ? doc.pdf_url : undefined,
        summary: {
            ...DEFAULT_PAPER.summary,
            target_material: asString(summary.target_material),
            process_type: asString(summary.process_type),
            main_precursors: asStringArray(summary.main_precursors),
            temperature_range: asString(summary.temperature_range),
            summary: asString(summary.summary),
            evidence: asString(summary.evidence),
        },
        target_material: {
            ...DEFAULT_PAPER.target_material,
            target_material: {
                ...DEFAULT_PAPER.target_material.target_material,
                chemical_formula: asString(targetMaterial.chemical_formula),
                material_name: asString(targetMaterial.material_name),
                material_class: asString(targetMaterial.material_class),
            },
            evidence: asString(targetMaterialDoc.evidence),
        },
        substrate_info: {
            ...DEFAULT_PAPER.substrate_info,
            substrate_material: asString(substrateInfo.substrate_material),
            substrate_orientation: asString(substrateInfo.substrate_orientation),
            pretreatment: asString(substrateInfo.pretreatment),
            surface_functionalization: asString(substrateInfo.surface_functionalization),
            evidence: asString(substrateInfo.evidence),
        },
        deposition_conditions: {
            ...DEFAULT_PAPER.deposition_conditions,
            deposition_temperature_C: asNullableNumber(depositionConditions.deposition_temperature_C),
            pressure: asNullableString(depositionConditions.pressure),
            precursor_pulse_time_s: asNullableNumber(depositionConditions.precursor_pulse_time_s),
            coreactant_pulse_time_s: asNullableNumber(depositionConditions.coreactant_pulse_time_s),
            purge_time_s: asNullableNumber(depositionConditions.purge_time_s),
            number_of_cycles: asNullableNumber(depositionConditions.number_of_cycles),
            reactor_type: asNullableString(depositionConditions.reactor_type),
            evidence: asString(depositionConditions.evidence),
        },
        precursor_coreactant: {
            ...DEFAULT_PAPER.precursor_coreactant,
            precursors: normalizeChemicalList(precursorCoreactant.precursors),
            coreactants: normalizeChemicalList(precursorCoreactant.coreactants),
            purge_gas: normalizeChemicalList(precursorCoreactant.purge_gas),
            carrier_gas: normalizeChemicalList(precursorCoreactant.carrier_gas),
            evidence: asString(precursorCoreactant.evidence),
        },
        reaction_conditions: {
            ...DEFAULT_PAPER.reaction_conditions,
            surface_mechanism_description: asString(reactionConditions.surface_mechanism_description),
            reaction_equations: asStringArray(reactionConditions.reaction_equations),
            intermediate_species: asStringArray(reactionConditions.intermediate_species),
            evidence: asString(reactionConditions.evidence),
        },
        film_properties: {
            ...DEFAULT_PAPER.film_properties,
            film_thickness_nm: asNullableNumber(filmProperties.film_thickness_nm),
            density_g_cm3: asNullableNumber(filmProperties.density_g_cm3),
            refractive_index: asNullableNumber(filmProperties.refractive_index),
            surface_roughness_nm: asNullableNumber(filmProperties.surface_roughness_nm),
            crystal_phase: asNullableString(filmProperties.crystal_phase),
            evidence: asString(filmProperties.evidence),
        },
        characterization: {
            ...DEFAULT_PAPER.characterization,
            characterization_methods: asStringArray(characterization.characterization_methods),
            evidence: asString(characterization.evidence),
        },
    };
}

function truncateText(value: string, maxLength: number) {
    if (value.length <= maxLength) {
        return value;
    }

    return `${value.slice(0, maxLength).trimEnd()}...`;
}

function toCatalogPaper(doc: unknown): PaperData {
    const paper = normalizePaper(doc);

    return {
        ...paper,
        summary: {
            ...paper.summary,
            summary: truncateText(paper.summary.summary, CATALOG_SUMMARY_MAX_LENGTH),
            evidence: "",
        },
        target_material: {
            ...paper.target_material,
            evidence: "",
        },
        substrate_info: {
            ...paper.substrate_info,
            evidence: "",
        },
        deposition_conditions: {
            ...paper.deposition_conditions,
            evidence: "",
        },
        precursor_coreactant: {
            ...paper.precursor_coreactant,
            evidence: "",
        },
        reaction_conditions: {
            ...paper.reaction_conditions,
            evidence: "",
        },
        film_properties: {
            ...paper.film_properties,
            evidence: "",
        },
        characterization: {
            ...paper.characterization,
            evidence: "",
        },
    };
}

function toDetailPaper(doc: unknown): PaperData {
    const paper = normalizePaper(doc);

    return {
        ...paper,
        summary: {
            ...paper.summary,
            evidence: truncateText(paper.summary.evidence, DETAIL_EVIDENCE_MAX_LENGTH),
        },
        target_material: {
            ...paper.target_material,
            evidence: truncateText(paper.target_material.evidence, DETAIL_EVIDENCE_MAX_LENGTH),
        },
        substrate_info: {
            ...paper.substrate_info,
            evidence: truncateText(paper.substrate_info.evidence, DETAIL_EVIDENCE_MAX_LENGTH),
        },
        deposition_conditions: {
            ...paper.deposition_conditions,
            evidence: truncateText(paper.deposition_conditions.evidence, DETAIL_EVIDENCE_MAX_LENGTH),
        },
        precursor_coreactant: {
            ...paper.precursor_coreactant,
            evidence: truncateText(paper.precursor_coreactant.evidence, DETAIL_EVIDENCE_MAX_LENGTH),
        },
        reaction_conditions: {
            ...paper.reaction_conditions,
            evidence: truncateText(paper.reaction_conditions.evidence, DETAIL_EVIDENCE_MAX_LENGTH),
        },
        film_properties: {
            ...paper.film_properties,
            evidence: truncateText(paper.film_properties.evidence, DETAIL_EVIDENCE_MAX_LENGTH),
        },
        characterization: {
            ...paper.characterization,
            evidence: truncateText(paper.characterization.evidence, DETAIL_EVIDENCE_MAX_LENGTH),
        },
    };
}

const uri = process.env.MONGODB_URI || "";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db("ALD_Data");
    cachedClient = client;
    cachedDb = db;
    return { client, db };
}

export async function getCatalogPapers(): Promise<PaperData[]> {
    if (!uri) {
        console.error("MONGODB_URI is not set!");
        return [];
    }

    try {
        const { db } = await connectToDatabase();
        const collection = db.collection("Papers");

        const papers = await collection
            .find({}, { projection: CATALOG_PROJECTION })
            .collation({ locale: "en", numericOrdering: true })
            .sort({ id: 1 })
            .toArray();

        return papers.map(toCatalogPaper);
    } catch (err) {
        console.error("Failed to fetch papers from MongoDB", err);
        return [];
    }
}

export async function getPaperById(id: string): Promise<PaperData | null> {
    if (!uri) {
        console.error("MONGODB_URI is not set!");
        return null;
    }

    try {
        const { db } = await connectToDatabase();
        const collection = db.collection("Papers");
        const doc = await collection.findOne({ id }, { projection: { _id: 0 } });

        if (!doc) {
            return null;
        }

        return toDetailPaper(doc);
    } catch (err) {
        console.error(`Failed to fetch paper ${id} from MongoDB`, err);
        return null;
    }
}
