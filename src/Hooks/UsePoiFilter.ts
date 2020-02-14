import Poi from "../Data/Model/Poi";
import {useEffect, useState} from "react";

type UsePoiFilterResponse = [Poi[], Function];

export default function usePoiFilter(pois: Poi[]): UsePoiFilterResponse {
	const [query, setQuery] = useState();
	const [filteredPois, setFilteredPois] = useState(pois);

	function containsQuery(resource: string, query?: string) {
		return !query || resource.toLowerCase().includes(query.toLowerCase());
	}

	useEffect(() => {
		const filteredPois = pois.filter(poi => {
			return !query ||
				poi.title.some(localizedTitle => containsQuery(localizedTitle.resource, query)) ||
				poi.description.some(localizedTitle => containsQuery(localizedTitle.resource, query)) ||
				poi.theme.name.some(localizedTitle => containsQuery(localizedTitle.resource, query)) ||
				containsQuery(poi.island.name, query);
		});
		setFilteredPois(filteredPois);
	}, [pois, query]);

	return [filteredPois, setQuery];
}