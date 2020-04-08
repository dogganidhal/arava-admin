import React, {useCallback, useState} from "react";
import {Grid, Tab, Tabs, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CommentList from "./CommentList";
import {CommentListType} from "../Hooks/UseCommentListService";

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		display: 'flex',
		height: 224,
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
	},
}));


export default function CommentTabSwitch() {
	const classes = useStyles();
	const [tab, setTab] = useState(0);

	return <div>
		<Grid container>
			<Grid item xs={2}>
				<Tabs
					orientation="vertical"
					variant="scrollable"
					indicatorColor={"primary"}
					value={tab}
					onChange={(_, tab) => setTab(tab)}
					aria-label="Vertical tabs example"
					className={classes.tabs}>
					<Tab label="À valider" />
					<Tab label="Archive" />
				</Tabs>
			</Grid>
			<Grid item xs={10}>
				<div role={"tabpanel"} hidden={tab === 1}>
					<CommentList type={CommentListType.UNAPPROVED}/>
				</div>
				<div role={"tabpanel"} hidden={tab === 0}>
					<CommentList type={CommentListType.ARCHIVE}/>
				</div>
			</Grid>
		</Grid>
	</div>
}