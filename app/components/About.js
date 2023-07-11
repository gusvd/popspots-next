import icon from "../../public/popspots-icon.svg";

function About() {
  return (
    <div className="mx-auto mt-16 flex max-w-2xl flex-col items-center gap-6 text-center">
      <h2 className="text-4xl font-semibold text-purple-800 md:text-5xl">
        What&#039;s PopSpots?
      </h2>
      <p>
        PopSpots is a handy service that assists you in discovering the hottest
        spots, categorized by type, whether you&#039;re nearby or anywhere
        across the globe.
      </p>
      <p>
        Next time you&#039;re out exploring a new city or neighborhood, you can
        effortlessly locate the perfect spot to satisfy your cravings, enjoy a
        good cup of coffee, or explore must-visit galleries and attractions.
      </p>
      <p>
        PopSpots is also great for finding reliable services in your area, such
        as beauty salons, locksmiths, and bike repair shops. In most cases, the
        more popular places tend to be the most active and trusted ones.
      </p>
      <img className="h-14" src={icon.src} />
      <p className="mt-16 text-purple-800">
        A gift to the internet by @gusvdias
      </p>
    </div>
  );
}

export default About;
