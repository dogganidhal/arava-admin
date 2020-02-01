import LocalizedResource from "./LocalizedResource";
import Media from "./Media";
import PoiType from "./PoiType";


export default interface PoiCategory {
	readonly id: string;
	readonly name: LocalizedResource;
	readonly icon: Media;
	readonly type: PoiType;
}