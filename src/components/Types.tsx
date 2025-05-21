import { type PokemonType } from "pokeapi-typescript";

import TypeIcon from "./TypeIcon";

type TypesProps = {
	types: PokemonType[];
};

function Types({ types }: TypesProps) {
	return <>{types && types.map((type, index) => <TypeIcon name={type.type.name} />)}</>;
}

export default Types;
