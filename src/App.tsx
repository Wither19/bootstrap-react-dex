import "./scss/App.scss";

import React, { useEffect, useState } from "react";

import _, { capitalize } from "lodash";

import { PokeAPI, type PokemonEntry } from "pokeapi-typescript";

import PkmnMenu from "./components/PkmnMenu";
import PokedexItem from "./components/PokedexItem";
import PkmnSearchBar from "./components/PkmnSearchBar";

import { Region, type RegionObj } from "./types.ts";

import { regions } from "./constants.ts";

import { getDex } from "./functions.ts";

import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from "@mui/material";

// List of regions with start and end IDs

/*     
		• Todos go here!
*/

function App() {
	const [pokedex, setPokedex] = useState<PokemonEntry[]>([]);

	const [regionDropdown, setRegionDropdown] = useState<Region>(Region.None);

	const [searchText, setSearchText] = useState<string>("");

	const [selectedNumber, setNumber] = useState<number>(1);

	function nameIdSearch(name: string, id: number) {
		return name.includes(searchText) || id.toString().includes(searchText);
	}

	function getCurrentRegion() {
		return regions!.find((r) => r.name.toLowerCase() == regionDropdown) as RegionObj;
	}

	function isInRegion(id: number) {
		const currentRegion = getCurrentRegion();

		return id >= currentRegion!.start && id <= currentRegion!.end;
	}

	function dexFilter(pokemon: PokemonEntry) {
		let retValue = false;

		// When search terms are active WITHOUT region filtering:
		if (searchText != "" && regionDropdown == "") {
			return nameIdSearch(pokemon.pokemon_species.name, pokemon.entry_number);
		}

		// When region filtering is active WITHOUT search terms:
		else if (searchText == "" && regionDropdown != "") {
			return isInRegion(pokemon.entry_number);
		}

		// When both search terms and region filtering are active:
		else if (searchText != "" && regionDropdown != "") {
			return (
				nameIdSearch(pokemon.pokemon_species.name, pokemon.entry_number) &&
				isInRegion(pokemon.entry_number)
			);
		} else {
			return true;
		}
	}

	useEffect(getDex, []);
	useEffect(() => setNumber(getCurrentRegion().start), [regionDropdown]);

	return <h1>Hello World!</h1>;
}

export default App;
