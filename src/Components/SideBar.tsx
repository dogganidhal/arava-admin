import {
	createStyles, Drawer,
	List, ListItem, ListItemIcon,
	ListItemText, makeStyles, Theme, Typography
} from "@material-ui/core";
import React, {useContext} from "react";
import NavigationConfig from "../Config/Navigation";
import {useLocation, useHistory} from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import ThemedFontawesomeIcon from "./ThemedFontAwesomeIcon";
import {kauthCredentialsKey} from "../Hooks/UseAuth";

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
	const {isAdmin} = useContext(AuthContext);

	return <Drawer
		className={classes.drawer}
		variant="permanent"
		classes={{
			paper: classes.drawerPaper,
		}}>
		<div className={classes.toolbar} />
		<List>
			{
				NavigationConfig.routes
					.filter(route => route.title && route.icon)
					.filter(route => !route.adminOnly || isAdmin)
					.map((route, index) => (
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
			<ListItem
				button
				onClick={() => {
					localStorage.removeItem(kauthCredentialsKey);
					window.location.reload();
				}}>
				<ListItemIcon>
					<ThemedFontawesomeIcon icon={faSignOutAlt}/>
				</ListItemIcon>
				<ListItemText>
					<Typography
						color={"primary"} >
						Se déconnecter
					</Typography>
				</ListItemText>
			</ListItem>
		</List>
	</Drawer>;
}