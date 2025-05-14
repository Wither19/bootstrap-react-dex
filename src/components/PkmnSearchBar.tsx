type PkmnSearchBarProps = {
	typing: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

function PkmnSearchBar({ typing }: PkmnSearchBarProps) {
	return (
		<div className="input-group">
			<input
				className="pokemon-searchbar"
				type="text"
				placeholder="Search to filter Pokémon"
				onKeyUp={typing}
			/>
		</div>
	);
}

export default PkmnSearchBar;
