"use client";
import { Navbar } from "@/app/(content)/hero";
import Appbar from "@/components/appbar";
import "./globals.css";
import { usePathname } from "next/navigation";

// export const metadata = {
//   title: "Jelp",
//   description: "The best recruitment website you can find",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentPath = usePathname();
  const pathsToHideAppbar = ["/postjob", "/selection"];
  return (
    <html lang="en">
      <body className="relative">
        {currentPath === "/" ? (
          <div className="sticky top-0 z-50">
            <Navbar />
          </div>
        ) : pathsToHideAppbar.includes(currentPath) ||
          currentPath.startsWith("/auth") ? null : (
          <div className="sticky top-0 z-50">
            <Appbar />
          </div>
        )}
        {children}
      </body>
    </html>
  );
}
