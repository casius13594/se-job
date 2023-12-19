"use client";
import React from "react";
import Image from "next/image";
import { CustomButton } from ".";
import Link from "next/link";

const Hero = () => {
  const handleScroll = () => {};

  return (
    <div className="Hero">
      <div className="pt-36 padding-x">
        <div
          className="hero__container-0 flex flex-col justify-between items-center pt-4 pb-10 padding-x -mb-8 bg-green rounded-t-3xl"
          style={{ height: "200px" }}
        >
          <h1 className="text-[2.5vw] font-normal text-white mt-3">
            Find newest jobs, best location, and the most suitable salary
          </h1>

          <div className="search__container flex flex-row justify-between items-center mb-3">
            <div className="py-3 pl-7 pr-14 bg-gray-300 rounded-xl mr-2">
              <input
                className="search__keyword bg-gray-300 focus:outline-none"
                placeholder="Keyword"
                type="text"
              />
            </div>

            <div className="py-3 px-7 bg-gray-300 rounded-xl mx-2">
              <input
                className="search__keyword bg-gray-300 focus:outline-none"
                placeholder="Cities"
                type="text"
              />
            </div>
            <div className="py-3 px-7 bg-gray-300 rounded-xl mx-2">
              <input
                className="search__keyword bg-gray-300 focus:outline-none"
                placeholder="Salary"
                type="text"
              />
            </div>
            <div
              className="py-3 px-7 flex flex-row justify-between items-center bg-red rounded-xl ml-2 cursor-pointer"
              style={{ width: "135px" }}
            >
              <img src="/iconSearch.svg" />
              <b className="text-gray-300">Search</b>
            </div>
          </div>
        </div>
        <div className="hero__container-1 flex flex-row justify-between items-center padding-y  padding-x mt-2 bg-light-green rounded-3xl">
          <div className="flex-1">
            <h1 className="hero__title text-red">Expand network</h1>
            <h1 className="hero__title text-green">Explore your potential</h1>
            <p className="hero__subtitle">
              Where to find your career prospect? How to communicate between
              employee and employer
            </p>
            <div className="flex flex-row space-x-3 mt-2">
              <Link href="./auth/login">
                <CustomButton
                  title="Login"
                  containerStyles="bg-green text-white min-w-[153px] mt-10"
                />
              </Link>
              <CustomButton
                title="About us"
                containerStyles="bg-red text-white min-w-[153px] mt-10"
                handleClick={handleScroll}
              />
            </div>
          </div>

          <div
            className="hero__image"
            style={{
              width: "35vw",
              height: "20vw",
              borderRadius: "25px",
              overflow: "hidden",
            }}
          >
            <Image
              src="/hero.png"
              alt="hero"
              layout="fill"
              objectFit="cover"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
