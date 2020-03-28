import React from "react";
import PoiList from "../Components/PoiList";
import {faComment, faGlobeAsia, faMapMarker, faTasks} from "@fortawesome/free-solid-svg-icons";
import IslandList from "../Components/IslandList";
import EditIsland from "../Components/EditIsland";
import CreatePoi from "../Components/CreatePoi";
import EditPoi from "../Components/EditPoi";
import ThemeList from "../Components/ThemeList";
import CreateTheme from "../Components/CreateTheme";
import EditTheme from "../Components/EditTheme";
import ThemedFontawesomeIcon from "../Components/ThemedFontAwesomeIcon";
import CommentList from "../Components/CommentList";
import AdminRestricted from "../Components/AdminRestricted";
import PartnerPoiList from "../Components/PartnerPoiList";
import PartnerEditPoi from "../Components/PartnerEditPoi";

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
			component: <AdminRestricted shouldDisplayFallback fallback={PartnerPoiList}>
				<PoiList />
			</AdminRestricted>,
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
			component: <AdminRestricted shouldDisplayFallback fallback={PartnerEditPoi}>
				<EditPoi />
			</AdminRestricted>,
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