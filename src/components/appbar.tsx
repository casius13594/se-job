"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import "./component.css";
import classnames from "classnames";
import { Button, ThemePanel } from "@radix-ui/themes";
import { IoIosNotifications, IoMdHome, IoMdDocument } from "react-icons/io";
import { useState } from "react";

const AppBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const currentPath = usePathname();
  console.log(currentPath);
  const links = [
    // put property in here.
    { href: "/auth/login", icon: <IoMdHome />, name: "Home" },
    { href: "/auth/login", icon: <IoMdDocument />, name: "Documents" },
    {
      href: "/auth/login",
      icon: <IoIosNotifications />,
      name: "Notifications",
    },
  ];
  const handleSearchInputChange = (value: string) => {
    setSearchInput(value);
    const path_jobapplied = '/jobapplied'
    // Check if the current path matches the target path
    if(currentPath)
    {
      const isCurrentPath = currentPath === path_jobapplied;
      if(isCurrentPath)
      {
        localStorage.setItem('search_jobapplied', value)
      }else{
        localStorage.setItem('search_jobapplied', '')
      }
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log(searchInput);
    }
  };
  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440p] mx-auto flex justify-between items-center px-6 py-2">
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/logo.svg"
            alt="Jelp logo"
            width="100"
            height="100"
            className="object-contain"
          />
        </Link>
        <div className="relative w-1/2">
          <input
            className=" bg-[#d9d9d9] pl-10 rounded-lg h-[5vh] w-full"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => handleSearchInputChange(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
            <Image src="search.svg" alt="search" width={20} height={20} />
          </span>
        </div>
        <ul className="flex space-x-6">
          {links.map((link) => (
            <Link
              key={link.href}
              className={classnames({
                "text-zinc-900": link.href === currentPath,
                "text-zinc-500": link.href !== currentPath,
                "hover:text-zinc-800 transition-colors": true,
                "flex flex-col items-center text-center": true, // Added flex styles for centering
              })}
              href={link.href}
            >
              <Button className="circle-button">
                {link.icon} {/* Use the icon React component here */}
              </Button>
              <p className="link-name font-sans text-sm">{link.name}</p>
            </Link>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default AppBar;
