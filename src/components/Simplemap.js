import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';


class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat:10.73,
      lng:106.70
    },
    zoom: 13
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '70vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDjeA55beFHMs6zK6pC6n2A2P5H8Lzd4gU'}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Marker
            lat={10.7334771}
            lng={106.705734}
            name="My Marker"
            color="orange"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;