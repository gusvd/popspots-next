import "./globals.css";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Find popular places near you. Or anywhere else - PopSpots",
  description: "Find the most popular places near you. Or anywhere else",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} bg-beige-50`}>{children}</body>
    </html>
  );
}
