import TextField from "@mui/material/TextField";

type PkmnSearchBarProps = {
	typing: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

function PkmnSearchBar(props: PkmnSearchBarProps) {
	return (
		<TextField
			fullWidth
			id="pkmn-search"
			label="Search for Pokémon..."
			variant="standard"
			onKeyUp={props.typing}
		/>
	);
}

export default PkmnSearchBar;
