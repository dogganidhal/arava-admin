import React, {PropsWithChildren} from "react";
import PoiList from "../Components/PoiList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {useTheme} from "@material-ui/core";
import {faGlobeAsia, faMapMarker, faUser} from "@fortawesome/free-solid-svg-icons";
import IslandList from "../Components/IslandList";
import UserList from "../Components/UserList";

interface IRouteConfig {
	readonly path: string;
	readonly title: string;
	component: React.ReactElement;
	icon: React.ReactElement;
	children?: IRouteConfig[];
}

interface INavigationConfig {
	routes: IRouteConfig[];
}

interface FontawesomeIconProps extends PropsWithChildren<{}> {
	icon: IconProp;
}

function StyledFontawesomeIcon(props: FontawesomeIconProps) {
	const theme = useTheme();

	return <FontAwesomeIcon
		size={"lg"}
		icon={props.icon}
		color={theme.palette.primary.main}/>;
}

const NavigationConfig: INavigationConfig = {
	routes: [
		{
			path: '/pois',
			title: `Points d'intérêt`,
			component: <PoiList />,
			icon: <StyledFontawesomeIcon icon={faMapMarker} />
		},
		{
			path: '/islands',
			title: `Îles`,
			component: <IslandList />,
			icon: <StyledFontawesomeIcon icon={faGlobeAsia} />
		},
		{
			path: '/users',
			title: `Utilisateurs`,
			component: <UserList />,
			icon: <StyledFontawesomeIcon icon={faUser} />
		}
	]
};


export default NavigationConfig;