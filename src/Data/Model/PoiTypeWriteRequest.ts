import LocalizedResource from "./LocalizedResource";
import MediaWriteRequest from "./MediaWriteRequest";
import PoiCategoryWriteRequest from "./PoiCategoryWriteRequest";


export default interface PoiTypeWriteRequest {
	readonly id?: string;
	readonly name: LocalizedResource;
	readonly icon: MediaWriteRequest;
	readonly categories: PoiCategoryWriteRequest[];
}