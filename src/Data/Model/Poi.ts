import LatLng from "./LatLng";
import LocalizedResource from "./LocalizedResource";
import Media from "./Media";
import PoiTheme from "./PoiTheme";
import Ratings from "./Ratings";
import PoiDetails from "./PoiDetails";
import Island from "./Island";
import User from "./User";


export default interface Poi {
	readonly id: string;
	readonly title: LocalizedResource;
	readonly description: LocalizedResource;
	readonly details: PoiDetails;
	readonly coordinate: LatLng;
	readonly island: Island;
	readonly owner?: User;
	readonly sponsored: boolean;
	readonly featured: boolean;
	readonly draft: boolean;
	readonly premium: boolean;
	readonly activity: boolean;
	readonly mainImage: Media;
	readonly medias: Media[];
	readonly theme: PoiTheme;
	readonly comments: Comment[];
	readonly ratings: Ratings;
}