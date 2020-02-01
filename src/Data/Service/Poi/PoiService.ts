import PoiWriteRequest from "../../Model/PoiWriteRequest";
import PoiCategoryWriteRequest from "../../Model/PoiCategoryWriteRequest";
import PoiTypeWriteRequest from "../../Model/PoiTypeWriteRequest";


export default interface PoiService {
	createPoi(request: PoiWriteRequest): Promise<void>;
	createPoiCategory(request: PoiCategoryWriteRequest): Promise<void>;
	createPoiType(request: PoiTypeWriteRequest): Promise<void>;
}