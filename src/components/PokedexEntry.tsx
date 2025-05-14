function PokedexEntry({ children, game }: { children: string; game: string }) {
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
