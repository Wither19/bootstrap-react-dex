import { Typography } from "@mui/material";

function PokedexEntry({ children, game }: { children: string; game: string }) {
	return (
		<>
			<div style={{ textAlign: "center", margin: "1em" }}>
				<Typography variant="body1">{children}</Typography>
				<Typography variant="caption">Pokemon {game}</Typography>
			</div>
		</>
	);
}

export default PokedexEntry;
