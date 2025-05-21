import { leadingZeroes } from "../functions";

import { Card, CardContent, CardMedia, CardActionArea, Typography } from "@mui/material";

type PokedexItemProps = {
	num: number;
	name: string;
	bgColor: string;
	click: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function PokedexItem({ num, name, bgColor, click }: PokedexItemProps) {
	const displayNum = leadingZeroes(num);
	const displayName = name.replace("-", " ");

	const pkmnSprite = `https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/${name}.avif`;

	return (
		<Card className={bgColor} sx={{ maxWidth: 300, backgroundColor: bgColor }}>
			<CardActionArea onClick={click}>
				<Typography gutterBottom variant="h6" component="h6">
					#{displayNum}
				</Typography>
				<CardMedia
					sx={{ objectFit: "contain" }}
					component="img"
					height="160"
					image={pkmnSprite}
					alt={name}
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
