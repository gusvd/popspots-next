import star from "../../public/star.svg";

export default function ResultCard(props) {
  return (
    <>
      <a
        // href={"https://www.google.com/maps/place/?q=place_id:" + props.placeID}
        target="_blank"
        // onMouseEnter={() => props.selectMarker(props.index)}
        // onMouseLeave={props.showAllMarkers}
      >
        <div className="group transition-colors flex flex-col p-4 gap-3 rounded-2xl hover:bg-beige-100 hover:cursor-pointer text-beige-900 text-sm">
          {props.image && <img src={props.image} alt="Cover Image" />}
          <h3 className="text text-purple-800 text-base font-semibold line-clamp-3">
            <span className="text-sm font-normal">{props.index + 1} - </span>
            <span className="group-hover:underline">{props.name}</span>
          </h3>
          {props.totalreviews ? (
            <div className="flex">
              <div className="flex mr-4">
                <img className="mr-1" src={star.src} alt="Total reviews" />
                <p>{props.totalreviews}</p>
              </div>
              <div className="flex">
                <img className="mr-1" src={star.src} alt="Star rating" />
                <p>{props.ratings}</p>
              </div>
            </div>
          ) : (
            <div className="flex mr-4">
              <img className="mr-1" src={star.src} alt="Total reviews" />
              <p className="text-xs   opacity-30">No reviews</p>
            </div>
          )}
          <p className="text-xs">{props.address}</p>
        </div>
      </a>
      {/* <p>
        {props.index + 1} - {props.name} - {props.totalreviews}
      </p>
      <p>{props.address}</p>
      <a
        href={"https://www.google.com/maps/place/?q=place_id:" + props.placeID}
        target="_blank"
      >
        Link
      </a>
      <br />
      <br /> */}
    </>
  );
}
