import {useEffect, useState} from "react";
import useIoC from "./UseIoC";
import PoiService from "../Data/Service/Poi/PoiService";
import Archipelago from "../Data/Model/Archipelago";
import ApiException from "../Data/Model/ApiException";

type UseArchipelagoListServiceResponse = [boolean, ApiException, Archipelago[]];

export default function useArchipelagoListService(): UseArchipelagoListServiceResponse {
	const [isLoading, setLoading] = useState(true);
	const [archipelagos, setArchipelagos] = useState([] as Archipelago[]);
	const [exception, setException] = useState();
	const poiService = useIoC(PoiService);

	useEffect(() => {
		setLoading(true);
		poiService.listArchipelagos()
			.then(archipelago => setArchipelagos(archipelago))
			.catch(exception => setException(exception))
			.finally(() => setLoading(false));
	}, []);

	return [isLoading, exception, archipelagos];
}