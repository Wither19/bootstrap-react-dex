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
			<div style={{ textAlign: "center", margin: "1em" }}>
				<p>{children}</p>
				<sub>Pokemon {game}</sub>
			</div>
		</>
	);
}

export default PokedexEntry;
