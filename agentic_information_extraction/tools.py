import json
import re
import json5
import ast
from typing import List
from langchain_core.prompts import PromptTemplate

def robust_json_parse(text: str) -> dict:
    """Tries multiple strategies to recover valid JSON from LLM output."""
    if hasattr(text, "content"):
        text = text.content

    # Strip Markdown formatting
    text = text.strip().removeprefix("```json").removesuffix("```").strip()

    # Try to extract first complete JSON object or array
    match = re.search(r'(\{.*\}|\[.*\])', text, re.DOTALL)
    if match:
        text = match.group(1)

    # Clean trailing commas
    text = re.sub(r',\s*([\]}])', r'\1', text)

    # Replace invalid constructs
    text = text.replace("None", "null")
    text = text.replace("'", '"')

    # Try standard JSON parse
    try:
        return json.loads(text)
    except:
        pass

    # Try JSON5
    try:
        return json5.loads(text)
    except:
        pass

    # Try Python literal eval (if it looks like a dict)
    try:
        return ast.literal_eval(text)
    except Exception as e:
        print("❌ JSON parse failed completely:", e)
        return {"materials": []}


# === Tool 1: Read fulltext ===
def read_fulltext(file_path: str) -> str:
    with open(file_path, "r", encoding="utf-8") as f:
        return f.read()

def summariser_agent(fulltext:str,llm) -> List[str]:
    prompt = PromptTemplate.from_template("""
    You are a materials science expert specializing in Atomic Layer Deposition (ALD).

Your task is to extract structured scientific information from the provided research paper text.

Rules:
1. Only extract information explicitly supported by the text.
2. If information is missing, return null.
3. Do not infer or hallucinate values.
4. Include the exact evidence sentence from the paper when possible.
5. Return output strictly in JSON format.
6. Use standard scientific units where possible.

Task: Extract a concise summary of the Atomic Layer Deposition (ALD) process described in the text.

Focus on:
- material deposited
- main precursors
- process type (thermal ALD or PEALD)
- key temperature range
- purpose of the study

Output JSON schema:

{{
  "target_material": "",
  "process_type": "",
  "main_precursors": [],
  "temperature_range": "",
  "summary": "",
  "evidence": ""
}}

Text:
```{fulltext}```
""")
    output = llm.invoke(prompt.format(fulltext=fulltext))
    return robust_json_parse(output.content)


def target_materials_agent(fulltext:str,llm) -> List[str]:
    prompt = PromptTemplate.from_template("""
    You are a materials science expert specializing in Atomic Layer Deposition (ALD).

Your task is to extract structured scientific information from the provided research paper text.

Rules:
1. Only extract information explicitly supported by the text.
2. If information is missing, return null.
3. Do not infer or hallucinate values.
4. Include the exact evidence sentence from the paper when possible.
5. Return output strictly in JSON format.
6. Use standard scientific units where possible.

Identify the primary material deposited using Atomic Layer Deposition. Ignore substrates, precursors, or reactor components. Focus ONLY on the primary target film being synthesized or studied.

Extract the following information:
- chemical_formula: The stoichiometric or chemical formula of the deposited material (e.g., "Al2O3", "TiO2"). If not explicitly stated, infer it only if the common name makes it chemically unambiguous. Otherwise, return null.
- material_name: The common English name of the material (e.g., "Aluminum oxide", "Titanium dioxide").
- material_class: The broad classification of the deposited material (e.g., "Oxide", "Nitride", "Pure Metal", "Sulfide", "2D Material"). 
- evidence: A direct, exact quote from the text that justifies your extraction.

Output JSON:

{{
  "target_material": {{
    "chemical_formula": "",
    "material_name": "",
    "material_class": ""
  }},
  "evidence": ""
}}

Text:
```{fulltext}```
""")
    output = llm.invoke(prompt.format(fulltext=fulltext))
    return robust_json_parse(output.content)


