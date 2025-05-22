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

	function abilityGet() {
		PokeAPI.Ability.fetch(props.name!).then((res: Ability) => {
			let entry = getSingleLangEntry(res.effect_entries, "en");
			setAbilityEffect(entry.effect);
		});
	}

	return (
		<>
			<ListItem>
				<ListItemText sx={{ textTransform: "capitalize" }}>
					{props.hidden ? (
						<>
							<b>(H)</b>{" "}
						</>
					) : (
						""
					)}
					{props.name.replace("-", " ")}
					<sub>{abilityEffect!}</sub>
				</ListItemText>
			</ListItem>
		</>
	);
}

export default AbilityText;
