import Axios from "axios";
import * as AxiosLogger from "axios-logger";
import {kauthCredentialsKey} from "../Hooks/UseAuth";
import JwtAuthCredentials from "../Data/Model/JwtAuthCredentials";
import AxiosAuthService from "../Data/Service/Auth/AxiosAuthService";


export default function configureAxios() {
	Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
	Axios.interceptors.request.use(config => {
		const credentialsJson = localStorage.getItem(kauthCredentialsKey);
		if (credentialsJson) {
			const credentials: JwtAuthCredentials = JSON.parse(credentialsJson);
			config.headers['Authorization'] = `${credentials.tokenType} ${credentials.accessToken}`;
		} else {
			// TODO: Handle missing authorization
		}
		return config;
	});
	Axios.interceptors.response.use(async response => {
		if (response.status === 401) {
			const credentialsJson = localStorage.getItem(kauthCredentialsKey);
			if (credentialsJson) {
				const oldCredential: JwtAuthCredentials = JSON.parse(credentialsJson);
				const newCredentials = await new AxiosAuthService().refresh(oldCredential.refreshToken);
				localStorage.setItem(kauthCredentialsKey, JSON.stringify(newCredentials));
				return Axios.request(response.request);
			}
		}
		return response;
	});
	if (process.env.NODE_ENV === "development") {
		Axios.interceptors.request.use(AxiosLogger.requestLogger);
		Axios.interceptors.response.use(AxiosLogger.responseLogger);
	}
}