import TextField from "@mui/material/TextField";

import { Search } from "lucide-react";

type PkmnSearchBarProps = {
	typing: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

function PkmnSearchBar({ typing }: PkmnSearchBarProps) {
	return (
		<TextField
			label="Search for Pokémon..."
			variant="standard"
			onKeyUp={typing}
			slotProps={{
				input: {
					startAdornment: (
						<div style={{ margin: "4px 5px 0px 5px" }}>
							<Search />
						</div>
					),
				},
			}}
		/>
	);
}

export default PkmnSearchBar;
