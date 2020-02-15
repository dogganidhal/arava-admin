import {createStyles, Grid, TextField, Typography} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Language from "../Data/Model/Language";
import LocalizedResourceWriteRequest from "../Data/Model/LocalizedResourceWriteRequest";
import {lang} from "moment";


const useStyles = makeStyles(theme => createStyles({
	formControl: {
		marginTop: theme.spacing(2)
	},
	formRow: {
		flexGrow: 1
	}
}));

interface LocalizedResourceFieldProps {
	readonly label?: string;
	readonly value?: LocalizedResourceWriteRequest;
	readonly multiline?: boolean;
	readonly required?: boolean;
	onChanged?(localizedResource: LocalizedResourceWriteRequest): void;
}

const languages: Language[] = [
	{
		code: 'fr',
		name: 'Français'
	},
	{
		code: 'en',
		name: 'English'
	},
	{
		code: 'zh_Hans',
		name: '指关节'
	},
];

export default function LocalizedResourceField(props: LocalizedResourceFieldProps) {
	const classes = useStyles();
	const { label, value, multiline, required, onChanged } = props;

	return <div className={classes.formControl}>
		{
			label && <Typography color={"textSecondary"}>
				{label}
      </Typography>
		}
		<Grid container spacing={2} className={classes.formRow}>
			{
				languages.map((language, index) => (
					<Grid key={index} item xs={4}>
						<TextField
							fullWidth
							required={required}
							multiline={multiline}
							label={language.name}
							value={value && value[language.code]}
							variant={"filled"}
							onChange={e => {
								if (onChanged) {
									onChanged({
										...value,
										[language.code]: e.target.value
									});
								}
							}}/>
					</Grid>
				))
			}
		</Grid>
	</div>;
}