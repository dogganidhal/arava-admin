import Media from "./Media";


export default interface User {
	readonly id: string;
	readonly fullName: String;
	readonly avatar: Media;
}