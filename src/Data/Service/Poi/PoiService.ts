import PoiWriteRequest from "../../Model/PoiWriteRequest";
import PoiCategoryWriteRequest from "../../Model/PoiCategoryWriteRequest";
import PoiTypeWriteRequest from "../../Model/PoiTypeWriteRequest";
import Poi from "../../Model/Poi";
import Island from "../../Model/Island";
import IslandUpdateRequest from "../../Model/IslandUpdateRequest";
import Archipelago from "../../Model/Archipelago";
import PoiCategory from "../../Model/PoiCategory";


export default abstract class PoiService {

	abstract createPoi(request: PoiWriteRequest): Promise<void>;
	abstract createPoiCategory(request: PoiCategoryWriteRequest): Promise<void>;
	abstract createPoiType(request: PoiTypeWriteRequest): Promise<void>;

	abstract listPois(): Promise<Poi[]>;
	abstract listIslands(): Promise<Island[]>;
	abstract listArchipelagos(): Promise<Archipelago[]>;
	abstract listCategories(): Promise<PoiCategory[]>;

	abstract getIsland(id: string): Promise<Island>;

	abstract updateIsland(request: IslandUpdateRequest): Promise<void>;

}