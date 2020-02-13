import {injectable} from "inversify";
import MediaWriteRequest from "../../Model/MediaWriteRequest";


@injectable()
export default abstract class MediaService {
	abstract upload(file: File): Promise<MediaWriteRequest>;
	abstract upload(files: File[]): Promise<MediaWriteRequest[]>;
}