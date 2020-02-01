import {Button, Card, createStyles, SvgIcon, TextField, Theme, Typography} from "@material-ui/core";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import { ReactComponent as Octopus } from '../Assets/Octopus.svg';
import useAuth from "../Hooks/UseAuth";
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			height: '100vh',
			display: 'grid',
			placeItems: 'center'
		},
		card: {
			minWidth: 275,
			maxWidth: 400,
			flex: 1,
			padding: theme.spacing(2)
		},
		formInput: {
			marginTop: theme.spacing(2)
		},
		appName: {
			color: theme.palette.primary.main
		},
		logo: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center'
		}
	}),
);

export default function Login() {
	const classes = useStyles();
	const {login, exception, isLoading} = useAuth();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	return <div className={classes.root}>
		<Card className={classes.card} variant={"outlined"}>
			<div className={classes.logo}>
				<SvgIcon fontSize={"large"}>
					<Octopus />
				</SvgIcon>
				<Typography variant={"h5"} className={classes.appName}>
					Arava Admin
				</Typography>
			</div>
			<form>
				<TextField
					fullWidth
					className={classes.formInput}
					type={"email"}
					label="Email"
					variant="filled"
					onChange={e => setEmail(e.target.value)}/>
				<TextField
					fullWidth
					className={classes.formInput}
					type={"password"}
					label="Password"
					variant="filled"
					onChange={e => setPassword(e.target.value)}/>
				{
					exception && <Alert className={classes.formInput} severity="error">
						{exception.message}
					</Alert>
				}
				<Button
					fullWidth
					className={classes.formInput}
					size={"large"}
					color={"primary"}
					onClick={() => login(email, password)}>
					{
						isLoading ? "Chargement ..." : "Se connecter"
					}
				</Button>
			</form>
		</Card>
	</div>;
}