import PreparedMedia from "../Data/Model/PreparedMedia";
import {Button, createStyles, Theme, Typography} from "@material-ui/core";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Media from "../Data/Model/Media";

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

interface SingleImagePickerProps {
	readonly initialImage?: PreparedMedia;
	readonly imageType?: string;
	readonly title: string;
	onChange: (image: PreparedMedia) => void;
}

export default function SingleImagePicker(props: SingleImagePickerProps) {
	const classes = useStyles();
	const { imageType, initialImage, title, onChange } = props;
	const [icon, setIcon] = useState<PreparedMedia | undefined>(initialImage);

	return <div className={classes.formControl}>
		<Typography color={"textSecondary"}>
			{title}
		</Typography>
		{
			icon && <img
					className={classes.icon}
					src={"file" in icon ? URL.createObjectURL(icon.file) : icon.url}
			/>
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
				accept={imageType ?? "image/*"}
				style={{ display: "none" }}
				onChange={e => {
					if (e.target.files && e.target.files.length > 0) {
						const file = e.target.files.item(0);
						if (file) {
							setIcon({
								file
							});
							onChange({
								file
							});
						}
					}
				}}/>
		</Button>
	</div>
}