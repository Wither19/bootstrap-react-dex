import { MenuItem } from "@mui/material";
import { capitalize } from "lodash";

type RegionOptionProps = {
	name?: string;
};

function RegionOption({ name = "" }: RegionOptionProps) {
	return <MenuItem value={name}>{!name ? "All Regions" : capitalize(name)}</MenuItem>;
}

export default RegionOption;
