data = []
with open("./input.txt") as file:
  data = file.read().splitlines()

def solve():
  common_items = []
  for rucksack in data:
    comp1 = rucksack[:len(rucksack)//2]
    comp2 = rucksack[len(rucksack)//2:]
    for ltr in comp1:
      if ltr in comp2:
        common_items.append(ltr)
        break
  
  ltr_sum = 0
  for char in common_items:
    ascii_val = ord(char)

    if ascii_val >= 97 and ascii_val <= 122:
      ltr_val = ascii_val - 96
    elif ascii_val >= 65 and ascii_val <= 90:
      ltr_val = ascii_val - 38
    
    ltr_sum += ltr_val
  print(ltr_sum)

  triple_common_items = []
  for i in range(len(data) // 3):
    elves_group = data[i*3:i*3+3]
    for ltr in elves_group[0]:
      if ltr in elves_group[1] and ltr in elves_group[2]:
        triple_common_items.append(ltr)
        break
  
  triple_ltr_sum = 0
  for char in triple_common_items:
    ascii_val = ord(char)

    if ascii_val >= 97 and ascii_val <= 122:
      ltr_val = ascii_val - 96
    elif ascii_val >= 65 and ascii_val <= 90:
      ltr_val = ascii_val - 38
    
    triple_ltr_sum += ltr_val
  print(triple_ltr_sum)

solve()
