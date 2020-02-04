import {
	createStyles, Drawer,
	List, ListItem, ListItemIcon,
	ListItemText, makeStyles, Theme, Typography
} from "@material-ui/core";
import React from "react";
import NavigationConfig from "../Config/NavigationConfig";
import {useLocation, useHistory} from "react-router-dom";

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
	const navigation = useHistory();

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
					<ListItem
						button
						selected={location.pathname.includes(route.path)}
						key={index}
						disabled={location.pathname.includes(route.path)}
						onClick={() => navigation.push(route.path)}>
						{
							route.icon && <ListItemIcon>
								{
									route.icon
								}
              </ListItemIcon>
						}
						<ListItemText>
							<Typography
								color={"primary"} >
								{route.title}
							</Typography>
						</ListItemText>
					</ListItem>
				))
			}
		</List>
	</Drawer>;
}