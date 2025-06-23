import { Button } from "@mui/material";

type EntryBtnProps = {
	children: string;
	click: (event: React.MouseEvent<HTMLButtonElement>) => void;
	selected: boolean;
};

function EntryBtn(props: EntryBtnProps) {
	return (
		<Button
			variant="contained"
			color={props.selected ? "secondary" : "primary"}
			onClick={props.click}>
			{props.children}
		</Button>
	);
}

export default EntryBtn;
