// @ts-ignore
const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf8").split("\n") as string[];

function parse() {
	const linesGrps = data.map((line) =>
		line
			.split(" -> ")
			.map((coord) => [
				parseInt(coord.split(",")[0]),
				parseInt(coord.split(",")[1]),
			])
	);

	const paths: number[][][][] = [];
	for (let i = 0; i < linesGrps.length; i++) {
		const group = linesGrps[i];
		const lines: number[][][] = [];
		for (let j = 0; j < group.length - 1; j += 1) {
			lines.push([group[j], group[j + 1]]);
		}
		paths.push(lines);
	}

	return paths;
}

function getBlocks(): [{ [coord: string]: 1 }, number] {
	const paths = parse();
	const blocks = {};
	let lowestBlockY = 0;

	for (const path of paths) {
		for (const line of path) {
			const [start, end] = line;
			const [x1, y1] = start;
			const [x2, y2] = end;

			for (let x = x1; x1 < x2 ? x <= x2 : x >= x2; x1 < x2 ? x++ : x--) {
				for (let y = y1; y1 < y2 ? y <= y2 : y >= y2; y1 < y2 ? y++ : y--) {
					const key = `${x},${y}`;
					blocks[key] = 1;
					if (y > lowestBlockY) {
						lowestBlockY = y;
					}
				}
			}
		}
	}

	return [blocks, lowestBlockY];
}

function solvePart1() {
	const [blocks, lowestBlockY] = getBlocks();
	const startingCoord = [500, 0];
	const startingCoordKey = `${startingCoord[0]},${startingCoord[1]}`;
	let sandCount = 0;
	let sandCoord = [...startingCoord];

	while (
		blocks[startingCoordKey] === undefined &&
		sandCoord[1] < lowestBlockY
	) {
		if (blocks[`${sandCoord[0]},${sandCoord[1] + 1}`] === undefined) {
			sandCoord[1]++;
		} else if (
			blocks[`${sandCoord[0] - 1},${sandCoord[1] + 1}`] === undefined
		) {
			sandCoord[0]--;
			sandCoord[1]++;
		} else if (
			blocks[`${sandCoord[0] + 1},${sandCoord[1] + 1}`] === undefined
		) {
			sandCoord[0]++;
			sandCoord[1]++;
		} else {
			blocks[`${sandCoord[0]},${sandCoord[1]}`] = 1;
			sandCount++;
			sandCoord = [...startingCoord];
		}
	}

	console.log(sandCount);
}

function solvePart2() {
	const [blocks, lowestBlockY] = getBlocks();
	const startingCoord = [500, 0];
	const startingCoordKey = `${startingCoord[0]},${startingCoord[1]}`;
	let sandCount = 0;
	let sandCoord = [...startingCoord];

	while (blocks[startingCoordKey] === undefined) {
		if (sandCoord[1] === lowestBlockY + 1) {
			blocks[`${sandCoord[0]},${sandCoord[1]}`] = 1;
			sandCount++;
			sandCoord = [...startingCoord];
		} else if (blocks[`${sandCoord[0]},${sandCoord[1] + 1}`] === undefined) {
			sandCoord[1]++;
		} else if (
			blocks[`${sandCoord[0] - 1},${sandCoord[1] + 1}`] === undefined
		) {
			sandCoord[0]--;
			sandCoord[1]++;
		} else if (
			blocks[`${sandCoord[0] + 1},${sandCoord[1] + 1}`] === undefined
		) {
			sandCoord[0]++;
			sandCoord[1]++;
		} else {
			blocks[`${sandCoord[0]},${sandCoord[1]}`] = 1;
			sandCount++;
			sandCoord = [...startingCoord];
		}
	}

	console.log(sandCount);
}

solvePart1();
solvePart2();
