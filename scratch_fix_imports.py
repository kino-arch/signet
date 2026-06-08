import os
import re

src = "c:/cv/signet/src/components/ui"
for root, dirs, files in os.walk(src):
    for file in files:
        if file.endswith('.stories.tsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # replace "@storybook/react" or '@storybook/react' with "@storybook/react-vite"
            new_content = re.sub(r'["\']@storybook/react["\']', '"@storybook/react-vite"', content)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filepath}")
