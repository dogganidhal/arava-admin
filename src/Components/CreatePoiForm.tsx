import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import LocalizedResourceField from "./LocalizedResourceField";
import {
	Button, createStyles, Divider,
	FormControlLabel, FormGroup,
	Grid, Switch, TextField,
	Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import useIslandListService from "../Hooks/UseIslandListService";
import useCategoryListService from "../Hooks/UseCategoryListService";
import {Alert, Autocomplete} from "@material-ui/lab";
import AddIcon from "@material-ui/icons/Add";
import PoiCategory from "../Data/Model/PoiCategory";
import Island from "../Data/Model/Island";
import LocalizedResource from "../Data/Model/LocalizedResource";
import CreatePoiDetailsForm from "./CreatePoiDetailsForm";
import Map from "./Map";
import useIoC from "../Hooks/UseIoC";
import PoiService from "../Data/Service/Poi/PoiService";
import PoiWriteRequest from "../Data/Model/PoiWriteRequest";
import {useHistory} from "react-router-dom";

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
	}
}));

export default function CreatePoiForm() {
	const classes = useStyles();
	const [title, setName] = useState();
	const [description, setDescription] = useState();
	const [premium, setPremium] = useState(false);
	const [thingsToDo, setThingsToDo] = useState(false);
	const [latitude, setLatitude] = useState();
	const [longitude, setLongitude] = useState();
	const [island, setIsland] = useState();
	const [category, setCategory] = useState();
	const [details, setDetails] = useState();

	const [islandsLoading, islandsException, islands] = useIslandListService();
	const [categoriesLoading, categoriesException, categories] = useCategoryListService();

	const [loading, setLoading] = useState(false);
	const [exception, setException] = useState();
	const poiService = useIoC(PoiService);
	const navigation = useHistory();

	const currentException = [islandsException, categoriesException, exception]
		.find(exception => exception);

	const createPoi = useCallback(() => {
		setLoading(true);
		const request: PoiWriteRequest = {
			title,
			description,
			latitude,
			longitude,
			categoryId: category.id,
			details,
			medias: [

			],
			islandId: island.id,

		};
		poiService.createPoi(request)
			.then(() => navigation.push("/pois"))
			.catch(exception => setException(exception))
			.finally(() => setLoading(false));
	}, []);

	const extractFrenchLocalizedString = (localizedResource: LocalizedResource) => {
		const localizedString = localizedResource
			.find(localizedString => localizedString.language.code === 'fr');
		return (localizedString && localizedString.resource) || '';
	};

	return <div>
		{
			currentException && <Alert>
				{currentException.message}
			</Alert>
		}
		<form>
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
					options={categories}
					getOptionLabel={category => extractFrenchLocalizedString(category.name)}
					value={category}
					onChange={(_: ChangeEvent<{}>, category: PoiCategory | null) => {
						if (category) {
							setCategory(category);
						}
					}}
					renderInput={params => (
						<TextField {...params} label="Catégorie" variant="filled" fullWidth />
					)}/>
				<Button
					color={"primary"}
					size={"large"}
					className={classes.shrinkFormControl}>
					<AddIcon />
					Créer une catégorie
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
			<CreatePoiDetailsForm
				value={details}
				onChanged={details => setDetails(details)}/>
			<Button
				fullWidth
				disableElevation
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