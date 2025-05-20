import React, { useEffect, useState } from "react";
import _, { capitalize } from "lodash";

import { PokeAPI, type PokemonEntry } from "pokeapi-typescript";
import { Region, type RegionObj } from "./types.ts";
import { regions } from "./constants.ts";

import PkmnMenu from "./components/PkmnMenu";
import PokedexItem from "./components/PokedexItem";
import PkmnSearchBar from "./components/PkmnSearchBar";

import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from "@mui/material";

function App() {
	const [pokedex, setPokedex] = useState<PokemonEntry[]>([]);

	const [selectedNumber, setNumber] = useState<number>(1);

	const [regionDropdown, setRegionDropdown] = useState<Region>(Region.None);
	const [searchText, setSearchText] = useState<string>("");

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
		let searchExp = nameIdSearch(pokemon.pokemon_species.name, pokemon.entry_number);
		let regionExp = isInRegion(pokemon.entry_number);

		// True values mean no filtering
		let searchFiltered: boolean = true;
		let regionFiltered: boolean = true;

		if (searchText) {
			searchFiltered = searchExp;
		}

		if (regionDropdown) {
			regionFiltered = regionExp;
		}

		return searchFiltered && regionFiltered;
	}

	function getDex() {
		PokeAPI.Pokedex.fetch(1).then((res) => setPokedex(res.pokemon_entries));
	}

	function resetStartingEntry() {
		setNumber(getCurrentRegion().start);
	}

	function handleSearchType(
		e: React.KeyboardEvent<HTMLInputElement> & React.ChangeEvent<HTMLInputElement>
	) {
		if (e.which == 13 || !e.target.value) {
			setSearchText(e.target.value);
		}
	}

	function handleRegionChange(e: SelectChangeEvent) {
		setRegionDropdown(e.target.value as Region);
	}

	function handleClickPkmnEntry(num: number) {
		setNumber(num);
	}

	useEffect(getDex, []);
	useEffect(resetStartingEntry, [regionDropdown]);

	return (
		<div className="pokedex-app-container">
			<PkmnSearchBar typing={handleSearchType} />
			<div className="region-select">
				<FormControl fullWidth>
					<InputLabel id="region-select-label">Region</InputLabel>
					<Select
						labelId="region-select-label"
						id="region-select"
						value={regionDropdown}
						label="Region"
						onChange={handleRegionChange}>
						{regions.map((region) => (
							<MenuItem value={region.name.toLowerCase()}>{region.name || "All"}</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>
			<div className="pkmn-list">
				{pokedex &&
					_.filter(pokedex, (entry) => dexFilter(entry)).map((entry) => (
						<PokedexItem
							key={`pkmn-entry-${entry.entry_number}`}
							num={entry.entry_number}
							name={entry.pokemon_species.name}
							click={() => handleClickPkmnEntry(entry.entry_number)}
						/>
					))}
			</div>
		</div>
	);
}

export default App;
