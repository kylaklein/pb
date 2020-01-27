import React, { createRef, useEffect } from 'react';

import locations from './data/latlong.json';

const API_KEY = 'AIzaSyDxQCUeog2L2Z30hXIm3HK2BsPLI8djR4o';

const googleMapRef = createRef();

const createGoogleMap = () => {
  const map = new window.google.maps.Map(googleMapRef.current, {
    center: {
      lat: 41.9743421,
      lng: -87.7265665
    },
    zoom: 13.84,
    disableDefaultUI: true,
  });
  onMapLoad(map, locations);
};

const onMapLoad = (map, locations) => {
  return locations.map(location => {
    var marker = new window.google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map: map,
    });
  })
}

const loadGoogleMapsScript = () => {
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.src = `https://maps.google.com/maps/api/js?key=${API_KEY}`;
  var x = document.getElementsByTagName('script')[0];
  x.parentNode.insertBefore(s, x);
  // Below is important. 
  //We cannot access google.maps until it's finished loading
  s.addEventListener('load', e => {
    createGoogleMap();
  });
}

const Map = () => {
  useEffect(() => {
    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      createGoogleMap();
    }
  }, []);

  return (
    <div
      id="google-map"
      ref={googleMapRef}
      style={{ height: '100vh', width: '100%' }}
    />
  );
}

// const Marker = () => {
//   return (

//   );
// }

export default Map;