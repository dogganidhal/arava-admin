import AbstractAxiosService from "../AbstractAxiosService";
import PoiService from "./PoiService";
import PoiWriteRequest from "../../Model/PoiWriteRequest";
import PoiThemeWriteRequest from "../../Model/PoiThemeWriteRequest";
import {injectable} from "inversify";
import Poi from "../../Model/Poi";
import Island from "../../Model/Island";
import IslandUpdateRequest from "../../Model/IslandUpdateRequest";
import Archipelago from "../../Model/Archipelago";
import PoiTheme from "../../Model/PoiTheme";


@injectable()
export default class AxiosPoiService extends AbstractAxiosService implements PoiService {

	public async createPoi(request: PoiWriteRequest): Promise<void> {
		return this.post("/poi", request);
	}

	public async createPoiTheme(request: PoiThemeWriteRequest): Promise<void> {
		return this.post("/poi/theme", request);
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

	public async listThemes(): Promise<PoiTheme[]> {
		return this.get("/poi/theme");
	}

	public async getPoi(id: string): Promise<Poi> {
		return this.get(`/poi/${id}`);
	}

	public async getIsland(id: string): Promise<Island> {
		return this.get(`/island/${id}`);
	}

	public async getTheme(id: string): Promise<PoiTheme> {
		return this.get(`/poi/theme/${id}`);
	}

	public async updatePoi(request: PoiWriteRequest): Promise<void> {
		return this.put("/poi", request);
	}

	public async updateIsland(request: IslandUpdateRequest): Promise<void> {
		return this.put("/island", request);
	}

	public async toggleDraft(poiId: string): Promise<void> {
		return this.post(`/poi/${poiId}/toggle-draft`);
	}

	public async deletePoi(id: string): Promise<void> {
		return this.delete(`/poi/${id}`);
	}

	public async deleteTheme(id: string): Promise<void> {
		return this.delete(`/poi/theme/${id}`);
	}
}