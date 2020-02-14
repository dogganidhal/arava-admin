import {useEffect, useState} from "react";
import useIoC from "./UseIoC";
import PoiService from "../Data/Service/Poi/PoiService";
import ApiException from "../Data/Model/ApiException";
import Poi from "../Data/Model/Poi";

type UsePoiServiceResponse = [boolean, ApiException, Poi];

export default function usePoiService(id: string): UsePoiServiceResponse {
	const [isLoading, setLoading] = useState(false);
	const [exception, setException] = useState();
	const [poi, setPoi] = useState();
	const poiService = useIoC(PoiService);

	useEffect(() => {
		setLoading(true);
		poiService.getPoi(id)
			.then(poi => setPoi(poi))
			.catch(exception => setException(exception))
			.finally(() => setLoading(false));
	}, []);

	return [isLoading, exception, poi];
}