import LocalizedResource from "./LocalizedResource";
import MediaWriteRequest from "./MediaWriteRequest";


export default interface PoiCategoryWriteRequest {
	readonly id?: string;
	readonly typeId: string;
	readonly name: LocalizedResource;
	readonly icon: MediaWriteRequest;
}