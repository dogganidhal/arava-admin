import Poi from "./Poi";
import User from "./User";


export default interface Rating {
	readonly id: string;
	readonly comment?: string;
	readonly dateTime: Date;
	readonly author: User;
	readonly poi: Poi;
	readonly approved: boolean;
	readonly score?: number;
}