type OptionCheckProps = {
	children: string;
	option: boolean;
	setOption: () => void;
};

function OptionCheck(props: OptionCheckProps) {
	return (
		<label className="option-check-label">
			<input type="checkbox" checked={props.option} onChange={props.setOption} /> {props.children}
		</label>
	);
}

export default OptionCheck;
