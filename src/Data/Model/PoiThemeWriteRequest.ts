import MediaWriteRequest from "./MediaWriteRequest";
import LocalizedResourceWriteRequest from "./LocalizedResourceWriteRequest";


export default interface PoiThemeWriteRequest {
	readonly id?: string;
	readonly parentId?: string;
	readonly subThemes?: PoiThemeWriteRequest[];
	readonly name: LocalizedResourceWriteRequest;
	readonly icon?: MediaWriteRequest;
	readonly marker?: MediaWriteRequest;
	readonly sponsoredMarker?: MediaWriteRequest;
}