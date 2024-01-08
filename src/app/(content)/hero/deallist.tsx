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
        />
        <div className="categories__header-title flex flex-row">
          <h1 className="text-[3vw] font-bold text-green">Great</h1>
          <h1 className="text-[3vw] font-bold text-red">&nbsp;deal</h1>
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
              className="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded-l-md"
              onClick={() => handleScroll("left")}
            >
              {"<"}
            </button>
          </div>
        )}
        <ul id="cardListContainer" className="flex overflow-x-hidden space-x-4">
          {jobs.map((job, index) => (
            <li
              key={index}
              className="card flex-shrink-0 bg-light-green h-[415px] w-72 rounded-3xl"
            >
              <img
                src={job.employer_logo || "logo.svg"}
                className="card_logo p-6 rounded-full"
              />
              <h1 className="card_name px-6 text-3xl font-bold">{job.name}</h1>
              <h2 className="card_salary px-6 text-xl">
                {job.salary} millions
              </h2>
              <p className="card_description py-3 px-6 overflow-hidden max-h-20 leading-snug line-clamp-3">
                {job.content}
              </p>
              <div className="text-center absolute bottom-0 mb-3">
                <button className="card_button px-3 py-1 rounded-3xl bg-[#1c7e748e] hover:bg-[#1c7e74cc] active:bg-[#1c7e74ea] text-white">
                  More Detail
                </button>
              </div>
            </li>
          ))}
        </ul>
        {isHovered && (
          <div className="scroll-buttons absolute right-16 top-1/2 transform -translate-y-1/2">
            <button
              className="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded-r-md"
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
