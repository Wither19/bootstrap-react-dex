type TypeIconProps = {
	name: string;
};

function TypeIcon(props: TypeIconProps) {
	return (
		<div className={`icon ${props.name}`}>
			<img
				src={`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/refs/heads/master/icons/${props.name}.svg`}
				alt={`${props.name} type`}
			/>
		</div>
	);
}

export default TypeIcon;
