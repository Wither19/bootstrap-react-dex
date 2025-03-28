import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { PokemonContext } from "../contexts/PokemonContext";

function PokemonMenu() {
	const pokemon = useContext(PokemonContext);

	const [pkmnGeneral, setGeneralData] = useState({});
	const [pkmnSpecies, setSpeciesData] = useState({});

	const [isShiny, setShinyState] = useState(false);
	const artworkType = isShiny ? "front_shiny" : "front_default";

	useEffect(() => {
		axios
			.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
			.then((response) => {
				setGeneralData(response.data);
				console.log(response.data.sprites.other.home["front_default"]);
			})
			.catch(() => alert("Could not load Pokemon data!"));

		axios
			.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`)
			.then((response) => {
				setGeneralData(response.data);
			})
			.catch(() => alert("Could not load Pokemon species data!"));
	}, [pokemon]);

	return (
		<>
			<PokemonContext.Provider>
				{/* 
	    • Core information
        ◦ Name
        ◦ Genus
        ◦ Types
        ◦ Abilities
    • All available Dex entries for the Pokémon
    • In the interest of condensing the menu, only feature Pokémon HOME artwork
    • Click Sprite to toggle shiny
    • Make Pokémon name header turn gold with shiny toggle (Framer Motion animated shiny icon)
		 */}
				{pkmnGeneral && (
					<>
						<div className="display-5 pkmn-name-header">
							#{pkmnGeneral.id?.toString().padStart(4, "0")}
							{" - "}
							{pkmnGeneral.name?.replace("-", " ")}
						</div>
						<img
							src={pkmnGeneral?.sprites?.other?.home[artworkType]}
							className="artwork"
						/>
					</>
				)}
			</PokemonContext.Provider>
		</>
	);
}

export default PokemonMenu;
