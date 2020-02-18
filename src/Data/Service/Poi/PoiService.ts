import PoiWriteRequest from "../../Model/PoiWriteRequest";
import PoiThemeWriteRequest from "../../Model/PoiThemeWriteRequest";
import Poi from "../../Model/Poi";
import Island from "../../Model/Island";
import IslandUpdateRequest from "../../Model/IslandUpdateRequest";
import Archipelago from "../../Model/Archipelago";
import PoiTheme from "../../Model/PoiTheme";


export default abstract class PoiService {

	abstract createPoi(request: PoiWriteRequest): Promise<void>;
	abstract createPoiTheme(request: PoiThemeWriteRequest): Promise<void>;

	abstract listPois(): Promise<Poi[]>;
	abstract listIslands(): Promise<Island[]>;
	abstract listArchipelagos(): Promise<Archipelago[]>;
	abstract listThemes(): Promise<PoiTheme[]>;

	abstract getPoi(id: string): Promise<Poi>;
	abstract getIsland(id: string): Promise<Island>;
	abstract getTheme(id: string): Promise<PoiTheme>;

	abstract updatePoi(request: PoiWriteRequest): Promise<void>;
	abstract updateIsland(request: IslandUpdateRequest): Promise<void>;

	abstract toggleDraft(poiId: string): Promise<void>;

	abstract deletePoi(id: string): Promise<void>;

}