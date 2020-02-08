import React, {ChangeEvent, useState} from "react";
import LocalizedResourceField from "./LocalizedResourceField";
import {
	Button,
	CircularProgress,
	createStyles,
	Divider, FormControl,
	FormControlLabel,
	FormGroup,
	Grid, InputLabel, MenuItem, Select,
	Switch,
	TextField,
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
	const [name, setName] = useState();
	const [description, setDescription] = useState();
	const [premium, setPremium] = useState(false);
	const [thingsToDo, setThingsToDo] = useState(false);
	const [latitude, setLatitude] = useState();
	const [longitude, setLongitude] = useState();
	const [island, setIsland] = useState();
	const [category, setCategory] = useState();

	const [islandsLoading, islandsException, islands] = useIslandListService();
	const [categoriesLoading, categoriesException, categories] = useCategoryListService();

	const exception = [islandsException, categoriesException]
		.find(exception => exception);

	function extractFrenchLocalizedString(localizedResource: LocalizedResource): string {
		const localizedString = localizedResource
			.find(localizedString => localizedString.language.code === 'fr');
		return (localizedString && localizedString.resource) || '';
	}

	return <div>
		{
			exception && <Alert>
				{exception.message}
			</Alert>
		}
		<form>
			<LocalizedResourceField
				label={"Nom"}
				value={name}
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
			<div className={classes.formControl}>
				<Typography color={"textSecondary"}>
					Coordonnées
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<TextField
							fullWidth
							label={"Latitude"}
							value={latitude} variant={"filled"}
							onChange={e => setLatitude(parseFloat(e.target.value))}/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							label={"Longitude"}
							value={longitude} variant={"filled"}
							onChange={e => setLongitude(parseFloat(e.target.value))}/>
					</Grid>
				</Grid>
			</div>
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
				)}
			/>
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
					)}
				/>
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
							color="primary"
						/>
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
		</form>
	</div>;
}