def precurosr_coreactant_purge_agent(fulltext:str,llm) -> List[str]:
    prompt = PromptTemplate.from_template("""
    You are a materials science expert specializing in Atomic Layer Deposition (ALD).

Your task is to extract structured scientific information from the provided research paper text.

Rules:
1. Only extract information explicitly supported by the text.
2. If information is missing, return null.
3. Do not infer or hallucinate values.
4. Include the exact evidence sentence from the paper when possible.
5. Return output strictly in JSON format.
6. Use standard scientific units where possible.

Extract the specific chemical inputs used during the Atomic Layer Deposition (ALD) process. 

Follow these strict definitions for extraction:
- precursors: The primary metal, semiconductor, or organometallic sources (e.g., "TMA", "TiCl4", "Diethylzinc"). Include both the abbreviation and full name if both are present.
- coreactants: The secondary reactants used to complete the surface reaction (e.g., "H2O", "O3", "NH3 plasma"). 
- purge_gas: The inert gas used to evacuate the chamber between reactant pulses (e.g., "Ar", "N2").
- carrier_gas: The inert gas used to transport the precursor into the chamber. (Note: This is often the same as the purge gas, but only list it here if explicitly described as a carrier).

Rules:
1. If a specific input type is not explicitly mentioned in the text, return an empty list `[]`. Do not guess or infer based on standard ALD processes.
2. If multiple precursors or co-reactants are used (e.g., in nanolaminates or doped films), list all of them.
3. Provide a single, exact quote from the text in the "evidence" field that justifies your selections.

Return the result STRICTLY as a valid JSON object matching the exact structure below. Do not include markdown formatting or conversational text.

{{
  "precursors": [],
  "coreactants": [],
  "purge_gas": [],
  "carrier_gas": [],
  "evidence": ""
}}

Text:
```{fulltext}```
""")
    output = llm.invoke(prompt.format(fulltext=fulltext))
    return robust_json_parse(output.content)

def deposition_conditions_agent(fulltext:str,llm) -> List[str]:
    prompt = PromptTemplate.from_template("""
    You are a materials science expert specializing in Atomic Layer Deposition (ALD).

Your task is to extract structured scientific information from the provided research paper text.

Rules:
1. Only extract information explicitly supported by the text.
2. If information is missing, return null.
3. Do not infer or hallucinate values.
4. Include the exact evidence sentence from the paper when possible.
5. Return output strictly in JSON format.
6. Use standard scientific units where possible.

Extract the specific Atomic Layer Deposition (ALD) process parameters from the provided text. 

Extraction Rules:
1. Numerical Values: Extract only the number for fields ending in "_s" (seconds) or "_C" (Celsius). If a range is provided (e.g., "250-300°C"), represent it as a string "250-300".
2. Timing Sequences: If the text provides a sequence like (0.1/5/0.1/5 s), map them correctly: 
   - precursor_pulse_time_s = 0.1
   - coreactant_pulse_time_s = 0.1
   - purge_time_s = 5
3. Reactor Type: Identify the specific tool or reactor geometry (e.g., "F-120", "Cambridge NanoTech Savannah", "Cross-flow", "Showerhead", "Spatial ALD").
4. Null Handling: If a parameter is not explicitly mentioned, return `null` for numerical fields and an empty string `""` for text fields. Do not assume "standard" conditions.
5. Evidence: Provide a direct, unedited quote from the text that contains these parameters.

Return the result STRICTLY as a valid JSON object. Do not include markdown headers or conversational filler.

{{
 "deposition_temperature_C": null,
 "pressure": "",
 "precursor_pulse_time_s": null,
 "coreactant_pulse_time_s": null,
 "purge_time_s": null,
 "number_of_cycles": null,
 "reactor_type": "",
 "evidence": ""
}}

Text:
```{fulltext}```

""")
    output = llm.invoke(prompt.format(fulltext=fulltext))
    return robust_json_parse(output.content)


