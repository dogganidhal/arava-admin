import AuthService from "./AuthService";
import JwtAuthCredentials from "../../Model/JwtAuthCredentials";
import AbstractAxiosService from "../AbstractAxiosService";
import {injectable} from "inversify";


@injectable()
export default class AxiosAuthService extends AbstractAxiosService implements AuthService {

	public async login(email: string, password: string): Promise<JwtAuthCredentials> {
		return this.post("/auth/login", { email, password });
	}

	public async refresh(refreshToken: string): Promise<JwtAuthCredentials> {
		return this.post("/auth/refresh", { refreshToken: refreshToken });
	}

}