import PoiDetailsWriteRequest from "./PoiDetailsWriteRequest";
import MediaWriteRequest from "./MediaWriteRequest";
import LocalizedResourceWriteRequest from "./LocalizedResourceWriteRequest";


export default interface PoiWriteRequest {
	readonly id?: string;
	readonly title: LocalizedResourceWriteRequest;
	readonly description?: LocalizedResourceWriteRequest;
	readonly islandId?: string;
	readonly themeId?: string;
	readonly ownerId?: string;
	readonly light?: boolean;
	readonly sponsored: boolean;
	readonly featured: boolean;
	readonly activity: boolean;
	readonly premium: boolean;
	readonly defaultPremium: boolean;
	readonly draft?: boolean;
	readonly latitude: number;
	readonly longitude: number;
	readonly mainImage?: MediaWriteRequest;
	readonly details: PoiDetailsWriteRequest;
	readonly medias: MediaWriteRequest[];
}
