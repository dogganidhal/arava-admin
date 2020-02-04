import {useState} from "react";
import useIoC from "./UseIoC";
import PoiService from "../Data/Service/Poi/PoiService";
import ApiException from "../Data/Model/ApiException";
import IslandUpdateRequest from "../Data/Model/IslandUpdateRequest";

type UseIslandServiceResponse = [boolean, ApiException, Function];

export default function useIslandUpdateService(): UseIslandServiceResponse {
	const [isLoading, setLoading] = useState(true);
	const [success, setSuccess] = useState(false);
	const [exception, setException] = useState();
	const poiService = useIoC(PoiService);

	function updateIsland(request: IslandUpdateRequest) {
		setLoading(true);
		poiService.updateIsland(request)
			.catch(exception => setException(exception))
			.finally(() => setLoading(false));
	}

	return [isLoading, exception, updateIsland];
}