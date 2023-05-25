"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader } from "@googlemaps/js-api-loader";
import Select from "react-select";

import PopSpotsLogo from "../../public/popspots-logo.svg";
import SearchIcon from "../../public/icon-search.svg";
import pinIcon from "../../public/pin.svg";
import locationTypes from "../../public/locationTypes.js";
import ResultCard from "./ResultCard.js";

let search = null;

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

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const searchName = searchParams.get("placeName");
  const searchType = searchParams.get("locationType");
  // const searchLat = Number(searchParams.get("lat"));
  // const searchLng = Number(searchParams.get("lng"));
  const searchCenter = searchParams.get("center")
    ? JSON.parse(searchParams.get("center"))
    : null;
  const searchBounds = searchParams.get("bounds")
    ? JSON.parse(searchParams.get("bounds"))
    : null;
  const searchNe = searchParams.get("ne")
    ? JSON.parse(searchParams.get("ne"))
    : null;
  let isGeolocation = searchParams.get("isGeolocation") === "true";

  const map = useRef();
  const autocomplete = useRef();
  const locationType = useRef();
  const selectRadius = useRef();
  const markers = useRef([]);
  const circle = useRef([]);
  const [search, setSearch] = useState();
  const [searchMessage, setSearchMessage] = useState("");
  const [resultList, setResultList] = useState();

  // ************************************ //
  // LOAD GOOGLE MAPS API
  // LOAD INITIAL SEARCH
  // ************************************ //
  useEffect(() => {
    async function init() {
      await loadGoogleMapsAPI();
      loadInitialSearch();
    }
    init();
  }, []);

  async function loadGoogleMapsAPI() {
    // Initialize map API
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
      version: "weekly",
      //   loaderOptions,
    });

    // Load Libraries
    await loader.load();
    const { Map } = await google.maps.importLibrary("maps");
    const { Places } = await google.maps.importLibrary("places");
    const { Geometry } = await google.maps.importLibrary("geometry");

    //Add Map to DOM
    map.current = new Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      ...mapOptions,
    });

    //Add Autocomplete to DOM
    const center = { lat: -34.397, lng: 150.644 };
    const input = document.getElementById("autocomplete");
    const options = {
      fields: ["geometry", "name"],
      types: ["geocode"],
    };
    autocomplete.current = new google.maps.places.Autocomplete(input, options);
  }

  // ************************************ //
  // FETCH RESULTS
  // ************************************ //

  //Fetch results every time the search State changes
  useEffect(() => {
    if (!search) return;
    console.log("search request", search);
    const placesService = new google.maps.places.PlacesService(map.current);
    const resultOut = placesService.nearbySearch(
      search.request,
      (results, status) => {
        console.log("status", status);
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const sortedResults = sortResults(results);
          console.log("sorted results", sortedResults);
          setResultList(sortedResults);
          setSearchMessage(
            `Showing the top ${results.length} ${search.request.type} in ${search.locatioName}`
          );
        } else if (
          status === window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS
        ) {
          setResultList(null);
          setSearchMessage("No results found");
        }
      }
    );
  }, [search]);

  // Sorts results by amount of reviews and filters out non operational places
  const sortResults = (results) => {
    const operationalOnly = results.filter(
      (item) => item.business_status === "OPERATIONAL"
    );

    const sorted = operationalOnly.sort((a, b) => {
      const aRating = a.user_ratings_total || Number.MIN_SAFE_INTEGER;
      const bRating = b.user_ratings_total || Number.MIN_SAFE_INTEGER;

      return bRating - aRating;
    });

    return sorted;
  };

  // ************************************ //
  // MAP UPDATE & ADD MARKER FUNCTIONS
  // ************************************ //

  // Updates map and markers every time the Search Result state changes
  useEffect(() => {
    if (!resultList || !search) return; // stops if the reuslt list or search state is empty
    //Add markers
    resultList.map((item, index) => {
      var marker = new google.maps.Marker({
        position: {
          lat: item.geometry.location.lat(),
          lng: item.geometry.location.lng(),
        },
        icon: pinIcon.src,
      });

      // To add the marker to the map, call setMap()
      marker.setMap(map.current);

      // To add the marker to the markers Ref so it can be used dynamically
      markers.current.push(marker);
    });

    // Add circle
    let radius;
    const center = search.request.location;
    const mapCircle = map.current;
    const location = autocomplete.current.getPlace();

    if (!location) {
      console.log("no location if statement yes", location);

      radius = search.request.radius
        ? search.request.radius
        : google.maps.geometry.spherical.computeDistanceBetween(
            center,
            search.ne
          );
      map.current.setCenter(search.request.location);
      map.current.setZoom(14);
    } else {
      radius = google.maps.geometry.spherical.computeDistanceBetween(
        center,
        search.ne
      );
      // Pan map to the location
      // map.current.panTo(search.request.location); // center map on location
      map.current.fitBounds(search.request.bounds); // fit map to bounds of the location
      // map.current.fitBounds(circle.getBounds()); // fit map to bounds of the circle
    }
    console.log("circle radius", radius);

    circle.current = new google.maps.Circle({
      strokeColor: "#4C04A9",
      strokeOpacity: 1,
      strokeWeight: 2,
      // fillColor: "#FF0000",
      fillOpacity: 0,
      mapCircle,
      center: center,
      radius: radius,
    });
    circle.current.setMap(map.current);

    // TEST adds a rectangle with the bounds of the search
    // const rectangle = new google.maps.Rectangle({
    //   strokeColor: "#FF0000",
    //   strokeOpacity: 0.2,
    //   strokeWeight: 2,
    //   fillColor: "#FF0000",
    //   fillOpacity: 0.1,
    //   mapCircle,
    //   bounds: search.request.bounds,
    // });
    // rectangle.setMap(map.current);

    return () => {
      deleteMarkers();
      deleteCircle();
    };
  }, [resultList]);

  // Deletes all markers
  const deleteMarkers = () => {
    for (let i = 0; i < markers.current.length; i++) {
      markers.current[i].setMap(null);
    }
    markers.current = [];
  };

  // Deletes circle
  const deleteCircle = () => {
    circle.current.setMap(null);
  };

  // Highlight marker on Hover of the Result Card
  const selectMarker = (marker) => {
    if (markers.current.length < 1) return;
    for (let i = 0; i < markers.current.length; i++) {
      markers.current[i].setMap(null);
    }
    markers.current[marker].setMap(map.current);
    map.current.panTo(markers.current[marker].position);
    map.current.setZoom(14);
  };

  // Show all markers / When mouse rolls out of result cards
  const showAllMarkers = () => {
    for (let i = 0; i < markers.current.length; i++) {
      markers.current[i].setMap(map.current);
    }
    map.current.fitBounds(search.request.bounds);
  };

  // ************************************ //
  // HANDLES SEARCH
  // ************************************ //

  // New search on button click
  function handleNewSearch() {
    let center, bounds, locationName, ne;
    const location = autocomplete.current.getPlace();
    if (location) {
      center = {
        lat: location.geometry.location.lat(),
        lng: location.geometry.location.lng(),
      };
      bounds = location.geometry.viewport;
      locationName = location.name;
      ne = {
        lat: location.geometry.viewport.getNorthEast().lat(),
        lng: location.geometry.viewport.getNorthEast().lng(),
      };
    } else if (searchCenter) {
      center = searchCenter;
      locationName = searchName;
      ne = searchNe;
    } else {
      center = null;
    }
    const type = locationType.current.getValue();

    if (!center) {
      setSearchMessage("Please select a location above.");
      return;
    }
    if (type.length < 1) {
      setSearchMessage("Please select a location type above");
      return;
    }
    setSearch({
      request: {
        location: center,
        type: [type[0].value],
        ...(bounds
          ? { bounds: bounds }
          : { radius: selectRadius.current.getValue()[0].value }),
      },
      locatioName: locationName,
      ne: ne,
    });
  }

  // Initial search from query string
  function loadInitialSearch() {
    const radius = selectRadius.current.getValue()[0].value;
    const bounds = searchBounds;
    setSearch({
      request: {
        location: searchCenter,
        type: searchType,
        ...(isGeolocation
          ? { radius: radius } // set default radius from geolocation search
          : { bounds: bounds }),
      },
      locatioName: searchName,
      ne: searchNe,
    });
  }

  // Set radius dropdown to the closet radius
  function setRadiusDropdown(radius) {}

  // ************************************ //
  // COMPONENTS
  // ************************************ //
  // Result Cards
  const ResultCards =
    resultList &&
    resultList.map((item, index) => {
      return (
        <ResultCard
          key={index}
          index={index}
          name={item.name}
          totalreviews={item.user_ratings_total}
          ratings={item.rating}
          placeID={item.place_id}
          address={item.vicinity}
          selectMarker={selectMarker}
          showAllMarkers={showAllMarkers}
        />
      );
    });

  // ************************************ //
  // PAGE
  // ************************************ //
  return (
    <div className="App">
      <div className="container h-[46rem] max-w-7xl px-0">
        <div className="row mx-0 flex h-full">
          <div className="col w-3/5 px-20 py-16 lg:flex lg:flex-col lg:gap-y-6">
            <div>
              <img className="w-28" src={PopSpotsLogo.src} />
            </div>
            <div className="lg:flex lg:flex-row">
              {/* Location search box ---- */}
              <input
                id="autocomplete"
                name="location"
                className="form-input h-12 grow rounded-full rounded-r-none border-2 border-r-0 border-purple-800 px-6 placeholder:text-purple-800"
                type="text"
                placeholder="Location"
                defaultValue={searchName}
              />
              {/* Type search box ---- */}
              <Select
                unstyled
                instanceId="autocomplete"
                placeholder="Type"
                classNames={{
                  container: () => "h-12 grow",
                  control: () =>
                    "form-input h-12 grow px-6 border-2 border-r-0 border-purple-800 bg-white",
                  placeholder: () => "text-purple-800",
                  dropdownIndicator: () => "text-purple-800",
                  menu: () => "bg-white py-3  shadow-md",
                  option: (state) =>
                    state.isFocused
                      ? "bg-purple-100 text-purple-800 py-2 px-3"
                      : "text-purple-800 bg-white py-2 px-3",
                  singleValue: () => "text-purple-800",
                }}
                options={locationTypes}
                defaultValue={
                  locationTypes.filter((type) => type.value === searchType)[0]
                }
                ref={locationType}
              />
              {/* Search button ---- */}

              <a
                className="bg-primary flex h-12 w-20 cursor-pointer place-content-center content-center items-center rounded-full rounded-l-none border-2 border-purple-800 bg-purple-800"
                onClick={handleNewSearch}
              >
                <img className="h-7 items-center" src={SearchIcon.src} />
              </a>
            </div>
            {/*  Radius Select */}
            <div className="-mt-4 flex flex-row items-center">
              <p className="grow text-right text-sm text-purple-800">Radius:</p>
              {/* <div className="w-20"> */}
              <Select
                unstyled
                instanceId="radius"
                classNames={{
                  container: () => "text-sm",
                  control: () => "px-2",
                  placeholder: () => "text-purple-800",
                  dropdownIndicator: () => "text-purple-800",
                  menu: () => "bg-white py-3 shadow-md",
                  option: (state) =>
                    state.isFocused
                      ? "bg-purple-100 text-purple-800 py-2 px-3"
                      : "text-purple-800 bg-white py-2 px-3",
                  singleValue: () => "text-purple-800",
                }}
                options={[
                  { value: 1000, label: "1 km" },
                  { value: 2000, label: "2 km" },
                  { value: 5000, label: "5 km" },
                  { value: 10000, label: "10 km" },
                  { value: 50000, label: "50 km" },
                ]}
                defaultValue={{ value: 1000, label: "1 km" }}
                ref={selectRadius}
              />
              {/* </div> */}
            </div>
            <div>
              {/* Search summary ---- */}
              <p className="pb-6">{searchMessage}</p>
              <div className="grid grid-cols-3 gap-6 after:flex-auto after:content-['']">
                {ResultCards}
              </div>
            </div>
          </div>
          <div className="col h-full w-2/5 px-0">
            <div className="h-full w-full" id="map"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
