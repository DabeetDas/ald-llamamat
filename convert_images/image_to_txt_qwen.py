
import torch
from transformers import Qwen3VLForConditionalGeneration, AutoProcessor, BitsAndBytesConfig
from tqdm import tqdm
import os
from PIL import Image

quantization_config = BitsAndBytesConfig(load_in_4bit=True)

model = Qwen3VLForConditionalGeneration.from_pretrained(
    "Qwen/Qwen3-VL-8B-Instruct",
    torch_dtype=torch.bfloat16,
    device_map="auto",
    quantization_config=quantization_config,
    attn_implementation="flash_attention_2",
)
processor = AutoProcessor.from_pretrained("Qwen/Qwen3-VL-8B-Instruct")
processor.tokenizer.padding_side = "left"

PROMPT = "You are analyzing images extracted from scientific research papers. Your task: Step 1 — Identify the type of image. Classify the image into ONE of the following: 1. Scientific figure (graph, chart, microscopy image, schematic, materials diagram, experimental setup) 2. Scientific table 3. Journal logo / publisher branding 4. Decorative or unrelated graphic 5. Other Step 2 — If the image is a scientific figure or table: Provide a concise technical summary including: - What the figure represents - Key variables or axes (if present) - Important trends, relationships, or mechanisms shown - Any materials, processes, or experimental techniques mentioned - If readable, include important labels or captions Step 3 — If the image is NOT a scientific figure/table (e.g., logo, decorative graphic): Return only a short description of what it is. Do NOT attempt a technical interpretation. Output format: Image Type: <category> Summary: <concise description or technical summary> Keep the summary factual and avoid speculation if the image content is unclear."

def construct_message(img_path):
    return {
        "role": "user",
        "content": [
            {"type": "image", "image": img_path},
            {"type": "text", "text": PROMPT}
        ],
    }

def generate_qwen_summary(model, messages):

    inputs = processor.apply_chat_template(
        messages,
        tokenize=True,
        add_generation_prompt=True,
        padding=True,
        return_dict=True,
        return_tensors="pt"
    )

    inputs = {k: v.to(model.device) for k, v in inputs.items()}

    with torch.inference_mode():
        generated_ids = model.generate(
            **inputs,
            max_new_tokens=200,
            do_sample=False
        )

    generated_ids_trimmed = [
        out_ids[len(in_ids):]
        for in_ids, out_ids in zip(inputs["input_ids"], generated_ids)
    ]

    output_text = processor.batch_decode(
        generated_ids_trimmed,
        skip_special_tokens=True
    )

    # Explicitly delete tensors and free VRAM
    del inputs, generated_ids, generated_ids_trimmed
    torch.cuda.empty_cache()

    return output_text

save_path = "/teamspace/studios/this_studio/image_summaries"
data_path = "/teamspace/studios/this_studio/Data"

batch_size = 4  # real effective batch size for VL models

os.makedirs(save_path, exist_ok=True)

papers = os.listdir(data_path)

for i in tqdm(range(len(papers))):

    paper_folder = os.path.join(data_path, f"paper{i+1}/Images")
    paper_save_folder = os.path.join(save_path, f"paper{i+1}")
    os.makedirs(paper_save_folder, exist_ok=True)

    images = os.listdir(paper_folder)

    # Filter out images that already have a corresponding .txt file (skip logic)
    images_to_process = []
    for img in images:
        txt_filename = os.path.splitext(img)[0] + ".txt"
        txt_path = os.path.join(paper_save_folder, txt_filename)
        if not os.path.exists(txt_path):
            images_to_process.append(img)

    if not images_to_process:
        continue

    for j in range(0, len(images_to_process), batch_size):

        batch_images = images_to_process[j:j+batch_size]

        pil_images = [
            Image.open(os.path.join(paper_folder, img)).convert("RGB")
            for img in batch_images
        ]

        # construct messages for the batch
        batch_messages = [
            [construct_message(img)]
            for img in pil_images
        ]

        # run model once for the whole batch
        summaries = generate_qwen_summary(model, batch_messages)

        # close PIL images to free memory
        for img in pil_images:
            img.close()
        del pil_images

        # save outputs
        for img, summary in zip(batch_images, summaries):

            text = summary
            print(text)

            txt_filename = os.path.splitext(img)[0] + ".txt"
            txt_path = os.path.join(paper_save_folder, txt_filename)

            with open(txt_path, "w", encoding="utf-8") as f:
                f.write(text)