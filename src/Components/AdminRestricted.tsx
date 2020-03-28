import React, {ElementType, PropsWithChildren, useContext} from "react";
import AuthContext from "../Context/AuthContext";
import AccessDenied from "./AccessDenied";

interface AdminRestrictedProps extends PropsWithChildren<any> {
	readonly fallback?: ElementType;
	readonly shouldDisplayFallback?: boolean;
}

export default function AdminRestricted({ children, fallback, shouldDisplayFallback }: AdminRestrictedProps) {
	const {isAdmin, loading} = useContext(AuthContext);
	const FallbackComponent = shouldDisplayFallback ?
		(fallback ?? AccessDenied) :
		"div";

	if (loading) {
		return <div />;
	}

	return <div>
		{isAdmin ?
			children :
			<FallbackComponent />
		}
	</div>
}