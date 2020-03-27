import {useEffect, useState} from "react";
import useIoC from "./UseIoC";
import CommentService from "../Data/Service/Comment/CommentService";
import ApiException from "../Data/Model/ApiException";
import Comment from "../Data/Model/Comment";

type CommentListServiceResponse = [boolean, ApiException, Comment[]];

export default function useCommentListService(): CommentListServiceResponse {
	const [isLoading, setLoading] = useState(false);
	const [exception, setException] = useState();
	const [comments, setComments] = useState<Comment[]>([]);
	const commentService = useIoC(CommentService);

	useEffect(() => {
		setLoading(true);
		commentService.listUnapprovedComments()
			.then(comments => setComments(comments))
			.catch(exception => setException(exception))
			.finally(() => setLoading(false));
	}, []);

	return [isLoading, exception, comments];
}