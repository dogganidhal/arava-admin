import React from "react";
import {createStyles, Grid, Theme, Typography} from "@material-ui/core";
import usePoiListService from "../Hooks/UsePoiListService";
import AppLoader from "./AppLoader";
import Alert from "@material-ui/lab/Alert";
import {makeStyles} from "@material-ui/core/styles";
import PoiCard from "./PoiCard";

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
	}),
);

export default function PoiList() {
	const classes = useStyles();
	const [isLoading, exception, pois] = usePoiListService();

	if (isLoading) {
		return <AppLoader />;
	}

	if (exception) {
		return <Alert severity="error">
			{exception.message}
		</Alert>;
	}

	return <Grid container className={classes.root} justify={"center"} spacing={2}>
		{
			pois.map((poi, index) => (
				<Grid item>
					<PoiCard key={index} poi={poi} />
				</Grid>
			))
		}
	</Grid>;
}