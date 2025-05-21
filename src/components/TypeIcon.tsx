type TypeIconProps = {
	name: string;
};

function TypeIcon({ name }: TypeIconProps) {
	return (
		<div className={`icon ${name}`}>
			<img
				src={`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/refs/heads/master/icons/${name}.svg`}
				alt={`${name} type`}
			/>
		</div>
	);
}

export default TypeIcon;
