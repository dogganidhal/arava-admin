import useIslandService from "../Hooks/UseIslandService";
import AppLoader from "./AppLoader";
import Alert from "@material-ui/lab/Alert";
import React from "react";
import {Breadcrumbs, Button, Card, CardContent, createStyles, Link, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useParams, useHistory} from "react-router-dom";
import EditIslandForm from "./EditIslandForm";

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

interface EditIslandProps {
	readonly islandId: string;
}

export default function EditIsland() {
	const {islandId} = useParams<EditIslandProps>();
	const [isLoading, exception, island] = useIslandService(islandId);
	const classes = useStyles();
	const navigation = useHistory();

	if (isLoading) {
		return <AppLoader />;
	}

	if (exception) {
		return <Alert severity="error">
			{exception.message}
		</Alert>;
	}

	return <div>
		<Card variant={"outlined"} className={classes.breadcrumbs}>
				<Breadcrumbs aria-label="breadcrumb">
					<Button color="primary" onClick={() => navigation.push("/islands")}>
						Îles
					</Button>
					<Button color="primary" onClick={() => navigation.push(`/archilepagos/${island.archipelago.id}`)}>
						{island.archipelago.name}
					</Button>
					<Button disabled color="primary">
						{island.name}
					</Button>
				</Breadcrumbs>
		</Card>
		<Card className={classes.card} variant={"outlined"}>
			<CardContent className={classes.form}>
				<Typography variant={"h6"}>
					{island.name}
				</Typography>
				<EditIslandForm island={island}/>
			</CardContent>
		</Card>
	</div>;
}