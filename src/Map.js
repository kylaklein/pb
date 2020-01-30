import React, { createRef, useEffect } from "react";
import MarkerClusterer from "@google/markerclusterer";

import locations from "./data/latlong.json";
import wardCoordinates from "./data/wardcoordinates";

const API_KEY = "AIzaSyDxQCUeog2L2Z30hXIm3HK2BsPLI8djR4o";

const googleMapRef = createRef();

const createGoogleMap = () => {
  const map = new window.google.maps.Map(googleMapRef.current, {
    center: {
      lat: 41.9743421,
      lng: -87.7265665
    },
    zoom: 13.84,
    disableDefaultUI: false
  });
  onMapLoad(map, locations);
};

const onMapLoad = (map, locations) => {
  drawMapShape(map);
  const markers = locations.map(location => {
    return new window.google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map: map
    });
  });

  new MarkerClusterer(map, markers, {
    maxZoom: 14,
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
  });

  return markers;
};

const drawMapShape = map => {
  var ward = new window.google.maps.Polyline({
    path: wardCoordinates,
    geodesic: true,
    strokeColor: "#000000",
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  ward.setMap(map);
};

const loadGoogleMapsScript = () => {
  var s = document.createElement("script");
  s.type = "text/javascript";
  s.src = `https://maps.google.com/maps/api/js?key=${API_KEY}`;
  var x = document.getElementsByTagName("script")[0];
  x.parentNode.insertBefore(s, x);
  // Below is important.
  //We cannot access google.maps until it's finished loading
  s.addEventListener("load", e => {
    createGoogleMap();
  });
};

const Map = () => {
  useEffect(() => {
    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      createGoogleMap();
    }
  }, []);

  return <div id="google-map" ref={googleMapRef} style={{ height: "100vh", width: "100%" }} />;
};

// const Marker = () => {
//   return (

//   );
// }

export default Map;
