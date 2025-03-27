import React, { useContext } from "react";

function PokemonMenu() {
	const pkmn = useContext(PokemonContext);
	const display = useContext(DisplayContext);

	return (
		<div style={{ display: display ? "block" : "none" }}>
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
		</div>
	);
}

export default PokemonMenu;
