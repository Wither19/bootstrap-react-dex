import { leadingZeroes } from "../functions";

import { Card, CardContent, CardMedia, CardActionArea, Typography } from "@mui/material";

type PokedexItemProps = {
	num: number;
	name: string;
	bgColor: string;
	click: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function PokedexItem(props: PokedexItemProps) {
	const displayNum = leadingZeroes(props.num);
	const displayName = props.name.replace("-", " ");

	const pkmnSprite = `https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/${props.name}.avif`;

	return (
		<Card className={props.bgColor} sx={{ maxWidth: 300, backgroundColor: props.bgColor }}>
			<CardActionArea onClick={props.click}>
				<Typography gutterBottom variant="h6" component="h6">
					#{displayNum}
				</Typography>
				<CardMedia
					sx={{ objectFit: "contain" }}
					component="img"
					height="120"
					image={pkmnSprite}
					alt={props.name}
				/>
				<CardContent>
					<Typography
						sx={{ textTransform: "capitalize" }}
						gutterBottom
						variant="h5"
						component="div">
						{displayName}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default PokedexItem;
