"use client";
import { Loader } from "@googlemaps/js-api-loader";
import { useRef } from "react";

const MapComponent = () => {
  const googlemap = useRef();
  const mapContainer = useRef();

  const mapOptions = {
    zoom: 4,
    clickableIcons: false,
    // disableDefaultUI: true,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    gestureHandling: "cooperative",
  };

  // LOAD GOOGLE MAPS API
  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    version: "weekly",
    //   loaderOptions,
  });

  // Load Libraries
  loader.load().then(async () => {
    const { Map } = await google.maps.importLibrary("maps");

    //Add Map to DOM
    googlemap.current = new Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      ...mapOptions,
    });
  });

  return <div className="w-full h-full" id="map"></div>;
};

export default MapComponent;
