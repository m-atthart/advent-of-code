with open("./input.txt") as file:
  lines = file.readlines()
  max_cals = 0
  max_cals_2 = 0
  max_cals_3 = 0
  curr_cals = 0
  for line in lines:
    line = line.strip()
    if line:
      curr_cals += int(line)
    else:
      if curr_cals > max_cals:
        max_cals_3 = max_cals_2
        max_cals_2 = max_cals
        max_cals = curr_cals
      elif curr_cals > max_cals_2:
        max_cals_3 = max_cals_2
        max_cals_2 = curr_cals
      elif curr_cals > max_cals_3:
        max_cals_3 = curr_cals
      curr_cals = 0
  print(max_cals + max_cals_2 + max_cals_3)
