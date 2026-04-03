const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI || "mongodb+srv://dabeetdas10_db_user:W7OMXQvzQR8YamPc@cluster0.gkwmwcg.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

function safeJsonParse(filePath, defaultFallback) {
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        return defaultFallback;
    }
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

            const summary = safeJsonParse(path.join(paperDir, "summary.json"), { target_material: "N/A", process_type: "N/A", main_precursors: [], temperature_range: "N/A", summary: "", evidence: "" });
            const target_material = safeJsonParse(path.join(paperDir, "target_material.json"), { target_material: { chemical_formula: "", material_name: "", material_class: "" }, evidence: "" });
            const substrate_info = safeJsonParse(path.join(paperDir, "substrate_info.json"), { substrate_material: "", substrate_orientation: "", pretreatment: "", surface_functionalization: "", evidence: "" });
            const deposition_conditions = safeJsonParse(path.join(paperDir, "deposition_conditions.json"), { deposition_temperature_C: null, pressure: null, precursor_pulse_time_s: null, coreactant_pulse_time_s: null, purge_time_s: null, number_of_cycles: null, reactor_type: null, evidence: "" });
            const precursor_coreactant = safeJsonParse(path.join(paperDir, "precursor_coreactant.json"), { precursors: [], coreactants: [], purge_gas: [], carrier_gas: [], evidence: "" });
            const reaction_conditions = safeJsonParse(path.join(paperDir, "reaction_conditions.json"), { reaction_equations: [], surface_mechanism_description: "", intermediate_species: [], evidence: "" });
            const film_properties = safeJsonParse(path.join(paperDir, "film_properties.json"), { film_thickness_nm: null, density_g_cm3: null, refractive_index: null, surface_roughness_nm: null, crystal_phase: null, evidence: "" });
            const characterization = safeJsonParse(path.join(paperDir, "characterization.json"), { characterization_methods: [], evidence: "" });

            papers.push({
                id: dirName,
                label: `${dirName.toUpperCase()} \u2014 ${target_material.target_material.chemical_formula || "Unknown"} via ${summary.process_type || "CVD/ALD"}`,
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
