"use client";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";

import { Loader } from "@googlemaps/js-api-loader";

import Select from "react-select";
import locationTypes from "../../public/locationTypes.js";
import SearchIcon from "../../public/icon-search.svg";

const SearchForm = () => {
  const autocomplete = useRef();
  const autocompleteInput = useRef();
  const locationType = useRef();
  const [searchMessage, setSearchMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // LOAD GOOGLE MAPS API
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
      version: "weekly",
      //   loaderOptions,
    });

    // Load Libraries
    loader.load().then(async () => {
      const { Places } = await google.maps.importLibrary("places");

      //Add Autocomplete to DOM
      const center = { lat: -34.397, lng: 150.644 };
      const input = document.getElementById("autocomplete");
      const options = {
        fields: ["geometry", "name"],
        types: ["geocode"],
      };
      autocomplete.current = new google.maps.places.Autocomplete(
        input,
        options
      );
    });
  }, []);

  function searchPlaces() {
    const location = autocomplete.current.getPlace();
    const typeInput = locationType.current.getValue();
    if (!location) {
      setSearchMessage("Please select a location above.");
      return;
    }
    if (typeInput.length < 1) {
      setSearchMessage("Please select a location type above");
      return;
    }
    const type = typeInput[0].value;
    // const lat = location.geometry.location.lat();
    // const lng = location.geometry.location.lng();
    const center = JSON.stringify(location.geometry.viewport.getCenter());
    const bounds = JSON.stringify(location.geometry.viewport);
    const placeName = autocompleteInput.current.value;
    const ne = JSON.stringify(location.geometry.viewport.getNorthEast());
    // const query = `?placeName=${placeName}&locationType=${type}&lat=${lat}&lng=${lng}&bounds=${bounds}&ne=${ne}`;
    const query = `?placeName=${placeName}&locationType=${type}&center=${center}&bounds=${bounds}&ne=${ne}`;
    router.push(`/results${query}`);
  }

  return (
    <>
      {/* Location search box ---- */}
      <input
        id="autocomplete"
        name="location"
        className="form-input h-12 grow rounded-full border-2 border-purple-800 px-6 placeholder:text-purple-800"
        type="text"
        placeholder="Location"
        ref={autocompleteInput}
      />
      {/* Type search box ---- */}
      <Select
        unstyled
        placeholder="Type"
        instanceId="autocomplete"
        classNames={{
          container: () => "h-12 grow",
          control: () =>
            "form-input h-12 grow px-6 border-2 rounded-full border-purple-800 bg-white",
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
        ref={locationType}
      />
      {/* Search button ---- */}
      <button
        onClick={searchPlaces}
        className="bg-primary flex h-12 cursor-pointer place-content-center content-center items-center gap-x-2 rounded-full border-2 border-purple-800 bg-purple-800"
      >
        <img className="h-7 items-center" src={SearchIcon.src} />
        <p className="text-white">Search</p>
      </button>
      <div>
        {/* Search summary ---- */}
        <p className="pb-6">{searchMessage}</p>
      </div>
    </>
  );
};

export default SearchForm;
