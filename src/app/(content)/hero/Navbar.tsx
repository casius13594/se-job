"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import the useRouter
import Image from "next/image";
import CustomButton from "./CustomButton";

// ...

interface NavbarProps {
  scrollToBottom: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrollToBottom }) => {
  const pathname = usePathname(); // Initialize the router
  // Check if the current route is the main page (index)
  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null; // If not the main page, don't render the navbar
  }

  return (
    <header className="w-full absolute z-7 bg-white">
      <nav className="max-w-[1440p] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/logo.svg"
            alt="Jelp logo"
            width="100"
            height="100"
            className="object-contain"
          />
        </Link>

        <div className="flex justify-center items-center space-x-3">
          <CustomButton
            title="Home"
            btnType="button"
            containerStyles="text-black-100 rounded-full bg-white hover:bg-grey"
          />

          <Link href="/joblist">
            <CustomButton
              title="Jobs"
              btnType="button"
              containerStyles="text-black-100 rounded-full bg-white hover:bg-grey"
            />
          </Link>

          <CustomButton
            title="Contact"
            btnType="button"
            containerStyles="text-black-100 rounded-full bg-white hover:bg-grey"
            handleClick={scrollToBottom}
          />
          <Link href="/auth/register">
            <CustomButton
              title="Register Now"
              btnType="button"
              containerStyles="text-white rounded-full bg-green min-w-[261px]"
            />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
