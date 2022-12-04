data = []
with open("./input.txt") as file:
  data = file.read().splitlines()

def solve():
  containCount = 0
  overlapCount = 0
  for pair in data:
    ass = pair.split(",")
    
    rangeBounds0 = ass[0].split("-")
    rangeBounds1 = ass[1].split("-")

    if int(rangeBounds0[0]) <= int(rangeBounds1[0]) and int(rangeBounds0[1]) >= int(rangeBounds1[1]) or int(rangeBounds0[0]) >= int(rangeBounds1[0]) and int(rangeBounds0[1]) <= int(rangeBounds1[1]):
      containCount += 1

    if int(rangeBounds0[0]) <= int(rangeBounds1[1]) and int(rangeBounds0[1]) >= int(rangeBounds1[0]):
      overlapCount += 1

  print(containCount)
  print(overlapCount)

solve()
