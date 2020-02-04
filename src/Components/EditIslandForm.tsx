import Island from "../Data/Model/Island";
import React, {useEffect, useState} from "react";
import {
	CircularProgress,
	createStyles,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Theme,
	Typography
} from "@material-ui/core";
import useIslandUpdateService from "../Hooks/UseIslandUpdateService";
import Alert from "@material-ui/lab/Alert";
import {makeStyles} from "@material-ui/core/styles";
import useArchipelagoListService from "../Hooks/UseArchipelagoListService";

const useStyles = makeStyles((theme: Theme) => {
	return createStyles({
		form: {

		},
		formControl: {
			marginTop: theme.spacing(2),
		}
	});
});

interface EditIslandFormProps {
	readonly island: Island;
}

export default function EditIslandForm({island}: EditIslandFormProps) {
	const [name, setName] = useState(island.name);
	const [coordinate, setCoordinate] = useState(island.center);
	const [zoom, setZoom] = useState(island.zoom);
	const [archipelago, setArchipelago] = useState(island.archipelago);
	const [image, setImage] = useState(island.image);
	const [isLoading, exception, update] = useIslandUpdateService();
	const [archipelagosLoading, archipelagosException, archipelagos] = useArchipelagoListService();
	const classes = useStyles();

	// const updateIsland = () => {
	// 	// TODO: Build IslandUpdateRequest
	// 	useEffect(() => {
	//
	// 	}, []);
	// };

	return <div className={classes.form}>
		{
			exception && <Alert severity="error">
				{exception.message}
      </Alert>
		}
		<form>
			<TextField
				fullWidth
				label={"Nom de l'île"}
				value={name} variant={"filled"}
				className={classes.formControl}/>
			<FormControl
				fullWidth={true}
				variant="filled"
				className={classes.formControl}>
				<InputLabel id="achipelago-label">Archipel</InputLabel>
				<Select id="achipelago-label" value={archipelago.id}>
					{
						archipelagosLoading && <span>
							<Typography>
								Chargement ...
							</Typography>
							<CircularProgress />
						</span>
					}
					{
						archipelagos && archipelagos.map(archipelago => (
							<MenuItem key={archipelago.id} value={archipelago.id}>{archipelago.name}</MenuItem>
						))
					}
				</Select>
			</FormControl>
		</form>
	</div>
}