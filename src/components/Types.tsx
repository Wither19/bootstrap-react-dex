import { type PokemonType } from "pokeapi-typescript";

type TypesProps = {
	types: PokemonType[];
};

function Types({ types }: TypesProps) {
	return <>{types && types.map((type, index) => <div>{type.type.name}</div>)}</>;
}

export default Types;
