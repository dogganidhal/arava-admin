import {useTheme} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {PropsWithChildren} from "react";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface FontawesomeIconProps extends PropsWithChildren<{}> {
	icon: IconProp;
}

export default function ThemedFontawesomeIcon(props: FontawesomeIconProps) {
	const theme = useTheme();

	return <FontAwesomeIcon
		size={"lg"}
		icon={props.icon}
		color={theme.palette.primary.main}/>;
}