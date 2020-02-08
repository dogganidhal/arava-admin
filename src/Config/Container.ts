import {Container} from "inversify";
import AxiosAuthService from "../Data/Service/Auth/AxiosAuthService";
import AxiosPoiService from "../Data/Service/Poi/AxiosPoiService";
import AuthService from "../Data/Service/Auth/AuthService";
import PoiService from "../Data/Service/Poi/PoiService";
import MediaService from "../Data/Service/Media/MediaService";
import FirebaseMediaService from "../Data/Service/Media/FirebaseMediaService";


export function createContainer(): Container {
	const container = new Container();

	container.bind(AuthService).to(AxiosAuthService);
	container.bind(PoiService).to(AxiosPoiService);
	container.bind(MediaService).to(FirebaseMediaService);

	return container;
}