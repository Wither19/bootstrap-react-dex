type PkmnNameHeaderProps = {
	id: number;
	name: string;
	shiny: boolean;
};

function PkmnNameHeader({ id, name, shiny }: PkmnNameHeaderProps) {
	return (
		<h1 className={`pkmn-name-header ${shiny ? "shiny" : "regular"}`}>
			#{id?.toString().padStart(4, "0")}
			{" - "}
			{name?.replace("-", " ")}
		</h1>
	);
}

export default PkmnNameHeader;
