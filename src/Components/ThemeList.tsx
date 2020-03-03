import React from "react";
import {
	Button, createStyles, Fab,
	Paper, Table, TableBody,
	TableCell, TableHead, TableRow, Theme
} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import AppLoader from "./AppLoader";
import Alert from "@material-ui/lab/Alert";
import SearchIcon from "@material-ui/icons/Add";
import {makeStyles} from "@material-ui/core/styles";
import useThemeListService from "../Hooks/UseThemeListService";

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
			position: 'absolute',
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
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Nom</TableCell>
						<TableCell align="center">Icône</TableCell>
						<TableCell align="right">Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{themes.map(theme => (
						<TableRow key={theme.id}>
							<TableCell component="th" scope="row">
								{theme.name.find(t => t.language.code === 'fr')?.resource}
							</TableCell>
							<TableCell align="center">
								<img className={classes.themeIcon} src={theme.icon?.url}  alt={`Aucune icon`}/>
							</TableCell>
							<TableCell align="right">
								<Button
									color={"primary"}
									onClick={() => navigation.push(`/themes/${theme.id}`)}>
									Modifier
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Paper>
	</div>;
}