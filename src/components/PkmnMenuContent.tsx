import type { ReactNode, CSSProperties } from "react";

type PkmnMenuContentProps = {
	value: number;
	index: number;
	addlStyles?: CSSProperties | undefined;
	tabContentSpacing?: number;
	children?: ReactNode;
};

function PkmnMenuContent(props: PkmnMenuContentProps) {
	let contentDivStyles = {
		display: "flex",
		justifyContent: "space-evenly",
		marginTop: props.tabContentSpacing ?? 24,
		...props?.addlStyles,
	};
	return <div style={contentDivStyles}>{props.value == props.index && props.children}</div>;
}

export default PkmnMenuContent;
