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
            return paperData as PaperData;
        });
    } catch (err) {
        console.error("Failed to fetch papers from MongoDB", err);
        return [];
    }
}
