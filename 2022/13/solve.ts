// @ts-ignore
const fs = require("fs");
const pairs = fs
	.readFileSync("./input.txt", "utf8")
	.split("\n\n")
	.map((pair) => pair.split("\n").map((line) => JSON.parse(line)));

const pairsPart2 = fs
	.readFileSync("./input.txt", "utf8")
	.split("\n")
	.filter((line) => line.length > 0)
	.map((line) => JSON.parse(line));

function compare(left: (number | number[])[], right: (number | number[])[]) {
	let i = 0;
	while (i < left.length && i < right.length) {
		const leftComp = left[i];
		const rightComp = right[i];

		if (Array.isArray(leftComp) && Array.isArray(rightComp)) {
			const result = compare(leftComp, rightComp);
			if (result !== undefined) {
				return result;
			}
		} else if (Array.isArray(leftComp)) {
			const result = compare(leftComp, [rightComp]);
			if (result !== undefined) {
				return result;
			}
		} else if (Array.isArray(rightComp)) {
			const result = compare([leftComp], rightComp);
			if (result !== undefined) {
				return result;
			}
		} else {
			if (leftComp < rightComp) {
				return true;
			} else if (leftComp > rightComp) {
				return false;
			}
		}
		i++;
	}
	if (left.length < right.length) {
		return true;
	} else if (left.length > right.length) {
		return false;
	}
}

function solve() {
	//part 1
	let sum = 0;
	for (let i = 0; i < pairs.length; i++) {
		const pair = pairs[i];
		const left = pair[0];
		const right = pair[1];

		const result = compare(left, right);
		if (result === true) {
			sum += i + 1;
		}
	}
	console.log(sum);

	//part 2
	pairsPart2.push([[2]], [[6]]);
	pairsPart2.sort((a, b) => (compare(a, b) ? -1 : 1));
	const div1 =
		pairsPart2.findIndex(
			(arr) =>
				arr.length === 1 &&
				Array.isArray(arr[0]) &&
				arr[0].length === 1 &&
				arr[0][0] === 2
		) + 1;
	const div2 =
		pairsPart2.findIndex(
			(arr) =>
				arr.length === 1 &&
				Array.isArray(arr[0]) &&
				arr[0].length === 1 &&
				arr[0][0] === 6
		) + 1;
	console.log(div1 * div2);
}

solve();
