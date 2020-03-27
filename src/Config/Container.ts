import {Container} from "inversify";
import AxiosAuthService from "../Data/Service/Auth/AxiosAuthService";
import AxiosPoiService from "../Data/Service/Poi/AxiosPoiService";
import AuthService from "../Data/Service/Auth/AuthService";
import PoiService from "../Data/Service/Poi/PoiService";
import MediaService from "../Data/Service/Media/MediaService";
import FirebaseMediaService from "../Data/Service/Media/FirebaseMediaService";
import LocalizedResourceMapper from "../Data/Mapper/LocalizedResourceMapper";
import PoiDetailsMapper from "../Data/Mapper/PoiDetailsMapper";
import UserService from "../Data/Service/User/UserService";
import AxiosUserService from "../Data/Service/User/AxiosUserService";
import CommentService from "../Data/Service/Comment/CommentService";
import AxiosCommentService from "../Data/Service/Comment/AxiosCommentService";


export function createContainer(): Container {
	const container = new Container();

	container.bind(AuthService).to(AxiosAuthService);
	container.bind(PoiService).to(AxiosPoiService);
	container.bind(UserService).to(AxiosUserService);
	container.bind(CommentService).to(AxiosCommentService);

	container.bind(MediaService).to(FirebaseMediaService);

	container.bind(LocalizedResourceMapper).toSelf();
	container.bind(PoiDetailsMapper).toSelf();

	return container;
}