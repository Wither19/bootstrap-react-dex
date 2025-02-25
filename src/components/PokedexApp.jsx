import React from "react";

import { useEffect, useState, useContext } from "react";

import axios from "axios";

import _ from "lodash";

import PokemonMenu from "./PokemonMenu";
import { start } from "@popperjs/core";

import * as motion from "motion/react-client";

const regions = [
	{ name: "", start: 1, end: 1025 },
	{ name: "Kanto", start: 1, end: 151 },
	{ name: "Johto", start: 152, end: 251 },
	{ name: "Hoenn", start: 252, end: 386 },
	{ name: "Sinnoh", start: 387, end: 493 },
	{ name: "Unova", start: 494, end: 649 },
	{ name: "Kalos", start: 650, end: 721 },
	{ name: "Alola", start: 722, end: 809 },
	{ name: "Galar", start: 810, end: 898 },
	{ name: "Hisui", start: 899, end: 905 },
	{ name: "Paldea", start: 906, end: 1025 },
];

/*     
		• Small, Medium, Large and List viewpoints for list items | Done!
    • Search bar that filters list results | Done!
    • (BS5) Dropdown to filter by region (ideally, independent of the search bar) | Done!
    • Ascending-Descending Sort menu: Dex # (Default), A-Z | Done!
*/

// Function to capitalize the first letter of a string

const caps = (text) => {
	if (typeof text !== "string") {
		return "";
	} else {
		return text.charAt(0).toUpperCase() + text.slice(1);
	}
};

// Adds leading zeroes to a number until it is four digits long

const leadingZeroes = (num, size) => {
	return num.toString().padStart(size, 0);
};

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

	// Ternary to decide sort type based on dropdown selection

	const pokedexSort =
		sortType == "dex" ? "entry_number" : "pokemon_species.name";

	// Updates the sorted dex state after a sort type or sort order change, as well as when region filters or search terms are used

	const setSortedDex = () => {
		setPokedex((prev) => _.orderBy(prev, [pokedexSort], sortOrder));
	};

	useEffect(setSortedDex, [sortType, sortOrder, regionDropdown, searchText]);

	return (
		<>
			<div>
				<div className="row">
					{/* Searchbar */}
					<div className="input-group mb-3">
						<span className="input-group-text" id="basic-addon1">
							<i className="bi bi-search"></i>
						</span>
						<input
							className="pokemon-searchbar"
							type="text"
							placeholder="Search to filter Pokemon..."
							onKeyUp={(e) => {
								if (e.which == 13 || e.target.value == "") {
									setSearchText(e.target.value.toLowerCase());
								}
							}}
						/>
					</div>
				</div>
				<div className="row">
					{/* Region Select */}
					<div className="form-group mb-4 col-4">
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
					{/* List View Select */}
					<div className="form-group mb-4 col-4">
						<label htmlFor="regionSelect">List View</label>
						<select
							className="form-control"
							id="regionSelect"
							value={listSize}
							onChange={(e) => {
								setListSize(e.target.value);
							}}>
							<option value="sm">Small</option>
							<option value="md">Medium</option>
							<option value="lg">Large</option>
						</select>
					</div>
					<div className="mb-4 col-3">
						<label htmlFor="sortSelect">Sort by</label>
						<select
							className="form-control"
							id="sortSelect"
							value={sortType}
							onChange={(e) => {
								setSortType(e.target.value);
							}}>
							<option value="dex">Dex #</option>
							<option value="alpha">A-Z</option>
						</select>
					</div>
					<div className="col-1 my-4 mx-0">
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
					</div>
				</div>
				<div className="pokemon-list d-flex flex-wrap justify-content-evenly">
					{pokedex
						.filter((pokemon, index) => {
							var retValue = false;
							// When search terms are active WITHOUT region filtering:
							if (searchText != "" && regionDropdown == "") {
								retValue =
									pokemon.pokemon_species.name.includes(searchText) ||
									pokemon.entry_number.toString().includes(searchText);
								// When region filtering is active WITHOUT search terms:
							} else if (searchText == "" && regionDropdown != "") {
								retValue =
									pokemon.entry_number >=
										regions.find(
											(region) => region.name.toLowerCase() == regionDropdown
										).start &&
									pokemon.entry_number <=
										regions.find(
											(region) => region.name.toLowerCase() == regionDropdown
										).end;
							}
							// When both search terms and region filtering are active:
							else if (searchText != "" && regionDropdown != "") {
								retValue =
									(pokemon.pokemon_species.name.includes(searchText) ||
										pokemon.entry_number.toString().includes(searchText)) &&
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
							<div
								className={`${
									listSize == "sm"
										? "col-1"
										: listSize == "md"
										? "col-2"
										: "col-3"
								} m-4`}>
								<div
									key={pokemon.pokemon_species.name}
									className={`card pokemon-list-item ${listSize}`}>
									<motion.img
										src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.entry_number}.png`}
										className="card-img-top"
										whileHover={{
											duration: 0.4,
											scale: {
												type: "spring",
												visualDuration: 0.4,
												bounce: 0.5,
											},
										}}
									/>
									<div className="card-body">
										<b>#{leadingZeroes(pokemon.entry_number, 4)}</b>{" "}
										<p className="card-text">
											{caps(pokemon.pokemon_species.name.replace("-", " "))}
										</p>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
			<PokemonMenu />
		</>
	);
}

export default PokedexApp;
