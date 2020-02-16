import {useEffect, useState} from "react";
import PoiTheme from "../Data/Model/PoiTheme";
import useIoC from "./UseIoC";
import PoiService from "../Data/Service/Poi/PoiService";
import ApiException from "../Data/Model/ApiException";

type UseThemeListServiceResponse = [boolean, ApiException, PoiTheme[]];

export default function useThemeListService(): UseThemeListServiceResponse {
	const [isLoading, setLoading] = useState(false);
	const [exception, setException] = useState();
	const [themes, setThemes] = useState([] as PoiTheme[]);
	const poiService = useIoC(PoiService);

	useEffect(() => {
		setLoading(true);
		poiService.listThemes()
			.then(categories => setThemes(categories))
			.catch(exception => setException(exception))
			.finally(() => setLoading(false));
	}, []);

	return [isLoading, exception, themes];
}