import AbstractAxiosService from "../AbstractAxiosService";
import CommentService from "./CommentService";
import Rating from "../../Model/Rating";
import {injectable} from "inversify";


@injectable()
export default class AxiosCommentService extends AbstractAxiosService implements CommentService {

	public async listUnapprovedComments(): Promise<Rating[]> {
		return await this.get('/comment/pending');
	}

	public async listArchiveComments(): Promise<Rating[]> {
		return await this.get('/comment/archive');
	}

	public async approveComment(comment: Rating): Promise<void> {
		return await this.put(`/comment/${comment.id}/approve`);
	}

	public async declineComment(comment: Rating): Promise<void> {
		return await this.put(`/comment/${comment.id}/decline`);
	}

	public async deleteComment(comment: Rating): Promise<void> {
		return await this.delete(`/comment/${comment.id}`);
	}

}