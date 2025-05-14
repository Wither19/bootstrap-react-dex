function PokedexEntry({ children, game }: { children: any; game: string }) {
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
