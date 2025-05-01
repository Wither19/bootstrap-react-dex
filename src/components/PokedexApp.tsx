import React, { useEffect, useState } from "react";

import axios from "axios";

import _ from "lodash";

import PokemonMenu from "./PokemonMenu";
import PokedexItem from "./PokedexItem";

import { PokemonProvider } from "../contexts/PokemonContext";

import type { PokedexEntry } from "../types/types";
import { Region } from "../types/types";

// List of regions with start and end IDs
const regions = [
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
	const [pokedex, setPokedex] = useState<PokedexEntry[]>([]);

	// Fetches the pokedex data from PokeAPI, and sets the state to a lodash ordered array of the pokemon entries
	useEffect(() => {
		const url = "https://pokeapi.co/api/v2/pokedex/1";
		axios.get(url).then((response) => {
			setPokedex(
				_.orderBy(response.data.pokemon_entries, [pokedexSort], sortOrder)
			);
		});
	}, []);

	// The value for the dropdown (select element) that determines the region to filter. This further filters results with search.
	const [regionDropdown, setRegionDropdown] = useState<Region>(Region.None);
	// The text for the search bar.
	const [searchText, setSearchText] = useState<string>("");

	// The characteristic to sort for (either is set to the Pokédex # or Alphabetical).
	const [sortType, setSortType] = useState<string>("dex");
	// A boolean value as to whether sorting is ascending or descending.
	const [sortOrder, setSortOrder] = useState<boolean>(false);

	// The name of the Pokémon last clicked on, which is passed to the menu.
	const [selectedName, setName] = useState<string>("bulbasaur");
	// The Dex # is also passed to the menu.
	const [selectedNumber, setNumber] = useState<number>(1);

	// Ternary to decide sort type based on dropdown selection
	const pokedexSort: string =
		sortType == "dex" ? "entry_number" : "pokemon_species.name";

	/**
	 * Searches for a string based upon a string name and/or a number ID.
	 * @param name {string}
	 * @param id {number}
	 * @returns {boolean} A boolean for if either a string or number was found.
	 */
	const nameIdSearch = (name: string, id: number) => {
		var retValue = false;
		if (name.includes(searchText) || id.toString().includes(searchText)) {
			retValue = true;
		}
		return retValue;
	};

	/**
	 * An abstracted function for region filtering in the Pokédex list.
	 * @param id {number} The National Pokédex number to filter by.
	 * @returns {boolean} A boolean for if the Dex number given is in 'currentRegion'.
	 */
	const isInRegion = (id: number) => {
		var retValue = false;
		const currentRegion: any = regions?.find(
			(r) => r.name.toLowerCase() == regionDropdown
		);

		if (id >= currentRegion.start && id <= currentRegion.end) {
			retValue = true;
		}

		return retValue;
	};

	// Updates the sorted dex state after a sort type or sort order change, as well as when region filters or search terms are used

	const setSortedDex = () => {
		setPokedex((prev) => _.orderBy(prev, [pokedexSort], sortOrder));
	};

	useEffect(setSortedDex, [sortType, sortOrder, regionDropdown, searchText]);

	return (
		<>
			<div className="d-flex flex-wrap flex-row">
				<div style={{ flexBasis: "25%" }}>
					<div className="m-1">
						<div className="input-group">
							<button
								type="button"
								className="btn btn-outline-secondary"
								onClick={() => {
									setSortOrder((prev) => !prev);
								}}>
								<i
									className={`bi bi-sort-${
										sortType == "dex" ? "numeric" : "alpha"
									}-${sortOrder ? "down" : "up"}`}></i>
							</button>

							<input
								className="pokemon-searchbar"
								type="text"
								placeholder="Search to filter Pokémon"
								onKeyUp={(e: any) => {
									if (e.which == 13 || e.target.value == "") {
										setSearchText(e.target.value.toLowerCase());
									}
								}}
							/>
						</div>
					</div>
					<div>
						<div>
							<div className="form-group mb-4">
								<label htmlFor="regionSelect">Select Region</label>
								<select
									className="form-control"
									id="regionSelect"
									value={regionDropdown}
									onChange={(e: any) => {
										setRegionDropdown(e.target.value);
									}}>
									<option value="">All Regions</option>
									{regions
										.filter((_, index) => index != 0)
										.map((region) => (
											<option
												key={region.name}
												value={region.name.toLowerCase()}>
												{region.name}
											</option>
										))}
								</select>
							</div>
						</div>
					</div>
					<div>
						<div className="list-group">
							{pokedex
								.filter((pokemon, index) => {
									var retValue = false;
									// When search terms are active WITHOUT region filtering:
									if (searchText != "" && regionDropdown == "") {
										retValue = nameIdSearch(
											pokemon.pokemon_species.name,
											pokemon.entry_number
										);
										// When region filtering is active WITHOUT search terms:
									} else if (searchText == "" && regionDropdown != "") {
										retValue = isInRegion(pokemon.entry_number);
									}
									// When both search terms and region filtering are active:
									else if (searchText != "" && regionDropdown != "") {
										retValue =
											nameIdSearch(
												pokemon.pokemon_species.name,
												pokemon.entry_number
											) && isInRegion(pokemon.entry_number);
									} else {
										retValue = true;
									}
									return retValue;
								})
								.map((pokemon, index) => (
									<PokedexItem
										key={pokemon.pokemon_species.name}
										num={pokemon.entry_number}
										name={pokemon.pokemon_species.name}
										selected={
											selectedNumber == pokemon.entry_number ? true : false
										}
										click={() => {
											setName(pokemon.pokemon_species.name);
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
