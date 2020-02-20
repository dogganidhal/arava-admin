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
	mainImage: {
		height: theme.spacing(64),
	},
	media: {
		height: theme.spacing(32),
	},
}));

interface PoiImagePickerProps {
	readonly mainImage?: PreparedMedia;
	readonly images: PreparedMedia[];
	onImagesChanged(images: PreparedMedia[]): void;
	onMainImageChanged(mainImage: PreparedMedia): void;
}

export default function PoiImagePicker(props: PoiImagePickerProps) {
	const classes = useStyles();
	const { images, onImagesChanged, mainImage, onMainImageChanged} = props;

	const mainImageSrc = mainImage && (
		("url" in mainImage && mainImage.url) ||
		("file" in mainImage && URL.createObjectURL(mainImage.file))
	) || "https://i1.wp.com/healthyclemsy.fr/wp-content/uploads/2016/05/placeholder-1.png";

	return <div>
		<Typography color={"textSecondary"}>
			Image principale *
		</Typography>
		<Card
			variant={"outlined"}>
			<CardMedia
				className={classes.mainImage}
				image={mainImageSrc} />
			<CardActions>
				<Button
					fullWidth
					color={"primary"}
					component={"label"}>
					Remplacer
					<input
						type="file"
						style={{ display: "none" }}
						onChange={e => {
							if (e.target.files && e.target.files.length > 0) {
								const file = e.target.files.item(0);
								if (file) {
									onMainImageChanged({
										file
									});
								}
							}
						}}/>
				</Button>
			</CardActions>
		</Card>
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
											onImagesChanged(newImages);
										}}>
										Supprimer
										<input
											type="file"
											style={{ display: "none" }}
											onChange={e => {
												if (e.target.files && e.target.files.length > 0) {
													const file = e.target.files.item(0);
													if (file) {
														onImagesChanged([
															...(images.length > 0 ? images : []),
															{
																file
															}
														]);
													}
												}
											}}/>
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
							onImagesChanged([
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