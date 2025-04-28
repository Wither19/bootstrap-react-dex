function PokedexEntry({
	children,
	game,
	showGame,
}: {
	children: any;
	game: string;
	showGame?: boolean;
}) {
	return (
		<>
			<p>{children}</p>
			<div style={{ textAlign: "center", margin: "1em" }}>
				<sub>Pokemon {game}</sub>
			</div>
		</>
	);
}

export default PokedexEntry;
