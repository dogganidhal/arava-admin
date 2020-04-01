import React, {useCallback, useEffect, useState} from "react";
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
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import EditIcon from '@material-ui/icons/Edit';
import Poi from "../Data/Model/Poi";
import useIoC from "../Hooks/UseIoC";
import PoiService from "../Data/Service/Poi/PoiService";
import MUIDataTable, {MUIDataTableColumnDef} from "mui-datatables";
import AdminRestricted from "./AdminRestricted";

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
		name: "Responsable",
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
		name: "Activité",
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
				poi.owner ? `${poi.owner.firstName} ${poi.owner.lastName}` : 'Aucun responsable',
				poi.draft ? "Oui" : "Non",
				poi.featured ? "Oui" : "Non",
				poi.sponsored ? "Oui" : "Non",
				poi.activity ? "Oui" : "Non",
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
		<AdminRestricted>
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
		</AdminRestricted>
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
							<TableCell align={"center"} component="th" scope="row">
								{data[3] !== 'Aucun responsable' ?
									data[3] :
									<NotInterestedIcon />
								}
							</TableCell>
						}
						{
							<TableCell align={"center"}>
								<IconButton
									color={"primary"}
									onClick={() => {
										const poi = allPois.find(poi => poi.id === data[7]);
										if (poi) {
											togglePoiDraft(poi);
										}
									}}>
									{
										data[4] === "Oui" ?
											<CancelIcon /> :
											<CheckIcon />
									}
								</IconButton>
							</TableCell>
						}
						{
							[5, 6, 7].map(dataIndex => (
								<TableCell align={"center"}>
									{
										data[dataIndex] === "Oui" ?
											<CheckIcon /> :
											<CancelIcon />
									}
								</TableCell>
							))
						}
						<TableCell>
							<IconButton
								component={Link}
								color={"primary"}
								to={`/pois/${data[8]}`}>
								<EditIcon />
							</IconButton>
						</TableCell>
					</TableRow>;
				}
			}}
		/>
	</div>;
}