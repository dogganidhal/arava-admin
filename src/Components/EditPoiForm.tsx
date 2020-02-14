import Poi from "../Data/Model/Poi";
import React, {ChangeEvent, useCallback, useState} from "react";
import useIslandListService from "../Hooks/UseIslandListService";
import useThemeListService from "../Hooks/UseThemeListService";
import useIoC from "../Hooks/UseIoC";
import PoiService from "../Data/Service/Poi/PoiService";
import MediaService from "../Data/Service/Media/MediaService";
import {useHistory} from "react-router-dom";
import PoiWriteRequest from "../Data/Model/PoiWriteRequest";
import LocalizedResource from "../Data/Model/LocalizedResource";
import {Alert, Autocomplete} from "@material-ui/lab";
import LocalizedResourceField from "./LocalizedResourceField";
import Island from "../Data/Model/Island";
import {
	Box, Button, createStyles,
	Divider, FormControlLabel,
	FormGroup, Grid,
	GridList, GridListTile, Snackbar, Switch,
	TextField, Typography
} from "@material-ui/core";
import PoiTheme from "../Data/Model/PoiTheme";
import AddIcon from "@material-ui/icons/Add";
import Map from "./Map";
import CreatePoiDetailsForm from "./CreatePoiDetailsForm";
import {makeStyles} from "@material-ui/core/styles";
import LocalizedResourceMapper from "../Data/Mapper/LocalizedResourceMapper";
import PoiDetailsMapper from "../Data/Mapper/PoiDetailsMapper";

const useStyles = makeStyles(theme => createStyles({
	divider: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(4)
	},
	formControl: {
		flex: 1,
		marginTop: theme.spacing(2)
	},
	shrinkFormControl: {
		marginTop: theme.spacing(2)
	},
	gridListContainer: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2)
	}
}));

interface EditPoiFormProps {
	readonly poi: Poi;
}

