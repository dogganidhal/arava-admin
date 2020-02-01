import {CircularProgress, createStyles} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => {
	return createStyles({
		loaderContainer: {
			flexGrow: 1,
			height: '100vh',
			display: 'grid',
			placeItems: 'center'
		}
	})
});

export default function AppLoader() {
	const classes = useStyles();

	return <div className={classes.loaderContainer}>
		<CircularProgress />
	</div>

}