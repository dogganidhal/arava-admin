import {useEffect, useState} from "react";
import useIoC from "./UseIoC";
import CommentService from "../Data/Service/Comment/CommentService";
import ApiException from "../Data/Model/ApiException";
import Rating from "../Data/Model/Rating";

type CommentListServiceResponse = [boolean, ApiException, Rating[]];

export enum CommentListType {
	UNAPPROVED,
	ARCHIVE
}

export default function useCommentListService(type: CommentListType): CommentListServiceResponse {
	const [isLoading, setLoading] = useState(false);
	const [exception, setException] = useState();
	const [comments, setComments] = useState<Rating[]>([]);
	const commentService = useIoC(CommentService);

	useEffect(() => {
		setLoading(true);
		const promise = type === CommentListType.UNAPPROVED ?
			commentService.listUnapprovedComments() :
			commentService.listArchiveComments();
		promise
			.then(comments => setComments(comments))
			.catch(exception => setException(exception))
			.finally(() => setLoading(false));
	}, []);

	return [isLoading, exception, comments];
}