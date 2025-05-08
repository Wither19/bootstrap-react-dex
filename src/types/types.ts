import type { NamedApiResource, Language, Version } from "pokeapi-typescript";

export enum Region {
	None = "",
	Kanto = "kanto",
	Johto = "johto",
	Hoenn = "hoenn",
	Sinnoh = "sinnoh",
	Unova = "unova",
	Kalos = "kalos",
	Alola = "alola",
	Galar = "galar",
	Hisui = "hisui",
	Paldea = "paldea",
	Unknown = "unknown",
}

export type HasLanguage = {
	language: NamedApiResource<Language>;
};

export type HasVersion = {
	version: NamedApiResource<Version>;
};