export default function EditPoiForm({ poi }: EditPoiFormProps) {
	const classes = useStyles();
	const localizedResourceMapper = useIoC(LocalizedResourceMapper);
	const poiDetailsMapper = useIoC(PoiDetailsMapper);

	const [title, setName] = useState(localizedResourceMapper.map(poi.title));
	const [description, setDescription] = useState(localizedResourceMapper.map(poi.description));
	const [premium, setPremium] = useState(poi.featured);
	const [thingsToDo, setThingsToDo] = useState(poi.thingsToDo);
	const [latitude, setLatitude] = useState(poi.coordinate.latitude);
	const [longitude, setLongitude] = useState(poi.coordinate.longitude);
	const [island, setIsland] = useState(poi.island);
	const [theme, setTheme] = useState(poi.theme);
	const [details, setDetails] = useState(poiDetailsMapper.map(poi.details));
	const [files, setFiles] = useState([] as File[]);
	const [imageUrls, setImageUrls] = useState(poi.medias.map(m => m.url));
	const [success, setSuccess] = useState(false);

	const [islandsLoading, islandsException, islands] = useIslandListService();
	const [themesLoading, themesException, themes] = useThemeListService();

	const [loading, setLoading] = useState(false);
	const [exception, setException] = useState();
	const poiService = useIoC(PoiService);
	const mediaService = useIoC(MediaService);
	const navigation = useHistory();

	const currentException = [islandsException, themesException, exception]
		.find(exception => exception);

	const createPoi = useCallback(async () => {
		setLoading(true);
		const medias = await mediaService.upload(files);
		const request: PoiWriteRequest = {
			id: poi.id,
			title,
			description,
			latitude,
			longitude,
			themeId: theme.id,
			thingsToDo,
			sponsored: premium,
			details,
			medias: medias,
			islandId: island.id,
		};
		poiService.updatePoi(request)
			.then(() => setSuccess(true))
			.catch(exception => setException(exception))
			.finally(() => setLoading(false));
	}, [
		title, details, description,
		latitude, longitude, theme,
		thingsToDo, premium, files,
		island, setException, setLoading,
		loading, exception, poi
	]);

	function extractFrenchLocalizedString(localizedResource: LocalizedResource) {
		const localizedString = localizedResource
			.find(localizedString => localizedString.language.code === 'fr');
		return (localizedString && localizedString.resource) || '';
	}

	function closeSuccessSnackbar() {
		setSuccess(false);
	}

	return <div>
		{
			currentException && <Alert severity={"error"}>
				{currentException.message}
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
				disabled
				className={classes.formControl}
				variant={"filled"}
				value={poi.id}
				label={"Id"}/>
			<LocalizedResourceField
				label={"Nom"}
				value={title}
				onChanged={resource => {
					setName(resource);
				}}/>
			<LocalizedResourceField
				multiline
				label={"Description"}
				value={description}
				onChanged={resource => {
					setDescription(resource);
				}}/>
			<Autocomplete
				className={classes.formControl}
				options={islands}
				getOptionLabel={island => island.name}
				value={island}
				onChange={(_: ChangeEvent<{}>, island: Island | null) => {
					if (island) {
						setIsland(island);
					}
				}}
				renderInput={params => (
					<TextField {...params} label="Île" variant="filled" fullWidth />
				)}/>
			<FormGroup row>
				<Autocomplete
					className={classes.formControl}
					options={themes}
					getOptionLabel={category => extractFrenchLocalizedString(category.name)}
					value={theme}
					onChange={(_: ChangeEvent<{}>, category: PoiTheme | null) => {
						if (category) {
							setTheme(category);
						}
					}}
					renderInput={params => (
						<TextField {...params} label="Thème" variant="filled" fullWidth />
					)}/>
				<Button
					color={"primary"}
					size={"large"}
					className={classes.shrinkFormControl}>
					<AddIcon />
					Créer un thème
				</Button>
			</FormGroup>
			<FormGroup row className={classes.formControl}>
				<FormControlLabel
					control={
						<Switch
							checked={thingsToDo}
							onChange={() => setThingsToDo(!thingsToDo)}
							color="primary"/>
					}
					label="À ne pas rater"
				/>
				<FormControlLabel
					control={
						<Switch
							checked={premium}
							onChange={() => setPremium(!premium)}
							color="primary"
						/>
					}
					label="Premium"
				/>
			</FormGroup>
			<Divider className={classes.divider} />
			<div className={classes.formControl}>
				<Typography color={"textSecondary"}>
					Coordonnées
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<TextField
							fullWidth
							autoFocus
							helperText={"Latitude"}
							value={latitude}
							variant={"filled"}/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							helperText={"Longitude"}
							value={longitude}
							variant={"filled"}/>
					</Grid>
				</Grid>
			</div>
			<div className={classes.formControl}>
				<Map
					alwaysCenterMarker
					onUserInteraction={(coordinate) => {
						setLatitude(coordinate.latitude);
						setLongitude(coordinate.longitude);
					}}/>
			</div>
			<Divider className={classes.divider} />
			<Typography color={"textSecondary"}>
				Photos / Vidéos
			</Typography>
			<div className={classes.gridListContainer}>
				<GridList cols={2}>
					{
						imageUrls.map((url, index) => (
							<GridListTile key={index}>
								<Box borderRadius={4}>
									<img src={url} />
								</Box>
							</GridListTile>
						))
					}
				</GridList>
			</div>
			<Button
				fullWidth
				disableElevation
				color={"primary"}
				variant={"contained"}
				component={"label"}>
				Ajouter
				<input
					type="file"
					style={{ display: "none" }}
					onChange={e => {
						if (e.target.files && e.target.files.length > 0) {
							const file = e.target.files.item(0);
							if (file) {
								setFiles([...files, file]);
								setImageUrls([...imageUrls, URL.createObjectURL(file)]);
							}
						}
					}}/>
			</Button>
			<Divider className={classes.divider} />
			<CreatePoiDetailsForm
				value={details}
				onChanged={details => {
					console.log("New details : ");
					console.log(details);
					setDetails(details);
				}}/>
			<Button
				fullWidth
				disableElevation
				disabled={loading}
				className={classes.formControl}
				variant={"contained"}
				color={"primary"}
				size={"large"}
				onClick={createPoi}>
				{
					loading ? "Chargement ..." : "Mettre à jour"
				}
			</Button>
		</form>
	</div>;
}