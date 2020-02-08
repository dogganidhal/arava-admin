import firebase from "firebase";
import FirebaseAppConfig from "./firebase.config.json";

export default function configureFirebase() {
	firebase.initializeApp(FirebaseAppConfig);
	firebase.analytics();
}