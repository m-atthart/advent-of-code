data = []
with open("./input.txt") as file:
  data = file.read().splitlines()[0]

def solve():
  i = 0
  window = data[i:i+14]
  window_count = {}
  for char in window:
    window_count[char] = 1
  while len(window_count.keys()) != 14:
    i += 1
    window = data[i:i+14]
    window_count = {}
    for char in window:
      window_count[char] = 1
  print(window)
  print(i+14)

solve()
