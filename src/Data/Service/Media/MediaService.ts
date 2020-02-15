import {injectable} from "inversify";
import MediaWriteRequest from "../../Model/MediaWriteRequest";
import PreparedMedia from "../../Model/PreparedMedia";


@injectable()
export default abstract class MediaService {
	abstract upload(media: PreparedMedia): Promise<MediaWriteRequest>;
	abstract upload(files: PreparedMedia[]): Promise<MediaWriteRequest[]>;
}