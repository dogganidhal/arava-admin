import React, {useContext} from "react";
import {useHistory, useParams} from "react-router-dom";
import usePoiService from "../Hooks/UsePoiService";
import AppLoader from "./AppLoader";
import Alert from "@material-ui/lab/Alert";
import {Breadcrumbs, Button, Card, CardContent, createStyles, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import EditPoiForm from "./EditPoiForm";
import AuthContext from "../Context/AuthContext";
import AccessDenied from "./AccessDenied";
import PartnerEditPoiForm from "./PartnerEditPoiForm";

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

interface EditPoiProps {
	readonly poiId: string;
}

export default function PartnerEditPoi() {
	const classes = useStyles();
	const navigation = useHistory();
	const {poiId} = useParams<EditPoiProps>();
	const [isLoading, exception, poi] = usePoiService(poiId);

	console.log({isLoading, exception, poi});

	if (exception) {
		if (exception.status === 401) {
			return <AccessDenied />;
		}
		return <Alert severity="error">
			{exception.message}
		</Alert>;
	}

	if (isLoading || !poi) {
		return <AppLoader />;
	}

	const poiTitle = poi?.title.find(t => t.language.code === 'fr')?.resource;

	return <div>
		<Card variant={"outlined"} className={classes.breadcrumbs}>
			<Breadcrumbs aria-label="breadcrumb">
				<Button color="primary" onClick={() => navigation.push("/pois")}>
					Points d'intérêt
				</Button>
				<Button disabled color="primary">
					{poiTitle}
				</Button>
			</Breadcrumbs>
		</Card>
		<Card className={classes.card} variant={"outlined"}>
			<CardContent className={classes.form}>
				<Typography variant={"h6"}>
					{poiTitle}
				</Typography>
				<PartnerEditPoiForm poi={poi}/>
			</CardContent>
		</Card>
	</div>;
}