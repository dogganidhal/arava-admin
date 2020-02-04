import {useEffect, useState} from "react";
import useIoC from "./UseIoC";
import PoiService from "../Data/Service/Poi/PoiService";
import ApiException from "../Data/Model/ApiException";
import Island from "../Data/Model/Island";

type UseIslandServiceResponse = [boolean, ApiException, Island];

export default function useIslandService(id: string): UseIslandServiceResponse {
	const [isLoading, setLoading] = useState(true);
	const [island, setIsland] = useState();
	const [exception, setException] = useState();
	const poiService = useIoC(PoiService);

	useEffect(() => {
		setLoading(true);
		poiService.getIsland(id)
			.then(island => setIsland(island))
			.catch(exception => setException(exception))
			.finally(() => setLoading(false));
	}, []);

	return [isLoading, exception, island];
}