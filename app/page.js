import SearchForm from "./components/Search";
import MapComponent from "./components/Map";
import Gallery from "./components/Gallery";
import LogoHeader from "./components/LogoHeader";

import RestaurantsImg from "../public/restaurants.jpg";
import HotelsImg from "../public/hotel.jpg";

let search = null; // Maybe remove

export default function HomePage() {
  return (
    <div className="App">
      <div className="mx-auto flex h-full max-w-7xl bg-gradient-to-t from-beige-100 to-beige-50">
        {/* Left column */}
        <div className="flex flex-col gap-y-16 px-6 py-16 md:w-3/5 md:px-20">
          <LogoHeader />
          <div>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl md:leading-tight">
              Find the most{" "}
              <span className="bg-gradient-to-t from-purple-900 to-purple-300 bg-clip-text text-transparent">
                popular places
              </span>{" "}
              near you. Or anywhere else.
            </h1>
            <p className="mt-4 text-base font-normal md:text-lg">
              Popular places are not always the best. <br />
              But the best places are naturally more popular.
            </p>
          </div>
          <div className="flex flex-col gap-y-4 md:max-w-sm">
            {/* Search form component */}
            <SearchForm />
          </div>
        </div>
        <div className="relative hidden w-2/5 px-0 md:block">
          <MapComponent />
          <div className="absolute  top-0 h-full w-full bg-beige-200 mix-blend-hue"></div>
          <div className="absolute top-0 flex h-full w-full flex-col justify-between p-20">
            <div className="relative w-40 grow-0 rounded-2xl bg-purple-800 p-2 text-beige-50">
              <img
                className="h-20 w-full rounded-xl"
                src={RestaurantsImg.src}
              />
              <div className="absolute -bottom-4 right-8 h-4 w-4 origin-top-left -rotate-45 transform bg-purple-800"></div>
              <p className="mt-2 w-full text-center">Restaurants</p>
            </div>
            <div className="relative w-40 grow-0 self-end rounded-full bg-purple-800 p-2 text-beige-50">
              <div className="absolute -bottom-4 right-8 h-4 w-4 origin-top-left -rotate-45 transform bg-purple-800"></div>
              <p className="w-full text-center">Pet Shops</p>
            </div>
            <div className="relative w-40 grow-0 self-center rounded-2xl bg-purple-800 p-2 text-beige-50">
              <img className="h-20 w-full rounded-xl" src={HotelsImg.src} />
              <div className="absolute -bottom-4 right-8 h-4 w-4 origin-top-left -rotate-45 transform bg-purple-800"></div>
              <p className="mt-2 w-full text-center">Hotels</p>
            </div>
            <div className="relative w-40 grow-0 rounded-full bg-purple-800 p-2 text-beige-50">
              <div className="absolute -bottom-4 right-8 h-4 w-4 origin-top-left -rotate-45 transform bg-purple-800"></div>
              <p className="w-full text-center">Attractions</p>
            </div>
          </div>
        </div>
      </div>
      <Gallery />
    </div>
  );
}
