import {
	createStyles, Drawer,
	List, ListItem, ListItemIcon,
	ListItemText, makeStyles, Theme, Typography
} from "@material-ui/core";
import React from "react";
import NavigationConfig from "../Config/NavigationConfig";
import {useLocation} from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => {
	return createStyles({
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
		},
		drawerPaper: {
			width: drawerWidth,
		},
		toolbar: {
			...theme.mixins.toolbar
		}
	});
});

export default function SideBar() {
	const classes = useStyles();
	const location = useLocation();

	return <Drawer
		className={classes.drawer}
		variant="permanent"
		classes={{
			paper: classes.drawerPaper,
		}}>
		<div className={classes.toolbar} />
		<List>
			{
				NavigationConfig.routes.map((route, index) => (
					<ListItem button key={index} disabled={location.pathname === route.path}>
						<ListItemIcon>
							{
								location.pathname === route.path ? route.icon.selected : route.icon.unselected
							}
						</ListItemIcon>
						<ListItemText>
							<Typography
								color={location.pathname !== route.path ? "primary" : "inherit"} >
								{route.title}
							</Typography>
						</ListItemText>
					</ListItem>
				))
			}
		</List>
	</Drawer>;
}