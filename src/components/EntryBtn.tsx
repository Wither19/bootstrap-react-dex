import { Button } from "@mui/material";

type EntryBtnProps = {
	children: string;
	click: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function EntryBtn(props: EntryBtnProps) {
	return (
		<Button variant="contained" onClick={props.click}>
			{props.children}
		</Button>
	);
}

export default EntryBtn;
