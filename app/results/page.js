"use client";
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
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
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
  gestureHandling: "cooperative",
  mapId: "92d1a48ec4b0d2cc",
};

const radiusSelectOptions = [
  { value: 1000, label: "1 km" },
  { value: 2000, label: "2 km" },
  { value: 5000, label: "5 km" },
  { value: 10000, label: "10 km" },
  { value: 50000, label: "50 km" },
];

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
  const [selectedRadius, setSelectedRadius] = useState({
    value: 1000,
    label: "1 km",
  });
  const radiusOverwrite = useRef(false);

  // ************************************ //
  // LOAD GOOGLE MAPS API
  // LOAD INITIAL SEARCH
  // ************************************ //
  useEffect(() => {
    async function init() {
      await loadGoogleMapsAPI();
      // loadInitialSearch();
      updateSearch();
    }
    init();
    return () => {
      clearGoogleEventListeners();
    };
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
    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    const { Places } = await google.maps.importLibrary("places");
    const { Geometry } = await google.maps.importLibrary("geometry");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    // const { PinElement } = await google.maps.importLibrary("marker");

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

    await google.maps.event.addListener(
      autocomplete.current,
      "place_changed",
      function () {
        radiusOverwrite.current = false;
      }
    );
  }

  function clearGoogleEventListeners() {
    google.maps.event.clearListeners(autocomplete.current, "place_changed");
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
            writeSearchMessage(
              results.length,
              search.request.type,
              search.locatioName
            )
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

  function writeSearchMessage(amount, type, name) {
    const locationType = locationTypes.find(
      (option) => option.value === type
    ).label;
    return `Showing the top ${amount} ${locationType} in ${name}`;
  }

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

    // resultList.map((item, index) => {
    //   const icon = document.createElement("div");
    //   icon.innerHTML = `<p class="font-sans text-beige-50 text-xs">${(
    //     index + 1
    //   ).toString()}</p>`;
    //   const pinBackground = new google.maps.marker.PinElement({
    //     background: "#3C0580",
    //     borderColor: "#3C0580",
    //     glyph: icon,
    //     glyphColor: "#F1F0FF",
    //   });
    //   var marker = new google.maps.marker.AdvancedMarkerElement({
    //     position: {
    //       lat: item.geometry.location.lat(),
    //       lng: item.geometry.location.lng(),
    //     },
    //     content: pinBackground.element,
    //   });

    //   // To add the marker to the map, call setMap()
    //   marker.setMap(map.current);

    //   // To add the marker to the markers Ref so it can be used dynamically
    //   markers.current.push(marker);
    // });

    // Add circle
    const circleCenter = search.request.location;
    const circleRadius = search.request.radius;
    const mapCircle = map.current;

    circle.current = new google.maps.Circle({
      strokeColor: "#4C04A9",
      strokeOpacity: 1,
      strokeWeight: 2,
      // fillColor: "#FF0000",
      fillOpacity: 0,
      mapCircle,
      center: circleCenter,
      radius: circleRadius,
    });
    // circle.current.setMap(mapCircle);
    map.current.setCenter(circleCenter);
    map.current.fitBounds(circle.current.getBounds()); // fit map to bounds of the circle

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

  function updateSearch() {
    const placeAutocomlete = autocomplete.current.getPlace();
    const typeSelect = locationType.current.getValue();
    let locationCenter,
      locationtype,
      locationRadius,
      locationBonds,
      locatioName,
      locationNe;

    // If search exists we don't need to grab the information
    // from the Query Params anymore.
    if (search) {
      if (typeSelect.length < 1) {
        // User didn't enter a type of location
        setSearchMessage("Please select a location type above");
        return;
      }
      // If the Autocomplete has been set grab the information from it
      // Otherwise use the previous information from the Search state
      // This will happen when the location comes from the Search Params
      // and the user searches again without slecting a new location from the autcomplete

      if (placeAutocomlete) {
        locationCenter = {
          lat: placeAutocomlete.geometry.location.lat(),
          lng: placeAutocomlete.geometry.location.lng(),
        };
        locationNe = {
          lat: placeAutocomlete.geometry.viewport.getNorthEast().lat(),
          lng: placeAutocomlete.geometry.viewport.getNorthEast().lng(),
        };
        locatioName = placeAutocomlete.name;
      } else {
        locationCenter = search.request.location;
        locatioName = search.locatioName;
        locationNe = search.ne;
      }
      // Set radius. Either from the Radius Select or
      // from the bounds coming from the Autocomplete
      console.log("radius calc", locationCenter, locationNe);

      locationRadius = radiusOverwrite.current
        ? selectRadius.current.getValue()[0].value
        : boundsToRadius(locationCenter, locationNe);
      changeSelectedRadius(locationRadius);
      locationtype = locationType.current.getValue()[0].value;
      // If the search state hasn't been set up
      // we grab the information from the Query Params
    } else if (searchCenter) {
      locationCenter = searchCenter;
      locationtype = searchType;
      locationRadius = selectRadius.current.getValue()[0].value;
      locatioName = searchName;
      locationNe = searchNe;
    } else {
      setSearchMessage("Please select a location above.");
      return;
    }

    const searchObject = {
      request: {
        location: locationCenter,
        type: locationtype,
        radius: locationRadius,
        bonds: locationBonds,
      },
      locatioName: locatioName,
      ne: locationNe,
    };

    setSearch(searchObject);
  }

  // Convert Bounds to Radius
  // and rounds the radius to the options available in the Radius dropdown
  function boundsToRadius(center, ne) {
    const radius = google.maps.geometry.spherical.computeDistanceBetween(
      center,
      ne
    );
    // rounds the bounds to the closest radius
    const options = [1000, 2000, 5000, 10000, 20000, 50000]; // ideally this will grab the otions from the Select
    let closestRadius = options.reduce((prev, curr) =>
      Math.abs(curr - radius) < Math.abs(prev - radius) ? curr : prev
    );
    return closestRadius;
  }

  function changeSelectedRadius(radius) {
    const selected = radiusSelectOptions.find(
      (option) => option.value === radius
    );
    setSelectedRadius(selected);
  }

  function handleRadiusSelectChange(value) {
    setSelectedRadius(value);
    radiusOverwrite.current = true;
  }

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
            <div className="w-full lg:flex lg:flex-row">
              {/* Location search box ---- */}
              <input
                id="autocomplete"
                name="location"
                className="h-12 flex-1 rounded-full rounded-r-none border-2 border-r-0 border-purple-800 px-6 text-purple-800 placeholder:text-purple-800"
                type="text"
                placeholder="Location"
                defaultValue={searchName}
              />
              {/* Type search box ---- */}
              <Select
                unstyled
                instanceId="typeselect"
                placeholder="Type"
                classNames={{
                  container: () => "h-12 flex-1",
                  control: () =>
                    "h-12 px-6 border-2 border-r-0 border-purple-800 bg-white",
                  placeholder: () => "text-purple-800",
                  dropdownIndicator: () => "text-purple-800",
                  menu: () => "bg-white py-3 shadow-md",
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
                className="flex h-12 w-20 flex-none cursor-pointer place-content-center content-center items-center rounded-full rounded-l-none border-2 border-purple-800 bg-purple-800"
                onClick={updateSearch}
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
                  control: () => "px-3",
                  placeholder: () => "text-purple-800",
                  dropdownIndicator: () => "text-purple-800",
                  menu: () => "bg-white py-3 shadow-md",
                  option: (state) =>
                    state.isFocused
                      ? "bg-purple-100 text-purple-800 py-2 px-3"
                      : "text-purple-800 bg-white py-2 px-3",
                  singleValue: () => "text-purple-800",
                }}
                options={radiusSelectOptions}
                // defaultValue={{ value: 1000, label: "1 km" }}
                value={selectedRadius}
                onChange={handleRadiusSelectChange}
                ref={selectRadius}
              />
              {/* </div> */}
            </div>
            <div>
              {/* Search summary ---- */}
              <p className="pb-6 text-beige-900">{searchMessage}</p>
              <div className="grid grid-cols-3 gap-6 after:flex-auto after:content-['']">
                {ResultCards}
              </div>
            </div>
          </div>
          <div className="col h-full w-2/5 px-0">
            <div className="h-full w-full" id="map"></div>
            {resultList &&
              resultList.map((item, index) => {
                return (
                  <CustomMarker
                    key={index}
                    index={index}
                    item={item}
                    map={map.current}
                  ></CustomMarker>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomMarker({ index, item, map, children }) {
  const markersRef = useRef([]);
  const rootRef = useRef();

  const markerDiv = (
    <div className="group relative transition-transform hover:z-50 hover:scale-110">
      <div className="absolute -top-3/4 left-1/2 hidden -translate-x-1/2 rounded-full bg-white p-2 group-hover:block">
        <p className="max-w-[10rem] truncate whitespace-nowrap">{`${
          index + 1
        }. ${item.name}`}</p>
      </div>
      <p className="absolute inset-x-0 top-1 text-center font-sans text-xs text-beige-50">
        {index + 1}
      </p>
      <img className="" src={pinIcon.src} />
    </div>
  );

  useEffect(() => {
    const container = document.createElement("div");
    rootRef.current = createRoot(container);

    // Create an info window to share between markers.
    // const infoWindow = new google.maps.InfoWindow();

    const marker = new google.maps.marker.AdvancedMarkerElement({
      position: {
        lat: item.geometry.location.lat(),
        lng: item.geometry.location.lng(),
      },
      map,
      content: container,
    });

    rootRef.current.render(markerDiv);

    // The event listener is necessary to make the markers interactable
    // Little hack but without it the markers won't respond to mouse events
    marker.addListener("click", () => {
      // infoWindow.close();
      // const content = `${index}. ${item.name}`;
      // infoWindow.setContent(content);
      // infoWindow.open(marker.map, marker);
    });

    // Add to the array so it can be cleaned later
    markersRef.current.push(marker);

    return () => {
      clearMarkers();
    };
  }, [item]);

  function clearMarkers() {
    for (let i = 0; i < markersRef.current.length; i++) {
      markersRef.current[i].setMap(null);
    }
    markersRef.current = [];
  }

  return null;
}
