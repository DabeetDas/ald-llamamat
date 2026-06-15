from llama_cpp import Llama

MODEL_PATH = "/scratch/work/dabeetkd24/models/llamat-2-chat-q4_k_m.gguf"

llm = Llama(
    model_path=MODEL_PATH,
    n_ctx=2048,
    n_gpu_layers=-1,
    verbose=False,
)

prompt = """
<s>
[INST]
Text:
Al2O3 films were deposited using trimethylaluminum (TMA)
and water at 200 °C.

Answer exactly in this format:

Material: <answer>
Precursor: <answer>
Temperature: <answer>
[/INST]
"""

out = llm(
    prompt,
    max_tokens=512,
    temperature=0,
    stop=["</s>","[INST]"]
)

print(repr(out["choices"][0]["text"]))