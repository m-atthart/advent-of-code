// @ts-ignore
const fs = require("fs");
let instructions = fs
	.readFileSync("./input.txt", "utf8")
	.split("\n") as string[];

function solve() {
	const cycleAdds = {};
	let cycle = 1;
	let spritePos = 1;
	let sum = 0;
	const crt: string[] = [];
	while (instructions.length > 0 || cycleAdds[cycle] !== undefined) {
		//cycle 1 = crt[0]
		//crtIdx = cycle - 1

		//start of cycle
		const instruction =
			Array.from(Object.keys(cycleAdds)).length === 0
				? instructions.shift()!
				: "noop";

		if (instruction !== "noop") {
			cycleAdds[cycle + 1] = Number(instruction.split(" ")[1]);
		}

		//during cycle
		//part 1
		if ((cycle - 20) % 40 === 0) {
			sum += spritePos * cycle;
		}

		//part 2
		if (
			spritePos === (cycle - 1) % 40 ||
			spritePos - 1 === (cycle - 1) % 40 ||
			spritePos + 1 === (cycle - 1) % 40
		) {
			crt.push("#");
		} else {
			crt.push(".");
		}

		//end of cycle
		if (cycleAdds[cycle] !== undefined) {
			spritePos += cycleAdds[cycle];
			delete cycleAdds[cycle];
		}

		cycle++;
	}

	console.log(sum);
	console.log(crt.slice(0, 40).join(""));
	console.log(crt.slice(40, 80).join(""));
	console.log(crt.slice(80, 120).join(""));
	console.log(crt.slice(120, 160).join(""));
	console.log(crt.slice(160, 200).join(""));
	console.log(crt.slice(200, 240).join(""));
}

solve();
