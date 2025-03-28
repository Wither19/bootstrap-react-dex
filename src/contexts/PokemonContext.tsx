import React, { createContext } from "react";

export const PokemonContext = createContext<null | string>(null);

function PokemonProvider(props) {
	return (
		<PokemonContext.Provider value={props.val}>
			{props.children}
		</PokemonContext.Provider>
	);
}

export { PokemonProvider };
