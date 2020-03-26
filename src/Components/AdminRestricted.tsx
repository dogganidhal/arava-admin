import React, {PropsWithChildren, useContext} from "react";
import AuthContext from "../Context/AuthContext";


export default function AdminRestricted({ children }: PropsWithChildren<any>) {
	const {isAdmin} = useContext(AuthContext);

	return <div>
		{isAdmin && children}
	</div>
}