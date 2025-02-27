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
	const [cardBack, cardFlip] = useState(false);

	const getPkmn = () => {
		axios.get(`https://pokeapi.co/api/v2/pokemon/${props.num}`).then((res) => {
			setPkmn(res.data);
		});
	};

	const cardClickHandler = () => {
		if (Object.keys(pkmn).length === 0) {
			getPkmn();
		}
		cardFlip((prev) => !prev);
	};

	return (
		<motion.div
			key={props.name}
			className={`card pokemon-list-item ${props.itemSize}`}
			onClick={cardClickHandler}>
			<motion.img
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${props.num}.png`}
				className="card-img-top sprite"
				whileHover={{
					scale: 1.1,
					transition: { type: "spring", duration: 0.55, bounce: 0.7 },
				}}
			/>
			<div className="card-body">
				<b>#{leadingZeroes(props.num, 4)}</b>
				<h5 className="card-title">
					{capitalize(props.name.replace("-", " "))}
				</h5>
			</div>
		</motion.div>
	);
}

export default PokedexItem;
