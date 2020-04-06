import React from "react";
import {createStyles, Fab, Paper, Theme} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import AppLoader from "./AppLoader";
import Alert from "@material-ui/lab/Alert";
import SearchIcon from "@material-ui/icons/Add";
import {makeStyles} from "@material-ui/core/styles";
import useThemeListService from "../Hooks/UseThemeListService";
import ThemeExpandableListItem from "./ThemeExpandableListItem";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		table: {
			minWidth: 650,
		},
		control: {
			padding: theme.spacing(2),
		},
		fab: {
			position: 'fixed',
			zIndex: 999,
			right: theme.spacing(2),
			bottom: theme.spacing(2),
		},
		themeIcon: {
			height: theme.spacing(4)
		}
	}),
);

export default function ThemeList() {
	const classes = useStyles();
	const [isLoading, exception, themes] = useThemeListService();
	const navigation = useHistory();

	if (isLoading) {
		return <AppLoader />;
	}

	if (exception) {
		return <Alert severity="error">
			{exception.message}
		</Alert>;
	}

	return <div className={classes.root}>
		<Fab
			variant={"extended"}
			size={"large"}
			color={"primary"}
			className={classes.fab}
			onClick={() => navigation.push("/themes/create")}>
			<SearchIcon />
			Créer
		</Fab>
		<Paper variant={"outlined"} >
			{
				themes.filter(theme => !theme.parent)
					.map(theme => (
						<ThemeExpandableListItem key={theme.id} theme={theme}/>
					))
			}
		</Paper>
	</div>;
}