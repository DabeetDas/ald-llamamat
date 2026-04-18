const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const DEFAULT_SUMMARY = {
    target_material: "N/A",
    process_type: "N/A",
    main_precursors: [],
    temperature_range: "N/A",
    summary: "",
    evidence: "",
};

const DEFAULT_TARGET_MATERIAL = {
    target_material: {
        chemical_formula: "",
        material_name: "",
        material_class: "",
    },
    evidence: "",
};

const DEFAULT_SUBSTRATE_INFO = {
    substrate_material: "",
    substrate_orientation: "",
    pretreatment: "",
    surface_functionalization: "",
    evidence: "",
};

const DEFAULT_DEPOSITION_CONDITIONS = {
    deposition_temperature_C: null,
    pressure: null,
    precursor_pulse_time_s: null,
    coreactant_pulse_time_s: null,
    purge_time_s: null,
    number_of_cycles: null,
    reactor_type: null,
    evidence: "",
};

const DEFAULT_PRECURSOR_COREACTANT = {
    precursors: [],
    coreactants: [],
    purge_gas: [],
    carrier_gas: [],
    evidence: "",
};

const DEFAULT_REACTION_CONDITIONS = {
    reaction_equations: [],
    surface_mechanism_description: "",
    intermediate_species: [],
    evidence: "",
};

const DEFAULT_FILM_PROPERTIES = {
    film_thickness_nm: null,
    density_g_cm3: null,
    refractive_index: null,
    surface_roughness_nm: null,
    crystal_phase: null,
    evidence: "",
};

const DEFAULT_CHARACTERIZATION = {
    characterization_methods: [],
    evidence: "",
};

function safeJsonParse(filePath, defaultFallback) {
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        return defaultFallback;
    }
}

