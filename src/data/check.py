import json
import os 


list_unique = set()
for file in os.listdir(os.curdir):
    if '.json' in file:
        with open(file, 'r', encoding='utf-8') as f:
            data = json.load(f)

        for obj in data['features']:
            list_unique.add(str(obj['properties']['typeObject']))

print(list(list_unique))