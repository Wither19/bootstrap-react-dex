type PkmnNameHeaderProps = {
	id: number;
	name: string;
	shiny: boolean;
};

function PkmnNameHeader({ id, name, shiny }: PkmnNameHeaderProps) {
	return (
		<div className={`pkmn-name-header ${shiny ? "shiny" : "regular"}`}>
			#{id?.toString().padStart(4, "0")}
			{" - "}
			{name?.replace("-", " ")}
		</div>
	);
}

export default PkmnNameHeader;
