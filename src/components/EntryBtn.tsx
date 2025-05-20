import { Button } from "@mui/material";

type EntryBtnProps = {
	children: string;
	click: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function EntryBtn({ children, click }: EntryBtnProps) {
	return (
		<Button variant="contained" onClick={click}>
			{children}
		</Button>
	);
}

export default EntryBtn;
