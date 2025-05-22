import { leadingZeroes } from "../functions";

type PkmnNameHeaderProps = {
	id: number;
	name: string;
	shiny: boolean;
};

function PkmnNameHeader(props: PkmnNameHeaderProps) {
	let displayText = `#${leadingZeroes(props.id)} - ${props.name.replace("-", " ")}`;
	return <h1 className={`pkmn-name-header ${props.shiny ? "shiny" : "regular"}`}>{displayText}</h1>;
}

export default PkmnNameHeader;
