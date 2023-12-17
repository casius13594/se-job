import Link from "next/link";
import React from "react";
import Image from 'next/image';
import Button from "./appbarbuttons";

const AppBar = () => {

    return (

            <header className="w-full absolute z-10">
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
        
                <div className="flex flex-row space-x-3">
                  <Button
                    text="Home"
                    iconSrc="/home.svg"
                  />
                  <Button
                    text="Job applied"
                    iconSrc="/home.svg"
                  />
                  <Button
                    text="Home"
                    iconSrc="/home.svg"
                  />
                </div>
              </nav>
            </header>
          );
}

export default AppBar;