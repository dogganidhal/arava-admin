import CommentAuthor from "./CommentAuthor";


export default interface Comment {
	readonly id: string;
	readonly content: string;
	readonly date: Date;
	readonly author: CommentAuthor;
}