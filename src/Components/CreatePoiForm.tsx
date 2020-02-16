import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import LocalizedResourceField from "./LocalizedResourceField";
import {
	Box, Button, createStyles, Divider,
	FormControlLabel, FormGroup,
	Grid, GridList, GridListTile, Switch, TextField, Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import useIslandListService from "../Hooks/UseIslandListService";
import useThemeListService from "../Hooks/UseThemeListService";
import {Alert, Autocomplete} from "@material-ui/lab";
import AddIcon from "@material-ui/icons/Add";
import PoiTheme from "../Data/Model/PoiTheme";
import Island from "../Data/Model/Island";
import LocalizedResource from "../Data/Model/LocalizedResource";
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
import {useForm} from "react-hook-form";
import LocalizedResourceWriteRequest from "../Data/Model/LocalizedResourceWriteRequest";

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
	const [description, setDescription] = useState({});
	const [sponsored, setSponsored] = useState(false);
	const [thingsToDo, setThingsToDo] = useState(false);
	const [featured, setFeatured] = useState(false);
	const [latitude, setLatitude] = useState();
	const [longitude, setLongitude] = useState();
	const [island, setIsland] = useState();
	const [theme, setTheme] = useState();
	const [details, setDetails] = useState<PoiDetailsWriteRequest>({});
	const [medias, setMedias] = useState([] as PreparedMedia[]);

	const [islandsLoading, islandsException, islands] = useIslandListService();
	const [themesLoading, themesException, themes] = useThemeListService();

	const [loading, setLoading] = useState(false);
	const [exception, setException] = useState();
	const poiService = useIoC(PoiService);
	const mediaService = useIoC(MediaService);
	const navigation = useHistory();
	// TODO: Validate form with useForm
	// const { register, setValue, handleSubmit, errors } = useForm();

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
			localizedResourceValid(title) &&
			localizedResourceValid(description)
		);
	}, [theme, island, title, description]);

	const currentException = [islandsException, themesException, exception]
		.find(exception => exception);

	const createPoi = useCallback(async () => {
		setLoading(true);
		const files = await mediaService.upload(medias);
		const request: PoiWriteRequest = {
			title,
			description,
			latitude,
			longitude,
			themeId: theme.id,
			thingsToDo,
			sponsored,
			details,
			medias: files,
			islandId: island.id,
		};
		poiService.createPoi(request)
			.then(() => navigation.push("/pois"))
			.catch(exception => setException(exception))
			.finally(() => setLoading(false));
	}, [
		title, details, description,
		latitude, longitude, theme,
		thingsToDo, sponsored, featured, medias,
		island, setException, setLoading,
		loading, exception
	]);

	const extractFrenchLocalizedString = (localizedResource: LocalizedResource) => {
		const localizedString = localizedResource
			.find(localizedString => localizedString.language.code === 'fr');
		return (localizedString && localizedString.resource) || '';
	};

	return <div>
		{
			currentException && <Alert severity={"error"}>
				{currentException.message}
			</Alert>
		}
		<form onSubmit={createPoi} >
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
					label="Premium"
				/>
				<FormControlLabel
					control={
						<Switch
							checked={featured}
							onChange={() => setFeatured(!featured)}
							color="primary"
						/>
					}
					label="Mis en avant"
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
				onChanged={medias => setMedias(medias)}
				images={medias}/>
			<Divider className={classes.divider} />
			<CreatePoiDetailsForm
				value={details}
				onChanged={details => setDetails(details)}/>
			<Button
				fullWidth
				disableElevation
				disabled={!valid}
				type={"submit"}
				className={classes.formControl}
				variant={"contained"}
				color={"primary"}
				size={"large"}
				onClick={createPoi}>
				Créer
			</Button>
		</form>
	</div>;
}