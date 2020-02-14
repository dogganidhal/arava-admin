import Mapper from "./index";
import PoiDetails from "../Model/PoiDetails";
import PoiDetailsWriteRequest from "../Model/PoiDetailsWriteRequest";
import {injectable} from "inversify";


@injectable()
export default class PoiDetailsMapper implements Mapper<PoiDetails, PoiDetailsWriteRequest> {

	public map(object: PoiDetails): PoiDetailsWriteRequest {
		return {
			...object
		};
	}

}