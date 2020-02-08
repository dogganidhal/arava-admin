import Island from "../Data/Model/Island";
import React, {useCallback, useState} from "react";
import {
	Button, Card, CardActions, CardMedia, CircularProgress,
	createStyles, FormControl, Grid, InputLabel,
	MenuItem, Select, Snackbar, TextField, Theme, Typography
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import {makeStyles} from "@material-ui/core/styles";
import useArchipelagoListService from "../Hooks/UseArchipelagoListService";
import IslandUpdateRequest from "../Data/Model/IslandUpdateRequest";
import useIoC from "../Hooks/UseIoC";
import PoiService from "../Data/Service/Poi/PoiService";
import { useHistory } from "react-router-dom";
import MediaService from "../Data/Service/Media/MediaService";
import MediaWriteRequest from "../Data/Model/MediaWriteRequest";

const useStyles = makeStyles((theme: Theme) => {
	return createStyles({
		form: {

		},
		formControl: {
			marginTop: theme.spacing(2)
		},
		imageCard: {
			width: theme.spacing(96),
			marginTop: theme.spacing(2)
		},
		image: {
			height: 384
		}
	});
});

interface EditIslandFormProps {
	readonly island: Island;
}

export default function EditIslandForm({island}: EditIslandFormProps) {
	const classes = useStyles();
	// Island details state
	const [name, setName] = useState(island.name);
	const [coordinate, setCoordinate] = useState(island.center);
	const [zoom, setZoom] = useState(island.zoom);
	const [archipelago, setArchipelago] = useState(island.archipelago);
	const [imageUrl, setImageUrl] = useState(island.image.url);
	// Archipelago state
	const [archipelagosLoading, archipelagosException, archipelagos] = useArchipelagoListService();
	// Update operation state
	const [isLoading, setLoading] = useState(false);
	const [exception, setException] = useState();
	const [success, setSuccess] = useState(false);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const poiService = useIoC(PoiService);
	const mediaManager = useIoC(MediaService);

	const updateIsland = useCallback(async () => {
		setLoading(true);
		let image: MediaWriteRequest = island.image;
		if (imageFile) {
			try {
				image = await mediaManager.upload(imageFile);
			} catch (exception) {
				setException(exception);
				setLoading(false);
				return;
			}
		}
		const request: IslandUpdateRequest = {
			id: island.id,
			latitude: coordinate.latitude,
			longitude: coordinate.longitude,
			name, zoom, image
		};
		poiService.updateIsland(request)
			.then(() => setSuccess(true))
			.catch(exception => setException(exception))
			.finally(() => setLoading(false));
	}, [imageFile]);

	const closeSuccessSnackbar = () => setSuccess(false);

	return <div className={classes.form}>
		{
			exception && <Alert severity="error">
				{exception.message}
      </Alert>
		}
		{
			archipelagosException && <Alert severity="error">
				{archipelagosException.message}
      </Alert>
		}
		<Snackbar
			open={success}
			autoHideDuration={3000}
			onClose={closeSuccessSnackbar}>
			<Alert onClose={closeSuccessSnackbar} severity="success">
				Sauvegardé avec succès
			</Alert>
		</Snackbar>
		<form>
			<TextField
				fullWidth
				label={"Nom de l'île"}
				value={name} variant={"filled"}
				className={classes.formControl}
				onChange={e => setName(e.target.value)}/>
			<FormControl
				fullWidth={true}
				variant="filled"
				className={classes.formControl}>
				<InputLabel id="achipelago-label">Archipel</InputLabel>
				<Select
					id="achipelago-label"
					value={archipelago.id}
					onChange={e => setArchipelago(archipelagos.filter(a => a.id === e.target.value)[0])}>
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
			<Grid container spacing={2} className={classes.formControl}>
				<Grid item xs={4}>
					<TextField
						fullWidth
						label={"Latitude"}
						value={coordinate.latitude} variant={"filled"}
						onChange={e => setCoordinate({...coordinate, latitude: parseFloat(e.target.value)})}/>
				</Grid>
				<Grid item xs={4}>
					<TextField
						fullWidth
						label={"Longitude"}
						value={coordinate.longitude} variant={"filled"}
						onChange={e => setCoordinate({...coordinate, longitude: parseFloat(e.target.value)})}/>
				</Grid>
				<Grid item xs={4}>
					<TextField
						fullWidth
						label={"Zoom sur la carte"}
						value={zoom} variant={"filled"}
						onChange={e => setZoom(e.target.value as unknown as number)}/>
				</Grid>
			</Grid>
			<Card variant={"outlined"} className={classes.imageCard}>
				<CardMedia
					className={classes.image}
					image={imageUrl}
					title={name}/>
				<CardActions>
					<Button color={"primary"} component={"label"} fullWidth>
						Remplacer
						<input
							type="file"
							style={{ display: "none" }}
							onChange={e => {
								if (e.target.files && e.target.files.length > 0) {
									const file = e.target.files.item(0);
									setImageFile(file);
									setImageUrl(URL.createObjectURL(file));
								}
							}}/>
					</Button>
				</CardActions>
			</Card>
			<Button
				fullWidth
				disabled={isLoading}
				color={"primary"}
				size={"large"}
				className={classes.formControl}
				onClick={updateIsland}>
				{ isLoading ? "Chargement ..." : "Sauvegarder" }
			</Button>
		</form>
	</div>
}