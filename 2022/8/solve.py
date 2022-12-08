data = []
with open("./input.txt") as file:
  data = file.read().splitlines()

def solve():
  trees = []
  for i, tree_row in enumerate(data):
    trees.append([])
    for tree in tree_row:
      trees[i].append(int(tree))
  
  visible_trees = 0
  highest_scenic_score = 0
  
  for i, tree_row in enumerate(trees):
    for j, tree in enumerate(tree_row):
      trees_left = tree_row[:j]
      trees_right = tree_row[j+1:]
      trees_up = [row[j] for row in trees[:i]]
      trees_down = [row[j] for row in trees[i+1:]]

      taller_than_left = all([tree > t for t in trees_left])
      taller_than_right = all([tree > t for t in trees_right])
      taller_than_up = all([tree > t for t in trees_up])
      taller_than_down = all([tree > t for t in trees_down])

      if taller_than_left or taller_than_right or taller_than_up or taller_than_down:
        visible_trees += 1


      visible_trees_left = 0
      left_tree_idx = len(trees_left) - 1
      while left_tree_idx >= 0:
        visible_trees_left += 1
        if trees_left[left_tree_idx] >= tree:
          break
        left_tree_idx -= 1
      print(tree, trees_left, visible_trees_left)

      visible_trees_right = 0
      right_tree_idx = 0
      while right_tree_idx < len(trees_right):
        visible_trees_right += 1
        if trees_right[right_tree_idx] >= tree:
          break
        right_tree_idx += 1

      visible_trees_up = 0
      up_tree_idx = len(trees_up) - 1
      while up_tree_idx >= 0:
        visible_trees_up += 1
        if trees_up[up_tree_idx] >= tree:
          break
        up_tree_idx -= 1

      visible_trees_down = 0
      down_tree_idx = 0
      while down_tree_idx < len(trees_down):
        visible_trees_down += 1
        if trees_down[down_tree_idx] >= tree:
          break
        down_tree_idx += 1
      
      scenic_score = visible_trees_left * visible_trees_right * visible_trees_up * visible_trees_down
      if scenic_score > highest_scenic_score:
        highest_scenic_score = scenic_score

  print(visible_trees)
  print(highest_scenic_score)

solve()
