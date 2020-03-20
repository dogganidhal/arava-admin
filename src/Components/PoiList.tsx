import React, {useCallback, useState} from "react";
import {
	Button,
	createStyles, Fab, IconButton,
	TableCell, TableRow, Theme
} from "@material-ui/core";
import usePoiListService from "../Hooks/UsePoiListService";
import AppLoader from "./AppLoader";
import Alert from "@material-ui/lab/Alert";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import CheckIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/Close";
import SearchIcon from '@material-ui/icons/Add';
import Poi from "../Data/Model/Poi";
import useIoC from "../Hooks/UseIoC";
import PoiService from "../Data/Service/Poi/PoiService";
import MUIDataTable, {MUIDataTableColumnDef} from "mui-datatables";

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
		name: "Choses à faire",
		options: {
			sort: false
		}
	},
	{
		name: "Mis en avant",
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

export default function PoiList() {
	const classes = useStyles();

	const [isLoading, exception, pois] = usePoiListService();
	const [allPois, setAllPois] = useState(pois);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const poiService = useIoC(PoiService);

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
			component={Link}
			to={"/pois/create"}>
			<SearchIcon />
			Créer
		</Fab>
		<MUIDataTable
			title={"Liste des points d'intérêt"}
			data={mapToTableData()}
			columns={columns}
			options={{
				filterType: "checkbox",
				elevation: 0,
				selectableRows: "none",
				onChangePage: page => setPage(page),
				onChangeRowsPerPage: rowsPerPage => setRowsPerPage(rowsPerPage),
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
									onClick={() => togglePoiDraft(pois[page * rowsPerPage + rowIndex], rowIndex)}>
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
						<TableCell>
							<Button
								component={Link}
								color={"primary"}
								to={`/pois/${pois[page * rowsPerPage + rowIndex].id}`}>
								Modifier
							</Button>
						</TableCell>
					</TableRow>;
				}
			}}
		/>
	</div>;
}