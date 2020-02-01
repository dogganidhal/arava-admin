import React from "react";
import JwtAuthCredentials from "../Data/Model/JwtAuthCredentials";


export interface AuthContextType {
	readonly authenticated: boolean;
	readonly credentials?: JwtAuthCredentials;
	asAuthenticated(credentials: JwtAuthCredentials): void;
	asAnonymous(): void;
}

const AuthContext = React.createContext<AuthContextType>({
	authenticated: false,
	asAuthenticated() {},
	asAnonymous() {}
});

export default AuthContext;