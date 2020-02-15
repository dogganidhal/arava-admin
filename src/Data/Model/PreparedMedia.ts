import MediaWriteRequest from "./MediaWriteRequest";

interface MediaUploadRequest {
	readonly file: File;
}

type PreparedMedia = MediaWriteRequest | MediaUploadRequest;

export default PreparedMedia;