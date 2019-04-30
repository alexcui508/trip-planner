import React from 'react';
import { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { Icon } from 'semantic-ui-react';

let MAP_API_KEY = "pk.eyJ1IjoiYWxleGN1aSIsImEiOiJjanYzNTVsejcyY29uNDNwZml4YjZ3dHV4In0.f4di1n6PqkuH-Lksizp3-Q";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: 400,
        height: 400,
        latitude: this.props.latitude,
        longitude: this.props.longitude,
        zoom: 16,
      }
    };
  }

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({ viewport })}
        mapboxApiAccessToken={MAP_API_KEY}
      >
        <Marker
          latitude={this.props.latitude}
          longitude={this.props.longitude}
        >
          <Icon color='red' name='point' />
        </Marker>
      </ReactMapGL>
    );
  }
}

export default Map;