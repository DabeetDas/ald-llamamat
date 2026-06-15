import re
import json

def strip_response(raw: str) -> str:
    content = raw.strip()

    # If the model leaked chat template tags in the middle of output,
    # stop at the first one so we don't concatenate multiple turns/repetitions.
    stop_markers = [r'<s>', r'</s>', r'\[INST\]', r'\[/INST\]', r'<<SYS>>', r'<</SYS>>']
    pattern = '|'.join(stop_markers)
    parts = re.split(pattern, content, maxsplit=1)
    content = parts[0].strip()

    if "```json" in content:
        content = content.split("```json", 1)[1]
        content = content.split("```", 1)[0]
    elif "```" in content:
        content = content.split("```", 1)[1]
        content = content.split("```", 1)[0]

    # Find the first JSON object or array.
    # We do this manually here because the shared robust_json_parse uses a greedy regex
    # that might swallow multiple blocks if we leave them in the string.
    json_start = -1
    for i, char in enumerate(content):
        if char in ("{", "["):
            json_start = i
            break
    
    if json_start != -1:
        content = content[json_start:]
        # Simple balanced bracket finder to get the first complete block
        opener = content[0]
        closer = "}" if opener == "{" else "]"
        stack = 0
        end_index = -1
        for i, char in enumerate(content):
            if char == opener:
                stack += 1
            elif char == closer:
                stack -= 1
                if stack == 0:
                    end_index = i + 1
                    break
        if end_index != -1:
            content = content[:end_index]

    # If model wrapped output in an array like [{...}], try to extract the first object
    content = content.strip()
    if content.startswith("[") and not content.startswith("[["):
        try:
            arr = json.loads(content)
            if isinstance(arr, list) and len(arr) == 1 and isinstance(arr[0], dict):
                content = json.dumps(arr[0], ensure_ascii=False)
        except (json.JSONDecodeError, ValueError):
            pass

    return content.strip()

def robust_json_parse(text: str, default=None) -> dict:
    if not isinstance(text, str):
        return default or {}

    # Strip Markdown code fences
    text = text.strip()
    for fence in ("```json", "```"):
        if text.startswith(fence):
            text = text[len(fence):]
        if text.endswith("```"):
            text = text[:-3]
    text = text.strip()

    # Extract the first complete JSON object or array
    # This is the greedy regex in tools.py
    match = re.search(r'(\{.*\}|\[.*\])', text, re.DOTALL)
    if match:
        text = match.group(1)

    print(f"DEBUG: after re.search in robust_json_parse: {text!r}")

    try:
        return json.loads(text)
    except Exception as e:
        print(f"DEBUG: json.loads failed: {e}")
        return default or {}

# Test case reflecting the error preview
raw_output = '[{"summary": {}}] [/INST] <<SYS>> [{"summary": {}}]'
print(f"RAW: {raw_output}")

cleaned = strip_response(raw_output)
print(f"CLEANED: {cleaned}")

parsed = robust_json_parse(cleaned)
print(f"PARSED: {parsed}")

# Another test case: JSON inside Markdown
raw_output_md = 'Sure, here is the JSON:\n```json\n{"a": 1}\n```\n[/INST] <<SYS>> extra junk'
print(f"\nRAW MD: {raw_output_md}")
cleaned_md = strip_response(raw_output_md)
print(f"CLEANED MD: {cleaned_md}")
parsed_md = robust_json_parse(cleaned_md)
print(f"PARSED MD: {parsed_md}")
