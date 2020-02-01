import {useContext, useState} from "react";
import useIoC from "./UseIoC";
import AuthService from "../Data/Service/Auth/AuthService";
import JwtAuthCredentials from "../Data/Model/JwtAuthCredentials";
import AuthContext from "../Context/AuthContext";

const kauthCredentialsKey = "com.arava.auth_credentials";

export default function useAuth() {
	const [isLoading, setLoading] = useState(false);
	const [exception, setException] = useState();
	const authService = useIoC(AuthService);
	const {asAuthenticated, asAnonymous} = useContext(AuthContext);

	function loadAuth() {
		setLoading(true);
		const json = localStorage.getItem(kauthCredentialsKey);
		if (json != null) {
			const oldCredentials: JwtAuthCredentials = JSON.parse(json);
			authService.refresh(oldCredentials.refreshToken)
				.then(newCredentials => {
					localStorage.setItem(kauthCredentialsKey, JSON.stringify(newCredentials));
					asAuthenticated(newCredentials);
				})
				.catch(exception => setException(exception));
		} else {
			asAnonymous();
		}
		setLoading(false);
	}

	function login(email: string, password: string) {
		setLoading(true);
		authService.login(email, password)
			.then(credentials => {
				localStorage.setItem(kauthCredentialsKey, JSON.stringify(credentials));
				asAuthenticated(credentials);
			})
			.catch(exception => {
				asAnonymous();
				setException(exception);
			})
			.finally(() => setLoading(false));
	}

	return {isLoading, exception, loadAuth, login};
}