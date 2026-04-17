import fs from "fs";
import path from "path";
import { MongoClient } from "mongodb";

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

function normalizePaper(doc: any): PaperData {
    return {
        ...DEFAULT_PAPER,
        ...doc,
        summary: {
            ...DEFAULT_PAPER.summary,
            ...(doc.summary ?? {}),
            main_precursors: asStringArray(doc.summary?.main_precursors),
        },
        target_material: {
            ...DEFAULT_PAPER.target_material,
            ...(doc.target_material ?? {}),
            target_material: {
                ...DEFAULT_PAPER.target_material.target_material,
                ...(doc.target_material?.target_material ?? {}),
            },
        },
        substrate_info: {
            ...DEFAULT_PAPER.substrate_info,
            ...(doc.substrate_info ?? {}),
        },
        deposition_conditions: {
            ...DEFAULT_PAPER.deposition_conditions,
            ...(doc.deposition_conditions ?? {}),
        },
        precursor_coreactant: {
            ...DEFAULT_PAPER.precursor_coreactant,
            ...(doc.precursor_coreactant ?? {}),
            precursors: normalizeChemicalList(doc.precursor_coreactant?.precursors),
            coreactants: normalizeChemicalList(doc.precursor_coreactant?.coreactants),
            purge_gas: normalizeChemicalList(doc.precursor_coreactant?.purge_gas),
            carrier_gas: normalizeChemicalList(doc.precursor_coreactant?.carrier_gas),
        },
        reaction_conditions: {
            ...DEFAULT_PAPER.reaction_conditions,
            ...(doc.reaction_conditions ?? {}),
            reaction_equations: asStringArray(doc.reaction_conditions?.reaction_equations),
            intermediate_species: asStringArray(doc.reaction_conditions?.intermediate_species),
        },
        film_properties: {
            ...DEFAULT_PAPER.film_properties,
            ...(doc.film_properties ?? {}),
        },
        characterization: {
            ...DEFAULT_PAPER.characterization,
            ...(doc.characterization ?? {}),
            characterization_methods: asStringArray(doc.characterization?.characterization_methods),
        },
    };
}

const uri = process.env.MONGODB_URI || "";

let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

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

export async function getAllPapers(): Promise<PaperData[]> {
    if (!uri) {
        console.error("MONGODB_URI is not set!");
        return [];
    }

    try {
        const { db } = await connectToDatabase();
        const collection = db.collection("Papers");

        // Fetch all documents. Sort by 'id' appropriately
        const papers = await collection.find({}).collation({ locale: "en", numericOrdering: true }).sort({ id: 1 }).toArray();

        // Remove the internal _id so it can be serialized easily by Next.js Server Components
        return papers.map((doc: any) => {
            const { _id, ...paperData } = doc;
            return normalizePaper(paperData);
        });
    } catch (err) {
        console.error("Failed to fetch papers from MongoDB", err);
        return [];
    }
}
