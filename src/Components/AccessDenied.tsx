import React from "react";
import {createStyles, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import { ReactComponent as AccessDeniedIcon } from "../Assets/AccessDenied.svg";


const useStyles = makeStyles(theme => createStyles({
	container: {
		flex: 1,
		flexGrow: 1,
		display: 'flex',
		height: '100vh',
		flexDirection: 'column',
		alignItems: 'center'
	},
	icon: {
		width: theme.spacing(32)
	},
	text: {
		margin: theme.spacing(4)
	}
}));

export default function AccessDenied() {
	const classes = useStyles();

	return <div className={classes.container}>
		<AccessDeniedIcon className={classes.icon} />
		<Typography className={classes.text} variant={"h5"}>
			Accès refusé
		</Typography>
	</div>
}