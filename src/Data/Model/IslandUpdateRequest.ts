import MediaWriteRequest from "./MediaWriteRequest";


export default interface IslandUpdateRequest {
	readonly id: string;
	readonly name?: string;
	readonly image?: MediaWriteRequest;
	readonly latitude?: number;
	readonly longitude?: number;
	readonly zoom?: number;
	readonly archipelagoId?: string;
}