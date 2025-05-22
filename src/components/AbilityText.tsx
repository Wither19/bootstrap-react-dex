import { useEffect, useState } from "react";
import { PokeAPI, type Ability } from "pokeapi-typescript";

import { getSingleLangEntry } from "../functions";

import { ListItem, ListItemText } from "@mui/material";

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

	useEffect(() => abilityGet, [props]);

	return (
		<>
			<ListItem onClick={handleShowEffect}>
				<ListItemText
					sx={{ textTransform: "capitalize", cursor: "pointer", userSelect: "none" }}
					secondary={effectDisplay ? abilityEffect : ""}>
					{props.hidden && <b>(H) </b>}
					{props.name.replace("-", " ")}
				</ListItemText>
			</ListItem>
		</>
	);
}

export default AbilityText;
