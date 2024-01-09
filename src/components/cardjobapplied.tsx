"use client";
import { UUID } from "crypto";
import React, { useState } from "react";
import { ApplicationView } from "./Info_Application/infoapply";

export interface Jobapplied {
  job_id: UUID;
  name: string;
  employer_name: string;
  location: string;
  type: string;
  post_time: string;
  tag: string;
  employer_logo: string;
  time_date_post: Date;
}

const CardApplied: React.FC<
  Jobapplied & { onViewClick: (job_id: string) => void }
> = ({
  job_id,
  name,
  employer_name,
  location,
  type,
  post_time,
  tag,
  employer_logo,
  onViewClick,
}) => {
  const check_applied = tag === "Applied";
  const button_app = check_applied ? "View response" : "Apply now";

  const handleButtonClick = () => {
    if (button_app === "Apply now") {
      localStorage.setItem("job_id", job_id as string);
      window.location.href = "/jobdetail";
    }
    if (button_app === "View response") {
      onViewClick(job_id as string);
    }
  };

  return (
    <div className="flex flex-row border-2 border-black w-full max-h-80 py-2 mt-1 rounded-md mb-10">
      <div className="flex w-1/5 mx-1 rounded-full overflow-hidden items-center justify-center">
        <img
           style={{ borderRadius: "50%", aspectRatio: "1/1" }}
          src={employer_logo ? employer_logo : "/logo.svg"}
          alt=""
        />
      </div>
      <div className="flex flex-col justify-between w-3/5 ml-4">
        <h1 className="text-xl font-bold">{name}</h1>
        <h1 className="text-base">{employer_name}</h1>
        <h1 className="text-base">
          {location} ({type})
        </h1>
        <h2 className="text-xs">{post_time}</h2>
      </div>
      <div className="flex flex-col justify-between w-2/5 items-end">
        <div className="text-center  rounded-full bg-gray-400 m-[1vh] px-[1vw] text-white">
          {tag}
        </div>
        <button
          className="text-center bg-[#3e736e] hover:bg-[#13544E] rounded-full w-6/7 m-[1vh] px-[3vw]"
          onClick={handleButtonClick}
        >
          <h1 className="font-bold text-lg text-[#d9d9d9]"> {button_app}</h1>
        </button>
      </div>
    </div>
  );
};

export default CardApplied;
