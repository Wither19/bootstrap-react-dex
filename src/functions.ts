import _ from "lodash";

import { GameName } from "./types/types.ts";
import type { HasLanguage, HasVersion } from "./types/types.ts";

import type { FlavorText, PokemonStat, Genus } from "pokeapi-typescript";

export function fancifyGameName(name: string): GameName {
	type NameCode = keyof typeof GameName;
	return GameName[name as NameCode];
}

export function getLangEntries<T extends HasLanguage>(arr: T[], lang: string = "en"): T[] {
	return _.values(_.pickBy(arr, (item: T) => item.language.name === lang));
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

export const twoDGames = gbGames.concat(gbaGames).concat(dsGames);

export function removeVersions<T extends HasLanguage & HasVersion>(
	arr: T[],
	omissions: string[]
): T[] {
	return _.values(_.omitBy(arr, (item: T) => omissions.includes(item.version.name)));
}

export function stripDuplicateEntries(arr: FlavorText[]): typeof arr {
	return _.uniqBy(arr, (item) => item.flavor_text.replace("\n", ""));
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
	dupes?: boolean
): FlavorText[] {
	let d = getLangEntries(flavorText);

	d = removeVersions(d, omissions);

	if (!dupes) {
		d = stripDuplicateEntries(d);
	}

	return d;
}
