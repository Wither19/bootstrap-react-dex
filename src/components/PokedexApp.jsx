import React, { useEffect, useState } from "react";

import axios from "axios";

import _ from "lodash";

import PokemonMenu from "./PokemonMenu";
import PokedexItem from "./PokedexItem";

import { PokemonProvider } from "../contexts/PokemonContext";

import { start } from "@popperjs/core";

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
	const [pokedex, setPokedex] = useState([]);

	// Fetches the pokedex data from PokeAPI and sets the state to a lodash ordered array of the pokemon entries

	useEffect(() => {
		const url = "https://pokeapi.co/api/v2/pokedex/1";
		axios.get(url).then((response) => {
			setPokedex(
				_.orderBy(response.data.pokemon_entries, [pokedexSort], sortOrder)
			);
		});
	}, []);

	const [regionDropdown, setRegionDropdown] = useState("");
	const [searchText, setSearchText] = useState("");

	const [listSize, setListSize] = useState("md");
	const [sortType, setSortType] = useState("dex");
	const [sortOrder, setSortOrder] = useState("asc");

	const [selectedName, setName] = useState("bulbasaur");
	const [selectedNumber, setNumber] = useState(1);

	// Ternary to decide sort type based on dropdown selection

	const pokedexSort =
		sortType == "dex" ? "entry_number" : "pokemon_species.name";

	const nameIdSearch = (name, id, searchTerm) => {
		var retValue = false;
		if (name.includes(searchTerm) || id.toString().includes(searchTerm)) {
			retValue = true;
		}
		return retValue;
	};

	const isInRegion = (id, list, region) => {
		var retValue = false;
		if (
			id >= list?.find((region) => region.name.toLowerCase() == region).start &&
			id <= list?.find((region) => region.name.toLowerCase() == region).end
		) {
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
			<div className="row">
				<div className="col-4 m-1">
					<div className="input-group">
						<button
							type="button"
							className="btn btn-outline-secondary"
							onClick={() => {
								setSortOrder((prev) => (prev == "asc" ? "desc" : "asc"));
							}}>
							<i
								className={`bi bi-sort-${
									sortType == "dex" ? "numeric" : "alpha"
								}-${sortOrder == "asc" ? "up" : "down"}`}></i>
						</button>

						<input
							className="pokemon-searchbar"
							type="text"
							placeholder="Search to filter Pokémon"
							onKeyUp={(e) => {
								if (e.which == 13 || e.target.value == "") {
									setSearchText(e.target.value.toLowerCase());
								}
							}}
						/>
					</div>
				</div>
				<div className="col-4">
					<div className="form-group mb-4">
						<label htmlFor="regionSelect">Select Region</label>
						<select
							className="form-control"
							id="regionSelect"
							value={regionDropdown}
							onChange={(e) => {
								setRegionDropdown(e.target.value);
							}}>
							<option value="">All Regions</option>
							{regions
								.filter((_, index) => index != 0)
								.map((region) => (
									<option key={region.name} value={region.name.toLowerCase()}>
										{region.name}
									</option>
								))}
						</select>
					</div>
				</div>
				<div className="col-4">
					<div className="form-group mb-4">
						<label htmlFor="listViewSelect">List View</label>
						<select
							className="form-control"
							id="listViewSelect"
							value={listSize}
							onChange={(e) => {
								setListSize(e.target.value);
							}}>
							<option value="md">Medium</option>
							<option value="lg">Large</option>
						</select>
					</div>
				</div>
			</div>

			<div className="col-4">
				<div className="list-group">
					{pokedex
						.filter((pokemon, index) => {
							var retValue = false;
							// When search terms are active WITHOUT region filtering:
							if (searchText != "" && regionDropdown == "") {
								retValue = nameIdSearch(
									pokemon.pokemon_species.name,
									pokemon.entry_number,
									searchText
								);
								// When region filtering is active WITHOUT search terms:
							} else if (searchText == "" && regionDropdown != "") {
								isInRegion(pokemon.entry_number, regions, regionDropdown);
							}
							// When both search terms and region filtering are active:
							else if (searchText != "" && regionDropdown != "") {
								retValue =
									nameIdSearch(
										pokemon.pokemon_species.name,
										pokemon.entry_number,
										searchText
									) &&
									pokemon.entry_number >=
										regions.find(
											(region) => region.name.toLowerCase() == regionDropdown
										).start &&
									pokemon.entry_number <=
										regions.find(
											(region) => region.name.toLowerCase() == regionDropdown
										).end;
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
								selected={selectedNumber == pokemon.entry_number ? true : false}
								itemSize={listSize}
								click={() => {
									setName(pokemon.pokemon_species.name);
									setNumber(pokemon.entry_number);
								}}
							/>
						))}
				</div>
				<div className="col-2 my-3">
					<PokemonProvider val={selectedName}>
						<PokemonMenu />
					</PokemonProvider>
				</div>
			</div>
		</>
	);
}

export default PokedexApp;
