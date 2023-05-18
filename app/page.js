import SearchForm from "./components/search";
import MapComponent from "./components/map";

import PopSpotsLogo from "../public/popspots-logo.svg";

let search = null;

export default function HomePage() {
  return (
    <div className="App">
      <div className="container h-[46rem] max-w-7xl px-0">
        <div className="row mx-0 flex h-full">
          <div className="col w-3/5 px-20 py-16 lg:flex lg:flex-col lg:gap-y-12">
            <img className="w-28" src={PopSpotsLogo.src} />
            <div>
              <h1 className="text-5xl leading-tight font-semibold">
                Find the most popular places near you.
                <br />
                Or anywhere else.
              </h1>
              <p className="mt-4 text-lg font-normal">
                Popular places are not always the best. <br />
                But the best places are naturally more popular.
              </p>
            </div>
            <div className="lg:flex lg:flex-col lg:max-w-sm lg:gap-y-4">
              {/* Search form component */}
              <SearchForm />
            </div>
          </div>
          <div className="col h-full w-2/5 px-0">
            <MapComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
