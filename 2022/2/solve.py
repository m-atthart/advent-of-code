with open("./input.txt") as file:
  data = file.read().splitlines()
  p2Code = {
    "A": "rock",
    "B": "paper",
    "C": "scissors"
  }
  p1Code = {
    "X": "lose",
    "Y": "draw",
    "Z": "win"
  }

  score = 0

  for round in data:
    p2 = p2Code[round[0]]
    p1 = p1Code[round[2]]
    
    if p1 == "lose":
      score += 0
      
      if p2 == "rock":
        score += 3
      elif p2 == "paper":
        score += 1
      elif p2 == "scissors":
        score += 2

    elif p1 == "draw":
      score += 3
      
      if p2 == "rock":
        score += 1
      elif p2 == "paper":
        score += 2
      elif p2 == "scissors":
        score += 3

    elif p1 == "win":
      score += 6
      
      if p2 == "rock":
        score += 2
      elif p2 == "paper":
        score += 3
      elif p2 == "scissors":
        score += 1
  print(score)
