// @ts-ignore
const fs = require("fs");
const map = fs
	.readFileSync("./input.txt", "utf8")
	.split("\n")
	.map((line) => line.split("")) as string[][];

function solve(start: [number, number] = [20, 0]) {
	let end: [number, number] = [20, 52];

	const distFromStart = new Map<string, number>();
	distFromStart.set(start.join(","), 0);

	const queue = [start];

	while (queue.length > 0) {
		const [row, col] = queue.shift()!;
		const currentChar =
			map[row][col] === "E" ? "z" : map[row][col] === "S" ? "a" : map[row][col];
		const currentHeight = currentChar.charCodeAt(0);
		const currentDist = distFromStart.get([row, col].join(","))!;

		const neighbours = [
			[row + 1, col],
			[row - 1, col],
			[row, col + 1],
			[row, col - 1],
		].filter(
			([rowIdx, colIdx]) =>
				rowIdx < 41 && rowIdx >= 0 && colIdx < 77 && colIdx >= 0
		) as [number, number][];

		neighbours.forEach((neighbour) => {
			const [neighbourRow, neighbourCol] = neighbour;
			const neighbourChar =
				map[neighbourRow][neighbourCol] === "E"
					? "z"
					: map[neighbourRow][neighbourCol] === "S"
					? "a"
					: map[neighbourRow][neighbourCol];
			const neighbourHeight = neighbourChar.charCodeAt(0);

			if (currentHeight + 1 >= neighbourHeight) {
				const bestDist = distFromStart.get(neighbour.join(","));

				if (bestDist === undefined || currentDist + 1 < bestDist) {
					distFromStart.set(neighbour.join(","), currentDist + 1);
					queue.push(neighbour);
				}
			}
		});
	}

	return distFromStart.get(end.join(","))!;
}

function solvePart1() {
	console.log(solve());
}

function solvePart2() {
	console.log(
		map
			.reduce(
				(acc, curr, idx) => [
					...acc,
					...curr
						.reduce(
							(acc, curr, jdx) =>
								curr === "a" || curr === "S" ? [...acc, jdx] : acc,
							[]
						)
						.map((jdx) => [idx, jdx]),
				],
				[]
			)
			.map((coord) => solve(coord))
			.filter((x) => x !== undefined)
			.sort((a, b) => a - b)[0]
	);
}

solvePart1();
solvePart2();
