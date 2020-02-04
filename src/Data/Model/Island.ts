import LatLng from "./LatLng";
import Media from "./Media";
import Archipelago from "./Archipelago";


export default interface Island {
	readonly id: string;
	readonly name: string;
	readonly center: LatLng;
	readonly zoom: number;
	readonly image: Media;
	readonly archipelago: Archipelago;
}