function asObject(value) {
    return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function asString(value, fallback = "") {
    return typeof value === "string" ? value : fallback;
}

function asStringArray(value) {
    return Array.isArray(value) ? value.filter(item => typeof item === "string") : [];
}

function normalizeChemicalList(value) {
    if (!Array.isArray(value)) {
        return [];
    }

    return value
        .map((item) => {
            if (typeof item === "string") {
                return { abbreviation: item, full_name: item };
            }

            if (item && typeof item === "object") {
                return {
                    abbreviation: asString(item.abbreviation),
                    full_name: asString(item.full_name, asString(item.abbreviation)),
                };
            }

            return null;
        })
        .filter(Boolean);
}

function normalizeSummary(value) {
    if (Array.isArray(value)) {
        return {
            ...DEFAULT_SUMMARY,
            main_precursors: asStringArray(value),
        };
    }

    const summary = asObject(value);
    return {
        ...DEFAULT_SUMMARY,
        ...summary,
        target_material: asString(summary.target_material, DEFAULT_SUMMARY.target_material),
        process_type: asString(summary.process_type, DEFAULT_SUMMARY.process_type),
        main_precursors: asStringArray(summary.main_precursors),
        temperature_range: asString(summary.temperature_range, DEFAULT_SUMMARY.temperature_range),
        summary: asString(summary.summary),
        evidence: asString(summary.evidence),
    };
}

function normalizeTargetMaterial(value) {
    const targetMaterialDoc = asObject(value);
    const targetMaterial = asObject(targetMaterialDoc.target_material);

    return {
        ...DEFAULT_TARGET_MATERIAL,
        ...targetMaterialDoc,
        target_material: {
            ...DEFAULT_TARGET_MATERIAL.target_material,
            ...targetMaterial,
            chemical_formula: asString(targetMaterial.chemical_formula),
            material_name: asString(targetMaterial.material_name),
            material_class: asString(targetMaterial.material_class),
        },
        evidence: asString(targetMaterialDoc.evidence),
    };
}

function normalizeCharacterization(value) {
    if (Array.isArray(value)) {
        return {
            ...DEFAULT_CHARACTERIZATION,
            characterization_methods: asStringArray(value),
        };
    }

    const characterization = asObject(value);
    return {
        ...DEFAULT_CHARACTERIZATION,
        ...characterization,
        characterization_methods: asStringArray(characterization.characterization_methods),
        evidence: asString(characterization.evidence),
    };
}

function normalizePaperSections(paperDir) {
    const summary = normalizeSummary(
        safeJsonParse(path.join(paperDir, "summary.json"), DEFAULT_SUMMARY)
    );
    const target_material = normalizeTargetMaterial(
        safeJsonParse(path.join(paperDir, "target_material.json"), DEFAULT_TARGET_MATERIAL)
    );
    const substrate_info = {
        ...DEFAULT_SUBSTRATE_INFO,
        ...asObject(safeJsonParse(path.join(paperDir, "substrate_info.json"), DEFAULT_SUBSTRATE_INFO)),
    };
    const deposition_conditions = {
        ...DEFAULT_DEPOSITION_CONDITIONS,
        ...asObject(safeJsonParse(path.join(paperDir, "deposition_conditions.json"), DEFAULT_DEPOSITION_CONDITIONS)),
    };
    const precursor_coreactantRaw = asObject(
        safeJsonParse(path.join(paperDir, "precursor_coreactant.json"), DEFAULT_PRECURSOR_COREACTANT)
    );
    const precursor_coreactant = {
        ...DEFAULT_PRECURSOR_COREACTANT,
        ...precursor_coreactantRaw,
        precursors: normalizeChemicalList(precursor_coreactantRaw.precursors),
        coreactants: normalizeChemicalList(precursor_coreactantRaw.coreactants),
        purge_gas: normalizeChemicalList(precursor_coreactantRaw.purge_gas),
        carrier_gas: normalizeChemicalList(precursor_coreactantRaw.carrier_gas),
    };
    const reaction_conditionsRaw = asObject(
        safeJsonParse(path.join(paperDir, "reaction_conditions.json"), DEFAULT_REACTION_CONDITIONS)
    );
    const reaction_conditions = {
        ...DEFAULT_REACTION_CONDITIONS,
        ...reaction_conditionsRaw,
        reaction_equations: asStringArray(reaction_conditionsRaw.reaction_equations),
        intermediate_species: asStringArray(reaction_conditionsRaw.intermediate_species),
    };
    const film_properties = {
        ...DEFAULT_FILM_PROPERTIES,
        ...asObject(safeJsonParse(path.join(paperDir, "film_properties.json"), DEFAULT_FILM_PROPERTIES)),
    };
    const characterization = normalizeCharacterization(
        safeJsonParse(path.join(paperDir, "characterization.json"), DEFAULT_CHARACTERIZATION)
    );

    return {
        summary,
        target_material,
        substrate_info,
        deposition_conditions,
        precursor_coreactant,
        reaction_conditions,
        film_properties,
        characterization,
    };
}

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const db = client.db("ALD_Data");
        const collection = db.collection("Papers");

        await collection.deleteMany({});
        console.log("Cleared existing collection.");

        const extractedDataDir = path.join(process.cwd(), "..", "extracted_data");
        const dirs = fs.readdirSync(extractedDataDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory() && dirent.name.startsWith("paper"))
            .map(dirent => dirent.name);

        console.log(`Found ${dirs.length} papers in extracted_data. Parsing...`);

        const papers = [];
        for (const dirName of dirs) {
            const paperDir = path.join(extractedDataDir, dirName);
            const {
                summary,
                target_material,
                substrate_info,
                deposition_conditions,
                precursor_coreactant,
                reaction_conditions,
                film_properties,
                characterization,
            } = normalizePaperSections(paperDir);

            const formula =
                target_material.target_material.chemical_formula ||
                target_material.target_material.material_name ||
                summary.target_material ||
                "Unknown";
            const processType = summary.process_type || "CVD/ALD";

            papers.push({
                id: dirName,
                label: `${dirName.toUpperCase()} \u2014 ${formula} via ${processType}`,
                summary,
                target_material,
                substrate_info,
                deposition_conditions,
                precursor_coreactant,
                reaction_conditions,
                film_properties,
                characterization
            });
        }

        console.log(`Inserting ${papers.length} records into MongoDB in chunks of 500...`);
        const chunk = 500;
        let inserted = 0;
        for (let i = 0; i < papers.length; i += chunk) {
            const batch = papers.slice(i, i + chunk);
            const res = await collection.insertMany(batch);
            inserted += res.insertedCount;
            console.log(`Inserted ${inserted} / ${papers.length}`);
        }
        console.log(`Successfully completed insertion!`);
    } catch (err) {
        console.error("Migration failed:", err);
    } finally {
        await client.close();
        console.log("Disconnected.");
    }
}

run();
