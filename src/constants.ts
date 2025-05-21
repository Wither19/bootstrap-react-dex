import { flattenDeep } from "lodash";

import { range } from "./functions";

import { type RegionObj, type DeepArray } from "./types";

export const regions: RegionObj[] = [
	{ name: "Kanto", start: 1, end: 151 },
	{ name: "Johto", start: 152, end: 251 },
	{ name: "Hoenn", start: 252, end: 386 },
	{ name: "Sinnoh", start: 387, end: 493 },
	{ name: "Unova", start: 494, end: 649 },
	{ name: "Kalos", start: 650, end: 721 },
	{ name: "Alola", start: 722, end: 807 },
	{ name: "Galar", start: 810, end: 898 },
	{ name: "Hisui", start: 899, end: 905 },
	{ name: "Paldea", start: 906, end: 1025 },
	{ name: "Unknown", start: 808, end: 809 },
];

const kanto = [range(144, 146), 150, 151];
const johto = [range(243, 245), range(249, 251)];
const hoenn = range(377, 386);
const sinnoh = range(480, 493);
const unova = [494, range(638, 649)];
const kalos = range(716, 721);
const alola = [range(785, 792), range(800, 802)];
const galar = [range(888, 898), 905];
const hisui = [905];
const paldea = [range(1001, 1004), range(1007, 1010), range(1014, 1018), range(1020, 1025)];
const unknown = [808, 809];

export const legendariesAndMythicals: DeepArray<number> = flattenDeep([
	kanto,
	johto,
	hoenn,
	sinnoh,
	unova,
	kalos,
	alola,
	galar,
	hisui,
	paldea,
	unknown,
]);
