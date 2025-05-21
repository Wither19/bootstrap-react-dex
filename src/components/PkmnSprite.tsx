type PkmnSpriteProps = {
	id: number;
	shiny: boolean;
	click: (event: React.MouseEvent<HTMLDivElement>) => void;
};

function PkmnSprite({ id, shiny, click }: PkmnSpriteProps) {
	let classes = `artwork ${shiny ? "shiny" : "regular"}`;
	let spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${
		shiny ? "shiny/" : ""
	}${id}.png`;

	return (
		<div onClick={click} style={{ textAlign: "center" }}>
			<img className={classes} src={spriteUrl} />
		</div>
	);
}

export default PkmnSprite;
