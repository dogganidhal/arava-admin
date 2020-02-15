import {
	Button, Card, CardActions,
	CardMedia, createStyles, Grid, Typography
} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import PreparedMedia from "../Data/Model/PreparedMedia";

const useStyles = makeStyles(theme => createStyles({
	shrinkFormControl: {
		marginTop: theme.spacing(2)
	},
	gridListContainer: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2)
	},
	media: {
		height: theme.spacing(32),
	},
}));

interface PoiImagePickerProps {
	readonly images: PreparedMedia[];
	onChanged(images: PreparedMedia[]): void;
}

export default function PoiImagePicker({ images, onChanged }: PoiImagePickerProps) {
	const classes = useStyles();

	return <div>
		<Typography color={"textSecondary"}>
			Photos / Vidéos
		</Typography>
		<div className={classes.gridListContainer}>
			<Grid container spacing={2}>
				{
					images.map((media, index) => (
						<Grid xs={6} item key={index}>
							<Card
								variant={"outlined"}>
								<CardMedia
									className={classes.media}
									image={
										("url" in media && media.url) ||
										("file" in media && URL.createObjectURL(media.file)) ||
										undefined
									} />
								<CardActions>
									<Button
										fullWidth
										color={"primary"}
										onClick={() => {
											const newImages = [
												...(images.slice(0, index)),
												...(images.slice(index + 1))
											];
											onChanged(newImages);
										}}>
										Supprimer
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))
				}
			</Grid>
		</div>
		<Button
			fullWidth
			disableElevation
			color={"primary"}
			variant={"contained"}
			component={"label"}>
			Ajouter
			<input
				type="file"
				style={{ display: "none" }}
				onChange={e => {
					if (e.target.files && e.target.files.length > 0) {
						const file = e.target.files.item(0);
						if (file) {
							onChanged([
								...(images.length > 0 ? images : []),
								{
									file
								}
							]);
						}
					}
				}}/>
		</Button>
	</div>
}