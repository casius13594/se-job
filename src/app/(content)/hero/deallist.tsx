"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CustomButton } from ".";
import Link from "next/link";

const DealList = () => {
  const [isHovered, setIsHovered] = useState(false);

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

      {/* Horizontal scrolling card list */}
      <div
        className="relative w-full flex items-center px-24"
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
        <div
          id="cardListContainer"
          className="flex space-x-4 overflow-x-auto p-4"
        >
          <div className="flex-shrink-0 w-48 bg-red p-4 rounded-lg"></div>
          <div className="flex-shrink-0 w-48 bg-black p-4 rounded-lg"></div>
          <div className="flex-shrink-0 w-48 bg-green p-4 rounded-lg"></div>
          <div className="flex-shrink-0 w-48 bg-red p-4 rounded-lg"></div>
          <div className="flex-shrink-0 w-48 bg-black p-4 rounded-lg"></div>
          <div className="flex-shrink-0 w-48 bg-green p-4 rounded-lg"></div>
          <div className="flex-shrink-0 w-48 bg-red p-4 rounded-lg"></div>
          <div className="flex-shrink-0 w-48 bg-black p-4 rounded-lg"></div>
          <div className="flex-shrink-0 w-48 bg-green p-4 rounded-lg"></div>
          <div className="flex-shrink-0 w-48 bg-red p-4 rounded-lg"></div>
          <div className="flex-shrink-0 w-48 bg-black p-4 rounded-lg"></div>
          <div className="flex-shrink-0 w-48 bg-green p-4 rounded-lg"></div>
        </div>
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
