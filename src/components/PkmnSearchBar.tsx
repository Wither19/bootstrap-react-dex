type PkmnSearchBarProps = {
	typing: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

function PkmnSearchBar({ typing }: PkmnSearchBarProps) {
	return (
		<div className="">
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
