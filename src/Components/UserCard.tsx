import {makeStyles} from "@material-ui/core/styles";
import {
	Breadcrumbs,
	Button,
	Card,
	CardContent,
	createStyles,
	Grid,
	TextField,
	Theme,
	Typography
} from "@material-ui/core";
import {Link, useHistory, useParams} from "react-router-dom";
import useUserService from "../Hooks/UseUserService";
import Alert from "@material-ui/lab/Alert";
import AppLoader from "./AppLoader";
import EditPoiForm from "./EditPoiForm";
import React from "react";

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
		},
		formControl: {
			flex: 1,
			marginTop: theme.spacing(2)
		},
	});
});


interface UserCardProps {
	readonly userId: string;
}

export default function UserCard() {
	const classes = useStyles();
	const {userId} = useParams<UserCardProps>();
	const [isLoading, exception, user] = useUserService(userId);

	if (exception) {
		return <Alert severity="error">
			{exception.message}
		</Alert>;
	}

	if (isLoading || !user) {
		return <AppLoader />;
	}

	return <div>
		<Card variant={"outlined"} className={classes.breadcrumbs}>
			<Breadcrumbs aria-label="breadcrumb">
				<Button
					color="primary"
					component={Link}
					to={"/users"}>
					Utilisateurs
				</Button>
				<Button disabled color="primary">
					{`${user.firstName} ${user.lastName}`}
				</Button>
			</Breadcrumbs>
		</Card>
		<Card className={classes.card} variant={"outlined"}>
			<CardContent className={classes.form}>
				<form>
					<TextField
						fullWidth
						disabled
						className={classes.formControl}
						variant={"filled"}
						value={user.id}
						label={"Id"}/>
					<Grid container spacing={2} className={classes.formControl}>
						<Grid item xs={4}>
							<TextField
								fullWidth
								disabled
								label={"Nom"}
								value={user.lastName}
								variant={"filled"} />
						</Grid>
						<Grid item xs={4}>
							<TextField
								fullWidth
								disabled
								label={"Prénom"}
								value={user.firstName}
								variant={"filled"} />
						</Grid>
						<Grid item xs={4}>
							<TextField
								fullWidth
								disabled
								label={"Adresse email"}
								value={user.email}
								variant={"filled"} />
						</Grid>
					</Grid>
				</form>
			</CardContent>
		</Card>
	</div>;
}