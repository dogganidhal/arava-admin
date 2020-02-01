import LocalizedResource from "./LocalizedResource";
import Media from "./Media";


export default interface PoiType {
	readonly id: string;
	readonly name: LocalizedResource;
	readonly icon: Media;
}