import Comment from "../../Model/Comment";


export default abstract class CommentService {
	abstract listUnapprovedComments(): Promise<Comment[]>;
	abstract listArchiveComments(): Promise<Comment[]>;
	abstract approveComment(comment: Comment): Promise<void>;
	abstract declineComment(comment: Comment): Promise<void>;
	abstract deleteComment(comment: Comment): Promise<void>;
}