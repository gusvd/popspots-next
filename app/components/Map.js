"use client";
import { Loader } from "@googlemaps/js-api-loader";
import { useRef } from "react";

const MapComponent = ({ center }) => {
  const googlemap = useRef();
  const mapContainer = useRef();

  const mapOptions = {
    zoom: 13,
    clickableIcons: false,
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    // zoomControl: true,
    // mapTypeControl: false,
    // scaleControl: false,
    // streetViewControl: false,
    // rotateControl: false,
    // fullscreenControl: false,
    gestureHandling: "cooperative",
    mapId: "92d1a48ec4b0d2cc",
    center: center,
  };

  // LOAD GOOGLE MAPS API
  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    version: "weekly",
    //   loaderOptions,
  });

  // Promise for a specific library
  loader
    .load()
    .then((google) => {
      new google.maps.Map(document.getElementById("map"), mapOptions);
    })
    .catch((e) => {
      // do something
    });

  // Load Libraries
  // loader.load().then(async () => {
  //   const { Map } = await google.maps.importLibrary("maps");

  //Add Map to DOM
  // googlemap.current = new Map(document.getElementById("map"), {
  //   center: { lat: 51.4572, lng: 0.1277 },
  //   ...mapOptions,
  // });
  // });

  return <div className="h-full w-full " id="map"></div>;
};

export default MapComponent;
