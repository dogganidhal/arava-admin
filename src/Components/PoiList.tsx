import React from "react";
import {
	Button, createStyles, Fab,
	IconButton, InputBase, Paper,
	Table, TableBody, TableCell,
	TableHead, TableRow, Theme
} from "@material-ui/core";
import usePoiListService from "../Hooks/UsePoiListService";
import AppLoader from "./AppLoader";
import Alert from "@material-ui/lab/Alert";
import {makeStyles} from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Search';
import SearchIcon from '@material-ui/icons/Add';
import {useHistory} from "react-router-dom";
import usePoiFilter from "../Hooks/UsePoiFilter";
import CheckIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		searchPaper: {
			padding: theme.spacing(1),
			marginBottom: theme.spacing(2),
			display: 'flex',
			alignItems: 'center',
			width: "100%",
		},
		input: {
			marginLeft: theme.spacing(1),
			flex: 1,
		},
		iconButton: {
			padding: 10,
		},
		root: {
			flexGrow: 1,
		},
		table: {
			minWidth: 650,
		},
		paper: {
			height: 140,
			width: 100,
		},
		control: {
			padding: theme.spacing(2),
		},
		fab: {
			position: 'absolute',
			right: theme.spacing(2),
			bottom: theme.spacing(2),
		}
	}),
);

export default function PoiList() {
	const classes = useStyles();
	const [isLoading, exception, pois] = usePoiListService();
	const navigation = useHistory();
	const [filteredPois, setQuery] = usePoiFilter(pois);

	if (isLoading) {
		return <AppLoader />;
	}

	if (exception) {
		return <Alert severity="error">
			{exception.message}
		</Alert>;
	}

	return <div>
		<Fab
			variant={"extended"}
			size={"large"}
			color={"primary"}
			className={classes.fab}
			onClick={() => navigation.push("/pois/create")}>
			<SearchIcon />
			Créer
		</Fab>
		<Paper variant={"outlined"} className={classes.searchPaper} component={"form"}>
			<IconButton className={classes.iconButton} aria-label="menu">
				<AddIcon />
			</IconButton>
			<InputBase
				className={classes.input}
				placeholder="Chercher des pois"
				onChange={e => setQuery(e.target.value)}/>
		</Paper>
		<Paper variant={"outlined"} >
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Titre</TableCell>
						<TableCell align="center">Thème</TableCell>
						<TableCell align="center">Île</TableCell>
						<TableCell align="center">Premium</TableCell>
						<TableCell align="center">Choses à faire</TableCell>
						<TableCell align="center">Mis en avant</TableCell>
						<TableCell align="center">Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{filteredPois.map(poi => (
						<TableRow key={poi.id}>
							<TableCell component="th" scope="row">
								{poi.title.find(t => t.language.code === 'fr')?.resource}
							</TableCell>
							<TableCell align="center">{poi.theme.name.find(t => t.language.code === 'fr')?.resource}</TableCell>
							<TableCell align="center">{poi.island.name}</TableCell>
							<TableCell align="center">
								{
									poi.sponsored ? <CheckIcon /> : <CancelIcon />
								}
							</TableCell>
							<TableCell align="center">
								{
									poi.thingsToDo ? <CheckIcon /> : <CancelIcon />
								}
							</TableCell>
							<TableCell align="center">
								{
									poi.featured ? <CheckIcon /> : <CancelIcon />
								}
							</TableCell>
							<TableCell align="center">
								<Button
									color={"primary"}
									onClick={() => navigation.push(`/pois/${poi.id}`)}>
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