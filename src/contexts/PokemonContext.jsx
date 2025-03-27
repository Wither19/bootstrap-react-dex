import React, { createContext } from "react";

export const PokemonContext = createContext();

function PokemonProvider(props) {
	return (
		<PokemonContext.Provider value={props.val}>
			{props.children}
		</PokemonContext.Provider>
	);
}

export { PokemonProvider };
