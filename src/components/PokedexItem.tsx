import { useState } from "react";

import capitalize from "lodash";

// Adds leading zeroes to a number until it is four digits long
const leadingZeroes = (num: number, size: number) => {
	return num.toString().padStart(size, "0");
};

type PokedexItemProps = {
	num: number;
	name: string;
	selected: boolean;
	click: (event: React.MouseEvent<HTMLDivElement>) => void;
};

function PokedexItem({ num, name, selected, click }: PokedexItemProps) {
	const [pkmn, setPkmn] = useState({});
	const [itemShiny, setShinyState] = useState(false);

	const dexItemStyles = `list-group-item ${selected ? "active" : ""} pokemon-list-item`;

	const pkmnSprite = `https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/${name}.avif`;

	return (
		<>
			<div key={name} className={dexItemStyles} onClick={click}>
				<img src={pkmnSprite} className="sprite" />

				<div className="card-body">
					<b>#{leadingZeroes(num, 4)}</b> -{" "}
					<span className="card-title text-nowrap">{capitalize(name.replace("-", " "))}</span>
				</div>
			</div>
		</>
	);
}

export default PokedexItem;
