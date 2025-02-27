import { useEffect, useState } from "react";

import axios from "axios";

import { motion } from "motion/react";

// Function to capitalize the first letter of a string

const caps = (text) => {
	if (typeof text !== "string") {
		return "";
	} else {
		return text.charAt(0).toUpperCase() + text.slice(1);
	}
};

// Adds leading zeroes to a number until it is four digits long

const leadingZeroes = (num, size) => {
	return num.toString().padStart(size, 0);
};

function PokedexItem(props) {
	const [pkmn, setPkmn] = useState({});

	const getPkmn = () => {
		axios.get(`https://pokeapi.co/api/v2/pokemon/${props.num}`).then((res) => {
			setPkmn(res.data);
		});
	};

	return (
		<motion.div
			key={props.name}
			className={`card pokemon-list-item ${props.itemSize}`}
			onClick={getPkmn}>
			<motion.img
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${props.num}.png`}
				className="card-img-top"
				whileHover={{
					scale: 1.1,
					transition: { duration: 0.33, type: "spring" },
				}}
			/>
			<div className="card-body">
				<b>#{leadingZeroes(props.num, 4)}</b>{" "}
				<p className="card-text">{caps(props.name.replace("-", " "))}</p>
			</div>
		</motion.div>
	);
}

export default PokedexItem;
