import "./globals.css";
import SmoothScroll from "./components/ui/SmoothScroll"; // Import this
import CustomCursor from "./components/ui/CustomCursor";
import Preloader from "./components/ui/Preloader";
import { CommandMenu } from "./components/ui/CommandMenu";

export const metadata = {
  title: "Rachit — Web Developer",
  description: "I build fast, premium websites.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0b0f14]">
        <CommandMenu />
        {/* Wrap everything inside SmoothScroll */}
        <CustomCursor />
        <Preloader/>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}