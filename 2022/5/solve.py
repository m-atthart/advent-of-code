towers = [[] for i in range(9)]
with open("./towers.txt") as file:
  data = file.read().splitlines()
  for i in range(1, len(data)):
    line = data[-(i+1)]

    for i in range(9):
      tower_col = 1 + i * 4
      if line[tower_col] != " ":
        towers[i].append(line[tower_col])

steps = []
with open("./steps.txt") as file:
  data = file.read().splitlines()
  for line in data:
    steps.append([int(line.split()[1]), int(line.split()[3]), int(line.split()[5])])


def solve():
  for i, tower in enumerate(towers):
    print(i+1, tower)
  
  for step in steps:
    towers[step[2]-1] += towers[step[1]-1][-step[0]:]
    towers[step[1]-1] = towers[step[1]-1][:-step[0]]

  print("".join([tower[-1] for tower in towers]))


solve()
