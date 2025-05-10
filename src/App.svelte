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
</script>

<div class="container-md"></div>
