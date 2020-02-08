import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import GoogleMapReact from "google-map-react";



const useStyles = makeStyles((theme: Theme) => {
	return createStyles({
		container: {
			height: '50vh',
			width: '100%'
		}
	});
});

export default function GoogleMap() {
	const classes = useStyles();

	return <div className={classes.container}>
		<GoogleMapReact
			bootstrapURLKeys={{ key: process.env.REACT_APP_GMAPS_API_KEY! }}>
		</GoogleMapReact>
	</div>
}