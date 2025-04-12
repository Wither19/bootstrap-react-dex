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

export type PokemonSpecies = {
	genus: string;
};


type PokemonStat = {
	
      "base_stat": number,
      "effort": 0,
      "stat": {
        "name": string,
        "url": string
      }
  
};