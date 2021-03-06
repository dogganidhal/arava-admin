import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import LocalizedResourceField from "./LocalizedResourceField";
import {
	Button, createStyles, Divider,
	FormControlLabel, FormGroup,
	Grid, Switch, TextField, Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import useIslandListService from "../Hooks/UseIslandListService";
import useThemeListService from "../Hooks/UseThemeListService";
import {Alert, Autocomplete} from "@material-ui/lab";
import AddIcon from "@material-ui/icons/Add";
import PoiTheme, {extractThemeNameWithParent} from "../Data/Model/PoiTheme";
import Island from "../Data/Model/Island";
import CreatePoiDetailsForm from "./CreatePoiDetailsForm";
import Map from "./Map";
import useIoC from "../Hooks/UseIoC";
import PoiService from "../Data/Service/Poi/PoiService";
import PoiWriteRequest from "../Data/Model/PoiWriteRequest";
import {useHistory} from "react-router-dom";
import MediaService from "../Data/Service/Media/MediaService";
import PoiDetailsWriteRequest from "../Data/Model/PoiDetailsWriteRequest";
import PreparedMedia from "../Data/Model/PreparedMedia";
import PoiImagePicker from "./PoiImagePicker";
import LocalizedResourceWriteRequest from "../Data/Model/LocalizedResourceWriteRequest";
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
	}
}));

export default function CreatePoiForm() {
	const classes = useStyles();
	const [title, setName] = useState({});
	const [description, setDescription] = useState();
	const [sponsored, setSponsored] = useState(false);
	const [featured, setFeatured] = useState(false);
	const [draft, setDraft] = useState(true);
	const [activity, setActivity] = useState(false);
	const [premium, setPremium] = useState(false);
	const [defaultPremium, setDefaultPremium] = useState(false);
	const [latitude, setLatitude] = useState(0);
	const [longitude, setLongitude] = useState(0);
	const [island, setIsland] = useState<Island>();
	const [theme, setTheme] = useState<PoiTheme>();
	const [details, setDetails] = useState<PoiDetailsWriteRequest>({});
	const [medias, setMedias] = useState([] as PreparedMedia[]);
	const [mainImage, setMainImage] = useState<PreparedMedia>();
	const [owner, setOwner] = useState<User>();
	const [usersLoading, usersException, users] = useUserListService();

	const [islandsLoading, islandsException, islands] = useIslandListService();
	const [themesLoading, themesException, themes] = useThemeListService();

	const [loading, setLoading] = useState(false);
	const [exception, setException] = useState();
	const poiService = useIoC(PoiService);
	const mediaService = useIoC(MediaService);
	const navigation = useHistory();

	const [valid, setValid] = useState(false);

	const localizedResourceValid = (resource: LocalizedResourceWriteRequest) => {
		return Object.keys(resource).includes('fr') && resource['fr'].length > 0 &&
			Object.keys(resource).includes('en') && resource['en'].length > 0 &&
			Object.keys(resource).includes('zh_Hans') && resource['zh_Hans'].length > 0
	};

	useEffect(() => {
		setValid(
			theme !== undefined &&
			island !== undefined &&
			localizedResourceValid(title)
		);
	}, [theme, island, title]);

	const currentException = [islandsException, themesException, exception]
		.find(exception => exception);

	const createPoi = useCallback(async () => {
		setLoading(true);
		const files = await mediaService.upload(medias);
		const mainMediaFile = mainImage && await mediaService.upload(mainImage);
		const request: PoiWriteRequest = {
			title, description, details,
			latitude, longitude, defaultPremium,
			sponsored, featured, draft, activity, premium,
			themeId: theme!.id,
			islandId: island!.id,
			ownerId: owner?.id,
			medias: files,
			mainImage: mainMediaFile,
		};
		poiService.createPoi(request)
			.then(() => navigation.push("/pois"))
			.catch(exception => setException(exception))
			.finally(() => setLoading(false));
	}, [
		title, details, description,
		latitude, longitude, theme, draft,
		sponsored, featured, medias, premium,
		island, mainImage, owner, activity,
		defaultPremium
	]);

	return <div>
		{
			currentException && <Alert severity={"error"}>
				{currentException.message}
			</Alert>
		}
		<form>
			<LocalizedResourceField
				label={"Nom"}
				value={title}
				required
				onChanged={resource => {
					setName(resource);
				}}/>
			<LocalizedResourceField
				multiline
				required
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
				disabled={!valid || loading}
				className={classes.formControl}
				variant={"contained"}
				color={"primary"}
				size={"large"}
				onClick={createPoi}>
				{ loading ? "Chargement ..." : "Créer" }
			</Button>
		</form>
	</div>;
}