def reaction_conditions_agent(fulltext:str,llm) -> List[str]:
    prompt = PromptTemplate.from_template("""
    You are a materials science expert specializing in Atomic Layer Deposition (ALD).

Your task is to extract structured scientific information from the provided research paper text.

Rules:
1. Only extract information explicitly supported by the text.
2. If information is missing, return null.
3. Do not infer or hallucinate values.
4. Include the exact evidence sentence from the paper when possible.
5. Return output strictly in JSON format.
6. Use standard scientific units where possible.

Analyze the provided text to extract the Atomic Layer Deposition (ALD) surface reaction mechanism and its associated chemistry.

Extraction Guidelines:
1. reaction_equations: Extract all formal chemical equations representing the surface reactions. Use standard chemical notation (e.g., "Si-OH + Al(CH3)3 -> Si-O-Al(CH3)2 + CH4"). Represent surface species with an asterisk or "s" suffix if present in text (e.g., Al-OH*).
2. surface_mechanism_description: Provide a concise summary of the reaction steps as described by the authors (e.g., "Ligand exchange between TMA and surface hydroxyl groups followed by water pulse to regenerate OH sites").
3. intermediate_species: Identify specific transient chemical species formed on the surface during the pulse and purge cycles (e.g., "monomethyl aluminum", "surface hydroxyls", "formate species").
4. Evidence: Provide the exact excerpt from the text where these reactions or mechanisms are discussed.

Rules:
- If no formal equations are provided, return an empty list `[]` for "reaction_equations".
- Maintain the original chemical stoichiometry as written in the text.
- Do not include conversational filler or markdown outside the JSON block.

Return the result STRICTLY as a valid JSON object:

{{
 "reaction_equations": [],
 "surface_mechanism_description": "",
 "intermediate_species": [],
 "evidence": ""
}}

Text:
```{fulltext}```

""")
    output = llm.invoke(prompt.format(fulltext=fulltext))
    return robust_json_parse(output.content)

def reaction_kinetics_agent(fulltext:str,llm) -> List[str]:
    prompt = PromptTemplate.from_template("""
    You are a materials science expert specializing in Atomic Layer Deposition (ALD).

Your task is to extract structured scientific information from the provided research paper text.

Rules:
1. Only extract information explicitly supported by the text.
2. If information is missing, return null.
3. Do not infer or hallucinate values.
4. Include the exact evidence sentence from the paper when possible.
5. Return output strictly in JSON format.
6. Use standard scientific units where possible.

Analyze the provided text to extract kinetic and thermodynamic data related to the Atomic Layer Deposition (ALD) growth mechanism.

Extraction Guidelines:
1. activation_energy_eV: Extract the numerical value in electron volts (eV). If the text provides it in kJ/mol, do not convert it to eV, keep the original units and label them (e.g., "0.5 eV" or "48 kJ/mol"). Return null if not mentioned.
2. rate_limiting_step: Identify the specific physical or chemical bottleneck (e.g., "precursor diffusion," "ligand exchange," "surface site dehydroxylation," or "steric hindrance"). 
3. saturation_behavior: Describe how the growth per cycle (GPC) responds to precursor exposure (e.g., "Saturation reached at 0.5 s pulse," "Soft saturation observed," or "Non-saturating behavior due to thermal decomposition").
4. kinetic_model: Identify any specific theoretical framework used by the authors (e.g., "First-order kinetics," "Langmuir-Hinshelwood," "Monte Carlo simulation," or "Arrhenius analysis").
5. Evidence: Provide the exact, unedited quote from the text that describes these kinetic parameters.

Rules:
- For numerical fields, if a value is not found, return null. 
- For string fields, if not mentioned, return an empty string "".
- Do not include markdown headers or conversational text outside the JSON block.

Return the result STRICTLY as a valid JSON object:

{{
 "activation_energy_eV": null,
 "rate_limiting_step": "",
 "saturation_behavior": "",
 "kinetic_model": "",
 "evidence": ""
}}

Text:
```{fulltext}```

""")
    output = llm.invoke(prompt.format(fulltext=fulltext))
    return robust_json_parse(output.content)

def reaction_thermodynamics_agent(fulltext:str,llm) -> List[str]:
    prompt = PromptTemplate.from_template("""
    You are a materials science expert specializing in Atomic Layer Deposition (ALD).

Your task is to extract structured scientific information from the provided research paper text.

Rules:
1. Only extract information explicitly supported by the text.
2. If information is missing, return null.
3. Do not infer or hallucinate values.
4. Include the exact evidence sentence from the paper when possible.
5. Return output strictly in JSON format.
6. Use standard scientific units where possible.

Analyze the provided text to extract thermodynamic parameters associated with the Atomic Layer Deposition (ALD) reactions.

Extraction Guidelines:
1. reaction_enthalpy: Extract the enthalpy change (ΔH) for the overall reaction or specific half-cycles. Include units (e.g., "-1.2 eV", "-150 kJ/mol"). If multiple values exist (e.g., for different precursors), list them clearly.
2. gibbs_free_energy: Extract the Gibbs free energy change (ΔG). This is the primary indicator of reaction spontaneity. Include units and indicate the temperature if specified (e.g., "-0.8 eV at 300°C").
3. thermodynamic_notes: Summarize key findings regarding:
   - Stability conditions (e.g., "Precursor decomposes above 350°C").
   - Thermodynamic modeling used (e.g., "DFT calculations using B3LYP functional").
   - Predominant gas-phase or surface-phase equilibria.
4. Evidence: Provide the exact, unedited quote from the text that contains these thermodynamic values or descriptions.

Rules:
- If a value is not mentioned, return null for that field.
- Do not perform unit conversions unless explicitly requested; preserve the author's original units.
- Focus on the primary deposition chemistry, not the substrate stability, unless the substrate reaction is the core focus.

Return the result STRICTLY as a valid JSON object:

{{
 "reaction_enthalpy": null,
 "gibbs_free_energy": null,
 "thermodynamic_notes": "",
 "evidence": ""
}}

Text:
```{fulltext}```

""")
    output = llm.invoke(prompt.format(fulltext=fulltext))
    return robust_json_parse(output.content)

