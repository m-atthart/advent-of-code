python_text = """\"data = []\\nwith open(\\"./input.txt\\") as file:\\n  data = file.read().splitlines()\\n\\ndef solve():\\n  pass\\n\\nsolve()\""""
typescript_text = """\"// @ts-ignore\\nconst fs = require(\\"fs\\");\\nconst data = fs.readFileSync(\\"./input.txt\\", \\"utf8\\").split(\\"\\\\\\n\\") as string[];\\n\\nfunction solve() {\\n  \\n}\\n\\nsolve();\""""

folder_creations = []
for i in range(1, 26):
  folder_creations.append(f"mkdir aoc/{i}; echo {python_text} > aoc/{i}/solve.py; echo {typescript_text} > aoc/{i}/solve.ts; touch aoc/{i}/input.txt;")

import os
os.system("mkdir aoc")
for command in folder_creations:
  os.system(command)
