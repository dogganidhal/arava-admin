import React, {PropsWithChildren} from "react";
import PoiList from "../Components/PoiList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {useTheme} from "@material-ui/core";
import {faGlobeAsia, faMapMarker, faTasks, faUser} from "@fortawesome/free-solid-svg-icons";
import IslandList from "../Components/IslandList";
import UserList from "../Components/UserList";
import EditIsland from "../Components/EditIsland";
import CreatePoi from "../Components/CreatePoi";
import EditPoi from "../Components/EditPoi";
import ThemeList from "../Components/ThemeList";

interface IRouteConfig {
	readonly path: string;
	readonly title?: string;
	readonly component: React.ReactElement;
	readonly icon?: React.ReactElement;
	readonly children?: IRouteConfig[];
	readonly exact?: boolean;
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
			icon: <StyledFontawesomeIcon icon={faMapMarker} />,
			exact: true
		},
		{
			path: '/islands',
			title: `Îles`,
			component: <IslandList />,
			icon: <StyledFontawesomeIcon icon={faGlobeAsia} />,
			exact: true
		},
		{
			path: '/users',
			title: `Utilisateurs`,
			component: <UserList />,
			icon: <StyledFontawesomeIcon icon={faUser} />,
			exact: true
		},
		{
			path: '/themes',
			title: `Thèmes`,
			component: <ThemeList />,
			icon: <StyledFontawesomeIcon icon={faTasks} />,
			exact: true
		},
		{
			path: '/islands/:islandId',
			component: <EditIsland />
		},
		{
			path: '/pois/create',
			component: <CreatePoi />,
			exact: true
		},
		{
			path: '/pois/:poiId',
			component: <EditPoi />
		},
	]
};


export default NavigationConfig;