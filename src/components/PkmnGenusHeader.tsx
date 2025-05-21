type PkmnGenusHeaderProps = { genus: string };

function PkmnGenusHeader({ genus }: PkmnGenusHeaderProps) {
	let displayText = `The ${genus}`;
	return (
		<div className="pkmn-genus-header">
			<sub>{displayText}</sub>
		</div>
	);
}

export default PkmnGenusHeader;
