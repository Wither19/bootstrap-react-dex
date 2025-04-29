import { createContext } from "react";

export const PokemonContext = createContext<null | string>(null);

function PokemonProvider({ val, children }: { val: string; children: any }) {
	return (
		<PokemonContext.Provider value={val}>{children}</PokemonContext.Provider>
	);
}

export { PokemonProvider };
