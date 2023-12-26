
import React, { use } from 'react'
import { getUser } from './controller'
import { useState, useEffect } from "react";
import { Button } from '@radix-ui/themes';
import Link from 'next/link';


export function UserInfo({
  isBasic, 
  content}: {
    isBasic: boolean, 
    content: React.ReactNode}) {

  const [profileImg, setProfileImg] = useState("");
  const [name, setName] = useState("");
  const defaultLogo = "https://qwiogkombegzgtlyaqsm.supabase.co/storage/v1/object/public/icon/profile.jpg";

  React.useEffect(() => {
    const fetchProfile = async () => {
      const userObject = await getUser();
      if (userObject) {
        const { data: user, isEmployee: isEmployee } = userObject;
        if (user) {
          setProfileImg(user.logo);
          setName(user.name);
          }
        }
    };
    fetchProfile();
  }, []);
  return (
    <div className = "flex flex-row w-full h-full p-5vw space-x-[1vw] divide-black">
      <div className = "flex flex-col w-[30vw] pr-2vw space-y-[2vh]">
        <div className = "containter mx-auto">
          <img className = "w-[15vw] h-[15vw] mx-auto" src = {profileImg ? profileImg : defaultLogo} />
          <div className = "text-center text-2xl font-bold">{name}</div>
        </div>
        <Link 
          className = {`flex flex-row justify-between items-center py-[1vw] pr-[2vw] pl-[1vw]`}
          href = "/basicinfo">
            <h1 className = {`text-2xl text-bold ${isBasic? "text-black" : "text-gray-500"}`}>Basic Info</h1>
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="17" viewBox="0 0 9 17" fill="none">
              <path d="M0.893555 1.23151L8.21768 8.55563L0.893555 15.8798" stroke={isBasic? "#505050" : "#AD343E"} stroke-opacity="0.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </Link>
        <Link 
          className = {`flex flex-row justify-between items-center py-[1vw] pr-[2vw] pl-[1vw]`}
          href = "/securitysettings">
            <h1 className = {`text-2xl text-bold ${isBasic? "text-gray-500" : "text-black"}`}>Security Settings</h1>
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="17" viewBox="0 0 9 17" fill="none">
              <path d="M0.893555 1.23151L8.21768 8.55563L0.893555 15.8798" stroke={isBasic? "#AD343E" : "#505050"} stroke-opacity="0.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </Link>
      </div>
      <div className = "flex flex-col h-full w-fill pr-2vw space-y-[2vh] divide-black">
        <h1 className = "text-3xl font-bold">
          {isBasic? "Basic Information" : "Security Settings"}
        </h1>
        {content}
      </div>
    </div>
  )
}