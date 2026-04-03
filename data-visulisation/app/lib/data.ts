// Types for ALD extracted data
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
}

// Sample data from extracted_data/paper1
export const papers: PaperData[] = [
    {
        id: "paper1",
        label: "Paper 1 — TiO₂ via LPCVD",
        summary: {
            target_material: "Titanium dioxide",
            process_type: "Low Pressure CVD (LPCVD)",
            main_precursors: ["Tetranitratotitanium(IV) (TNT)"],
            temperature_range: "184-330 °C",
            summary:
                "Low Temperature CVD of Crystalline Titanium Dioxide Films Using Tetranitratotitanium(IV)",
            evidence:
                "The continuing push to decrease the size of microelectronic devices is hampered by some of the physical properties of the current materials. Silicon dioxide is currently used as the gate dielectric in metal oxide semiconductor field effect transistors (MOSFETs), and operation of this device requires that the thickness of the dielectric be scaled along with the length of the gate between the source and drain.",
        },
        target_material: {
            target_material: {
                chemical_formula: "TiO2",
                material_name: "Titanium dioxide",
                material_class: "Oxide",
            },
            evidence:
                "The composition of all films was TiO2.0–0.1 as measured by RBS.",
        },
        substrate_info: {
            substrate_material: "Silicon",
            substrate_orientation: "",
            pretreatment:
                "Hydrogen-terminated, single crystalline p-Si(100)",
            surface_functionalization: "",
            evidence:
                "The 2 inch, circular substrates were hydrogen-terminated, single crystalline p-Si(100), with resistivity r = 1 to 10 Ω cm, maintained at temperatures ranging from 230 to 330 °C.",
        },
        deposition_conditions: {
            deposition_temperature_C: 184,
            pressure: "1 torr",
            precursor_pulse_time_s: null,
            coreactant_pulse_time_s: null,
            purge_time_s: null,
            number_of_cycles: null,
            reactor_type: "UHV-CVD reactor",
            evidence:
                "The large-grain morphology, especially evident in the UHV-CVD-grown films, was further verified by cross-sectional transmission electron microscopy (TEM) as shown in Figure 3. Also evident is an amorphous region, approximately 2 nm in thickness, at the interface between silicon and the TiO2. This appears to be silicon oxide or a mixture of silicon and titanium oxide, but attempts to determine its exact composition using energy dispersive X-ray (EDX) analysis and RBS were precluded by its limited thickness.",
        },
        precursor_coreactant: {
            precursors: [
                { abbreviation: "TNT", full_name: "Tetranitratotitanium(IV)" },
            ],
            coreactants: [
                { abbreviation: "H₂O", full_name: "Water" },
                { abbreviation: "O₂", full_name: "Oxygen" },
            ],
            purge_gas: [{ abbreviation: "Ar", full_name: "Argon" }],
            carrier_gas: [{ abbreviation: "Ar", full_name: "Argon" }],
            evidence:
                "Ultra high purity (99.998 %) Ar was used as the carrier gas at a flow rate of 60 sccm.",
        },
        reaction_conditions: {
            reaction_equations: [],
            surface_mechanism_description:
                "Ligand exchange between TMA and surface hydroxyl groups followed by water pulse to regenerate OH sites",
            intermediate_species: [],
            evidence:
                "The large-grain morphology, especially evident in the UHV-CVD-grown films, was further verified by cross-sectional transmission electron microscopy (TEM) as shown in Figure 3. Also evident is an amorphous region, approximately 2 nm in thickness, at the interface between silicon and the TiO2. This appears to be silicon oxide or a mixture of silicon and titanium oxide, but attempts to determine its exact composition using energy dispersive X-ray (EDX) analysis and RBS were precluded by its limited thickness.",
        },
        film_properties: {
            film_thickness_nm: null,
            density_g_cm3: null,
            refractive_index: null,
            surface_roughness_nm: null,
            crystal_phase: "Anatase",
            evidence:
                "X-ray diffraction (XRD) established that even those films grown at 184 °C by UHV-CVD (Fig. 2) were polycrystalline TiO2 with the structure of the anatase phase.",
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
                "C-V measurement",
            ],
            evidence:
                "The composition of all films was TiO2.0–0.1 as measured by RBS. No evidence for the presence of nitrogen was found using particle-induced X-ray emission (PIXE) or Auger electron spectroscopy. X-ray diffraction (XRD) established that even those films grown at 184 °C by UHV-CVD (Fig. 2) were polycrystalline TiO2 with the structure of the anatase phase. Atomic force microscopy (AFM) indicated the root mean square (rms) roughness for as-deposited, LPCVD-grown, 10–35 nm thick films was 0.12–0.15 nm and the average grain diameter for a 35 nm thick film was approximately 500 nm.",
        },
    },
];
