import React from "react";
import PoiDetailsWriteRequest from "../Data/Model/PoiDetailsWriteRequest";
import {createStyles, FormGroup, Grid, InputAdornment, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {TimePicker} from "@material-ui/pickers";

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

				}
			}}/>
		<TextField
			fullWidth
			type={"email"}
			className={classes.formControl}
			label={"E-mail"}
			value={value && value.address}
			variant={"filled"}
			onChange={e => {
				if (onChanged) {

				}
			}}/>
		<TextField
			fullWidth
			className={classes.formControl}
			label={"Site web"}
			value={value && value.address}
			variant={"filled"}
			InputProps={{
				startAdornment: <InputAdornment position="start">https://</InputAdornment>,
			}}
			onChange={e => {
				if (onChanged) {

				}
			}}/>
		<TextField
			fullWidth
			className={classes.formControl}
			label={"Compte Facebook"}
			value={value && value.address}
			variant={"filled"}
			InputProps={{
				startAdornment: <InputAdornment position="start">https://facebook.com/</InputAdornment>,
			}}
			onChange={e => {
				if (onChanged) {

				}
			}}/>
		<TextField
			fullWidth
			className={classes.formControl}
			label={"Compte Instagram"}
			value={value && value.address}
			variant={"filled"}
			InputProps={{
				startAdornment: <InputAdornment position="start">https://instagram.com/</InputAdornment>,
			}}
			onChange={e => {
				if (onChanged) {

				}
			}}/>
		<TextField
			fullWidth
			className={classes.formControl}
			label={"Adresse"}
			value={value && value.address}
			variant={"filled"}
			onChange={e => {
				if (onChanged) {

				}
			}}/>
		<Grid container spacing={2}>
			<Grid item xs={6}>
				<TimePicker
					fullWidth
					className={classes.formControl}
					variant={"inline"}
					inputVariant={"filled"}
					label={"Heure d'ouverture"}
					value={value && value.openingHour}
					onChange={e => {
						if (onChanged) {
							onChanged({
								...value,
								openingHour: e?.toDate()
							});
						}
					}} />
			</Grid>
			<Grid item xs={6}>
				<TimePicker
					fullWidth
					className={classes.formControl}
					variant={"inline"}
					inputVariant={"filled"}
					label={"Heure de fermeture"}
					value={value && value.closingHour}
					onChange={e => {
						if (onChanged) {
							onChanged({
								...value,
								closingHour: e?.toDate()
							});
						}
					}} />
			</Grid>
		</Grid>
	</div>;
}