def substrate_information_agent(fulltext:str,llm) -> List[str]:
    prompt = PromptTemplate.from_template("""
    You are a materials science expert specializing in Atomic Layer Deposition (ALD).

Your task is to extract structured scientific information from the provided research paper text.

Rules:
1. Only extract information explicitly supported by the text.
2. If information is missing, return null.
3. Do not infer or hallucinate values.
4. Include the exact evidence sentence from the paper when possible.
5. Return output strictly in JSON format.
6. Use standard scientific units where possible.

Analyze the provided text to extract information regarding the substrate used for the Atomic Layer Deposition (ALD) process.

Extraction Guidelines:
1. substrate_material: Identify the base material (e.g., "Silicon", "Glass", "Sapphire", "PET", "FTO-coated glass"). 
2. substrate_orientation: Extract the crystallographic orientation or Miller indices if provided (e.g., "<100>", "(111)", "c-plane"). Return an empty string if the material is amorphous or not specified.
3. pretreatment: Identify any cleaning or preparation steps performed BEFORE deposition (e.g., "RCA cleaning", "HF dip", "Acetone/IPA sonication", "Piranha etch", "Degassing at 400°C").
4. surface_functionalization: Identify any chemical treatments intended to modify surface groups for nucleation (e.g., "O2 plasma activation", "Silanization", "Hydroxylation", "Self-assembled monolayer (SAM) deposition").
5. evidence: Provide the exact, unedited quote from the text that describes the substrate and its preparation.

Rules:
- If a specific detail is not mentioned, return an empty string "".
- Do not include markdown headers or conversational text outside the JSON block.
- Focus specifically on the starting surface, not the final deposited film.

Return the result STRICTLY as a valid JSON object:

{{
 "substrate_material": "",
 "substrate_orientation": "",
 "pretreatment": "",
 "surface_functionalization": "",
 "evidence": ""
}}

Text:
```{fulltext}```

""")
    output = llm.invoke(prompt.format(fulltext=fulltext))
    return robust_json_parse(output.content)

def growth_per_cycle_agent(fulltext:str,llm) -> List[str]:
    prompt = PromptTemplate.from_template("""
    You are a materials science expert specializing in Atomic Layer Deposition (ALD).

Your task is to extract structured scientific information from the provided research paper text.

Rules:
1. Only extract information explicitly supported by the text.
2. If information is missing, return null.
3. Do not infer or hallucinate values.
4. Include the exact evidence sentence from the paper when possible.
5. Return output strictly in JSON format.
6. Use standard scientific units where possible.

Analyze the provided text to extract the Growth-Per-Cycle (GPC) data for the Atomic Layer Deposition (ALD) process.

Extraction Guidelines:
1. growth_per_cycle: Extract the numerical value of the film growth rate. If a range is provided (e.g., "0.9–1.1"), return it as a string. If multiple GPC values are listed for different temperatures, prioritize the value within the stable "ALD window" or list the primary one.
2. units: Identify the measurement units used (e.g., "Å/cycle", "nm/cycle", "mg/m2/cycle"). Do not convert; preserve the author's original units.
3. temperature_C: Extract the specific deposition temperature (in Celsius) at which the identified GPC was measured. If the text says "250 °C," return 250.
4. evidence: Provide the exact, unedited quote from the text that links the GPC value to the process temperature.

Rules:
- If a value is not mentioned, return null for numerical fields and an empty string "" for units.
- Distinguish between "Growth Rate" (which might be nm/min) and "Growth-Per-Cycle" (nm/cycle). Only extract GPC.
- Do not include markdown headers or conversational text outside the JSON block.

Return the result STRICTLY as a valid JSON object:

{{
 "growth_per_cycle": null,
 "units": "",
 "temperature_C": null,
 "evidence": ""
}}

Text:
```{fulltext}```

""")
    output = llm.invoke(prompt.format(fulltext=fulltext))
    return robust_json_parse(output.content)

