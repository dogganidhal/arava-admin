import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	createStyles,
	Typography
} from "@material-ui/core";
import React from "react";
import Poi from "../Data/Model/Poi";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => createStyles({
	poiCard: {
		width: theme.spacing(32)
	},
	media: {
		height: 140,
	}
}));

interface PoiCardProps {
	poi: Poi
}

export default function PoiCard(props: PoiCardProps) {
	const classes = useStyles();
	const {poi} = props;
	const image = poi.medias.length > 0 ? poi.medias[0] : undefined;
	const frenchTitle = poi.title.find(t => t.language.code === 'fr')?.resource;
	const frenchThemeName = poi.theme.name.find(t => t.language.code === 'fr')?.resource;

	return <Card className={classes.poiCard} variant={"outlined"}>
		<CardActionArea>
			<CardMedia
				className={classes.media}
				image={image && image.url}
				title={frenchTitle}
			/>
			<CardContent>
				<Typography gutterBottom variant="h6" component="h2">
					{frenchTitle}
				</Typography>
				<Typography>
					{frenchThemeName}
				</Typography>
			</CardContent>
		</CardActionArea>
		<CardActions>
			<Button
				fullWidth
				color="primary"
				onClick={() => {}}>
				Modifier
			</Button>
		</CardActions>
	</Card>
}