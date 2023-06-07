import Link from "next/link";
import PopSpotsLogo from "../../public/popspots-logo.svg";
import BirdIcon from "../../public/bird-icon.svg";

const LogoHeader = () => {
  return (
    <div className="flex flex-row justify-between">
      <Link href={"/"}>
        <img className="w-32" src={PopSpotsLogo.src} />
      </Link>
      <Link
        href={"https://twitter.com/GusvDias"}
        target="_blank"
        className="felx-row flex items-center gap-1 rounded-full bg-beige-100 px-4 py-2 text-xs text-purple-900 transition-colors hover:bg-beige-200"
      >
        <img className="h-3" src={BirdIcon.src} />
        @gusvdias
      </Link>
    </div>
  );
};

export default LogoHeader;
