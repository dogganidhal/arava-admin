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

		const handleSingleMedia = (media: PreparedMedia) => {
			if ("url" in media) {
				return Promise.resolve(media);
			} else {
				return this.uploadSingle(media.file);
			}
		};

		if (media instanceof Array) {
			return Promise.all(media.map(handleSingleMedia));
		} else {
			return handleSingleMedia(media);
		}

	}

	private async uploadSingle(file: File): Promise<MediaWriteRequest> {
		return new Promise(((resolve, reject) => {
			this.storageRef.put(file)
				.then(async snapshot => {
					const url = await snapshot.ref.getDownloadURL();
					resolve({
						url,
						type: file.type
					});
				})
				.catch((e) => reject(e));
		}));
	}

}