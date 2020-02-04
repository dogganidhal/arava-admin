import Island from "../Data/Model/Island";
import {
	Button, Card, CardActionArea,
	CardActions, CardContent, CardMedia,
	createStyles, Theme, Typography
} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => {
	return createStyles({
		islandCard: {
			width: theme.spacing(32)
		},
		media: {
			height: 140,
		},
	});
});


interface IslandCardProps {
	readonly island: Island;
}

export default function IslandCard(props: IslandCardProps) {
	const classes = useStyles();
	const navigation = useHistory();

	return <Card className={classes.islandCard} variant={"outlined"}>
		<CardActionArea>
			<CardMedia
				className={classes.media}
				image={props.island.image.url}
				title={props.island.name}
			/>
			<CardContent>
				<Typography gutterBottom variant="h6" component="h2">
					{props.island.name}
				</Typography>
				<Typography>
					{props.island.archipelago.name}
				</Typography>
			</CardContent>
		</CardActionArea>
		<CardActions>
			<Button
				fullWidth
				color="primary"
				onClick={() => navigation.push(`/islands/${props.island.id}`)}>
				Modifier
			</Button>
		</CardActions>
	</Card>;
}