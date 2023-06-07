import tokyo from "./tokyo.jpg";
import london from "./london.jpg";
import newyork from "./newyork.jpg";
import singapore from "./singapore.jpg";
import paris from "./paris.jpg";
import istanbul from "./istanbul.jpg";
import rome from "./rome.jpg";
import losangeles from "./losangeles.jpg";
import delhi from "./delhi.jpg";
import osaka from "./osaka.jpg";
import bali from "./bali.jpg";
import bangkok from "./bangkok.jpg";
import seoul from "./seoul.jpg";
import hongkong from "./hongkong.jpg";
import barcelona from "./barcelona.jpg";
import sydney from "./sydney.jpg";
import berlin from "./berlin.jpg";
import milan from "./milan.jpg";
import lisbon from "./lisbon.jpg";
import amsterdam from "./amsterdam.jpg";
import dubai from "./dubai.jpg";
import cairo from "./cairo.jpg";
import toronto from "./toronto.jpg";
import saopaulo from "./saopaulo.jpg";

// const query = `?placeName=${placeName}&locationType=${type}&center=${center}&bounds=${bounds}&ne=${ne}&isGeolocation=${isGeolocation}`;
// router.push(`/results${query}`);

export default [
  {
    name: "Tokyo",
    image: tokyo.src,
    center: { lat: 35.6761919, lng: 139.6503106 },
    bounds: {
      south: 34.5776326,
      west: 138.2991098,
      north: 36.4408483,
      east: 141.2405144,
    },
    ne: { lat: 36.4408483, lng: 141.2405144 },
  },
  {
    name: "London",
    image: london.src,
    center: {
      lat: 51.5072178,
      lng: -0.1275862,
    },
    bounds: {
      south: 51.38494012429096,
      west: -0.3514683384218145,
      north: 51.67234324898703,
      east: 0.1482710335611201,
    },
    ne: {
      lat: 51.67234324898703,
      lng: 0.1482710335611201,
    },
  },
  {
    name: "New York",
    image: newyork.src,
    center: {
      lat: 40.7127753,
      lng: -74.0059728,
    },
    bounds: {
      south: 40.47739906045452,
      west: -74.25908991427882,
      north: 40.91757705070789,
      east: -73.70027206817629,
    },
    ne: {
      lat: 40.91757705070789,
      lng: -73.70027206817629,
    },
  },
  {
    name: "Singapore",
    image: singapore.src,
    center: {
      lat: 1.352083,
      lng: 103.819836,
    },
    bounds: {
      south: 1.149599959992529,
      west: 103.5940000228498,
      north: 1.478400052327221,
      east: 104.0945000859547,
    },
    ne: {
      lat: 1.478400052327221,
      lng: 104.0945000859547,
    },
  },
  {
    name: "Paris",
    image: paris.src,
    center: {
      lat: 48.856614,
      lng: 2.3522219,
    },
    bounds: {
      south: 48.81556220872687,
      west: 2.224219054341255,
      north: 48.90214747577797,
      east: 2.469850925555473,
    },
    ne: {
      lat: 48.90214747577797,
      lng: 2.469850925555473,
    },
  },
  {
    name: "Istanbul",
    image: istanbul.src,
    center: {
      lat: 41.0082376,
      lng: 28.9783589,
    },
    bounds: {
      south: 40.81140395097502,
      west: 28.59555403926175,
      north: 41.19923904591783,
      east: 29.42880493071649,
    },
    ne: {
      lat: 41.19923904591783,
      lng: 29.42880493071649,
    },
  },
  {
    name: "Rome",
    image: rome.src,
    center: {
      lat: 41.9027835,
      lng: 12.4963655,
    },
    bounds: {
      south: 41.76959604595655,
      west: 12.34170704408109,
      north: 42.05054624539585,
      east: 12.73028878823088,
    },
    ne: {
      lat: 42.05054624539585,
      lng: 12.73028878823088,
    },
  },
  {
    name: "Los Angeles",
    image: losangeles.src,
    center: {
      lat: 34.0522342,
      lng: -118.2436849,
    },
    bounds: {
      south: 33.70365193147634,
      west: -118.6681759484859,
      north: 34.33730608759191,
      east: -118.155289077463,
    },
    ne: {
      lat: 34.33730608759191,
      lng: -118.155289077463,
    },
  },
  {
    name: "Delhi",
    image: delhi.src,
    center: {
      lat: 28.7040592,
      lng: 77.10249019999999,
    },
    bounds: {
      south: 28.40466749911707,
      west: 76.83889206854818,
      north: 28.88349965721584,
      east: 77.34757038508486,
    },
    ne: {
      lat: 28.88349965721584,
      lng: 77.34757038508486,
    },
  },
  {
    name: "Osaka",
    image: osaka.src,
    center: {
      lat: 34.6937249,
      lng: 135.5022535,
    },
    bounds: {
      south: 34.58643723929236,
      west: 135.3729054617143,
      north: 34.76875897533456,
      east: 135.5991691752138,
    },
    ne: {
      lat: 34.76875897533456,
      lng: 135.5991691752138,
    },
  },
  {
    name: "Bali",
    image: bali.src,
    center: {
      lat: -8.4095178,
      lng: 115.188916,
    },
    bounds: {
      south: -8.849260962830986,
      west: 114.4316260102816,
      north: -8.061681832168201,
      east: 115.7115280717693,
    },
    ne: {
      lat: -8.061681832168201,
      lng: 115.7115280717693,
    },
  },
  {
    name: "Bangkok",
    image: bangkok.src,
    center: {
      lat: 13.7563309,
      lng: 100.5017651,
    },
    bounds: {
      south: 13.4940880622837,
      west: 100.3278135588086,
      north: 13.9551109646008,
      east: 100.9384080394661,
    },
    ne: {
      lat: 13.9551109646008,
      lng: 100.9384080394661,
    },
  },
  {
    name: "Seoul",
    image: seoul.src,
    center: {
      lat: 37.5518911,
      lng: 126.9917937,
    },
    bounds: {
      south: 37.42829725537645,
      west: 126.7644837308701,
      north: 37.7014549458459,
      east: 127.18379492437,
    },
    ne: {
      lat: 37.7014549458459,
      lng: 127.18379492437,
    },
  },
  {
    name: "Hong Kong",
    image: hongkong.src,
    center: {
      lat: 22.3193039,
      lng: 114.1693611,
    },
    bounds: {
      south: 22.14349997657862,
      west: 113.8259000633773,
      north: 22.56194689400663,
      east: 114.4294999344625,
    },
    ne: {
      lat: 22.56194689400663,
      lng: 114.4294999344625,
    },
  },
  {
    name: "Barcelona",
    image: barcelona.src,
    center: {
      lat: 41.3873974,
      lng: 2.168568,
    },
    bounds: {
      south: 41.31703848925413,
      west: 2.052333262952554,
      north: 41.4682974272428,
      east: 2.22804492421789,
    },
    ne: {
      lat: 41.4682974272428,
      lng: 2.22804492421789,
    },
  },
  {
    name: "Sydney",
    image: sydney.src,
    center: {
      lat: -33.8688197,
      lng: 151.2092955,
    },
    bounds: {
      south: -34.11834699888443,
      west: 150.5209286026224,
      north: -33.57814094522021,
      east: 151.3430209458699,
    },
    ne: {
      lat: -33.57814094522021,
      lng: 151.3430209458699,
    },
  },
  {
    name: "Berlin",
    image: berlin.src,
    center: {
      lat: 52.52000659999999,
      lng: 13.404954,
    },
    bounds: {
      south: 52.33823404386677,
      west: 13.08834600183454,
      north: 52.67545420869131,
      east: 13.76111748460941,
    },
    ne: {
      lat: 52.67545420869131,
      lng: 13.76111748460941,
    },
  },
  {
    name: "Milan",
    image: milan.src,
    center: {
      lat: 45.4642035,
      lng: 9.189982,
    },
    bounds: {
      south: 45.38977870977718,
      west: 8.228119999999999,
      north: 45.53568898729802,
      east: 9.290346273733416,
    },
    ne: {
      lat: 45.53568898729802,
      lng: 9.290346273733416,
    },
  },
  {
    name: "Lisbon",
    image: lisbon.src,
    center: {
      lat: 38.7222524,
      lng: -9.1393366,
    },
    bounds: {
      south: 38.69139936595241,
      west: -9.229835557691242,
      north: 38.79585375475394,
      east: -9.09057091614449,
    },
    ne: {
      lat: 38.79585375475394,
      lng: -9.09057091614449,
    },
  },
  {
    name: "Amsterdam",
    image: amsterdam.src,
    center: {
      lat: 52.3675734,
      lng: 4.9041389,
    },
    bounds: {
      south: 52.27798003257395,
      west: 4.728758907897226,
      north: 52.43115725350791,
      east: 5.108020119395592,
    },
    ne: {
      lat: 52.43115725350791,
      lng: 5.108020119395592,
    },
  },
  {
    name: "Dubai",
    image: dubai.src,
    center: {
      lat: 25.2048493,
      lng: 55.2707828,
    },
    bounds: {
      south: 24.79348418590246,
      west: 54.89045432509004,
      north: 25.35856066265986,
      east: 55.56452157241026,
    },
    ne: {
      lat: 25.35856066265986,
      lng: 55.56452157241026,
    },
  },
  {
    name: "Cairo",
    image: cairo.src,
    center: {
      lat: 30.0444196,
      lng: 31.2357116,
    },
    bounds: {
      south: 30.00837453983908,
      west: 31.21495580996148,
      north: 30.11060240662524,
      east: 31.30197291049285,
    },
    ne: {
      lat: 30.11060240662524,
      lng: 31.30197291049285,
    },
  },
  {
    name: "Toronto",
    image: toronto.src,
    center: {
      lat: 43.653226,
      lng: -79.3831843,
    },
    bounds: {
      south: 43.58102453761487,
      west: -79.63921897890965,
      north: 43.85545793597914,
      east: -79.11689708040795,
    },
    ne: {
      lat: 43.85545793597914,
      lng: -79.11689708040795,
    },
  },
  {
    name: "São Paulo",
    image: saopaulo.src,
    center: {
      lat: -23.5557714,
      lng: -46.6395571,
    },
    bounds: {
      south: -24.00822091258167,
      west: -46.82551400498108,
      north: -23.35660394283147,
      east: -46.36508442078742,
    },
    ne: {
      lat: -23.35660394283147,
      lng: -46.36508442078742,
    },
  },
];
