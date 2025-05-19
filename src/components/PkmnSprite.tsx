type PkmnSpriteProps = {
	id: number;
	shiny: boolean;
	click: (event: React.MouseEvent<HTMLDivElement>) => void;
};

function PkmnSprite({ id, shiny, click }: PkmnSpriteProps) {
	return (
		<div onClick={click} style={{ textAlign: "center" }}>
			<img
				className={`artwork ${shiny ? "shiny" : "regular"}`}
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${
					shiny ? "shiny/" : ""
				}${id}.png`}
			/>
		</div>
	);
}

export default PkmnSprite;
