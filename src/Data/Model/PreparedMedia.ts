import MediaWriteRequest from "./MediaWriteRequest";
import Media from "./Media";

interface MediaUploadRequest {
	readonly file: File;
}

type PreparedMedia = Media | MediaWriteRequest | MediaUploadRequest;

export default PreparedMedia;