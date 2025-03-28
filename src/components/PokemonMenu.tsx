import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { PokemonContext } from "../contexts/PokemonContext";

function PokemonMenu() {
	const pokemon = useContext(PokemonContext);

	const [pkmnGeneral, setGeneralData] = useState({});
	const [pkmnSpecies, setSpeciesData] = useState({});

	const [isShiny, setShinyState] = useState(false);
	const artworkType = isShiny ? "shiny/" : "";

	useEffect(() => {
		axios
			.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
			.then((response) => {
				setGeneralData(response.data);
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
						<div
							onClick={() => setShinyState((prev) => !prev)}
							style={{ textAlign: "center" }}>
							<img
								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${artworkType}${pkmnGeneral?.id}.png`}
								className={`artwork ${isShiny ? "shiny" : "regular"}`}
							/>
						</div>
					</>
				)}
			</PokemonContext.Provider>
		</>
	);
}

export default PokemonMenu;
