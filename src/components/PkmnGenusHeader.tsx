type PkmnGenusHeaderProps = { genus: string };

function PkmnGenusHeader(props: PkmnGenusHeaderProps) {
	let displayText = `The ${props.genus}`;
	return (
		<div className="pkmn-genus-header">
			<sub>{displayText}</sub>
		</div>
	);
}

export default PkmnGenusHeader;
