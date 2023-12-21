'use client';
import React from 'react'
import './component.css'
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from "next/navigation";
import './component.css'
import classnames from 'classnames';
import { Button, ThemePanel } from "@radix-ui/themes"
import { IoIosNotifications, IoMdHome, IoMdDocument } from "react-icons/io";
import { FiEdit3 } from "react-icons/fi";

import Link from 'next/link';
import { Tab } from '@headlessui/react';
import ExampleTab from './Tab';

const Profilepage = () => {
  const currentPath = usePathname();
  console.log(currentPath);
  const links = [
  // put property in here.
  { href: '/auth/login', icon: <IoMdHome />,name: 'Home' },
  { href: '/auth/login', icon: <IoMdDocument  />,name: 'Documents' },
  { href: '/auth/login', icon: <IoIosNotifications />,name: 'Notifications' },
  ];

  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode((prevEditMode) => !prevEditMode);
  };

  return (
    <>
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
  
    <div id='parent' className='profilepage'>
    <div className="profilebg-container" >
       <div className='circle-button2 ml-auto mr-2 translate-y-2'>
                <button onClick={toggleEditMode}>
                  {isEditMode ? 'Save' : <FiEdit3/>}
                </button>
            </div>
    </div>
    <div className='flex -translate-y-10'> 
        <img src="/logo.svg" className='placeholder-image'/> 
        <div className='ml-5 w-full'>
              <div className="text-3xl font-bold">
              Company name
              
            </div>
            <div> 
              {isEditMode ? (
                <textarea className='w-1/2 mt-2' placeholder="Welcome to our main page !" />
              ) : (
                'Welcome to our main page !'
              )}
            </div>

            <div className='flex opacity-50'>  
                <div className='mt-2'> •Industry</div>
                <div className='mt-2'>• Location</div>
            </div>
          </div>
        </div>
        <div className='-translate-y-8 ml-8'>
        <ExampleTab></ExampleTab>
        </div>
    </div>
    </>
  )
}

export default Profilepage