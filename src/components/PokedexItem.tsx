import { useState } from "react";

import capitalize from "capitalize";

import { motion } from "motion/react";

// Function to capitalize the first letter of a string

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

	return (
		<>
			<motion.div
				key={name}
				className={`list-group-item ${
					selected ? "active" : ""
				} pokemon-list-item`}
				onClick={click}>
				<motion.img
					src={`https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/${name}.avif`}
					className="sprite"
					whileHover={{
						scale: 1.1,
						transition: { duration: 0.55 },
					}}
				/>
				<div className="card-body">
					<b>#{leadingZeroes(num, 4)}</b> -{" "}
					<span className="card-title text-nowrap">
						{capitalize(name.replace("-", " "))}
					</span>
				</div>
			</motion.div>
		</>
	);
}

export default PokedexItem;
