import React from "react";
import PoiDetailsWriteRequest from "../Data/Model/PoiDetailsWriteRequest";
import {createStyles, InputAdornment, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import "datejs";

const useStyles = makeStyles(theme => createStyles({
	formControl: {
		flex: 1,
		marginTop: theme.spacing(2)
	}
}));

interface CreatePoiDetailsFormProps {
	readonly value?: PoiDetailsWriteRequest;
	onChanged?(poiDetails: PoiDetailsWriteRequest): void;
}

export default function CreatePoiDetailsForm(props: CreatePoiDetailsFormProps) {
	const classes = useStyles();
	const { onChanged, value } = props;

	return <div>
		<TextField
			fullWidth
			multiline
			className={classes.formControl}
			label={"Adresse"}
			value={value && value.address}
			variant={"filled"}
			onChange={e => {
				if (onChanged) {
					onChanged({
						...value,
						address: e.target.value
					});
				}
			}}/>
		<TextField
			fullWidth
			type={"email"}
			className={classes.formControl}
			label={"E-mail"}
			value={value && value.email}
			variant={"filled"}
			onChange={e => {
				if (onChanged) {
					onChanged({
						...value,
						email: e.target.value
					});
				}
			}}/>
		<TextField
			fullWidth
			type={"phone"}
			className={classes.formControl}
			label={"Numéro de téléphone"}
			value={value && value.phone}
			variant={"filled"}
			onChange={e => {
				if (onChanged) {
					onChanged({
						...value,
						phone: e.target.value
					});
				}
			}}/>
		<TextField
			fullWidth
			className={classes.formControl}
			label={"Site web"}
			value={value && value.website}
			variant={"filled"}
			InputProps={{
				startAdornment: <InputAdornment position="start">https://</InputAdornment>,
			}}
			onChange={e => {
				if (onChanged) {
					onChanged({
						...value,
						website: e.target.value
					});
				}
			}}/>
		<TextField
			fullWidth
			className={classes.formControl}
			label={"Compte Facebook"}
			value={value && value.facebookUrl}
			variant={"filled"}
			InputProps={{
				startAdornment: <InputAdornment position="start">https://facebook.com/</InputAdornment>,
			}}
			onChange={e => {
				if (onChanged) {
					onChanged({
						...value,
						facebookUrl: e.target.value
					});
				}
			}}/>
		<TextField
			fullWidth
			className={classes.formControl}
			label={"Compte Instagram"}
			value={value && value.instagramAccount}
			variant={"filled"}
			InputProps={{
				startAdornment: <InputAdornment position="start">https://instagram.com/</InputAdornment>,
			}}
			onChange={e => {
				if (onChanged) {
					onChanged({
						...value,
						instagramAccount: e.target.value
					});
				}
			}}/>
		<TextField
			fullWidth
			multiline
			className={classes.formControl}
			label={"Horaires d'ouverture"}
			value={value && value.openingHours}
			variant={"filled"}
			onChange={e => {
				if (onChanged) {
					onChanged({
						...value,
						openingHours: e.target.value
					});
				}
			}}/>
	</div>;
}