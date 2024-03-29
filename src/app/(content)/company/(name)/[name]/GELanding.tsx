"use client";
import { takesameIdus } from "@/components/controller";
import React, { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";

interface GELandingProps {
  id: string;
  companyName: string;
  location: string;
  industry: string;
  introduction: string;
  logo: string; // Add the logo prop
  size: string;
}

const GELanding: React.FC<GELandingProps> = ({
  id,
  companyName,
  location,
  industry,
  introduction,
  logo,
  size,
}) => {
  const [relatedCompany, setrelatedCompany] = useState<any[]>([]);
  useEffect(() => {
    // Call the takeIndustry function and set the state with the result
    const fetchData = async () => {
      const result = await takesameIdus(industry, companyName);
      if (result !== null) {
        setrelatedCompany(result);
      }
    };
    fetchData();
  }, []);

  console.log(relatedCompany);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div id="parent" className="profilepage z-0">
        <div className="flex w-full">
          <div className="w-2/3">
            <div className="profilebg-container"></div>
            <div className="flex">
              <img
                src={logo || "/logo.svg"}
                className="placeholder-image  -translate-y-10"
                alt=""
              />
              <div className="ml-5 w-full">
                <div className="text-3xl font-bold">{companyName}</div>
                <div>
                  <h1 style={{ maxHeight: isExpanded ? 'none' : '60px', overflow: 'hidden' }} className="text-sm">
        {introduction}
      </h1>
      { introduction.length > 60 && (
        <button onClick={toggleExpand} className="font-bold">
          {isExpanded ? 'Minimize' : 'Know more'}
        </button>
      )}
    </div>
                <div className="flex opacity-50 mt-2 text-sm">
              
                  <div className="">• {industry} </div>
                  <div className="ml-2">• {location}</div>
                  <div className="ml-2 ">• {size} employees</div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/3 ">
            <div className="text-center font-bold mb-3">
              {" "}
              People also interest{" "}
            </div>
            {relatedCompany.map((company, index) => (
              <div
                key={index}
                className="mx-auto flex flex-row border-2 border-slate-300 w-3/4 max-h-20 py-1 rounded-md shadow-md hover:bg-[#D9D9D9] mb-2"
              >
                <div className="flex w-3/12 mx-[0.01vw] rounded-full overflow-hidden items-center justify-center">
                  <img
                    className="h-3/4 rounded-full object-fit no-drag"
                    style={{ borderRadius: "50%", aspectRatio: "1/1" }}
                    src={company.logo} // Assuming each company object has a 'logo' property
                    alt=""
                  />
                </div>
                <div className="flex flex-col justify-between w-9/12">
                  <h1 className="text-base font-bold hover:underline cursor-pointer">
                    <Link
                      href={`/${company.url}`}
                      prefetch={false}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {company.name}
                    </Link>
                  </h1>{" "}
                  {/* Assuming each company object has a 'name' property */}
                  <h1 className="text-xs">{company.description}</h1>{" "}
                  {/* Assuming each company object has a 'description' property */}
                  <h2 className="text-xs">{company.size} People</h2>{" "}
                  {/* Assuming each company object has a 'size' property */}
                </div>
              </div>
            ))}
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

export default GELanding;
