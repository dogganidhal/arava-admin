import MediaService from "./MediaService";
import {injectable} from "inversify";
import firebase from "firebase";
import MediaWriteRequest from "../../Model/MediaWriteRequest";


@injectable()
export default class FirebaseMediaService extends MediaService {

	private storageRef = firebase.storage().ref("media");

	public async upload(file: File): Promise<MediaWriteRequest> {
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