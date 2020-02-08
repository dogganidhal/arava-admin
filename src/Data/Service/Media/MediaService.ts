import {injectable} from "inversify";
import Media from "../../Model/Media";
import MediaWriteRequest from "../../Model/MediaWriteRequest";


@injectable()
export default abstract class MediaService {
	abstract upload(file: File): Promise<MediaWriteRequest>;
}