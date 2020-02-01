import React, {PropsWithChildren, useState} from "react";
import AuthContext from "../Context/AuthContext";


export default function AuthRequired(props: PropsWithChildren<{}>) {
	const [authenticated, setAuthenticated] = useState();
	const [credentials, setCredentials] = useState();

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
