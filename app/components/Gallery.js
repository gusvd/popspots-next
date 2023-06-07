"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import categories from "../../public/categoriesGallery";
import arrowRight from "../../public/arrow-right.svg";
import citiesList from "../../public/featuredCities";
import icon from "../../public/popspots-icon.svg";

const Gallery = () => {
  const sliderRef = useRef();
  const [slidePosition, setSlidePosition] = useState("left");
  const [selected, setSelected] = useState(0);

  function slideLeft() {
    const step = 200;
    const slider = sliderRef.current;
    slider.scrollLeft = slider.scrollLeft - step;
    if (slider.scrollLeft - step <= 0) {
      setSlidePosition("left");
    } else {
      setSlidePosition(null);
    }
  }

  function slideRight() {
    const step = 200;
    const slider = sliderRef.current;
    slider.scrollLeft = slider.scrollLeft + step;

    if (slider.offsetWidth + slider.scrollLeft + step >= slider.scrollWidth) {
      setSlidePosition("right");
    } else {
      setSlidePosition(null);
    }
  }

  function selectCategory(index) {
    setSelected(index);
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-14 p-16">
      <div className="relative">
        <div
          className={`absolute left-0 top-0 flex h-full cursor-pointer items-center bg-gradient-to-r from-beige-50 to-beige-50/0 pr-8 ${
            slidePosition === "left" && "hidden"
          }`}
          onClick={slideLeft}
        >
          <div className="transition-color flex h-7 w-7 items-center justify-center rounded-full  bg-beige-300 hover:bg-beige-400">
            <img className="h-3 rotate-180" src={arrowRight.src} />
          </div>
        </div>
        <ul
          ref={sliderRef}
          className="no-scrollbar flex flex-row gap-6 overflow-x-scroll scroll-smooth whitespace-nowrap text-base"
        >
          <CategoriesMenu selectCategory={selectCategory} selected={selected} />
        </ul>
        <div
          className={`absolute right-0 top-0 flex h-full cursor-pointer items-center bg-gradient-to-r from-beige-50/0 to-beige-50 pl-8 ${
            slidePosition === "right" && "hidden"
          }`}
          onClick={slideRight}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-beige-300 transition-colors hover:bg-beige-400">
            <img className="h-3" src={arrowRight.src} />
          </div>
        </div>
      </div>
      <div className="grid w-full grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
        <FeaturedCities typeIndex={selected} categories={categories} />
      </div>
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <h2 className="text-4xl font-semibold text-purple-800 md:text-5xl">
          What's PopSpots?
        </h2>
        <p>
          PopSpots is a handy service that assists you in discovering the
          hottest spots, categorized by type, whether you're nearby or anywhere
          across the globe.
        </p>
        <p>
          Next time you're out exploring a new city or neighborhood, you can
          effortlessly locate the perfect spot to satisfy your cravings, enjoy a
          good cup of coffee, or explore must-visit galleries and attractions.
        </p>
        <p>
          PopSpots is also great for finding reliable services in your area,
          such as beauty salons, locksmiths, and bike repair shops. In most
          cases, the more popular places tend to be the most active and trusted
          ones.
        </p>
        <img className="h-14" src={icon.src} />
        <p className="mt-16 text-purple-800">
          A gift to the internet by @gusvdias
        </p>
      </div>
    </div>
  );
};

const CategoriesMenu = ({ selectCategory, selected }) => {
  return categories.map((category, index) => {
    return (
      <li
        key={index}
        className={`flex cursor-pointer flex-col items-center gap-1 rounded-2xl bg-beige-100 px-4 py-4 transition-colors hover:bg-beige-300
        ${selected === index && "bg-beige-300"}
        `}
        onClick={() => selectCategory(index)}
      >
        <img className="h-7 md:h-10" src={category.icon} />
        {category.name}
      </li>
    );
  });
};

const FeaturedCities = ({ typeIndex, categories }) => {
  return citiesList.map((city, index) => {
    return (
      // QUERY: `?placeName=${placeName}&locationType=${type}&center=${center}&bounds=${bounds}&ne=${ne}&isGeolocation=${isGeolocation}`;
      <Link
        href={`results/?placeName=${city.name}&locationType=${
          categories[typeIndex].value
        }&center=${JSON.stringify(city.center)}&bounds=${JSON.stringify(
          city.bounds
        )}&ne=${JSON.stringify(city.ne)}`}
        className="group h-full"
        key={index}
      >
        <div className="h-24 overflow-hidden rounded-2xl md:h-32">
          <img
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            src={city.image}
          />
        </div>
        <p className="mt-3 text-purple-800 group-hover:underline">
          {city.name}
        </p>
      </Link>
    );
  });
};

export default Gallery;
