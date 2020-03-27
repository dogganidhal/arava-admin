import AbstractAxiosService from "../AbstractAxiosService";
import CommentService from "./CommentService";
import Comment from "../../Model/Comment";
import {injectable} from "inversify";


@injectable()
export default class AxiosCommentService extends AbstractAxiosService implements CommentService {

	public async listUnapprovedComments(): Promise<Comment[]> {
		return await this.get('/comment/pending');
	}

	public async approveComment(comment: Comment): Promise<void> {
		return await this.put(`/comment/${comment.id}/approve`);
	}

	public async declineComment(comment: Comment): Promise<void> {
		return await this.put(`/comment/${comment.id}/decline`);
	}

}