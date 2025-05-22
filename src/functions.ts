import { values, pickBy, omitBy, flattenDeep, uniqBy } from "lodash";

import {
	GameName,
	type HasLanguage,
	type HasVersion,
	type DisplayProps,
	type NameCode,
} from "./types.ts";

import { type FlavorText, type PokemonStat, type Genus } from "pokeapi-typescript";

export function fancifyGameName(name: string): GameName {
	return GameName[name as NameCode];
}

export function getLangEntries<T extends HasLanguage>(arr: T[], lang: string = "en"): T[] {
	return values(pickBy(arr, (item: T) => item.language.name === lang));
}

export function getSingleLangEntry<T extends HasLanguage>(arr: T[], lang: string = "en"): T {
	return getLangEntries(arr, lang)[0]!;
}

// ["red", "blue", "yellow", "gold", "silver", "crystal"]
export const gbGames = Object.keys(GameName).slice(0, 6);

// ["ruby", "sapphire", "emerald", "firered", "leafgreen"]
export const gbaGames = Object.keys(GameName).slice(6, 11);

// ["diamond", "pearl", "platinum", "heartgold", "soulsilver", "black", "white", "black-2", "white-2"]
export const dsGames = Object.keys(GameName).slice(11, 20);

export const twoDGames = flattenDeep([gbGames, gbaGames, dsGames]);

export function removeVersions<T extends HasLanguage & HasVersion>(
	arr: T[],
	omissions: string[]
): T[] {
	return values(omitBy(arr, (item) => omissions.includes(item.version.name)));
}

export function stripDuplicateEntries(arr: FlavorText[]) {
	return uniqBy(arr, (item) => item.flavor_text.replace("\n", ""));
}

export function checkForDuplicates(arr: FlavorText[]) {
	return arr == stripDuplicateEntries(arr);
}

export function getStatTotal(stats: PokemonStat[]): number {
	return stats.map((stat) => stat.base_stat).reduce((sum, num) => sum + num);
}

export function genusHandle(genus: Genus[]) {
	return getSingleLangEntry(genus);
}

export function flavorTextHandle(
	flavorText: FlavorText[],
	omissions: string[],
	includeDupes?: boolean
): FlavorText[] {
	let d = getLangEntries(flavorText);

	d = removeVersions(d, omissions);

	if (!includeDupes) {
		d = stripDuplicateEntries(d);
	}

	return d;
}

export function leadingZeroes(num: number, size: number = 4) {
	return num.toString().padStart(size, "0");
}

export function hideJSX(expr: boolean, inverted: boolean, displayVal: DisplayProps = "block") {
	if (inverted) {
		expr = !expr;
	}
	return { display: expr ? displayVal : "none" };
}

export function range(start: number, stop: number): number[] {
	let numArray: any[] = new Array(stop - start);

	for (let i = start; i <= stop; i++) {
		numArray.push(i);
	}
	return numArray;
}