def film_properties_agent(fulltext:str,llm) -> List[str]:
    prompt = PromptTemplate.from_template("""
    You are a materials science expert specializing in Atomic Layer Deposition (ALD).

Your task is to extract structured scientific information from the provided research paper text.

Rules:
1. Only extract information explicitly supported by the text.
2. If information is missing, return null.
3. Do not infer or hallucinate values.
4. Include the exact evidence sentence from the paper when possible.
5. Return output strictly in JSON format.
6. Use standard scientific units where possible.

Analyze the provided text to extract the physical and structural properties of the resulting ALD film.

Extraction Guidelines:
1. film_thickness_nm: Extract the measured thickness in nanometers. If multiple samples exist, prioritize the primary sample or provide a range (e.g., "10.5" or "5-50").
2. density_g_cm3: Extract the mass density in grams per cubic centimeter (g/cm³). This is often determined via XRR.
3. refractive_index: Extract the refractive index (n). Specify the wavelength if mentioned (e.g., "1.64 at 633 nm"). Return null if not mentioned.
4. surface_roughness_nm: Extract the Root Mean Square (RMS) or average roughness (Ra) in nanometers.
5. crystal_phase: Identify the crystallographic structure (e.g., "Amorphous", "Anatase", "Rutile", "Alpha-phase", "Polycrystalline").
6. evidence: Provide the exact, unedited quote from the text that mentions these characterization results.

Rules:
- If a value is not mentioned, return null for numerical fields and "" for the crystal_phase.
- Do not confuse "Surface Roughness" of the substrate with the "Surface Roughness" of the deposited film.
- Ensure refractive index is not confused with the extinction coefficient (k).

Return the result STRICTLY as a valid JSON object:

{{
 "film_thickness_nm": null,
 "density_g_cm3": null,
 "refractive_index": null,
 "surface_roughness_nm": null,
 "crystal_phase": "",
 "evidence": ""
}}

Text:
```{fulltext}```

""")
    output = llm.invoke(prompt.format(fulltext=fulltext))
    return robust_json_parse(output.content)

def characterization_agent(fulltext:str,llm) -> List[str]:
    prompt = PromptTemplate.from_template("""
    You are a materials science expert specializing in Atomic Layer Deposition (ALD).

Your task is to extract structured scientific information from the provided research paper text.

Rules:
1. Only extract information explicitly supported by the text.
2. If information is missing, return null.
3. Do not infer or hallucinate values.
4. Include the exact evidence sentence from the paper when possible.
5. Return output strictly in JSON format.
6. Use standard scientific units where possible.

Analyze the provided text to identify the characterization techniques used to analyze the ALD process or the resulting films.

Extraction Guidelines:
1. characterization_methods: Create a list of all techniques explicitly used in the study. Include both the abbreviation and the full name if provided (e.g., "X-ray Photoelectron Spectroscopy (XPS)", "Atomic Force Microscopy (AFM)"). 
2. Capture a broad range of techniques, including but not limited to:
   - Structural: XRD, TEM, SEM, SAED.
   - Chemical/Compositional: XPS, SIMS, EDX/EDS, RBS, FTIR.
   - Physical/Optical: Ellipsometry, XRR, AFM, Profilometry.
   - Electrical: Hall Effect, Four-point probe, C-V measurement.
3. Evidence: Provide the exact, unedited quote(s) from the text that list or describe the use of these characterization tools.

Rules:
- Only include techniques actually performed in the study. Ignore references to techniques used in cited works.
- If no techniques are identified, return an empty list [].
- Do not include markdown headers or conversational text outside the JSON block.

Return the result STRICTLY as a valid JSON object:

{{
 "characterization_methods": [],
 "evidence": ""
}}

Text:
```{fulltext}```

""")
    output = llm.invoke(prompt.format(fulltext=fulltext))
    return robust_json_parse(output.content)
