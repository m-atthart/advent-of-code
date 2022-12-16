// @ts-ignore
const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf8").split("\n") as string[];

type Coord = { x: number; y: number };
type InterceptRange = [number, number];

function parse() {
	let sensors: Coord[] = [];
	let beacons: Coord[] = [];

	for (let i = 0; i < data.length; i++) {
		const line = data[i];
		const sensorCoords = line
			.split(":")[0]
			.split(",")
			.map((coord) => parseInt(coord.split("=")[1]));
		const beaconCoords = line
			.split(":")[1]
			.split(",")
			.map((coord) => parseInt(coord.split("=")[1]));
		const sensor = { x: sensorCoords[0], y: sensorCoords[1] };
		const beacon = { x: beaconCoords[0], y: beaconCoords[1] };
		sensors.push(sensor);
		beacons.push(beacon);
	}

	return { sensors, beacons };
}

function getRanges(sensors: Coord[], beacons: Coord[], targetRow: number) {
	const ranges: InterceptRange[] = [];

	for (let i = 0; i < sensors.length; i++) {
		const sensor = sensors[i];
		const beacon = beacons[i];
		const absBeaconDx = Math.abs(beacon.x - sensor.x);
		const absBeaconDy = Math.abs(beacon.y - sensor.y);
		const absInterceptDy = Math.abs(sensor.y - targetRow);
		const absInterceptDx = absBeaconDx + absBeaconDy - absInterceptDy; // absInterceptDx + absInterceptDy === absBeaconDx + absBeaconDy
		if (absInterceptDx < 0) continue;
		const interceptRange: InterceptRange = [
			sensor.x - absInterceptDx,
			sensor.x + absInterceptDx,
		];
		ranges.push(interceptRange);
	}

	return ranges;
}

function joinRanges(ranges: InterceptRange[]) {
	const joinedRanges: InterceptRange[] = [];

	for (let i = 0; i < ranges.length; i++) {
		if (joinedRanges.length === 0) {
			joinedRanges.push(ranges[i]);
			continue;
		}

		const [rangeStart, rangeEnd] = ranges[i];
		/*
    loop through joinedRanges until you find range that start is in or ranges that start is between
    keep looping through (including current JoinedRange) until you find the same thing for end
    if start is in a range, use that range's start
    if end is in a range, use that range's end
    splice in the new range replacing all the ranges the new range is a part of
    */

		let joinedRangesToReplaceStartIndex: number | null = null;
		let joinedRangesToReplaceEndIndex: number | null = null;
		let newRangeStart: number | null = null;
		let newRangeEnd: number | null = null;

		if (rangeEnd < joinedRanges[0][0]) {
			joinedRangesToReplaceStartIndex = -1;
			joinedRangesToReplaceEndIndex = -1;
			newRangeStart = rangeStart;
			newRangeEnd = rangeEnd;
		} else if (rangeStart > joinedRanges[joinedRanges.length - 1][1]) {
			joinedRangesToReplaceStartIndex = joinedRanges.length;
			joinedRangesToReplaceEndIndex = joinedRanges.length;
			newRangeStart = rangeStart;
			newRangeEnd = rangeEnd;
		}

		let j = 0;
		while (joinedRangesToReplaceStartIndex === null) {
			const [joinedRangeStart, joinedRangeEnd] = joinedRanges[j];
			if (rangeStart <= joinedRangeEnd) {
				joinedRangesToReplaceStartIndex = j;
				newRangeStart =
					rangeStart < joinedRangeStart ? rangeStart : joinedRangeStart;
			}
			j++;
		}

		j = joinedRanges.length - 1;
		while (joinedRangesToReplaceEndIndex === null) {
			const [joinedRangeStart, joinedRangeEnd] = joinedRanges[j];
			if (rangeEnd >= joinedRangeStart) {
				joinedRangesToReplaceEndIndex = j;
				newRangeEnd = rangeEnd > joinedRangeEnd ? rangeEnd : joinedRangeEnd;
			}
			j--;
		}

		const joinedRangesToReplaceNum =
			joinedRangesToReplaceEndIndex - joinedRangesToReplaceStartIndex + 1;

		joinedRanges.splice(
			joinedRangesToReplaceStartIndex,
			joinedRangesToReplaceNum,
			[newRangeStart!, newRangeEnd!]
		);

		/*
    check against current joinedRange first
    cases:
      start and end are before joinedRangeStart
      start is before joinedRangeStart and end is between joinedRangeStart and joinedRangeEnd inclusive
      start is before joinedRangeStart and end is after joinedRangeEnd

      start is between joinedRangeStart and joinedRangeEnd inclusive and end is between joinedRangeStart and joinedRangeEnd inclusive
      start is between joinedRangeStart and joinedRangeEnd inclusive and end is after joinedRangeEnd

      start and end are after joinedRangeEnd
    
    then check against prev/next joinedRange
    cases:
      end is between joinedRangeStart and joinedRangeEnd inclusive, if start is before joinedRangeStart, while start is less than prev joinedRangeStart, keep going back. if it's before prev joinedRangeEnd, splice it between prev joinedRange and joinedRange (keeping prev joinedRangeStart and joinedRangeEnd)
    */
	}

	return joinedRanges;
}

