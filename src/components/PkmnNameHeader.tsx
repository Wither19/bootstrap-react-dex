import { leadingZeroes } from "../functions";

type PkmnNameHeaderProps = {
	id: number;
	name: string;
	shiny: boolean;
};

function PkmnNameHeader({ id, name, shiny }: PkmnNameHeaderProps) {
	let displayText = `#${leadingZeroes(id)} - ${name.replace("-", " ")}`;
	return <h1 className={`pkmn-name-header ${shiny ? "shiny" : "regular"}`}>{displayText}</h1>;
}

export default PkmnNameHeader;
