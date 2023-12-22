"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Select from "react-select";
import { postJob } from "@/components/controller";
import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Areaselector from "@/components/Areaselector";
import { Country, ICity, ICountry, IState } from "country-state-city";

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

  const countryData = Country.getAllCountries();
  const [country, setCountry] = useState<ICountry>(countryData[0]);
  const [state, setState] = useState<IState | undefined>(undefined);
  const [city, setCity] = useState<ICity | undefined>(undefined);

  const options = [
    { value: "parttime", label: "Part-time" },
    { value: "fulltime", label: "Full-time" },
    { value: "intern", label: "Intern" },
    { value: "health", label: "Health" },
    { value: "edu", label: "Education" },
    { value: "it", label: "IT" },
    { value: "service", label: "Service" },
    { value: "manage", label: "Manager" },
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
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitting");
    const form1 = document.getElementById("form1") as HTMLFormElement;
    const form2 = document.getElementById("form2") as HTMLFormElement;

    // Check if any input or select in form1 is empty
    const inputsForm1 = form1.querySelectorAll("input, select");
    for (let i = 0; i < inputsForm1.length; i++) {
      if ((inputsForm1[i] as HTMLInputElement).value === "") {
        if (sliderRef.current) {
          sliderRef.current.slickGoTo(0); // Slide back to the first form
        }
        const form1SubmitButton = document.getElementById("form1Submit");
        if (form1SubmitButton) form1SubmitButton.click();
        return; // Exit the function
      }
    }
    const formData1 = new FormData(form1);
    const formData2 = new FormData(form2);
    console.log(formData1.get("name"));
    const supabase = createClientComponentClient();
    const user = await supabase.auth.getUser();
    console.log(user);
    console.log(state);
    if (!user.error) {
      postJob(formData1, formData2, user.data, state || ({} as IState));
    } else {
      console.log("No user");
    }
  };

  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-[#13544E] ">
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
        <div className="flex flex-col w-1/2 mx-auto">
          <h1 className="mb-5 text-2xl font-bold text-white cursor-default text-center">
            Find your talent fast, efficiently
          </h1>

          <form
            id="form1"
            className="w-1/2 mx-auto text-xl text-black font-semibold flex flex-col bg-white rounded-3xl px-16 py-5"
          >
            <h1 className="place-self-center text-[#13544E] pb-3 font-extrabold text-3xl">
              Job Information
            </h1>
            <div className="grid grid-cols-2 text-base my-2 font-extrabold">
              <span>General Information</span>
              <span className="justify-self-end text-red">
                * Required field
              </span>
            </div>

            <div className="items-center mb-5 text-sm font-bold">
              <label>
                Job Name <span className="text-red ml-1">*</span>
              </label>
              <input
                name="name"
                required
                className="w-full h-7 border-black border border-r-2 border-b-2 rounded-lg shadow p-2 font-medium"
              ></input>
            </div>

            <div className="items-center mb-5 text-sm font-bold">
              <label>
                Workplace Type <span className="text-red ml-1">*</span>
              </label>
              <select
                name="workplace"
                required
                className="w-full h-7 border-black border border-r-2 border-b-2 rounded-lg shadow px-2 font-light"
              >
                <option value="" hidden selected>
                  Select a workplace type
                </option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div className="items-center mb-5 text-sm font-bold">
              <label>
                Employee Location <span className="text-red ml-1">*</span>
              </label>
              <Areaselector
                country={country}
                setCountry={setCountry}
                state={state}
                setState={setState}
                city={city}
                setCity={setCity}
                showDistrict={false}
              />
            </div>

            <div className="items-center mb-5 text-sm font-bold">
              <label>
                Employment Type <span className="text-red ml-1">*</span>
              </label>
              <select
                name="type"
                required
                className="w-full h-7 border-black border border-r-2 border-b-2 rounded-lg shadow px-2 font-light"
              >
                <option value="" hidden selected>
                  Select an employment type
                </option>
                <option value="fulltime">Full-time</option>
                <option value="parttime">Part-time</option>
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
        <div className="flex flex-col mx-auto w-full">
          <h1 className="mb-5 text-2xl font-bold text-white cursor-default text-center">
            Just one more step to go
          </h1>

          <form
            id="form2"
            onSubmit={(e) => handleSubmit(e)}
            className="w-full text-xl text-black font-semibold flex flex-col bg-white rounded-3xl px-16 py-5"
          >
            <h1 className="place-self-center text-[#13544E] pb-2 font-extrabold text-3xl">
              Job Information
            </h1>
            <div className="grid grid-cols-2 text-base my-4 font-extrabold">
              <span>Detailed Information</span>
              <span className="justify-self-end text-red">
                * Required field
              </span>
            </div>

            {/* 2 columns form */}
            <div
              className="grid grid-cols-2 gap-4"
              style={{ gridTemplateColumns: "1fr 2fr" }}
            >
              <div className="items-center mb-2 text-sm font-bold col-start-1">
                <label>
                  Minimum Experience <span className="text-red ml-1">*</span>
                </label>
                <select
                  name="exp"
                  required
                  className="w-full h-7 border-black border border-r-2 border-b-2 rounded-lg shadow px-2 font-light"
                >
                  <option value="" hidden selected></option>
                  <option value="none">None</option>
                  <option value="fresher">Fresher</option>
                  <option value="junior">Junior</option>
                  <option value="senior">Senior</option>
                </select>
              </div>
              <div className="items-center mb-2 text-sm font-bold col-start-1">
                <label>
                  Salary Range <span className="text-red ml-1">*</span>
                </label>
                <select
                  name="salary"
                  required
                  className="w-full h-7 border-black border border-r-2 border-b-2 rounded-lg shadow px-2 font-light"
                >
                  <option value="" hidden selected></option>
                  <option value="lessthan10">
                    1,000,000 VND - 10,000,000 VND
                  </option>
                  <option value="lessthan20">
                    10,000,000 VND - 20,000,000 VND
                  </option>
                  <option value="morethan20">More than 20,000,000 VND</option>
                </select>
              </div>
              <div className=" row-span-4 row-start-1 col-start-2">
                <div className="overflow-y-auto h-[40vh]">
                  <div className="items-center mb-2 text-sm font-bold col-start-1">
                    <label>
                      About The Job <span className="text-red ml-1">*</span>
                    </label>
                    <textarea
                      is="webview"
                      name="content"
                      required
                      className="w-full h-[15vh] border-black border border-r-2 border-b-2 rounded-lg shadow p-2 font-medium resize-none"
                    ></textarea>
                  </div>
                  <div className="items-center mb-2 text-sm font-bold col-start-1">
                    <label>
                      Requirements <span className="text-red ml-1">*</span>
                    </label>
                    <textarea
                      is="webview"
                      name="requirements"
                      required
                      className="w-full h-[15vh] border-black border border-r-2 border-b-2 rounded-lg shadow p-2 font-medium resize-none"
                    ></textarea>
                  </div>
                  <div className="items-center mb-2 text-sm font-bold col-start-1">
                    <label>
                      Benefits <span className="text-red ml-1">*</span>
                    </label>
                    <textarea
                      is="webview"
                      name="benefits"
                      required
                      className="w-full h-[15vh] border-black border border-r-2 border-b-2 rounded-lg shadow p-2 font-medium resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="items-center mb-2 text-sm font-bold col-start-1">
                <label>
                  Tags <span className="text-red ml-1">*</span>
                </label>
                <Select
                  name="tags"
                  required
                  isMulti
                  options={options}
                  className="basic-multi-select"
                  classNamePrefix="select"
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
                      ":hover": {
                        borderColor: "black",
                        boxShadow:
                          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)", // shadow
                      },
                    }),
                    indicatorSeparator: (provided) => ({
                      ...provided,
                      display: "flex",
                      alignSelf: 'center',
                      height: "65%",
                    }),
                    dropdownIndicator: (provided) => ({
                      ...provided,
                      color: "#000",
                      paddingRight: "0",
                      paddingLeft: "5px",
                      marginRight: "-3px",
                      transform: "scale(0.75)",
                      ":hover": {},
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
      </Slider>
    </div>
  );
}