function getUniqueNums(ranges: InterceptRange[]) {
	const uniqueNums: Set<number> = new Set();
	for (let i = 0; i < ranges.length; i++) {
		const [start, end] = ranges[i];
		for (let j = start; j <= end; j++) {
			uniqueNums.add(j);
		}
	}
	return uniqueNums;
}

function getUniqueSpaces(
	ranges: InterceptRange[],
	clampStart: number,
	clampEnd: number
) {
	const uniqueSpaces: Set<number> = new Set();

	for (let i = clampStart; i < ranges[0][0]; i++) {
		uniqueSpaces.add(i);
	}
	for (let i = clampEnd; i > ranges[ranges.length - 1][1]; i--) {
		uniqueSpaces.add(i);
	}
	for (let i = 0; i < ranges.length - 1; i++) {
		const [, end] = ranges[i];
		const [nextStart] = ranges[i + 1];
		for (let j = clampStart; j <= clampEnd; j++) {
			if (j > end && j < nextStart) uniqueSpaces.add(j);
		}
	}

	return uniqueSpaces;
}

function solve() {
	const { sensors, beacons } = parse();
	const targetRow = 2000000;
	const ranges = getRanges(sensors, beacons, targetRow);
	const beaconsAtIntercept: Set<string> = new Set(
		beacons
			.filter((beacon) => beacon.y === targetRow)
			.map((beacon) => `${beacon.x},${beacon.y}`)
	);

	// way simpler method of just counting through each range into a set
	// i thought of this but thought it would be too slow because you're doing millions of iterations
	// const possibleBeacons = countUniqueSpaces(ranges);
	// const interceptNonBeacons = possibleBeacons - beaconsAtIntercept.size;
	// console.log(interceptNonBeacons);

	// my method of reducing the ranges
	const joinedRanges = joinRanges(ranges);
	const nonBeacons =
		joinedRanges.reduce((acc, [start, end]) => acc + end - start + 1, 0) -
		beaconsAtIntercept.size;
	console.log(nonBeacons);
}

function solvePart2() {
	const { sensors, beacons } = parse();
	const xClamp = [0, 4000000];
	const yClamp = [0, 4000000];
	const possibleBeacons = new Set<string>();

	for (
		let interceptRow = yClamp[0];
		interceptRow <= yClamp[1];
		interceptRow++
	) {
		const beaconsAtIntercept: Set<string> = new Set(
			beacons
				.filter(
					(beacon) =>
						beacon.y === interceptRow &&
						beacon.x >= xClamp[0] &&
						beacon.x <= xClamp[1]
				)
				.map((beacon) => `${beacon.x},${beacon.y}`)
		);

		const ranges = getRanges(sensors, beacons, interceptRow);
		const joinedRanges = joinRanges(ranges);
		const clampedRanges: InterceptRange[] = joinedRanges
			.filter(([start, end]) => end >= xClamp[0] && start <= xClamp[1])
			.map((range, idx) => {
				if (idx === 0) return [Math.max(range[0], xClamp[0]), range[1]];
				if (idx === joinedRanges.length - 1)
					return [range[0], Math.min(range[1], xClamp[1])];
				return range;
			});
		const possibleBeaconsAtIntercept = getUniqueSpaces(
			clampedRanges,
			xClamp[0],
			xClamp[1]
		);
		for (const possibleBeacon of possibleBeaconsAtIntercept) {
			possibleBeacons.add(`${possibleBeacon},${interceptRow}`);
		}
	}

	for (const possibleBeacon of possibleBeacons) {
		const beaconCoord = possibleBeacon.split(",").map(Number);
		const tuningFrequency = beaconCoord[0] * 4000000 + beaconCoord[1];
		console.log(tuningFrequency);
	}
}

solve();
solvePart2();
