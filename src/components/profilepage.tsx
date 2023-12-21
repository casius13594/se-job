'use client';
import React from 'react'
import './component.css'
import Image from 'next/image';
import { useState } from 'react';

import './component.css'
import { FiEdit3 } from "react-icons/fi";
import ExampleTab from './Tab';
import AppBar2 from './appbaraltcompany';
import Menu_Choose from '@/app/(content)/company/(name)/[name]/menu';
import Popover_profile from '@/app/(content)/company/(name)/[name]/popover';
interface ProfilepageProps {
  companyName: string;
  location: string;
  industry: string;
  introduction: string;
  logo: string; // Add the logo prop
  size: string;
}
const Profilepage: React.FC<ProfilepageProps> = ({ companyName, location, industry, introduction,logo,size }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode((prevEditMode) => !prevEditMode);
  };

  return (
    <>
    <AppBar2></AppBar2>
    <div id='parent' className='profilepage'>
      <div className='flex'>
    <div className="profilebg-container" >
       <div className='circle-button2 ml-auto mr-2 translate-y-2'>
                <button onClick={toggleEditMode}>
                  {isEditMode ? 'Save' : <FiEdit3/>}
                </button>
            </div>
    </div>
    <div className='mx-auto'> <Popover_profile/></div>
    </div>
    <div className='flex'> 
        <img src={logo} className='placeholder-image  -translate-y-10'/> 
        <div className='ml-5 w-full'>
              <div className="text-3xl font-bold">
              {companyName}
              
            </div>
            <div> 
              {isEditMode ? (
                <textarea className='w-1/2 mt-2' placeholder="Welcome to our main page !" />
              ) : (
                introduction
              )}
            </div>
            <div className='flex opacity-50 mt-2'>  
                <div className=''>• {industry} </div>
                <div className='ml-2'>• {location}</div>
                <div className='ml-2 '>• {size} employees</div>
            </div>
          </div>
        </div>
        <div className='ml-8'>
        <ExampleTab></ExampleTab>
        </div>
    </div>
    </>
  )
}

export default Profilepage