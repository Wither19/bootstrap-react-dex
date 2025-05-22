import { Typography } from "@mui/material";

type PokedexEntryProps = {
	children: string;
	game: string;
};

function PokedexEntry(props: PokedexEntryProps) {
	return (
		<>
			<div style={{ textAlign: "center", margin: "1em" }}>
				<Typography variant="body1">{props.children}</Typography>
				<Typography variant="caption">Pokemon {props.game}</Typography>
			</div>
		</>
	);
}

export default PokedexEntry;
