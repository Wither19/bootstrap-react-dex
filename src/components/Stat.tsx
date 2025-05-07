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

const getStatName = (stat: string) => {
	let n = stat.replace("-", " ");

	if (n == "hp") {
		n = "HP";
	} else {
		n = n.charAt(0).toUpperCase() + n.slice(1);
	}
	return n;
};

function Stat({ name, value }: { name: string; value: number }) {
	let isBst = name == "Base Stat Total";

	let colorValue: number = isBst ? value / 6 : value;

	const findStat = (): number => {
		let colorIndex: number = 0;

		for (let s of statThresholds) {
			if (colorValue > s) {
				colorIndex += 1;
			}
		}
		return Math.min(colorIndex, 4);
	};

	return (
		<div className="stat-title">
			{getStatName(name)}
			<div
				className="stat-bar"
				style={{
					width: (colorValue / 255) * 500,
					backgroundColor: statColors[findStat()],
				}}>
				{value == 0 ? "Loading..." : value}
			</div>
		</div>
	);
}
export default Stat;
