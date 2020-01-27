import React from 'react';
import './App.css';
import GoogleMapReact from 'google-map-react';
import latLong from './data/latlong.json';
import Map from './Map';

const API_KEY = 'AIzaSyDxQCUeog2L2Z30hXIm3HK2BsPLI8djR4o';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function App() {
  const defaultProps = {
    center: {
      lat: 41.9743421,
      lng: -87.7265665
    },
    zoom: 13.84
  };

  console.log("latLong", latLong);

  return <Map />;

  // return (
  //   <div style={{ height: '100vh', width: '100%' }}>
  //     <GoogleMapReact
  //       bootstrapURLKeys={{ key: API_KEY }}
  //       defaultCenter={defaultProps.center}
  //       defaultZoom={defaultProps.zoom}
  //     >
  //     {latLong.map(marker => {
  //       return (<AnyReactComponent
  //         lat={marker.lat}
  //         lng={marker.lng}
  //       />)
  //     })}
  //     </GoogleMapReact>
  //   </div>
  // );
}

export default App;
