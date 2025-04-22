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

type Stats = {
      "base_stat": number,
      "effort": number,
      "stat": {
        "name": string,
        "url": string
      }
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