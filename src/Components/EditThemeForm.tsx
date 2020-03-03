import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import LocalizedResourceField from "./LocalizedResourceField";
import useThemeListService from "../Hooks/UseThemeListService";
import AppLoader from "./AppLoader";
import Alert from "@material-ui/lab/Alert";
import {
	Button,
	createStyles, Dialog, DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	Theme,
	Typography
} from "@material-ui/core";
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
import LocalizedResourceMapper from "../Data/Mapper/LocalizedResourceMapper";
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
		},
		deleteButton: {
			flex: 1,
			marginTop: theme.spacing(2),
			backgroundColor: theme.palette.error.main,
			color: theme.palette.background.default
		}
	})
});

interface EditThemeFormProps {
	readonly theme: PoiTheme;
}

export default function EditThemeForm({ theme }: EditThemeFormProps) {
	const classes = useStyles();
	const localizedResourceMapper = useIoC(LocalizedResourceMapper);

	const [themesLoading, themesException, themes] = useThemeListService();
	const [name, setName] = useState(localizedResourceMapper.map(theme.name));
	const [icon, setIcon] = useState<PreparedMedia | undefined>(theme.icon);
	const [parent, setParent] = useState(theme.parent);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

	const [loading, setLoading] = useState(false);

	const navigation = useHistory();
	const poiService = useIoC(PoiService);
	const mediaService = useIoC(MediaService);

	const editTheme = useCallback(async () => {
		setLoading(true);
		const media = icon && await mediaService.upload(icon);
		const request: PoiThemeWriteRequest = {
			id: theme.id,
			name: name,
			icon: media,
			parentId: parent?.id
		};
		await poiService.createPoiTheme(request);
		setLoading(false);
		navigation.push("/themes");
	}, [icon, name, parent]);

	const toggleDeleteDialog = () => setDeleteDialogOpen(!deleteDialogOpen);

	const deleteTheme = useCallback(async () => {
		setLoading(true);
		toggleDeleteDialog();
		await poiService.deleteTheme(theme.id);
		setLoading(false);
		navigation.push("/themes");
	}, [theme]);

	const extractFrenchName = (localizedResource: LocalizedResource) => {
		return localizedResource.find(n => n.language.code === 'fr')?.resource || ""
	};

	if (themesLoading) {
		return <AppLoader />;
	}

	if (themesException) {
		return <Alert severity="error">
			{themesException.message}
		</Alert>;
	}

	return <form>
		<Dialog
			open={deleteDialogOpen}
			onClose={toggleDeleteDialog}
			aria-labelledby="delete-dialog-title"
			aria-describedby="delete-dialog-description"
		>
			<DialogTitle id="delete-dialog-title">{"Supprimer ce point d'intérêt?"}</DialogTitle>
			<DialogContent>
				<DialogContentText id="delete-dialog-description">
					Veux-tu vraiment supprimer ce Thème ? Cette action est irréversible
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={deleteTheme}>
					Supprimer
				</Button>
				<Button onClick={toggleDeleteDialog} color="primary" autoFocus>
					Annuler
				</Button>
			</DialogActions>
		</Dialog>
		<TextField
			fullWidth
			disabled
			className={classes.formControl}
			variant={"filled"}
			value={theme.id}
			label={"Id"}/>
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
		<div className={classes.formControl}>
			<Typography color={"textSecondary"}>
				Icône
			</Typography>
			{
				icon && <img className={classes.icon} src={
					("url" in icon && icon.url) ||
					("file" in icon && URL.createObjectURL(icon.file)) ||
					undefined
				}/>
			}
			<Button
				disableElevation
				className={classes.formControl}
				color={"primary"}
				variant={"contained"}
				component={"label"}>
				Sélectionner
				<input
					type="file"
					style={{ display: "none" }}
					onChange={e => {
						if (e.target.files && e.target.files.length > 0) {
							const file = e.target.files.item(0);
							if (file) {
								setIcon({
									file
								});
							}
						}
					}}/>
			</Button>
		</div>
		<Button
			fullWidth
			color={"primary"}
			variant={"contained"}
			size={"large"}
			className={classes.formControl}
			onClick={editTheme}>
			{ loading ? "Chargement ..." : "Sauvegarder" }
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
}