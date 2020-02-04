import AbstractAxiosService from "../AbstractAxiosService";
import PoiService from "./PoiService";
import PoiWriteRequest from "../../Model/PoiWriteRequest";
import PoiCategoryWriteRequest from "../../Model/PoiCategoryWriteRequest";
import PoiTypeWriteRequest from "../../Model/PoiTypeWriteRequest";
import {injectable} from "inversify";
import Poi from "../../Model/Poi";
import Island from "../../Model/Island";
import IslandUpdateRequest from "../../Model/IslandUpdateRequest";
import Archipelago from "../../Model/Archipelago";


@injectable()
export default class AxiosPoiService extends AbstractAxiosService implements PoiService {

	public async createPoi(request: PoiWriteRequest): Promise<void> {
		return this.post("/poi", request);
	}

	public async createPoiCategory(request: PoiCategoryWriteRequest): Promise<void> {
		return this.post("/poi/category", request);
	}

	public async createPoiType(request: PoiTypeWriteRequest): Promise<void> {
		return this.post("/poi/type", request);
	}

	public async listPois(): Promise<Poi[]> {
		return this.get("/poi");
	}

	public async listIslands(): Promise<Island[]> {
		return this.get("/island");
	}

	public async listArchipelagos(): Promise<Archipelago[]> {
		return this.get("/archipelago");
	}

	public async getIsland(id: string): Promise<Island> {
		return this.get(`/island/${id}`);
	}

	public async updateIsland(request: IslandUpdateRequest): Promise<void> {
		return this.put("/island", request);
	}

}