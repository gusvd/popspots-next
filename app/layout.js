import "./globals.css";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-DMSans",
});

export const metadata = {
  title: {
    template: "%s | PopSpots",
    default: "Find popular places near you. Or anywhere else.",
  },
  description: "Find the most popular places near you. Or anywhere els.",
  keywords:
    "places, location, travel, hotspots, near me, popular, maps, restaurants, hotels, attractions, galleries, bars, cafes, gyms, night clubs, parks",
  metadataBase: new URL("https://popspots.com"),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} bg-beige-50 font-sans text-beige-950`}
      >
        {children}
      </body>
    </html>
  );
}
