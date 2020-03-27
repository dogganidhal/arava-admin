import Poi from "./Poi";
import User from "./User";


export default interface Comment {
	readonly id: string;
	readonly content: string;
	readonly dateTime: Date;
	readonly author: User;
	readonly poi: Poi;
	readonly approved: boolean;
}