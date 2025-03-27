import React, { useContext } from "react";
import { PokemonContext } from "../contexts/PokemonContext";

function PokemonMenu() {
	const pkmn = useContext(PokemonContext);

	return (
		<div>
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
				<h1>{pkmn}</h1>
			</PokemonContext.Provider>
		</div>
	);
}

export default PokemonMenu;
