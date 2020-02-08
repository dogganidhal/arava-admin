import {useEffect, useState} from "react";
import PoiCategory from "../Data/Model/PoiCategory";
import useIoC from "./UseIoC";
import PoiService from "../Data/Service/Poi/PoiService";
import ApiException from "../Data/Model/ApiException";

type UseCategoryListServiceResponse = [boolean, ApiException, PoiCategory[]];

export default function useCategoryListService(): UseCategoryListServiceResponse {
	const [isLoading, setLoading] = useState(false);
	const [exception, setException] = useState();
	const [categories, setCategories] = useState([] as PoiCategory[]);
	const poiService = useIoC(PoiService);

	useEffect(() => {
		setLoading(true);
		poiService.listCategories()
			.then(categories => setCategories(categories))
			.catch(exception => setException(exception))
			.finally(() => setLoading(false));
	}, []);

	return [isLoading, exception, categories];
}