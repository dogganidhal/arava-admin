import React, {useCallback, useEffect, useState} from "react";
import MUIDataTable, {MUIDataTableColumnDef} from "mui-datatables";
import useCommentListService, {CommentListType} from "../Hooks/UseCommentListService";
import AppLoader from "./AppLoader";
import Alert from "@material-ui/lab/Alert";
import {Button, createStyles, IconButton, TableCell, TableRow} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Close";
import {makeStyles} from "@material-ui/core/styles";
import Comment from "../Data/Model/Comment";
import useIoC from "../Hooks/UseIoC";
import CommentService from "../Data/Service/Comment/CommentService";
import CheckIcon from "@material-ui/icons/Check";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => createStyles({
	approve: {
		color: theme.palette.primary.main,
	},
	refuse: {
		color: theme.palette.error.main,
	}
}));

interface CommentListProps {
	readonly type: CommentListType;
}

const columns: MUIDataTableColumnDef[] = [
	{
		name: 'Auteur',
		options: {
			filter: true
		}
	},
	{
		name: "Commentaire",
		options: {
			filter: false
		}
	},
	{
		name: "Point d'intérêt",
		options: {
			filter: true
		}
	},
	{
		name: "Date",
		options: {
			sort: true,
			filter: false
		}
	},
	{
		name: "Actions",
		options: {
			sort: false,
			filter: false
		}
	},
];

export default function CommentList({type}: CommentListProps) {
	const classes = useStyles();
	const [loading, exception, comments] = useCommentListService(type);
	const [commentList, setCommentList] = useState(comments);

	const commentService = useIoC(CommentService);

	useEffect(() => setCommentList(comments), [comments]);

	const mapCommentsToTableData = useCallback(() => commentList.map((comment, index) => {
		return [
			`${comment.author.firstName} ${comment.author.lastName}`,
			comment.content,
			comment.poi.title.find(t => t.language.code == 'fr')?.resource,
			new Date(comment.dateTime).toLocaleString(),
			index
		];
	}), [commentList]);

	const approveComment = useCallback(async (comment: Comment) => {

		const index = commentList.indexOf(comment);
		const oldCommentList = [...commentList];
		setCommentList([
			...(commentList.slice(0, index)),
			...(commentList.slice(index + 1))
		]);
		try {
			await commentService.approveComment(comment);
		} catch (e) {
			setCommentList(oldCommentList);
			// TODO: Give feedback
		}
	}, [commentList]);

	const declineComment = useCallback(async (comment: Comment) => {

		const index = commentList.indexOf(comment);
		const oldCommentList = [...commentList];
		setCommentList([
			...(commentList.slice(0, index)),
			...(commentList.slice(index + 1))
		]);
		try {
			await commentService.declineComment(comment);
		} catch (e) {
			setCommentList(oldCommentList);
			// TODO: Give feedback
		}
	}, [commentList]);

	const deleteComment = useCallback(async (comment: Comment) => {

		const index = commentList.indexOf(comment);
		const oldCommentList = [...commentList];
		setCommentList([
			...(commentList.slice(0, index)),
			...(commentList.slice(index + 1))
		]);
		try {
			await commentService.deleteComment(comment);
		} catch (e) {
			setCommentList(oldCommentList);
			// TODO: Give feedback
		}
	}, [commentList]);

	if (loading) {
		return <AppLoader />;
	}

	if (exception) {
		return <Alert severity="error">
			{exception.message}
		</Alert>;
	}

	return <MUIDataTable
		title={
			type === CommentListType.ARCHIVE ?
				"Archive des commentaires" :
				"Liste des commentaires à valider"
		}
		columns={columns}
		data={mapCommentsToTableData()}
		options={{
			filterType: "checkbox",
			elevation: 0,
			selectableRows: "none",
			customRowRender: (data: any[]) => {
				return <TableRow>
					<TableCell component="th" scope="row">
						<Button
							variant={"text"}
							color={"primary"}
							component={Link}
							to={`/users/${commentList[data[4]].author.id}`}>
							{data[0]}
						</Button>
					</TableCell>
					<TableCell component="th" scope="row">
						{data[1]}
					</TableCell>
					<TableCell component="th" scope="row">
						<Button
							variant={"text"}
							color={"primary"}
							component={Link}
							to={`/pois/${commentList[data[4]].poi.id}`}>
							{data[2]}
						</Button>
					</TableCell>
					<TableCell component="th" scope="row">
						{data[3]}
					</TableCell>
					<TableCell>
						{
							type === CommentListType.UNAPPROVED &&
              <IconButton
                  className={classes.approve}
                  onClick={() => {
										const comment = commentList[data[4]];
										if (comment) {
											approveComment(comment);
										}
									}}
              >
                  <CheckIcon />
              </IconButton>
						}
						<IconButton
							className={classes.refuse}
							onClick={() => {
								const comment = commentList[data[4]];
								if (comment) {
									switch (type) {
										case CommentListType.UNAPPROVED:
											declineComment(comment);
											break;
										case CommentListType.ARCHIVE:
											deleteComment(comment);
									}
								}
							}}
						>
							<CancelIcon />
						</IconButton>
					</TableCell>
				</TableRow>;
			}
		}}
	/>
}