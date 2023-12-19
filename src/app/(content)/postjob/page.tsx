"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Select from "react-select";

export default function PostJob() {
  const [error, setError] = useState<string | null>(null);
  const sliderRef = useRef<Slider>(null);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    arrows: false,
  };
  const options = [
    { value: "tag1", label: "Tag 1" },
    { value: "tag2", label: "Tag 2" },
    { value: "tag3", label: "Tag 3" },
    { value: "tag4", label: "Tag 4" },
    { value: "tag5", label: "Tag 5" },
    { value: "tag6", label: "Tag 6" },
    { value: "tag7", label: "Tag 7" },
    { value: "tag8", label: "Tag 8" },
    // Add more tags as needed
  ];
  const handleNextPage = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };
  const handlePreviousPage = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  const handleSubmit = async (event: React.FormEvent) => {};

  const Form1 = () => (
    <div className="flex flex-col w-1/2 mx-auto">
      <h1 className="mb-5 text-2xl font-bold text-white cursor-default text-center">
        Find your talent fast, efficiently
      </h1>

      <form className="w-full text-xl text-black font-semibold flex flex-col bg-white rounded-3xl px-16 py-5">
        <h1 className="place-self-center text-[#13544E] pb-3 font-extrabold text-3xl">
          Job Information
        </h1>
        <div className="grid grid-cols-2 text-base my-2 font-extrabold">
          <text>General Information</text>
          <text className="justify-self-end text-red">* Required field</text>
        </div>

        <div className="items-center mb-5 text-sm font-bold">
          <text>
            Job Name <span className="text-red ml-1">*</span>
          </text>
          <input className="w-full h-7 border-black border border-r-2 border-b-2 rounded-lg shadow p-2"></input>
        </div>

        <div className="items-center mb-5 text-sm font-bold">
          <text>
            Workplace Type <span className="text-red ml-1">*</span>
          </text>
          <select className="w-full h-7 border-black border border-r-2 border-b-2 rounded-lg shadow px-2 font-light">
            <option value="" hidden selected>
              Select a workplace type
            </option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <div className="items-center mb-5 text-sm font-bold">
          <text>
            Employee Location <span className="text-red ml-1">*</span>
          </text>
          <input className="w-full h-7 border-black border border-r-2 border-b-2 rounded-lg shadow p-2"></input>
        </div>

        <div className="items-center mb-5 text-sm font-bold">
          <text>
            Employment Type <span className="text-red ml-1">*</span>
          </text>
          <select className="w-full h-7 border-black border border-r-2 border-b-2 rounded-lg shadow px-2 font-light">
            <option value="" hidden selected>
              Select an employment type
            </option>
            <option value="fulltime">Fulltime</option>
            <option value="parttime">Partime</option>
          </select>
        </div>

        <button
          onClick={handleNextPage}
          className="w-2/3 h-10 px-6 mt-7 text-xl place-self-center font-dmsans text-white bg-[#13544E] rounded-lg focus:shadow-outline"
        >
          Next step
        </button>
      </form>
    </div>
  );

  const Form2 = () => (
    <div className="flex flex-col mx-auto w-full">
      <h1 className="mb-5 text-2xl font-bold text-white cursor-default text-center">
        Just one more step to go
      </h1>

      <form
        className="w-full text-xl text-black font-semibold flex flex-col bg-white rounded-3xl px-16 py-5"
        onSubmit={(event) => handleSubmit(event)}
      >
        <h1 className="place-self-center text-[#13544E] pb-2 font-extrabold text-3xl">
          Job Information
        </h1>
        <div className="grid grid-cols-2 text-base my-4 font-extrabold">
          <text>Detailed Information</text>
          <text className="justify-self-end text-red">* Required field</text>
        </div>

        {/* 2 columns form */}
        <div
          className="grid grid-cols-2 gap-4"
          style={{ gridTemplateColumns: "1fr 2fr" }}
        >
          <div className="items-center mb-2 text-sm font-bold col-start-1">
            <text>
              Minimum Experience <span className="text-red ml-1">*</span>
            </text>
            <select className="w-full h-7 border-black border border-r-2 border-b-2 rounded-lg shadow px-2 font-light">
              <option value="" hidden selected></option>
              <option value="1year">At least 1 year</option>
              <option value="2year">At least 2 year</option>
              <option value="3year">At least 3 year</option>
            </select>
          </div>
          <div className="items-center mb-2 text-sm font-bold col-start-1">
            <text>
              Salary Range <span className="text-red ml-1">*</span>
            </text>
            <select className="w-full h-7 border-black border border-r-2 border-b-2 rounded-lg shadow px-2 font-light">
              <option value="" hidden selected></option>
              <option value="lessthan10">1,000,000 VND - 10,000,000 VND</option>
              <option value="lessthan20">
                10,000,000 VND - 20,000,000 VND
              </option>
              <option value="morethan20">More than 20,000,000 VND</option>
            </select>
          </div>
          <div className=" row-span-4 row-start-1 col-start-2">
            <JobDetails />
          </div>
          <div className="items-center mb-2 text-sm font-bold col-start-1">
            <text>
              Tags <span className="text-red ml-1">*</span>
            </text>
            <Select
              isMulti
              name="tags"
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
              onMenuOpen={() => {
                document.body.style.overflow = "hidden";
              }}
              onMenuClose={() => {
                document.body.style.overflow = "auto";
              }}
              styles={{
                control: (provided) => ({
                  ...provided,
                  height: "1.75rem", // h-7
                  borderWidth: "1px 2px 2px 1px", // border-r-2 border-b-2
                  borderColor: "black", // border-black
                  borderRadius: "0.5rem", // rounded-lg
                  boxShadow:
                    "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)", // shadow

                  fontWeight: "300", // font-light
                }),
                multiValue: (provided) => ({
                  ...provided,
                  backgroundColor: "#13544E",
                  borderRadius: "0.5rem",
                }),
                multiValueLabel: (provided) => ({
                  ...provided,
                  color: "#fff",
                }),
                multiValueRemove: (provided) => ({
                  ...provided,
                  color: "#fff",
                  ":hover": {
                    backgroundColor: "black",
                    borderRadius: "0.5rem",
                  },
                }),
                menu: (provided) => ({
                  ...provided,
                  maxHeight: "100px", // Set the max height of the dropdown box
                  overflowY: "auto",
                }),
              }}
            />
          </div>
          <button
            onClick={handlePreviousPage}
            className="w-2/3 h-10 px-6 mt-7 text-xl place-self-center font-dmsans text-white bg-[#D9D9D9] rounded-lg focus:shadow-outline col-start-1 row-start-5"
          >
            Previous page
          </button>
          <button
            type="submit"
            className="w-2/3 h-10 px-6 mt-7 text-xl place-self-center font-dmsans text-white bg-[#13544E] rounded-lg focus:shadow-outline col-start-2"
          >
            Post your job now
          </button>
        </div>
      </form>
    </div>
  );
  const JobDetails = () => (
    <div className="overflow-y-auto h-[40vh]">
      <div className="items-center mb-2 text-sm font-bold col-start-1">
        <text>
          About The Job <span className="text-red ml-1">*</span>
        </text>
        <textarea className="w-full h-[15vh] border-black border border-r-2 border-b-2 rounded-lg shadow p-2 font-medium resize-none"></textarea>
      </div>
      <div className="items-center mb-2 text-sm font-bold col-start-1">
        <text>
          Requirements <span className="text-red ml-1">*</span>
        </text>
        <textarea className="w-full h-[15vh] border-black border border-r-2 border-b-2 rounded-lg shadow p-2 font-medium resize-none"></textarea>
      </div>
      <div className="items-center mb-2 text-sm font-bold col-start-1">
        <text>
          Benefits <span className="text-red ml-1">*</span>
        </text>
        <textarea className="w-full h-[15vh] border-black border border-r-2 border-b-2 rounded-lg shadow p-2 font-medium resize-none"></textarea>
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-[#13544E]">
      <Link href="/" className="flex place-self-start ml-16 mt-5">
        <Image
          src="/logo_white.svg"
          alt="Jelp logo"
          width="100"
          height="100"
          className="object-contain"
        />
      </Link>
      <Slider
        ref={sliderRef}
        {...settings}
        className="w-2/3 flex justify-center"
      >
        <Form1 />
        <Form2 />
      </Slider>
    </div>
  );
}
