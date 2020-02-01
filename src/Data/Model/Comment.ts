import User from "./User";


export default interface Comment {
	readonly id: string;
	readonly content: string;
	readonly date: Date;
	readonly author: User;
}