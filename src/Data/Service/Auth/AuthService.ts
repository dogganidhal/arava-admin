import JwtAuthCredentials from "../../Model/JwtAuthCredentials";


export default interface AuthService {
	login(email: string, password: string): Promise<JwtAuthCredentials>;
	refresh(refreshToken: string): Promise<JwtAuthCredentials>;
}