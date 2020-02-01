import React, {PropsWithChildren} from "react";
import PoiList from "../Components/PoiList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {useTheme} from "@material-ui/core";

interface IRouteConfig {
	readonly path: string;
	readonly title: string;
	component: React.ReactElement;
	icon: {
		selected: React.ReactElement,
		unselected: React.ReactElement
	};
	children?: IRouteConfig[];
}

interface INavigationConfig {
	routes: IRouteConfig[];
}

interface FontawesomeIconProps extends PropsWithChildren<{}> {
	icon: IconProp;
	selected: boolean
}

function StyledFontawesomeIcon(props: FontawesomeIconProps) {
	const theme = useTheme();

	return <FontAwesomeIcon
		size={"lg"}
		icon={props.icon}
		color={props.selected ? theme.palette.grey.A200 : theme.palette.primary.main}/>;
}

function fontawesomeToggleIcon(icon: IconProp) {
	return {
		selected: <StyledFontawesomeIcon icon={icon} selected={true} />,
		unselected:  <StyledFontawesomeIcon icon={icon} selected={false} />
	}
}

const NavigationConfig: INavigationConfig = {
	routes: [
		{
			path: '/pois',
			title: `Points d'intérêt`,
			component: <PoiList />,
			icon: fontawesomeToggleIcon("map-marker-alt")
		},
		{
			path: '/islands',
			title: `Îles`,
			component: <PoiList />,
			icon: fontawesomeToggleIcon("island-tropical")
		},
		// {
		// 	path: '/pois',
		// 	title: `Points d'intérêt`,
		// 	component: <PoiList />,
		// 	icon: <img src={Placeholder} alt={"placeholder"}/>
		// },
		// {
		// 	path: '/pois',
		// 	title: `Points d'intérêt`,
		// 	component: <PoiList />,
		// 	icon: <img src={Placeholder} alt={"placeholder"}/>
		// }
	]
};


export default NavigationConfig;