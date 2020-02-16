import React, {useCallback} from "react";
import {createStyles, makeStyles, useTheme} from "@material-ui/core/styles";
import {GoogleApiWrapper, Map, MapProps} from "google-maps-react";
import {Card} from "@material-ui/core";
import LatLng from "../Data/Model/LatLng";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";


const useStyles = makeStyles(() => {
	return createStyles({
		container: {
			height: '50vh',
			width: '50hv'
		}
	});
});

interface MapContainerProps extends MapProps {
	readonly initialCoordinate?: LatLng;
	readonly initialZoom?: number;
	readonly alwaysCenterMarker?: boolean;
	onUserInteraction?(coordinate: LatLng, zoom: number): void;
}

function MapContainer(props: MapContainerProps) {
	const classes = useStyles();
	const { onUserInteraction, google, alwaysCenterMarker, initialZoom, initialCoordinate } = props;
	const theme = useTheme();

	const handleUserInteraction = useCallback(async (map?: google.maps.Map) => {
		if (onUserInteraction && map?.getCenter()) {
			const center = map?.getCenter();
			const zoom = map?.getZoom();
			onUserInteraction({
				latitude: center?.lat(),
				longitude: center?.lng()
			}, zoom);
		}
	}, [onUserInteraction]);

	return <div style={{ position: 'relative' }}>
		<Card
			variant={"outlined"}
			className={classes.container}>
			<Map
				{...props}
				initialCenter={initialCoordinate ? {
					lat: initialCoordinate.latitude,
					lng: initialCoordinate.longitude
				} :
				{ // Tahiti coordinate
					lat: -17.688706137901743,
					lng: -149.3549765692033
				}}
				zoom={initialZoom || 11}
				google={google}
				// @ts-ignore
				style={{
					position: 'inherit',
					height: '100%',
					width: '100%'
				}}
				// @ts-ignore
				containerStyle={{
					position: 'relative',
					width: '100%',
					height: '100%'
				}}
				onIdle={(_, map) => handleUserInteraction(map)}
				onZoomChanged={(_, map) => handleUserInteraction(map)}>

			</Map>
		</Card>
		{
			alwaysCenterMarker && <FontAwesomeIcon
				icon={faMapMarkerAlt}
				size={"lg"}
				color={theme.palette.primary.main}
				style={{
					position: 'absolute',
					left: 0, right: 0, top: 0, bottom: 0,
					margin: 'auto auto',
					zIndex: 1000,
					width: 32, height: 32
				}} />
		}
	</div>;
}

export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_GMAPS_API_KEY!
})(MapContainer);