type PkmnSpriteProps = {
	id: number;
	shiny: boolean;
	click: (event: React.MouseEvent<HTMLDivElement>) => void;
};

function PkmnSprite({ id, shiny, click }: PkmnSpriteProps) {
	return (
		<div onClick={click} style={{ textAlign: "center" }}>
			<img
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
					shiny ? "shiny/" : ""
				}${id}.png`}
			/>
		</div>
	);
}

export default PkmnSprite;
