"use client";

import "./component.css";
import React from "react";
import AppBar from "@/components/appbar";
import { dm_sans } from "@/components/fonts";
import { getUser } from "@/components/controller";
import Areaselector from "@/components/Areaselector";
import { ICity, ICountry, IState } from "country-state-city";
import { Country } from "country-state-city";
import Modal from "react-modal";
import { updateEmployee } from "@/components/controller";

export default function BasicInfo() {
  const [modified, setModified] = React.useState(false);
  const [reload, setReload] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);

  let countryData = Country.getAllCountries();
  const [country, setCountry] = React.useState<ICountry>(countryData[0]);
  const [state, setState] = React.useState<IState | undefined>(undefined);
  const [city, setCity] = React.useState<ICity | undefined>(undefined);
  const [locationString, setLocationString] = React.useState<string>("");

  const [selectLocation, setSelectLocation] = React.useState(false);

  React.useEffect(() => {
    const fetchProfile = async () => {
      const userObject = await getUser();
      if (userObject) {
        const { data: user, isEmployee: isEmployee } = userObject;
        if (user) {
          setUser(user);
          setLocationString(user.location);
        }
      }
    };
    fetchProfile();
  }, [reload]);

  return (
    <main
      className={`flex flex-col w-full h-full ${dm_sans.className} pt-[2vh] overflow-hidden`}
    >
      <Modal
        className="modal_style"
        isOpen={selectLocation}
        onRequestClose={() => setSelectLocation(false)}
      >
        <div className="flex flex-col items-center justify-center p-4">
          <Areaselector
            city={city}
            setCity={setCity}
            country={country}
            setCountry={setCountry}
            state={state}
            setState={setState}
            showDistrict={true}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => {
              setSelectLocation(false);
              setLocationString(
                `${city?.name || ""} ${", " + state?.name || ""} ${
                  ", " + country?.name || ""
                }`
              );
            }}
          >
            Apply
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => {
              setSelectLocation(false);
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>

      <div className="flex flex-col w-full h-full">
        <div className="text-2xl font-bold"> Basic Information</div>
        <div className="border-b mt-4 mb-4 border-green w-1/5 "></div>
        <div className="flex flex-row w-full h-[10vh] space-x-[1vw]">
          <h1 className="text-xl font-bold">Member Information</h1>

          <button className="ml-6 -translate-y-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 27 27"
              fill="none"
              onClick={() => setModified(true)}
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.4356 5.80118L18.5321 2.70477C19.8654 1.37144 20.5321 0.704773 21.3605 0.704773C22.1889 0.704773 22.8556 1.37144 24.1889 2.70477L24.384 2.89986C25.7173 4.2332 26.384 4.89986 26.384 5.72829C26.384 6.55672 25.7173 7.22338 24.384 8.55671L24.384 8.55672L21.3197 11.621C18.8862 10.212 16.8624 8.2034 15.4356 5.80118ZM13.9814 7.25547L3.19804 18.0388C2.77298 18.4638 2.56045 18.6764 2.42072 18.9375C2.28098 19.1986 2.22204 19.4933 2.10415 20.0827L1.02577 25.4747C0.959244 25.8073 0.925983 25.9736 1.02059 26.0682C1.1152 26.1628 1.2815 26.1295 1.61411 26.063L7.00603 24.9846C7.59548 24.8667 7.8902 24.8078 8.1513 24.6681C8.4124 24.5283 8.62493 24.3158 9.04999 23.8907L19.8617 13.079C17.479 11.6059 15.4695 9.61042 13.9814 7.25547Z"
                fill="#222222"
              />
            </svg>
          </button>
        </div>
        <form
          name="userInfo"
          className="flex flex-col w-fit space-y-[1vh]"
          action={(data) => {
            updateEmployee(data);
            setModified(false);
          }}
        >
          <div className="flex flex-row divide-black divide-x-[2px]">
            <label htmlFor="name" className="font_information w-[10vw] ml-7">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-[20vw] h-[5vh] px-[1vw] font_information"
              defaultValue={user ? user.name : ""}
              disabled={!modified}
            />
          </div>
          <div className="flex flex-row divide-black divide-x-[2px]">
            <label
              htmlFor="location"
              className="font_information w-[10vw]  ml-7"
            >
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              className="w-[20vw] h-[5vh] px-[1vw] font_information"
              value={locationString || ""}
              disabled={!modified}
              onClick={() => setSelectLocation(true)}
            />
          </div>
          <div className="flex flex-row divide-black divide-x-[2px]">
            <label htmlFor="dob" className="font_information w-[10vw]  ml-7">
              Date of Birth
            </label>
            <input
              id="dob"
              name="dob"
              type="date"
              className="w-[20vw] h-[5vh] px-[1vw] font_information"
              defaultValue={user ? user.dob : ""}
              disabled={!modified}
            />
          </div>
          <div
            className={`flex flex-row w-full justify-around items-center ${
              modified ? "" : "invisible"
            }`}
          >
            <button className="rounded-btn mt-2 text-bold text-base">Save</button>
            <button
              className="mt-2 rounded-btn text-bold text-base"
              formAction={() => {
                setReload(true);
                setModified(false);
              }}
            >
              Cancel
            </button>
            </div>
        </form>
      </div>
    </main>
  );
}
