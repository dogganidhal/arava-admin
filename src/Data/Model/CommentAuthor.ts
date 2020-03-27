import Media from "./Media";


export default interface CommentAuthor {
	readonly id: string;
	readonly fullName: String;
	readonly avatar: Media;
}