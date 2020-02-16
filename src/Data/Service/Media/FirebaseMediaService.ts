import MediaService from "./MediaService";
import {injectable} from "inversify";
import firebase from "firebase";
import MediaWriteRequest from "../../Model/MediaWriteRequest";
import PreparedMedia from "../../Model/PreparedMedia";


@injectable()
export default class FirebaseMediaService extends MediaService {

	private storageRef = firebase.storage().ref("media");

	public upload(media: PreparedMedia): Promise<MediaWriteRequest>;
	public upload(media: PreparedMedia[]): Promise<MediaWriteRequest[]>;
	public upload(media: PreparedMedia | PreparedMedia[]): Promise<MediaWriteRequest> | Promise<MediaWriteRequest[]> {

		if (media instanceof Array) {
			return Promise.all(media.map(this.handleSingleMedia.bind(this)));
		} else {
			return this.handleSingleMedia(media);
		}

	}

	private async uploadSingle(file: File): Promise<MediaWriteRequest> {
		const snapshot = await this.storageRef.put(file);
		const url = await snapshot.ref.getDownloadURL();
		return {
			url,
			type: file.type
		};
	}

	private async handleSingleMedia(media: PreparedMedia): Promise<MediaWriteRequest> {
		if ("url" in media) {
			return Promise.resolve(media);
		} else {
			return this.uploadSingle(media.file);
		}
	}

}