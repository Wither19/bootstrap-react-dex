import { type PokemonType } from "pokeapi-typescript";

import TypeIcon from "./TypeIcon";

type TypesProps = {
	types: PokemonType[];
};

function Types({ types }: TypesProps) {
	return <div>{types && types.map((type, index) => <TypeIcon name={type.type.name} />)}</div>;
}

export default Types;
