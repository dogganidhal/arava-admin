import AbstractAxiosService from "../AbstractAxiosService";
import PoiService from "./PoiService";
import PoiWriteRequest from "../../Model/PoiWriteRequest";
import PoiCategoryWriteRequest from "../../Model/PoiCategoryWriteRequest";
import PoiTypeWriteRequest from "../../Model/PoiTypeWriteRequest";


export default class AxiosPoiService extends AbstractAxiosService implements PoiService {

	createPoi(request: PoiWriteRequest): Promise<void> {
		return this.post("/poi", request);
	}

	createPoiCategory(request: PoiCategoryWriteRequest): Promise<void> {
		return this.post("/poi/category", request);
	}

	createPoiType(request: PoiTypeWriteRequest): Promise<void> {
		return this.post("/poi/type", request);
	}

}