type PkmnSpriteProps = {
	id: number;
	shiny: boolean;
	click: (event: React.MouseEvent<HTMLDivElement>) => void;
};

function PkmnSprite(props: PkmnSpriteProps) {
	let classes = `artwork ${props.shiny ? "shiny" : "regular"}`;
	let spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${
		props.shiny ? "shiny/" : ""
	}${props.id}.png`;

	return (
		<div onClick={props.click} style={{ textAlign: "center" }}>
			<img className={classes} src={spriteUrl} />
		</div>
	);
}

export default PkmnSprite;
