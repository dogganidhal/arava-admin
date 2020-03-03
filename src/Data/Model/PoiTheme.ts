import LocalizedResource from "./LocalizedResource";
import Media from "./Media";


export default interface PoiTheme {
	readonly id: string;
	readonly name: LocalizedResource;
	readonly icon?: Media;
	readonly parent?: PoiTheme;
	readonly subThemes?: PoiTheme[];
}