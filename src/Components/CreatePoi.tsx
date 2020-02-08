import React from "react";
import {Breadcrumbs, Button, Card, CardContent, createStyles, Theme, Typography} from "@material-ui/core";
import EditIslandForm from "./EditIslandForm";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import CreatePoiForm from "./CreatePoiForm";

const useStyles = makeStyles((theme: Theme) => {
	return createStyles({
		card: {
			display: 'flex',
			flex: 1,
			flexGrow: 1
		},
		breadcrumbs: {
			padding: theme.spacing(1),
			marginBottom: theme.spacing(3)
		},
		form: {
			flexGrow: 1,
			flex: 1
		}
	});
});

export default function CreatePoi() {
	const classes = useStyles();
	const navigation = useHistory();

	return <div>
		<Card variant={"outlined"} className={classes.breadcrumbs}>
			<Breadcrumbs aria-label="breadcrumb">
				<Button color="primary" onClick={() => navigation.push("/pois")}>
					Points d'intérêt
				</Button>
				<Button disabled color="primary">
					Créer
				</Button>
			</Breadcrumbs>
		</Card>
		<Card className={classes.card} variant={"outlined"}>
			<CardContent className={classes.form}>
				<Typography variant={"h6"}>
					Créer un point d'intérêt
				</Typography>
				<CreatePoiForm />
			</CardContent>
		</Card>
	</div>;
}