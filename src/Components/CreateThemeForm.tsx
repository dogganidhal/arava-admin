import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import LocalizedResourceField from "./LocalizedResourceField";
import useThemeListService from "../Hooks/UseThemeListService";
import AppLoader from "./AppLoader";
import Alert from "@material-ui/lab/Alert";
import {Button, createStyles, TextField, Theme, Typography} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import PoiTheme from "../Data/Model/PoiTheme";
import {makeStyles} from "@material-ui/core/styles";
import LocalizedResource from "../Data/Model/LocalizedResource";
import LocalizedResourceWriteRequest from "../Data/Model/LocalizedResourceWriteRequest";
import useIoC from "../Hooks/UseIoC";
import PoiService from "../Data/Service/Poi/PoiService";
import PoiThemeWriteRequest from "../Data/Model/PoiThemeWriteRequest";
import MediaService from "../Data/Service/Media/MediaService";
import {useHistory} from "react-router-dom";
import SingleImagePicker from "./SingleImagePicker";
import PreparedMedia from "../Data/Model/PreparedMedia";

const useStyles = makeStyles((theme: Theme) => {
	return createStyles({
		formControl: {
			marginTop: theme.spacing(2)
		},
		icon: {
			display: 'block',
			height: theme.spacing(4),
			width: theme.spacing(4)
		}
	})
});

export default function CreateThemeForm() {
	const classes = useStyles();
	const [themesLoading, themesException, themes] = useThemeListService();
	const [name, setName] = useState({});
	const [icon, setIcon] = useState();
	const [marker, setMarker] = useState();
	const [sponsoredMarker, setSponsoredMarker] = useState();
	const [parent, setParent] = useState();
	const [valid, setValid] = useState(false);
	const [loading, setLoading] = useState(false);

	const navigation = useHistory();
	const poiService = useIoC(PoiService);
	const mediaService = useIoC(MediaService);

	const localizedResourceValid = (resource: LocalizedResourceWriteRequest) => {
		return Object.keys(resource).includes('fr') && resource['fr'].length > 0 &&
			Object.keys(resource).includes('en') && resource['en'].length > 0 &&
			Object.keys(resource).includes('zh_Hans') && resource['zh_Hans'].length > 0
	};

	useEffect(() => {
		setValid(
			icon !== undefined &&
			marker !== undefined &&
			sponsoredMarker !== undefined &&
			localizedResourceValid(name)
		);
	}, [icon, name, marker, sponsoredMarker]);

	const createTheme = useCallback(async () => {
		setLoading(true);
		const uploadedIcon = await mediaService.upload(icon);
		const uploadedMarker = await mediaService.upload(marker);
		const uploadedSponsoredMarker = await mediaService.upload(sponsoredMarker);
		const request: PoiThemeWriteRequest = {
			name: name,
			icon: uploadedIcon,
			parentId: parent?.id,
			marker: uploadedMarker,
			sponsoredMarker: uploadedSponsoredMarker
		};
		await poiService.createPoiTheme(request);
		setLoading(false);
		navigation.push("/themes");
	}, [icon, name, parent, marker, sponsoredMarker]);

	if (themesLoading) {
		return <AppLoader />;
	}

	if (themesException) {
		return <Alert severity="error">
			{themesException.message}
		</Alert>;
	}

	const extractFrenchName = (localizedResource: LocalizedResource) => {
		return localizedResource.find(n => n.language.code === 'fr')?.resource || ""
	};

	return <form>
		<LocalizedResourceField
			required
			value={name}
			label={"Nom"}
			onChanged={setName}/>
		<Autocomplete
			className={classes.formControl}
			options={themes}
			getOptionLabel={option => extractFrenchName(option.name)}
			value={parent}
			onChange={(_: ChangeEvent<{}>, parent: PoiTheme | null) => {
				if (parent) {
					setParent(parent);
				}
			}}
			renderInput={params => (
				<TextField {...params} label="Parent" variant="filled" fullWidth />
			)}
		/>
		<SingleImagePicker
			title={"Icône"}
			onChange={icon => setIcon(icon)}
		/>
		<SingleImagePicker
			title={"Marqueur par défaut"}
			onChange={marker => setMarker(marker)}
			imageType={"image/png"}
		/>
		<SingleImagePicker
			title={"Marqueur à la une"}
			onChange={sponsoredMarker => setSponsoredMarker(sponsoredMarker)}
			imageType={"image/png"}
		/>
		<Button
			fullWidth
			disabled={!valid}
			color={"primary"}
			size={"large"}
			className={classes.formControl}
			onClick={createTheme}>
			{ loading ? "Chargement ..." : "Sauvegarder" }
		</Button>
	</form>
}