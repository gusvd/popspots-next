import stars from "../../public/star.svg";
import reviews from "../../public/reviews.svg";

export default function ResultCard(props) {
  return (
    <>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${props.address}&query_place_id=${props.placeID}`}
        target="_blank"
      >
        {/* <a
        href={"https://www.google.com/maps/place/?q=place_id:" + props.placeID}
        target="_blank"
      > */}
        <div className="group flex flex-col gap-3 rounded-2xl p-4 text-sm text-beige-900 transition-colors hover:cursor-pointer hover:bg-beige-100">
          {props.image && <img src={props.image} alt="Cover Image" />}
          <h3 className="text line-clamp-3 text-base font-semibold text-purple-800">
            <span className="text-sm font-normal">{props.index + 1} - </span>
            <span className="group-hover:underline">{props.name}</span>
          </h3>
          {props.totalreviews ? (
            <div className="flex">
              <div className="mr-4 flex">
                <img className="mr-2" src={reviews.src} alt="Total reviews" />
                <p>{props.totalreviews}</p>
              </div>
              <div className="flex">
                <img className="mr-1" src={stars.src} alt="Star rating" />
                <p>{props.ratings}</p>
              </div>
            </div>
          ) : (
            <div className="mr-4 flex">
              <img className="mr-1" src={stars.src} alt="Total reviews" />
              <p className="text-xs   opacity-30">No reviews</p>
            </div>
          )}
          <p className="text-xs">{props.address}</p>
        </div>
      </a>
    </>
  );
}
