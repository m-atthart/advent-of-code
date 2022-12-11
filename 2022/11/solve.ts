// @ts-ignore
const fs = require("fs");

function parseFile(fileName: string = "./input.txt") {
	const fileSections = fs
		.readFileSync(fileName, "utf8")
		.split("\n\n") as string[];

	const monkeys = fileSections.map((section, idx) => {
		const monkeyData = section.split("\n");

		const startingItems = monkeyData[1]
			.slice(18)
			.split(", ")
			.map((num) => parseInt(num));

		const operationData = monkeyData[2].slice(23).split(" ");
		const operation = (old: number) => {
			if (operationData[1] === "old") return old * old;
			else if (operationData[0] === "+")
				return old + parseInt(operationData[1]);
			else if (operationData[0] === "*")
				return old * parseInt(operationData[1]);
		};

		const test = (num: number) =>
			num % parseInt(monkeyData[3].slice(21)) === 0 ? "true" : "false";

		const nextMonkeyOptions = {
			true: parseInt(monkeyData[4].slice(29)),
			false: parseInt(monkeyData[5].slice(30)),
		};

		return {
			idx,
			startingItems,
			operation,
			test,
			nextMonkeyOptions,
			inspections: 0,
		};
	});

	return monkeys;
}

function solve() {
	const monkeys = parseFile();
	const numRounds = 10000;

	for (let i = 0; i < numRounds; i++) {
		for (let j = 0; j < monkeys.length; j++) {
			const { startingItems, operation, test, nextMonkeyOptions } = monkeys[j];

			for (let k = 0; k < startingItems.length; k++) {
				const oldNum = startingItems[k];
				const newNum = operation(oldNum)! % 9699690; // multiple of all monkeys' tests
				//const boredNum = Math.floor(newNum / 3);
				const nextMonkeyIdx = nextMonkeyOptions[test(newNum)];
				monkeys[nextMonkeyIdx].startingItems.push(newNum);
				monkeys[j].inspections++;
			}

			monkeys[j].startingItems = [];
		}
	}

	monkeys.sort((monkeyA, monkeyB) =>
		monkeyA.inspections > monkeyB.inspections ? -1 : 1
	);
	console.log(monkeys[0].inspections * monkeys[1].inspections);
}

solve();
