import LocalizedResource from "../Data/Model/LocalizedResource";
import {createStyles, Grid, TextField, Typography} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Language from "../Data/Model/Language";


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
	readonly value?: LocalizedResource;
	readonly multiline?: boolean;
	onChanged?(localizedResource: LocalizedResource): void;
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
	const { label, value, multiline, onChanged } = props;

	function valueForLanguage(language: Language): string | undefined {
		const localizedString = value ?
			value.find(localizedString => localizedString.language.code === language.code) :
			undefined;
		return localizedString ? localizedString.resource : undefined;
	}

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
							multiline={multiline}
							label={language.name}
							value={valueForLanguage(language)}
							variant={"filled"}
							onChange={e => {
								if (onChanged) {
									const oldValue = (value || [])
										.filter(localizedString => localizedString.language.code !== language.code);
									onChanged([
										...oldValue,
										{
											language: language,
											resource: e.target.value
										}
									]);
								}
							}}/>
					</Grid>
				))
			}
		</Grid>
	</div>;
}