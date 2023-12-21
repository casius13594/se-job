'use client'

import Link from "next/link";
import React from "react";
import Image from 'next/image';
import { usePathname } from "next/navigation";
import './component.css'
import classnames from 'classnames';
import { Button, ThemePanel } from "@radix-ui/themes"
import { IoIosNotifications, IoMdHome, IoMdDocument   } from "react-icons/io";
const AppBar2 = () => {
    const currentPath = usePathname();
    console.log(currentPath);
    const links = [
    // put property in here.
    { href: '/auth/login', icon: <IoMdHome />,name: 'Home' },
    { href: '/auth/login', icon: <IoMdDocument  />,name: 'Documents' },
    { href: '/auth/login', icon: <IoIosNotifications />,name: 'Notifications' },
    ];
    return (
            <header className="w-full z-10">
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
        
                <ul className='flex space-x-6'>
                {links.map((link) => (
                  <Link
                    key={link.href}
                    className={classnames({
                      'text-zinc-900': link.href === currentPath,
                      'text-zinc-500': link.href !== currentPath,
                      'hover:text-zinc-800 transition-colors': true,
                      'flex flex-col items-center text-center': true, // Added flex styles for centering
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
}

export default AppBar2;