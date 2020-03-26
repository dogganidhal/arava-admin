

export default interface JwtAuthCredentials {
	readonly accessToken: string;
	readonly refreshToken: string;
	readonly tokenType: string;
	readonly expiresIn: number;
	readonly isAdmin: boolean;
}