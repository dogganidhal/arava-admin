import LocalizedResource from "./LocalizedResource";
import PoiDetailsWriteRequest from "./PoiDetailsWriteRequest";
import MediaWriteRequest from "./MediaWriteRequest";


export default interface PoiWriteRequest {
	readonly id?: string;
	readonly title: LocalizedResource;
	readonly description: LocalizedResource;
	readonly islandId: string;
	readonly categoryId: string;
	readonly sponsored?: boolean;
	readonly featured?: boolean;
	readonly thingsToDo?: boolean;
	readonly latitude: number;
	readonly longitude: number;
	readonly details: PoiDetailsWriteRequest;
	readonly medias: MediaWriteRequest[];
}