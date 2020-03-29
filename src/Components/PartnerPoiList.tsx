import usePoiListService from "../Hooks/UsePoiListService";
import React, {useCallback, useEffect, useState} from "react";
import useIoC from "../Hooks/UseIoC";
import PoiService from "../Data/Service/Poi/PoiService";
import Poi from "../Data/Model/Poi";
import AppLoader from "./AppLoader";
import Alert from "@material-ui/lab/Alert";
import {Button, IconButton, TableCell, TableRow} from "@material-ui/core";
import {Link} from "react-router-dom";
import MUIDataTable, {MUIDataTableColumnDef} from "mui-datatables";
import CheckIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/Close";


const columns: MUIDataTableColumnDef[] = [
	{
		name: 'Titre',
		options: {
			filter: false
		}
	},
	{
		name: "Thème",
		options: {
			filterType: "dropdown"
		}
	},
	{
		name: "Île",
		options: {
			filterType: "dropdown"
		}
	},
	{
		name: "Brouillon",
		options: {
			sort: false
		}
	},
	{
		name: "Actions",
		options: {
			filter: false,
			sort: false
		}
	}
];

export default function PartnerPoiList() {
	const [isLoading, exception, pois] = usePoiListService();
	const [allPois, setAllPois] = useState(pois);

	const poiService = useIoC(PoiService);

	useEffect(() => setAllPois(pois), [pois]);

	const togglePoiDraft = useCallback(async (poi: Poi) => {
		// Toggle UI
		const currentAllPois = allPois;
		const index = allPois.indexOf(poi);
		setAllPois([
			...(allPois.slice(0, index)),
			{
				...poi,
				draft: !poi.draft
			},
			...(allPois.slice(index + 1))
		]);
		// Call api to commit toggle
		try {
			await poiService.toggleDraft(poi.id);
		} catch (e) {
			// Rollback
			setAllPois(currentAllPois);
			// TODO: Give feedback
		}
	}, [allPois]);

	const mapToTableData = useCallback(() => {
		return allPois.map((poi, index) => {
			return [
				poi.title.find(t => t.language.code === 'fr')?.resource,
				poi.theme.name.find(t => t.language.code === 'fr')?.resource,
				poi.island.name,
				poi.draft ? "Oui" : "Non",
				poi.id,
				index
			];
		});
	}, [allPois]);

	if (isLoading) {
		return <AppLoader />;
	}

	if (exception) {
		return <Alert severity="error">
			{exception.message}
		</Alert>;
	}

	return <div>
		<MUIDataTable
			title={"Liste des points d'intérêt"}
			data={mapToTableData()}
			columns={columns}
			options={{
				filterType: "checkbox",
				elevation: 0,
				selectableRows: "none",
				customRowRender: (data: any[]) => {
					return <TableRow>
						{
							[0, 1, 2].map(dataIndex => (
								<TableCell component="th" scope="row">
									{data[dataIndex]}
								</TableCell>
							))
						}
						{
							<TableCell>
								<IconButton
									color={"primary"}
									onClick={() => {
										const poi = allPois.find(poi => poi.id === data[4]);
										if (poi) {
											togglePoiDraft(poi);
										}
									}}>
									{
										data[3] === "Oui" ?
											<CancelIcon /> :
											<CheckIcon />
									}
								</IconButton>
							</TableCell>
						}
						<TableCell>
							<Button
								component={Link}
								color={"primary"}
								to={`/pois/${data[4]}`}>
								Modifier
							</Button>
						</TableCell>
					</TableRow>;
				}
			}}
		/>
	</div>;
}