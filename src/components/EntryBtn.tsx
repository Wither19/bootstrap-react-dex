type EntryBtnProps = {
	children: string;
	highlight: boolean;
	click: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function EntryBtn({ children, highlight, click }: EntryBtnProps) {
	return (
		<button className={highlight ? "highlight" : ""} onClick={click}>
			{children}
		</button>
	);
}

export default EntryBtn;
