import { useEffect, useState } from "react";

import axios from "axios";

import capitalize from "capitalize";

import { motion } from "motion/react";

// Function to capitalize the first letter of a string

// Adds leading zeroes to a number until it is four digits long

const leadingZeroes = (num, size) => {
	return num.toString().padStart(size, 0);
};

function PokedexItem(props) {
	const [pkmn, setPkmn] = useState({});
	const [itemShiny, setShinyState] = useState(false);

	return (
		<>
			<motion.div
				key={props.name}
				className="list-group-item pokemon-list-item"
				onClick={props.click}>
				<motion.img
					src={`https://raw.githubusercontent.com/Wither19/pokerogue/refs/heads/main/public/images/pokemon/icons/${props.num}.png`}
					className="sprite"
					whileHover={{
						scale: 1.1,
						transition: { type: "spring", duration: 0.55, bounce: 0.7 },
					}}
				/>
				<div className="card-body">
					<b>#{leadingZeroes(props.num, 4)}</b> -{" "}
					<span className="card-title text-nowrap">
						{capitalize(props.name.replace("-", " "))}
					</span>
				</div>
			</motion.div>
		</>
	);
}

export default PokedexItem;
