import React, {PropsWithChildren, useState} from "react";
import AuthContext from "../Context/AuthContext";


export default function AuthRequired(props: PropsWithChildren<{}>) {
	const [authenticated, setAuthenticated] = useState(false);
	const [isAdmin, setAdmin] = useState(false);
	const [credentials, setCredentials] = useState();

	return (
		<AuthContext.Provider value={{
			authenticated,
			isAdmin,
			credentials,
			asAuthenticated(credentials): void {
				setAuthenticated(true);
				setCredentials(credentials);
				setAdmin(credentials.isAdmin);
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
