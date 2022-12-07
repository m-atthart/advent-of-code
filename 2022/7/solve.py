data = []
with open("./input.txt") as file:
  data = file.read().splitlines()

"""
{
  type: "dir" | "file",
  name: string,
  path: string,
  size: number | None,
  children?: (file|dir)[]
}
"""

all_files = {
  "/": {
    "type": "dir",
    "name": "",
    "path": "/",
    "size": None,
    "children": [],
  }
}

def calculate_dir_sizes(root_dir):
  size = 0

  for child_name in root_dir["children"]:
    child = all_files[root_dir["path"] + child_name]
    if child["type"] == "dir":
      size += calculate_dir_sizes(child)
    else:
      size += child["size"]
  root_dir["size"] = size
  return size

def parse_terminal(terminal_history):
  current_dir = "/"

  for line in terminal_history:
    if line[:4] == "$ ls":
      continue
    elif line[:5] == "$ cd ":
      if line[5:] == "..":
        current_dir = "/".join(current_dir.split("/")[:-2]) + "/"
      elif line[5:] == "/":
        current_dir = "/"
      else:
        current_dir += line[5:] + "/"
    elif line[:4] == "dir ":
      dir_name = line[4:]
      dir_path = current_dir + dir_name + "/"
      all_files[dir_path] = {
        "type": "dir",
        "name": dir_name,
        "path": dir_path,
        "size": None,
        "children": []
      }
      all_files[current_dir]["children"].append(dir_name + "/")
    else:
      file_name = line.split(" ")[1]
      file_path = current_dir + file_name
      all_files[file_path] = {
        "type": "file",
        "name": file_name,
        "size": int(line.split(" ")[0]),
      }
      all_files[current_dir]["children"].append(file_name)

parse_terminal(data)
calculate_dir_sizes(all_files["/"])

total_storage = 70000000
used_storage = all_files["/"]["size"]
available_storage = total_storage - used_storage
required_storage = 30000000

sorted_directories = []
for item in all_files.values():
  if item["type"] == "dir":
    sorted_directories.append(item)
sorted_directories.sort(key=lambda x: x["size"])

for dir in sorted_directories:
  if dir["size"] + available_storage >= required_storage:
    print(dir)
    break
