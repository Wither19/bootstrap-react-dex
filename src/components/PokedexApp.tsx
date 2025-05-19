import React, { useEffect, useState } from "react";

import _, { capitalize } from "lodash";

import { PokeAPI, type PokemonEntry } from "pokeapi-typescript";

import PokemonMenu from "./PokemonMenu";
import PokedexItem from "./PokedexItem";
import PkmnSearchBar from "./PkmnSearchBar";

import { PokemonProvider } from "../contexts/PokemonContext";

import { Region, type RegionObj } from "../types/types";

import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from "@mui/material";


// List of regions with start and end IDs
export const regions: RegionObj[] = [
	{ name: "", start: 1, end: 1025 },
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

/*     
		• Todos go here!
*/

function PokedexApp() {
	const [pokedex, setPokedex] = useState<Array<PokemonEntry>>([]);

	// Fetches the pokedex data from PokeAPI, and sets the state to a lodash ordered array of the pokemon entries
	useEffect(() => {
		PokeAPI.Pokedex.fetch(1).then((res) => {
			setPokedex(_.orderBy(res.pokemon_entries, [pokedexSort], sortOrder));
		});
	}, []);

	// The value for the dropdown (select element) that determines the region to filter. This further filters results with search.
	const [regionDropdown, setRegionDropdown] = useState<Region>(Region.None);

	const selectRegionValue = (e: SelectChangeEvent) => {
		setRegionDropdown(e.target.value as Region);
	}

	// The text for the search bar.
	const [searchText, setSearchText] = useState<string>("");

	// The characteristic to sort for (either is set to the Pokédex # or Alphabetical).
	const [sortType, setSortType] = useState<string>("dex");
	// A boolean value as to whether sorting is ascending or descending.
	const [sortOrder, setSortOrder] = useState<boolean>(false);

	// The Dex # is passed to the menu to load the Pokémon's Data.
	const [selectedNumber, setNumber] = useState<number>(1);

	// Ternary to decide sort type based on dropdown selection
	const pokedexSort: string = sortType == "dex" ? "entry_number" : "pokemon_species.name";

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

	// Updates the sorted dex state after a sort type or sort order change, as well as when region filters or search terms are used

	const setSortedDex = () => {
		setPokedex((prev) => _.orderBy(prev, [pokedexSort], sortOrder));
	};

	useEffect(() => setNumber(getCurrentRegion().start), [regionDropdown]);

	useEffect(setSortedDex, [sortType, sortOrder, regionDropdown, searchText]);

	function dexFilter(pokemon: PokemonEntry) {
		let retValue = false;

		// When search terms are active WITHOUT region filtering:
		if (searchText != "" && regionDropdown == "") {
			retValue = nameIdSearch(pokemon.pokemon_species.name, pokemon.entry_number);
		}

		// When region filtering is active WITHOUT search terms:
		else if (searchText == "" && regionDropdown != "") {
			retValue = isInRegion(pokemon.entry_number);
		}

		// When both search terms and region filtering are active:
		else if (searchText != "" && regionDropdown != "") {
			retValue =
				nameIdSearch(pokemon.pokemon_species.name, pokemon.entry_number) &&
				isInRegion(pokemon.entry_number);
		} else {
			retValue = true;
		}

		return retValue;
	}



	return (
		<>
			<div style={{ margin: "2% 5%" }}>
				<div>
					<div style={{ margin: "24px auto" }}>
						<PkmnSearchBar
							typing={(e: any) => {
								if (e.which == 13 || e.target.value == "") {
									setSearchText(e.target.value.toLowerCase());
								}
							}}
						/>
					</div>
					<div>
						<div>
							<div>
							<FormControl fullWidth>
								<InputLabel id="region-select-label">Select Region</InputLabel>
								<Select
									labelId="region-select-label"
									id="region-select"
									value={regionDropdown}
									onChange={selectRegionValue}>
									<MenuItem value="">All Regions</MenuItem>
									{regions
										.filter((_, index) => index != 0)
										.map((region) => (
											 <MenuItem value={region.name.toLowerCase()}>{region.name}</MenuItem>
										))}
								</Select>
								</FormControl>
							</div>
						</div>
					</div>
					<div>
						<div className="pokemon-list">
							{_.filter(pokedex, (pokemon) => dexFilter(pokemon)).map((pokemon: any) => (
								<PokedexItem
									key={pokemon.pokemon_species.name}
									num={pokemon.entry_number}
									name={pokemon.pokemon_species.name}
									selected={selectedNumber == pokemon.entry_number}
									click={() => {
										setNumber(pokemon.entry_number);
									}}
								/>
							))}
						</div>
					</div>
				</div>
				<div style={{ flexBasis: "75%" }} className="my-3">
					<PokemonProvider val={selectedNumber.toString()}>
						<PokemonMenu />
					</PokemonProvider>
				</div>
			</div>
		</>
	);
}

export default PokedexApp;
