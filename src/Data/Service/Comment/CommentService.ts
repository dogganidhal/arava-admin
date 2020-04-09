import Rating from "../../Model/Rating";


export default abstract class CommentService {
	abstract listUnapprovedComments(): Promise<Rating[]>;
	abstract listArchiveComments(): Promise<Rating[]>;
	abstract approveComment(comment: Rating): Promise<void>;
	abstract declineComment(comment: Rating): Promise<void>;
	abstract deleteComment(comment: Rating): Promise<void>;
}