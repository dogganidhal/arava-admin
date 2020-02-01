import JwtAuthCredentials from "../../Model/JwtAuthCredentials";


export default abstract class AuthService {
	abstract login(email: string, password: string): Promise<JwtAuthCredentials>;
	abstract refresh(refreshToken: string): Promise<JwtAuthCredentials>;
}