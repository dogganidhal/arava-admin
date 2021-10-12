import Poi from "../Data/Model/Poi";
import React, {ChangeEvent, useCallback, useState} from "react";
import useIslandListService from "../Hooks/UseIslandListService";
import useThemeListService from "../Hooks/UseThemeListService";
import useIoC from "../Hooks/UseIoC";
import PoiService from "../Data/Service/Poi/PoiService";
import MediaService from "../Data/Service/Media/MediaService";
import {useHistory} from "react-router-dom";
import PoiWriteRequest from "../Data/Model/PoiWriteRequest";
import {Alert, Autocomplete} from "@material-ui/lab";
import LocalizedResourceField from "./LocalizedResourceField";
import Island from "../Data/Model/Island";
import {
	Button, createStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
	Divider, FormControlLabel, FormGroup, Grid, Snackbar, Switch, TextField, Typography
} from "@material-ui/core";
import PoiTheme, {extractThemeNameWithParent} from "../Data/Model/PoiTheme";
import AddIcon from "@material-ui/icons/Add";
import Map from "./Map";
import CreatePoiDetailsForm from "./CreatePoiDetailsForm";
import {makeStyles} from "@material-ui/core/styles";
import LocalizedResourceMapper from "../Data/Mapper/LocalizedResourceMapper";
import PoiDetailsMapper from "../Data/Mapper/PoiDetailsMapper";
import PoiImagePicker from "./PoiImagePicker";
import PreparedMedia from "../Data/Model/PreparedMedia";
import useUserListService from "../Hooks/UseUserListService";
import User from "../Data/Model/User";

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
	},
	deleteButton: {
		flex: 1,
		marginTop: theme.spacing(2),
		backgroundColor: theme.palette.error.main,
		color: theme.palette.background.default
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
	const [light, setLight] = useState(poi.light);
	const [sponsored, setSponsored] = useState(poi.sponsored);
	const [featured, setFeatured] = useState(poi.featured);
	const [draft, setDraft] = useState(poi.draft);
	const [premium, setPremium] = useState(poi.premium);
	const [defaultPremium, setDefaultPremium] = useState(poi.defaultPremium);
	const [activity, setActivity] = useState(poi.activity);
	const [latitude, setLatitude] = useState(poi.coordinate.latitude);
	const [longitude, setLongitude] = useState(poi.coordinate.longitude);
	const [island, setIsland] = useState(poi.island);
	const [theme, setTheme] = useState(poi.theme);
	const [details, setDetails] = useState(poiDetailsMapper.map(poi.details));
	const [medias, setMedias] = useState(poi.medias as PreparedMedia[]);
	const [mainImage, setMainImage] = useState(poi.mainImage as PreparedMedia);
	const [success, setSuccess] = useState(false);
	const [owner, setOwner] = useState(poi.owner);
	const [usersLoading, usersException, users] = useUserListService();

	const [islandsLoading, islandsException, islands] = useIslandListService();
	const [themesLoading, themesException, themes] = useThemeListService();

	const [loading, setLoading] = useState(false);
	const [exception, setException] = useState();

	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

	const poiService = useIoC(PoiService);
	const mediaService = useIoC(MediaService);
	const navigation = useHistory();

	const currentException = [islandsException, themesException, exception]
		.find(exception => exception);

	const editPoi = useCallback(async () => {
		setLoading(true);
		const files = await mediaService.upload(medias);
		const mainMediaFile = mainImage && await mediaService.upload(mainImage);
		const request: PoiWriteRequest = {
			id: poi.id, title, description, light,
			latitude, longitude, themeId: theme.id, defaultPremium,
			sponsored, featured, draft, details, activity,
			medias: files, islandId: island.id, premium,
			mainImage: mainMediaFile, ownerId: owner?.id
		};
		poiService.updatePoi(request)
			.then(() => setSuccess(true))
			.catch(exception => setException(exception))
			.finally(() => setLoading(false));
	}, [
		title, details, description,
		latitude, longitude, theme, draft,
		sponsored, medias, mainImage, light,
		island, setException, setLoading,
		loading, exception, poi, featured,
		owner, activity, premium, defaultPremium
	]);

	const toggleDeleteDialog = () => setDeleteDialogOpen(!deleteDialogOpen);

	const deletePoi = useCallback(async () => {
		setLoading(true);
		toggleDeleteDialog();
		await poiService.deletePoi(poi.id);
		setLoading(false);
		navigation.push("/pois");
	}, [poi]);

	function closeSuccessSnackbar() {
		setSuccess(false);
	}

	return <div>
		{
			currentException && <Alert severity={"error"}>
				{currentException.message}
      </Alert>
		}
		<Dialog
			open={deleteDialogOpen}
			onClose={toggleDeleteDialog}
			aria-labelledby="delete-dialog-title"
			aria-describedby="delete-dialog-description"
		>
			<DialogTitle id="delete-dialog-title">{"Supprimer ce point d'intérêt?"}</DialogTitle>
			<DialogContent>
				<DialogContentText id="delete-dialog-description">
					Veux-tu vraiment supprimer ce point d'intrérêt ? Cette action est irréversible
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={deletePoi}>
					Supprimer
				</Button>
				<Button onClick={toggleDeleteDialog} color="primary" autoFocus>
					Annuler
				</Button>
			</DialogActions>
		</Dialog>
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
			<Divider className={classes.divider} />
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
			<Autocomplete
				className={classes.formControl}
				options={users}
				getOptionLabel={user => `${user.firstName} ${user.lastName} (${user.email})`}
				value={owner}
				onChange={(_: ChangeEvent<{}>, user: User | null) => {
					if (user) {
						setOwner(user);
					}
				}}
				renderInput={params => (
					<TextField {...params} label="Responsable" variant="filled" fullWidth />
				)}/>
			<FormGroup row>
				<Autocomplete
					className={classes.formControl}
					options={themes}
					getOptionLabel={extractThemeNameWithParent}
					value={theme}
					onChange={(_: ChangeEvent<{}>, theme: PoiTheme | null) => {
						if (theme) {
							setTheme(theme);
						}
					}}
					renderInput={params => (
						<TextField {...params} label="Thème" variant="filled" fullWidth />
					)}/>
				<Button
					color={"primary"}
					size={"large"}
					className={classes.shrinkFormControl}
					onClick={() => navigation.push("/themes/create")}>
					<AddIcon />
					Créer un thème
				</Button>
			</FormGroup>
			<FormGroup row className={classes.formControl}>
				<FormControlLabel
					control={
						<Switch
							checked={light}
							onChange={() => setLight(!light)}
							color="primary"
						/>
					}
					label="Light"
				/>
				<FormControlLabel
					control={
						<Switch
							checked={featured}
							onChange={() => setFeatured(!featured)}
							color="primary"
						/>
					}
					label="Choses à faire"
				/>
				<FormControlLabel
					control={
						<Switch
							checked={sponsored}
							onChange={() => setSponsored(!sponsored)}
							color="primary"
						/>
					}
					label="Mis en avant"
				/>
				<FormControlLabel
					control={
						<Switch
							checked={activity}
							onChange={() => setActivity(!activity)}
							color="primary"
						/>
					}
					label="Activité"
				/>
				<FormControlLabel
					control={
						<Switch
							checked={premium}
							onChange={() => setPremium(!premium)}
							color="primary"
						/>
					}
					label="Premium+"
				/>
				<FormControlLabel
					control={
						<Switch
							checked={defaultPremium}
							onChange={() => setDefaultPremium(!defaultPremium)}
							color="primary"
						/>
					}
					label="Premium+ par défaut"
				/>
				<FormControlLabel
					control={
						<Switch
							checked={draft}
							onChange={() => setDraft(!draft)}
							color="primary"
						/>
					}
					label="Brouillon"
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
					initialCoordinate={poi.coordinate}
					onUserInteraction={(coordinate) => {
						setLatitude(coordinate.latitude);
						setLongitude(coordinate.longitude);
					}}/>
			</div>
			<Divider className={classes.divider} />
			<PoiImagePicker
				onMainImageChanged={mainImage => setMainImage(mainImage)}
				onImagesChanged={medias => setMedias(medias)}
				mainImage={mainImage}
				images={medias}/>
			<Divider className={classes.divider} />
			<CreatePoiDetailsForm
				value={details}
				onChanged={details => setDetails(details)}/>
			<Button
				fullWidth
				disableElevation
				disabled={loading}
				className={classes.formControl}
				variant={"contained"}
				color={"primary"}
				size={"large"}
				onClick={editPoi}>
				{
					loading ? "Chargement ..." : "Mettre à jour"
				}
			</Button>
			<Button
				fullWidth
				disableElevation
				className={classes.deleteButton}
				variant={"contained"}
				color={"inherit"}
				size={"large"}
				onClick={toggleDeleteDialog}>
				Supprimer
			</Button>
		</form>
	</div>;
}
