import React, {PropsWithChildren} from "react";
import {
	AppBar, createStyles, CssBaseline, Divider,
	Theme, Toolbar, Typography, makeStyles, SvgIcon
} from "@material-ui/core";
import { ReactComponent as Octopus } from '../Assets/Octopus.svg';
import SideBar from "./SideBar";

const useStyles = makeStyles((theme: Theme) => {
	return createStyles({
		root: {
			display: 'flex',
		},
		logo: {
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(2)
		},
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
		},
		toolbar: {
			...theme.mixins.toolbar
		}
	});
});

interface NavProps extends PropsWithChildren<{}> {

}

export default function Nav(props: PropsWithChildren<NavProps>) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={classes.appBar}
				elevation={0} color={"default"}>
				<Toolbar>
					<Typography variant="h6" noWrap>
						<SvgIcon>
							<Octopus />
						</SvgIcon>
					</Typography>
					<Typography
						className={classes.logo}
						variant={"h6"}
						color={"primary"}>
						Arava Admin
					</Typography>
				</Toolbar>
				<Divider />
			</AppBar>
			<SideBar />
			<main className={classes.content}>
				<div className={classes.toolbar} />
				{props.children}
			</main>
		</div>
	);
}