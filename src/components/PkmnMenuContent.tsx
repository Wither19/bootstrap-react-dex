import type { ReactNode, CSSProperties } from "react";

type PkmnMenuContentProps = {
	value: number;
	index: number;
	addlStyles?: CSSProperties | undefined;
	children: ReactNode;
};

function PkmnMenuContent(props: PkmnMenuContentProps) {
	let contentDivStyles = { ...props?.addlStyles, display: "flex", justifyContent: "space-evenly" };
	return <div style={contentDivStyles}>{props.value == props.index && props.children}</div>;
}

export default PkmnMenuContent;
