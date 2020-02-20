import React, {PropsWithChildren, useState} from "react";
import AuthContext from "../Context/AuthContext";
import JwtAuthCredentials from "../Data/Model/JwtAuthCredentials";


export default function AuthRequired(props: PropsWithChildren<{}>) {
	const [authenticated, setAuthenticated] = useState<boolean>(false);
	const [credentials, setCredentials] = useState<JwtAuthCredentials>();

	return (
		<AuthContext.Provider value={{
			authenticated,
			credentials,
			asAuthenticated(credentials): void {
				setAuthenticated(true);
				setCredentials(credentials);
			},
			asAnonymous() {
				setAuthenticated(false);
				setCredentials(undefined);
			}
		}}>
			{props.children}
		</AuthContext.Provider>
	);
};
