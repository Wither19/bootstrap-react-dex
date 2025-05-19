import TextField from "@mui/material/TextField";

type PkmnSearchBarProps = {
	typing: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

function PkmnSearchBar({ typing }: PkmnSearchBarProps) {
	return (
		<TextField fullWidth
			label="Search for Pokémon..."
			variant="standard"
			onKeyUp={typing}
		/>
	);
}

export default PkmnSearchBar;
