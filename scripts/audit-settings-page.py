import re
import json
import os

def analyze_file(filepath):
    results = {
        "high": [],
        "medium": [],
        "low": [],
        "skip": []
    }
    
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    for i, line in enumerate(lines):
        line_num = i + 1
        
        # Match classNames (simplified)
        class_match = re.search(r'className=["\']([^"\']+)["\']', line)
        class_str = ""
        if class_match:
            class_str = class_match.group(1)
        elif "className={`" in line or "className={" in line:
            # Try to extract the string part
            matches = re.findall(r'["\']([^"\']+)["\']', line)
            class_str = " ".join(matches)
            
        if class_str:
            classes = class_str.split()
            
            for cls in classes:
                # Color hex
                if re.match(r'^bg-\[#', cls) or re.match(r'^text-\[#', cls) or re.match(r'^border-\[#', cls):
                    results["low"].append({"line": line_num, "class": cls, "reason": "Hardcoded hex color"})
                
            # Typography
            typography_classes = [c for c in classes if c.startswith('text-') or c.startswith('font-') or c.startswith('leading-') or c.startswith('tracking-')]
            
            if any(t in classes for t in ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'font-semibold', 'font-bold', 'font-medium']):
                if 'md:' in class_str or 'lg:' in class_str or 'sm:' in class_str:
                    results["skip"].append({"line": line_num, "classes": " ".join(typography_classes), "reason": "Responsive prefix detected"})
                    continue
                    
                if 'hover:' in class_str or 'focus:' in class_str:
                    results["skip"].append({"line": line_num, "classes": " ".join(typography_classes), "reason": "State prefix detected"})
                    continue
                    
                if 'font-bold' in classes or 'text-xl' in classes or 'text-2xl' in classes:
                    results["medium"].append({"line": line_num, "classes": " ".join(typography_classes), "reason": "Needs semantic mapping (Heading/Display)"})
                else:
                    results["high"].append({"line": line_num, "classes": " ".join(typography_classes), "reason": "Likely maps to text-style-body or text-style-label"})
                        
    return results

def write_report(results):
    with open('scripts/audit-output/settings-audit-report.md', 'w', encoding='utf-8') as f:
        f.write("# SettingsPage Audit Report\n\n")
        f.write("## High Confidence (Auto-Migrate)\n")
        for item in results["high"]:
            f.write(f"- Line {item['line']}: `{item.get('classes', '')}` -> {item['reason']}\n")
            
        f.write("\n## Medium Confidence (Review)\n")
        for item in results["medium"]:
            f.write(f"- Line {item['line']}: `{item.get('classes', '')}` -> {item['reason']}\n")
            
        f.write("\n## Low Confidence (Manual Only)\n")
        for item in results["low"]:
            f.write(f"- Line {item['line']}: `{item.get('class', '')}` -> {item['reason']}\n")
            
        f.write("\n## Skip (Keep Utilities)\n")
        for item in results["skip"]:
            f.write(f"- Line {item['line']}: `{item.get('classes', '')}` -> {item['reason']}\n")

if __name__ == '__main__':
    os.makedirs('scripts/audit-output', exist_ok=True)
    results = analyze_file('src/pages/SettingsPage.tsx')
    with open('scripts/audit-output/settings-audit-report.json', 'w') as f:
        json.dump(results, f, indent=2)
    write_report(results)
    print("Audit complete. Report generated at scripts/audit-output/settings-audit-report.md")
    print(f"High: {len(results['high'])}, Medium: {len(results['medium'])}, Low: {len(results['low'])}, Skip: {len(results['skip'])}")
