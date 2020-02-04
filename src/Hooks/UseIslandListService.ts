import ApiException from "../Data/Model/ApiException";
import Island from "../Data/Model/Island";
import {useEffect, useState} from "react";
import useIoC from "./UseIoC";
import PoiService from "../Data/Service/Poi/PoiService";


type IslandListLoaderResponse = [boolean, ApiException, Island[]];

export default function useIslandListService(): IslandListLoaderResponse {
	const [isLoading, setLoading] = useState(true);
	const [islands, setIslands] = useState([] as Island[]);
	const [exception, setException] = useState();
	const poiService = useIoC(PoiService);

	useEffect(() => {
		setLoading(true);
		poiService.listIslands()
			.then(islands => setIslands(islands))
			.catch(exception => setException(exception))
			.finally(() => setLoading(false));
	}, []);

	return [isLoading, exception, islands];
}