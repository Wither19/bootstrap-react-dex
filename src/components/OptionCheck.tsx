type OptionCheckProps = {
	children: string;
	option: boolean;
	setOption: () => void;
};

function OptionCheck({ children, option, setOption }: OptionCheckProps) {
	return (
		<label style={{ userSelect: "none" }}>
			<input type="checkbox" checked={option} onChange={setOption} /> {children}
		</label>
	);
}

export default OptionCheck;
