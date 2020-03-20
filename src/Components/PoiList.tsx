import React, {useCallback, useEffect, useState} from "react";
import {
	createStyles, Fab, IconButton,
	TableCell, TableRow, Theme
} from "@material-ui/core";
import usePoiListService from "../Hooks/UsePoiListService";
import AppLoader from "./AppLoader";
import Alert from "@material-ui/lab/Alert";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import usePoiFilter from "../Hooks/UsePoiFilter";
import CheckIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/Close";
import SearchIcon from '@material-ui/icons/Add';
import Poi from "../Data/Model/Poi";
import useIoC from "../Hooks/UseIoC";
import PoiService from "../Data/Service/Poi/PoiService";
import MUIDataTable from "mui-datatables";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		searchPaper: {
			padding: theme.spacing(1),
			marginBottom: theme.spacing(2),
			display: 'flex',
			alignItems: 'center',
			width: "100%",
		},
		input: {
			marginLeft: theme.spacing(1),
			flex: 1,
		},
		iconButton: {
			padding: 10,
		},
		root: {
			flexGrow: 1,
		},
		table: {
			minWidth: 650,
		},
		paper: {
			height: 140,
			width: 100,
		},
		control: {
			padding: theme.spacing(2),
		},
		fab: {
			position: 'fixed',
			right: theme.spacing(2),
			bottom: theme.spacing(2),
			zIndex: 999
		}
	}),
);

export default function PoiList() {
	const classes = useStyles();

	const navigation = useHistory();

	const [isLoading, exception, pois] = usePoiListService();
	const [filteredPois, setQuery] = usePoiFilter(pois);
	const [allPois, setAllPois] = useState(filteredPois);

	const poiService = useIoC(PoiService);

	useEffect(() => setAllPois(filteredPois), [filteredPois]);

	const togglePoiDraft = useCallback(async (poi: Poi, index: number) => {
		// Toggle UI
		const currentAllPois = allPois;
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
		return pois.map(poi => {
			return [
				poi.title.find(t => t.language.code === 'fr')?.resource,
				poi.theme.name.find(t => t.language.code === 'fr')?.resource,
				poi.island.name,
				poi.draft ? "oui" : "non",
				poi.sponsored ? "oui" : "non",
				poi.featured ? "oui" : "non"
			];
		});
	}, [pois]);

	if (isLoading) {
		return <AppLoader />;
	}

	if (exception) {
		return <Alert severity="error">
			{exception.message}
		</Alert>;
	}

	return <div>
		<Fab
			variant={"extended"}
			size={"large"}
			color={"primary"}
			className={classes.fab}
			onClick={() => navigation.push("/pois/create")}>
			<SearchIcon />
			Créer
		</Fab>
		<MUIDataTable
			title={"Liste des points d'intérêt"}
			data={mapToTableData()}
			columns={["Titre", "Thème", "Île", "Brouillon", "Choses à faire", "Mis en avant"]}
			options={{
				filterType: "checkbox",
				elevation: 0,
				selectableRows: "none",
				customRowRender: (data: any[], dataIndex: number, rowIndex: number) => {
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
									onClick={() => togglePoiDraft(pois[rowIndex], rowIndex)}>
									{
										data[3] === "oui" ?
											<CheckIcon /> :
											<CancelIcon />
									}
								</IconButton>
							</TableCell>
						}
						{
							[4, 5].map(dataIndex => (
								<TableCell>
									{
										data[dataIndex] === "oui" ?
											<CheckIcon /> :
											<CancelIcon />
									}
								</TableCell>
							))
						}
					</TableRow>;
				}
			}}
		/>
	</div>;
}