import { useState } from "react";
import _ from "lodash";

import { Card, CardContent, CardMedia, CardActionArea, Typography } from "@mui/material";

type PokedexItemProps = {
	num: number;
	name: string;
	click: (event: React.MouseEvent<HTMLDivElement>) => void;
};

function PokedexItem({ num, name, click }: PokedexItemProps) {
	const pkmnSprite = `https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/${name}.avif`;

	return (
		<Card sx={{ maxWidth: 300 }}>
			<CardActionArea>
				<CardMedia
					sx={{ objectFit: "contain" }}
					component="img"
					height="140"
					image={pkmnSprite}
					alt={name}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{_.capitalize(name)}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default PokedexItem;
