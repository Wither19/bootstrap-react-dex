import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import Stat from "./Stat";

import { PokemonContext } from "../contexts/PokemonContext";

import type { PokemonGeneral, PokemonSpecies } from "../types/types";

function PokemonMenu() {
	const pokemon = useContext(PokemonContext);

	const [pkmnGeneral, setGeneralData] = useState<PokemonGeneral | null>(null);
	const [pkmnSpecies, setSpeciesData] = useState<PokemonSpecies | null>(null);

	const [isShiny, setShinyState] = useState(false);
	const artworkType = isShiny ? "shiny/" : "";

	useEffect(() => {
		axios
			.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
			.then((response) => {
				setGeneralData(response.data);
			})
			.catch(() => {});

		axios
			.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`)
			.then((response) => {
				setGeneralData(response.data);
			})
			.catch(() => {});
	}, [pokemon]);

	return (
		<>
			<PokemonContext.Provider value={pokemon}>
				{/* 
	    • Core information
        ◦ Name
        ◦ Genus
        ◦ Types
				{pkmnGeneral !== null && (
    • All available Dex entries for the Pokémon
    • In the interest of condensing the menu, only feature Pokémon HOME artwork
    • Click Sprite to toggle shiny
    • Make Pokémon name header turn gold with shiny toggle (Framer Motion animated shiny icon)
		 */}
				{pkmnGeneral && (
					<>
						<div
							className={`display-5 pkmn-name-header ${
								isShiny ? "shiny" : "regular"
							}`}>
							#{pkmnGeneral.id?.toString().padStart(4, "0")}
							{" - "}
							{pkmnGeneral.name?.replace("-", " ")}
						</div>
						<div
							onClick={() => setShinyState((prev) => !prev)}
							style={{ textAlign: "center" }}>
							<img
								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${artworkType}${pkmnGeneral?.id}.png`}
								className={`artwork ${isShiny ? "shiny" : "regular"}`}
							/>
						</div>
						<Stat name="hp" value={pkmnGeneral.stats[0].base_stat} />
						<Stat name="atk" value={pkmnGeneral.stats[1].base_stat} />
						<Stat name="def" value={pkmnGeneral.stats[2].base_stat} />
						<Stat name="sp-atk" value={pkmnGeneral.stats[3].base_stat} />
						<Stat name="sp-def" value={pkmnGeneral.stats[4].base_stat} />
						<Stat name="spd" value={pkmnGeneral.stats[5].base_stat} />
					</>
				)}
			</PokemonContext.Provider>
		</>
	);
}

export default PokemonMenu;
