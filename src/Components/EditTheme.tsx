import {useHistory, useParams} from "react-router-dom";
import {Breadcrumbs, Button, Card, CardContent, createStyles, Theme, Typography} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import CreateThemeForm from "./CreateThemeForm";
import useThemeService from "../Hooks/UseThemeService";
import AppLoader from "./AppLoader";
import Alert from "@material-ui/lab/Alert";
import EditThemeForm from "./EditThemeForm";

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

interface EditThemeProps {
	readonly themeId: string;
}

export default function EditTheme() {
	const classes = useStyles();
	const navigation = useHistory();
	const {themeId} = useParams<EditThemeProps>();
	const [loading, exception, theme] = useThemeService(themeId);

	if (exception) {
		return <Alert severity="error">
			{exception.message}
		</Alert>;
	}

	if (loading || !theme) {
		return <AppLoader />;
	}

	return <div>
		<Card variant={"outlined"} className={classes.breadcrumbs}>
			<Breadcrumbs aria-label="breadcrumb">
				<Button color="primary" onClick={() => navigation.push("/themes")}>
					Thèmes
				</Button>
				<Button
					disabled
					color="primary">
					{theme.name.find(n => n.language.code === 'fr')?.resource}
				</Button>
			</Breadcrumbs>
		</Card>
		<Card className={classes.card} variant={"outlined"}>
			<CardContent className={classes.form}>
				<Typography variant={"h6"}>
					{theme.name.find(n => n.language.code === 'fr')?.resource}
				</Typography>
				<EditThemeForm theme={theme} />
			</CardContent>
		</Card>
	</div>;
}