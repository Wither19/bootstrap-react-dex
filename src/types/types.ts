export type PokedexEntry = {
	entry_number: number;
	pokemon_species: {
		name: string;
	};
};

export type PokemonGeneral = {
	id: number;
	name: string;
	stats: { any };
	// Add other properties as needed
};

export type PokemonSpecies = {
	genus: string;
};
