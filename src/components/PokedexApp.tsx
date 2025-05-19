function PokedexApp() {
	return (
		<>
			<div style={{ margin: "2% 5%" }}>
				<div>
					<div style={{ margin: "24px auto" }}>
						<PkmnSearchBar
							typing={(e: any) => {
								if (e.which == 13 || e.target.value == "") {
									setSearchText(e.target.value.toLowerCase());
								}
							}}
						/>
					</div>
					<div>
						<div>
							<div>
								<FormControl fullWidth>
									<InputLabel id="region-select-label">Select Region</InputLabel>
									<Select
										labelId="region-select-label"
										id="region-select"
										value={regionDropdown}
										onChange={selectRegionValue}>
										<MenuItem value="">All Regions</MenuItem>
										{regions
											.filter((_, index) => index != 0)
											.map((region) => (
												<MenuItem value={region.name.toLowerCase()}>{region.name}</MenuItem>
											))}
									</Select>
								</FormControl>
							</div>
						</div>
					</div>
					<div>
						<div className="pokemon-list">
							{_.filter(pokedex, (pokemon) => dexFilter(pokemon)).map((pokemon: PokemonEntry) => (
								<PokedexItem
									key={pokemon.pokemon_species.name}
									num={pokemon.entry_number}
									name={pokemon.pokemon_species.name}
									selected={selectedNumber == pokemon.entry_number}
									click={() => {
										setNumber(pokemon.entry_number);
									}}
								/>
							))}
						</div>
					</div>
				</div>
				<div style={{ flexBasis: "75%" }} className="my-3">
					<PokemonProvider val={selectedNumber.toString()}>
						<PokemonMenu />
					</PokemonProvider>
				</div>
			</div>
		</>
	);
}

export default PokedexApp;
