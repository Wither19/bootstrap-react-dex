type PkmnGenusHeaderProps = { genus: string };

function PkmnGenusHeader({ genus }: PkmnGenusHeaderProps) {
	return (
		<div className="pkmn-genus-header">
			<sub>The {genus}</sub>
		</div>
	);
}

export default PkmnGenusHeader;
