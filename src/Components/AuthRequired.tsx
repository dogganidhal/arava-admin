import React, {PropsWithChildren, useState} from "react";
import AuthContext from "../Context/AuthContext";


export default function AuthRequired(props: PropsWithChildren<{}>) {
	const [authenticated, setAuthenticated] = useState(false);
	const [isAdmin, setAdmin] = useState(false);
	const [credentials, setCredentials] = useState();
	const [loading, setLoading] = useState(true);

	return (
		<AuthContext.Provider value={{
			authenticated,
			isAdmin,
			credentials,
			loading,
			asAuthenticated(credentials): void {
				setAuthenticated(true);
				setCredentials(credentials);
				setAdmin(credentials.isAdmin);
				setLoading(false);
			},
			asAnonymous() {
				setAuthenticated(false);
				setCredentials(undefined);
				setLoading(false);
			}
		}}>
			{props.children}
		</AuthContext.Provider>
	);
};
