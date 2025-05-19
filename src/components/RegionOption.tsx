import { MenuItem } from "@mui/material";

type RegionOptionProps = {
	name?: string;
};

function RegionOption({ name }: RegionOptionProps) {
	return <MenuItem value={!!name ? name!.toLowerCase() : ""}>{!name ? "All Regions" : name}</MenuItem>;
}

export default RegionOption;
