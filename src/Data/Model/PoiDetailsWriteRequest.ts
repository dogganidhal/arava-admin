

export default interface PoiDetailsWriteRequest {
	readonly id?: string;
	readonly address?: string;
	readonly phone?: string;
	readonly email?: string;
	readonly website?: string;
	readonly facebookUrl?: string;
	readonly instagramAccount?: string;
	readonly openingHours?: string;
}