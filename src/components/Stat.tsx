import React, { useEffect, useState } from "react";

import { NumberFlowElement } from "@number-flow/react";

const statColors: string[] = [
	"#FF0000",
	"#FFA500",
	"#FFFF00",
	"#00FF00",
	"#71E1B3",
];
const statThresholds: number[] = [40, 65, 80, 105, 170];

const getStatColors = (stat: number) => {};

const getStatName = (stat: string) => {
	let n = stat.replace("-", " ");
	
	if (n == "hp") {
		n =  "HP"
	}
	else {
		n = n.charAt(0).toUpperCase() + n.slice(1);
	}
	return n;
};

function iterateComparison<T>(
	arr: Array<number>,
	val: number,
	returnArray: Array<T>
): T | undefined {
	let i = 0;
	var returnValue: T | undefined = undefined;
	for (const a of arr) {
		// You have reached the end of the array and would normally attempt to iterate out of bounds.
		if (i + 1 >= arr.length) {
			returnValue = returnArray[arr.length - 1];
		}
		// Value before iteration.
		else if (i == 0) {
			returnValue = returnArray[i];
		}
		// Normal comparison.
		else if (val > a && val <= a) {
			returnValue = returnArray[i];
		} else {
			return undefined;
		}
		i++;
	}
	return returnValue;
}

function Stat({ name, value }: { name: string; value: number }) {
	return (
		<div className="stat-title">
			{getStatName(name)}
			<div className="bar" style={{}}>
				{value == 0 ? "Loading..." : value}
			</div>
		</div>
	);
}

export default Stat;
