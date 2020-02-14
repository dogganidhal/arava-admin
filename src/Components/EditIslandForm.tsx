import Island from "../Data/Model/Island";
import React, {ChangeEvent, useCallback, useState} from "react";
import {
	Button, Card, CardActions, CardMedia,
	createStyles, Grid, Snackbar, TextField, Theme
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import {makeStyles} from "@material-ui/core/styles";
import useArchipelagoListService from "../Hooks/UseArchipelagoListService";
import IslandUpdateRequest from "../Data/Model/IslandUpdateRequest";
import useIoC from "../Hooks/UseIoC";
import PoiService from "../Data/Service/Poi/PoiService";
import MediaService from "../Data/Service/Media/MediaService";
import MediaWriteRequest from "../Data/Model/MediaWriteRequest";
import {Autocomplete} from "@material-ui/lab";
import Archipelago from "../Data/Model/Archipelago";
import Map from "./Map";

const useStyles = makeStyles((theme: Theme) => {
	return createStyles({
		formControl: {
			marginTop: theme.spacing(2)
		},
		imageCard: {
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
			name, zoom, image,
			archipelagoId: archipelago.id
		};
		poiService.updateIsland(request)
			.then(() => setSuccess(true))
			.catch(exception => setException(exception))
			.finally(() => setLoading(false));
	}, [imageFile, archipelago, coordinate, zoom]);

	const closeSuccessSnackbar = () => setSuccess(false);

	return <div>
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
			<Autocomplete
				className={classes.formControl}
				options={archipelagos}
				getOptionLabel={option => option.name}
				value={archipelago}
				onChange={(_: ChangeEvent<{}>, archipelago: Archipelago | null) => {
					if (archipelago) {
						setArchipelago(archipelago);
					}
				}}
				renderInput={params => (
					<TextField {...params} label="Archipel" variant="filled" fullWidth />
				)}
			/>
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
			<div className={classes.formControl}>
				<Map
					initialCoordinate={island.center}
					initialZoom={island.zoom}
					onUserInteraction={(coordinate, zoom) => {
						setCoordinate(coordinate);
						setZoom(zoom);
					}}/>
			</div>
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