import React, {PropsWithChildren} from "react";
import PoiList from "../Components/PoiList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {useTheme} from "@material-ui/core";
import {faComment, faGlobeAsia, faMapMarker, faTasks, faUser} from "@fortawesome/free-solid-svg-icons";
import IslandList from "../Components/IslandList";
import UserList from "../Components/UserList";
import EditIsland from "../Components/EditIsland";
import CreatePoi from "../Components/CreatePoi";
import EditPoi from "../Components/EditPoi";
import ThemeList from "../Components/ThemeList";
import CreateTheme from "../Components/CreateTheme";
import EditTheme from "../Components/EditTheme";
import ThemedFontawesomeIcon from "../Components/ThemedFontAwesomeIcon";
import CommentList from "../Components/CommentList";

interface IRouteConfig {
	readonly path: string;
	readonly title?: string;
	readonly component: React.ReactElement;
	readonly icon?: React.ReactElement;
	readonly children?: IRouteConfig[];
	readonly exact?: boolean;
	readonly adminOnly: boolean;
}

interface INavigationConfig {
	routes: IRouteConfig[];
}

const NavigationConfig: INavigationConfig = {
	routes: [
		{
			path: '/pois',
			title: `Points d'intérêt`,
			component: <PoiList />,
			icon: <ThemedFontawesomeIcon icon={faMapMarker} />,
			exact: true,
			adminOnly: false
		},
		{
			path: '/islands',
			title: `Îles`,
			component: <IslandList />,
			icon: <ThemedFontawesomeIcon icon={faGlobeAsia} />,
			exact: true,
			adminOnly: true
		},
		{
			path: '/themes',
			title: `Thèmes`,
			component: <ThemeList />,
			icon: <ThemedFontawesomeIcon icon={faTasks} />,
			exact: true,
			adminOnly: true
		},
		{
			path: '/islands/:islandId',
			component: <EditIsland />,
			adminOnly: true
		},
		{
			path: '/pois/create',
			component: <CreatePoi />,
			exact: true,
			adminOnly: true
		},
		{
			path: '/pois/:poiId',
			component: <EditPoi />,
			adminOnly: false
		},
		{
			path: '/themes/create',
			component: <CreateTheme />,
			adminOnly: true
		},
		{
			path: '/themes/:themeId',
			component: <EditTheme />,
			adminOnly: true
		},
		{
			path: '/comments',
			title: `Commentaires`,
			component: <CommentList />,
			icon: <ThemedFontawesomeIcon icon={faComment} />,
			exact: true,
			adminOnly: true
		},
	]
};


export default NavigationConfig;