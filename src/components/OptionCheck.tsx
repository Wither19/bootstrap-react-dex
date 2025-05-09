import type { JSX, Dispatch, SetStateAction } from "react";

type OptionCheckProps = {
	children: string;
	option: Dispatch<SetStateAction<boolean>>;
	setOption: Dispatch<SetStateAction<boolean>>;
};

function OptionCheck({ children, option, setOption }: OptionCheckProps) {
	let checkValue = option as unknown as boolean;
	return (
		<label>
			<input type="checkbox" checked={checkValue} onChange={() => setOption((prev) => !prev)} />{" "}
			Show
			{children}
		</label>
	);
}

export default OptionCheck;
