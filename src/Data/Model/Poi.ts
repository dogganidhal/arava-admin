import LatLng from "./LatLng";
import LocalizedResource from "./LocalizedResource";
import Media from "./Media";
import PoiTheme from "./PoiTheme";
import Ratings from "./Ratings";
import PoiDetails from "./PoiDetails";


export default interface Poi {
	readonly id: string;
	readonly title: LocalizedResource;
	readonly description: LocalizedResource;
	readonly details: PoiDetails;
	readonly coordinate: LatLng;
	readonly island: string;
	readonly sponsored: boolean;
	readonly featured: boolean;
	readonly thingsToDo: boolean;
	readonly medias: Media[];
	readonly theme: PoiTheme;
	readonly comments: Comment[];
	readonly ratings: Ratings;
}