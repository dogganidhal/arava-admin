import ApiException from "../Data/Model/ApiException";
import PoiTheme from "../Data/Model/PoiTheme";
import {useEffect, useState} from "react";
import useIoC from "./UseIoC";
import PoiService from "../Data/Service/Poi/PoiService";


type  UseThemeServiceResponse = [boolean, ApiException, PoiTheme];

export default function useThemeService(id: string): UseThemeServiceResponse {
	const [isLoading, setLoading] = useState(false);
	const [exception, setException] = useState();
	const [theme, setTheme] = useState();
	const poiService = useIoC(PoiService);

	useEffect(() => {
		setLoading(true);
		poiService.getTheme(id)
			.then(theme => setTheme(theme))
			.catch(exception => setException(exception))
			.finally(() => setLoading(false));
	}, []);

	return [isLoading, exception, theme];
}