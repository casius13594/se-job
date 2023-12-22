"use client";
import React, { useEffect, useState } from "react";
import { City, Country, State } from "country-state-city";
import Selector from "@/components/selector";
// Import Interfaces`
import { ICountry, IState, ICity } from "country-state-city";
const Areaselector: React.FC<{
  country: ICountry;
  setCountry: React.Dispatch<React.SetStateAction<ICountry>>;
  state: IState | undefined;
  setState: React.Dispatch<React.SetStateAction<IState | undefined>>;
  city: ICity | undefined;
  setCity: React.Dispatch<React.SetStateAction<ICity | undefined>>;
  showDistrict: boolean;
}> = ({
  country,
  setCountry,
  state,
  setState,
  city,
  setCity,
  showDistrict,
}) => {
  let countryData = Country.getAllCountries();
  //const [country, setCountry] = useState<ICountry>(countryData[0]); // Assuming ICountry is also exported from 'country-state-city'
  const [stateData, setStateData] = useState<IState[]>([]);
  const [cityData, setCityData] = useState<ICity[]>([]);

  //const [state, setState] = useState<IState | undefined>(undefined);
  //const [city, setCity] = useState<ICity | undefined>(undefined)
  useEffect(() => {
    setStateData(State.getStatesOfCountry(country?.isoCode));
  }, [country]);

  useEffect(() => {
    setCityData(City.getCitiesOfState(country?.isoCode, state!?.isoCode));
  }, [state]);

  useEffect(() => {
    stateData && setState(stateData[0]);
  }, [stateData]);

  useEffect(() => {
    cityData && setCity(cityData[0]);
  }, [cityData]);
  return (
    <>
      <div className="flex">
        <div>
          <div className="font-bold">Country</div>
          <Selector
            data={countryData}
            selected={country}
            setSelected={setCountry}
          />
        </div>
        <div>
          <div className="font-bold">City</div>
          <Selector data={stateData} selected={state} setSelected={setState} />
        </div>
        {showDistrict && (
          <div>
            <div className="font-bold">District</div>
            <Selector data={cityData} selected={city} setSelected={setCity} />
          </div>
        )}
      </div>
    </>
  );
};

export default Areaselector;
