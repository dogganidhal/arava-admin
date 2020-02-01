

export default interface ApiException extends Error {
	readonly statusCode: string;
	readonly timestamp: Date;
	readonly status: number;
	readonly message: string;
	readonly path: string;
}