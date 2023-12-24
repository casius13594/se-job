"use client";
import React from "react";
import "./component.css";
import Image from "next/image";
import { useState } from "react";

import "./component.css";
import { FiEdit3 } from "react-icons/fi";
import ExampleTab from "./Tab";
import AppBar from "./appbar";

interface ProfilepageProps {
  companyName: string;
  location: string;
  industry: string;
  introduction: string;
  logo: string; // Add the logo prop
  size: string;
}

const solutions = [
  {
    name: "Post Job",
    description: "Measure actions your users take",
    href: "/postjob",
    icon: IconOne,
  },
  {
    name: " HR Management",
    description: "Create your own targeted content",
    href: "/company/hrmanagement",
    icon: IconTwo,
  },
  {
    name: "Reports",
    description: "Keep track of your growth",
    href: "##",
    icon: IconThree,
  },
];

const Profilepage: React.FC<ProfilepageProps> = ({
  companyName,
  location,
  industry,
  introduction,
  logo,
  size,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode((prevEditMode) => !prevEditMode);
  };

  return (
    <>
      <AppBar profile_img={logo} name={companyName}></AppBar>
      <div id="parent" className="profilepage z-0">
        <div className="flex w-full">
          <div className="w-2/3">
            <div className="profilebg-container">
              <div className="circle-button2 ml-auto mr-2 translate-y-2">
                <button onClick={toggleEditMode}>
                  {isEditMode ? "Save" : <FiEdit3 />}
                </button>
              </div>
            </div>
            <div className="flex">
              <img src={logo} className="placeholder-image  -translate-y-10" />
              <div className="ml-5 w-full">
                <div className="text-3xl font-bold">{companyName}</div>
                <div>
                  {isEditMode ? (
                    <textarea
                      className="w-1/2 mt-2"
                      placeholder="Welcome to our main page !"
                    />
                  ) : (
                    introduction
                  )}
                </div>
                <div className="flex opacity-50 mt-2">
                  <div className="">• {industry} </div>
                  <div className="ml-2">• {location}</div>
                  <div className="ml-2 ">• {size} employees</div>
                </div>
              </div>
            </div>
            <div className="ml-8">
              <ExampleTab></ExampleTab>
            </div>
          </div>

          <div className="ml-11 z-0">
            <div className="font-sans font-bold">Utilities</div>
            <div>
              <button className=" w-full origin-top-right rounded-md bg-stone-300 focus:outline-none hover:bg-green hover:text-gray-50 flex">
                <div className="relative grid gap-8 bg-white p-7">
                  {solutions.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-3 flex rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-300 hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                    >
                      <div className="flex h-10 w-10 shrink-0 sm:h-12 sm:w-12">
                        <item.icon aria-hidden="true" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function IconOne() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  );
}
function IconTwo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconThree() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
      <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
      <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
      <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
      <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
      <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
    </svg>
  );
}

export default Profilepage;
