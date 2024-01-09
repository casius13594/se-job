"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllJob } from "@/components/controller";

const DealList = () => {
  const [jobs, setJobs] = React.useState<any[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobData = await getAllJob();
        // Get 10 random jobs
        const randomJobs = getRandomJobs(jobData || [], 10);
        setJobs(randomJobs);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    fetchData();
  }, []);

  const getRandomJobs = (allJobs: any[], count: number) => {
    const shuffledJobs = allJobs.sort(() => Math.random() - 0.5);
    return shuffledJobs.slice(0, count);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleScroll = (direction: String) => {
    const container = document.getElementById("cardListContainer");
    const scrollAmount = direction === "left" ? -700 : 700;
    container!!.scrollLeft += scrollAmount;
  };

  return (
    <div className="Categories relative">
      <div className="categories__header flex flex-row items-center m-10">
        <img
          src="/abstract-shape-left.svg"
          className="object-fill h-[4vw] m-5"
          alt=""
        />
        <div className="categories__header-title flex flex-row">
          <h1 className="text-[3vw] font-bold text-green">Great</h1>
          <h1 className="text-[3vw] font-bold text-red">&nbsp;deals</h1>
          <h1 className="text-[3vw] font-bold text-green">&nbsp;here</h1>
        </div>
      </div>

      <div
        className="relative w-full flex items-center px-24 mb-10"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isHovered && (
          <div className="scroll-buttons absolute left-16 top-1/2 transform -translate-y-1/2">
            <button
              className="bg-[#9292923f] hover:bg-[#929292af] px-2 py-40 rounded-l-3xl"
              onClick={() => handleScroll("left")}
            >
              {"<"}
            </button>
          </div>
        )}
        <ul id="cardListContainer" className="flex overflow-x-auto space-x-4">
          {jobs.map((job, index) => (
            <li
              key={index}
              className="card relative flex-shrink-0  h-[415px] w-72 rounded-3x border-[#D9D9D9]"
            >
              <div className="flex justify-center items-center p-6">
                <img
                  src={job.employer_logo || "logo.svg"}
                  className="card_logo w-32 h-32 rounded-full"
                  alt=""
                />
              </div>

              <h1 className="card_name px-6 text-2xl font-bold overflow-hidden overflow-ellipsis hover:underline cursor-pointer"
                onClick={() => {
                  const job_id = job.job_id as string;
                  localStorage.setItem("job_id", job_id);
                  window.location.href = "/jobdetail";
                }}>
                {job.name}
              </h1>
              <p className="text-sm card_description py-3 px-6 overflow-hidden max-h-20 leading-snug line-clamp-3">
                {job.content}
              </p>
              <h2 className="card_salary px-6 text-sm flex">
                <div className="font-bold text-red"> Offer: </div>
                <div className="ml-4">{job.salary} millions </div>
              </h2>
            
              <div className="absolute mt-5 left-1/3 mb-6">
                <button
                  className="card_button px-3 py-1 rounded-3xl bg-[#13544E] hover:bg-[#1c7e74cc] active:bg-[#1c7e74ea] text-white"
                  onClick={() => {
                    const job_id = job.job_id as string;
                    localStorage.setItem("job_id", job_id);
                    window.location.href = "/jobdetail";
                  }}
                >
                  More Detail
                </button>
              </div>
            </li>
          ))}
        </ul>
        {isHovered && (
          <div className="scroll-buttons absolute right-16 top-1/2 transform -translate-y-1/2">
            <button
              className="bg-[#9292923f] hover:bg-[#929292af] px-2 py-40 rounded-r-3xl"
              onClick={() => handleScroll("right")}
            >
              {">"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DealList;
