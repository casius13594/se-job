"use client";

import { UserInfo } from "@/components/userinfo";
import React from "react";
import AppBar from "@/components/appbar";
import { dm_sans } from "@/components/fonts";
import { getUser } from "@/components/controller";
import Areaselector from "@/components/Areaselector";
import { ICity, ICountry, IState } from "country-state-city";
import { Country } from "country-state-city";
import Modal from "react-modal";

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
      className={`flex flex-col w-[100vw] h-[100vh] ${dm_sans.className} pt-[2vh] overflow-hidden`}
    >
      <AppBar />
      <Modal
        isOpen={selectLocation}
        onRequestClose={() => setSelectLocation(false)}
      >
        <div className="flex flex-col items-center justify-center">
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
      <UserInfo
        isBasic={false}
        content={
          <div className="flex flex-col w-full h-full">
            <div className="flex flex-row w-full h-[10vh] space-x-[1vw]">
              <button className="btnSetting__password w-full h-full mt-[1vw] bg-gray-300 font-bold">
                Change your password
              </button>
            </div>
          </div>
        }
      />
      <footer className="w-full h-40 pt-4">
        <div className="w-full h-10 flex bg-green pl-10 text-white text-2xl font-bold items-center">
          JELP
        </div>
        <div className="w-full h-20 flex pl-10 text-2xl font-bold items-center">
          © Jelp. All Rights Reserved.
        </div>
      </footer>
    </main>
  );
}
