<script lang="ts">
	import _ from "lodash";

	import { PokeAPI } from "pokeapi-typescript";

	// import PokemonMenu from "./components/PokemonMenu";
	// import PokedexItem from "./components/PokedexItem";

	import type { PokemonEntry } from "pokeapi-typescript";
	import { Region } from "./types/types";

	type RegionObj = {
		name: string;
		start: number;
		end: number;
	};

	// List of regions with start and end IDs
	const regions: RegionObj[] = [
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

	var pokedex = $state<PokemonEntry[]>([]);
	var currentRegion = $state<Region>(Region.None);
	var searchString = $state<string>("");
	// var sortType = $state<string>("dex")
	var sortOrder = $state<boolean>(false);

	var selectedName = $state<string>("bulbasaur");
	var selectedNum = $state<number>(1);

	// const dexSort = $derived(sortType == "dex" ? "entry_number" : "pokemon_species.name");

	/**
	 * Searches for a string based upon a string name and/or a number ID.
	 * @param name {string}
	 * @param id {number}
	 * @returns {boolean} A boolean for if either a string or number was found.
	 */
	const nameIdSearch = (name: string, id: number) => {
		var retValue = false;
		if (name.includes(searchString) || id.toString().includes(searchString)) {
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
		const thisRegion: RegionObj | undefined = regions!.find(
			(r) => r.name.toLowerCase() == currentRegion
		);

		if (id >= thisRegion!.start && id <= thisRegion!.end) {
			retValue = true;
		}

		return retValue;
	};
</script>

<div class="container-md"></div>
