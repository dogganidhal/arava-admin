import {useEffect, useState} from "react";
import useIoC from "./UseIoC";
import PoiService from "../Data/Service/Poi/PoiService";
import ApiException from "../Data/Model/ApiException";
import Poi from "../Data/Model/Poi";

type PoiListLoaderResponse = [boolean, ApiException, Poi[]];

export default function usePoiListService(): PoiListLoaderResponse {
	const [isLoading, setLoading] = useState(true);
	const [pois, setPois] = useState([] as Poi[]);
	const [exception, setException] = useState();
	const poiService = useIoC(PoiService);

	useEffect(() => {
		setLoading(true);
		poiService.listPois()
			.then(pois => setPois(pois))
			.catch(exception => setException(exception))
			.finally(() => setLoading(false));
	}, []);

	return [isLoading, exception, pois];
}