import React from 'react';
import { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={18}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
  >
    {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lng }} />}
  </GoogleMap>
);

class Map extends Component {
  render() {
    const { latitude, longitude } = this.props;
    return (
      <MyMapComponent 
        isMarkerShown 
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        lat={latitude}
        lng={longitude}
      />
    );
  }
}

export default Map;