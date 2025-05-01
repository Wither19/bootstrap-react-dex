export type PokedexEntry = {
	entry_number: number;
	pokemon_species: {
		name: string;
	};
};

export type PokemonGeneral = {
	id: number;
	name: string;
	stats: PokemonStat[];
	// Add other properties as needed
};

export type Stats = {
	base_stat: number;
	effort: number;
	stat: {
		name: string;
		url: string;
	};
};

type PokemonStat = {
	base_stat: number;
	effort: 0;
	stat: {
		name: string;
		url: string;
	};
};

export type PokemonSpecies = {
	genus: string;
	dex_entries: DexEntry[];
};

export type DexEntry = {
	flavor_text: string;
	language: {
		name: string;
		url: string;
	};
	version: {
		name: string;
		url: string;
	};
};

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

export type Genus = {
	genus: string;
	language: {
		name: string;
		url: string;
	};
};
