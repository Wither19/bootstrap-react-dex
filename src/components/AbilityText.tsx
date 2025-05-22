import { useEffect, useState } from "react";
import { PokeAPI, type Ability } from "pokeapi-typescript";

import { getSingleLangEntry } from "../functions";

import { ListItem, ListItemText, Box, Typography, Modal } from "@mui/material";

type AbilityProps = {
	name: string;
	url: string;
	hidden?: boolean;
};

function AbilityText(props: AbilityProps) {
	const [abilityEffect, setAbilityEffect] = useState<string>("");
	const [effectDisplay, setEffectDisplay] = useState<boolean>(false);

	function handleShowEffect() {
		setEffectDisplay((prev) => !prev);
	}

	function abilityGet() {
		PokeAPI.Ability.fetch(props.name!).then((res: Ability) =>
			setAbilityEffect(getSingleLangEntry(res.effect_entries, "en").effect)
		);
	}

	const abilityEntryStyles = { textTransform: "capitalize", cursor: "pointer", userSelect: "none" };
	const modalStyles = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, 0%)",
		width: 400,
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	};

	useEffect(() => abilityGet, [props]);

	return (
		<>
			<ListItem onClick={handleShowEffect}>
				<ListItemText sx={abilityEntryStyles}>
					{props.hidden && <b>(H) </b>}
					{props.name.replace("-", " ")}
				</ListItemText>
			</ListItem>
			<Modal sx={modalStyles} open={effectDisplay} onClick={handleShowEffect}>
				<Box sx={{ textTransform: "capitalize" }}>
					<Typography sx={{ textAlign: "center" }} variant="h5" component="h5">
						{props.name.replace("-", " ")}
					</Typography>
					<Typography variant="body1" component="p">
						{abilityEffect}
					</Typography>
				</Box>
			</Modal>
		</>
	);
}

export default AbilityText;
