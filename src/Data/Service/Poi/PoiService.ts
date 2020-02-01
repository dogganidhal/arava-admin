import PoiWriteRequest from "../../Model/PoiWriteRequest";
import PoiCategoryWriteRequest from "../../Model/PoiCategoryWriteRequest";
import PoiTypeWriteRequest from "../../Model/PoiTypeWriteRequest";


export default abstract class PoiService {
	abstract createPoi(request: PoiWriteRequest): Promise<void>;
	abstract createPoiCategory(request: PoiCategoryWriteRequest): Promise<void>;
	abstract createPoiType(request: PoiTypeWriteRequest): Promise<void>;
}