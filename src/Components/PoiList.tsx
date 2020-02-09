import React from "react";
import {createStyles, Fab, Grid, Theme} from "@material-ui/core";
import usePoiListService from "../Hooks/UsePoiListService";
import AppLoader from "./AppLoader";
import Alert from "@material-ui/lab/Alert";
import {makeStyles} from "@material-ui/core/styles";
import PoiCard from "./PoiCard";
import AddIcon from '@material-ui/icons/Add';
import {useHistory} from "react-router-dom";
import Map from "./Map";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
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

	if (isLoading) {
		return <AppLoader />;
	}

	if (exception) {
		return <Alert severity="error">
			{exception.message}
		</Alert>;
	}

	return <Grid container className={classes.root} justify={"center"} spacing={2}>

		<Fab
			variant={"extended"}
			size={"large"} 
			color={"primary"}
			className={classes.fab}
			onClick={() => navigation.push("/pois/create")}>
			<AddIcon />
			Créer
		</Fab>
		{
			pois.map((poi, index) => (
				<Grid item>
					<PoiCard key={index} poi={poi} />
				</Grid>
			))
		}
	</Grid>;
}