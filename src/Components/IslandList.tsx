import React from "react";
import {createStyles, Grid, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AppLoader from "./AppLoader";
import Alert from "@material-ui/lab/Alert";
import useIslandListService from "../Hooks/UseIslandListService";
import IslandCard from "./IslandCard";


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

export default function IslandList() {
	const classes = useStyles();
	const [isLoading, exception, islands] = useIslandListService();

	if (isLoading) {
		return <AppLoader />;
	}

	if (exception) {
		return <Alert severity="error">
			{exception.message}
		</Alert>;
	}

	return <div>
		<Grid container className={classes.root} justify={"center"} spacing={2}>
			{
				islands
					.map((island, index) => (
						<Grid item key={index}>
							<IslandCard island={island} />
						</Grid>
					))
			}
		</Grid>
	</div>;
}