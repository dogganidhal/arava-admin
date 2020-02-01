import React from "react";
import {Container} from "inversify";
import AxiosAuthService from "../Data/Service/Auth/AxiosAuthService";
import AxiosPoiService from "../Data/Service/Poi/AxiosPoiService";


export function createContainer(): Container {
	const container = new Container();

	container.bind(Symbol('AuthService')).toAutoFactory(AxiosAuthService);
	container.bind(Symbol('PoiService')).toAutoFactory(AxiosPoiService);

	return container;
}

const ContainerContext = React.createContext(new Container());

export default ContainerContext;