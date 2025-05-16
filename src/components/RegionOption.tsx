type RegionOptionProps = {
	name?: string;
};

function RegionOption({ name }: RegionOptionProps) {
	return <option value={!!name ? name!.toLowerCase() : ""}>{!name ? "All Regions" : name}</option>;
}

export default RegionOption;
