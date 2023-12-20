"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "./Profile.css";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Areaselector from "@/components/Areaselector";
import Acceptbutton from "@/components/acceptbutton";
import { City, Country, State } from "country-state-city";
// Import Interfaces`
import { ICountry, IState, ICity } from "country-state-city";
import { IoIosCheckbox,IoIosCheckboxOutline } from "react-icons/io";


const defaultformdata = {
  name: "",
  location: "",
  phone: "",
  url: "",
  inds: "",
  size: "",
  type: "",
  icon: "",
  address: "",
};
const CreateForm = () => {
  const [formData, setFormData] = useState(defaultformdata);
  const { name, location, phone, url, inds, size, type, icon, address} = formData;
  const supabase = createClientComponentClient();
  const router = useRouter();
  let countryData = Country.getAllCountries();
  const [country, setCountry] = useState<ICountry>(countryData[0]);
  const [state, setState] = useState<IState | undefined>(undefined);
  const [city, setCity] = useState<ICity | undefined>(undefined);
  {
    /*const [name, setName] = useState('')
    const[location,setLocation] = useState('')
    const[phone, setPhone] = useState('')
    const[url,setUrl] = useState('')
    const[inds, setInds] = useState('')
    const[size, setSize] = useState('')
    const[type,setType] = useState('')*/
  }
  const [intro, setIntro] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [imageSrc, setImageSrc] = useState<File | null>(null);
  const onImageHandelr = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let file;
    if (event.target.files) {
      file = event.target.files?.[0];
      setImageSrc(file);
      //   const reader = new FileReader();

      //   reader.onloadend = () => {
      //     if (typeof reader.result === 'string') {
      //       setImageSrc(reader.result);
      //     }
      //   };

      //   reader.readAsDataURL(file);
    } else {
      console.log("Image not found");
    }
  };
  console.log(formData);
  console.log(imageSrc);
  const locationString = `${city?.name || ' '}  , ${state?.name || ' '} , ${country?.name || ''}`;


  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;

    if (id === "name") {
      const formattedName = value.toLowerCase().trim().replace(/\s+/g, "-");
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
        url: `company/${formattedName}`,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(country);
    console.log(state);
    console.log(city);
    const res = await supabase.auth.getUser();
    if (res.data.user?.id) {
      const existingUser = await supabase
        .schema("public")
        .from("Employer")
        .select("user_id")
        .eq("user_id", res.data.user.id)
        .single();

      const { data, error } = await supabase.storage
        .from("icon")
        .upload(res.data.user.id + "/" + imageSrc?.name, imageSrc as File, {
          upsert: true,
        });
      if (data) {
        console.log(data);
      } else if (error) {
        console.log(error);
      }

      const url_logo = await supabase.storage
        .from("icon")
        .getPublicUrl(res.data.user.id + "/" + imageSrc?.name);

      if (url_logo.data) {
        console.log("url logo:", url_logo.data);
      } else {
        console.log("not found url logo");
      }

      if (existingUser.data) {
        await supabase
          .schema("public")
          .from("Employer")
          .update({
            name: name,
            logo: url_logo.data.publicUrl,
            verified: false,
            location: address  + ' ' + locationString,
            phone: phone,
            url: url,
            inds: inds,
            size: size,
            type: type,
            description: intro,
          })
          .eq("user_id", res.data.user.id);
      } else {
        await supabase.schema("public").from("Employer").insert({
          user_id: res.data.user.id,
          logo: url_logo.data.publicUrl,
          name: name,
          verified: false,
          location: address  + ' ' + locationString,
          phone: phone,
          url: url,
          inds: inds,
          size: size,
          type: type,
          description: intro,
        });
      }
    }
    router.push("/" + url);
    setFormData(defaultformdata);
  };
  return (
    <form className="ml-11 flex" onSubmit={handleSubmit}>
      <div className="left-column curved-box">
        <div className="w-full flex flex-col items-start mb-4 ">
          <label htmlFor="name" className="font-bold">
            Name <span className="text-red">*</span>
          </label>
          <input
            required
            type="text"
            autoComplete="off"
            onChange={onChange}
            id="name"
            value={name}
            className="p-1 border rounded-md w-full"
          ></input>
        </div>
        {/*<div className='w-full flex flex-col items-start mb-4'>
            <label htmlFor='location' className='font-bold'>
                Location <span className='text-red'>*</span>
            </label>
            <input
                required
                type='text'
                autoComplete='off'
                id = 'location'
                onChange={onChange}
                value={location}
                className='p-1 border rounded-md w-full'
            ></input>
  </div>*/}

        <div className="w-full flex flex-col items-start mb-4">
          <label htmlFor="phone" className="font-bold">
            Phone <span className="text-red">*</span>
          </label>
          <input
            required
            type="text"
            autoComplete="off"
            id="phone"
            onChange={onChange}
            value={phone}
            className="p-1 border rounded-md w-full"
          ></input>
        </div>

        <div className="w-full flex flex-col items-start mb-4">
          <label htmlFor="url" className="font-bold">
            URL <span className="text-red">*</span>
          </label>
          <input
            required
            type="text"
            autoComplete="off"
            id="url"
            onChange={onChange}
            value={url}
            className="p-1 border rounded-md w-full"
          ></input>
        </div>

        <div className="w-full flex flex-col items-start mb-4">
          <label htmlFor="inds" className="font-bold">
            Industry <span className="text-red">*</span>
          </label>
          <input
            required
            type="text"
            autoComplete="off"
            id="inds"
            onChange={onChange}
            value={inds}
            className="p-1 border rounded-md w-full"
          ></input>
        </div>
        <div className="w-full flex flex-col items-start mb-4">
          <label htmlFor="size" className="font-bold">
            Size <span className="text-red">*</span>
          </label>
          <select
            required
            id="size"
            onChange={onChange}
            value={size}
            className="p-1 border rounded-md w-full"
          >
            <option value="" disabled>
              Select a Size Range
            </option>
            <option value="0-10">0 - 10</option>
            <option value="10-50">10 - 50</option>
            <option value="50-100">50 - 100</option>
            <option value="100-500">100 - 500</option>
            <option value="500-1000">500 - 1000</option>
            <option value="1000-10000">1000 - 10000</option>
            <option value="10000++">10000 ++</option>
          </select>
        </div>

        <div className="w-full flex flex-col items-start mb-4">
          <label htmlFor="type" className="font-bold">
            Type <span className="text-red">*</span>
          </label>
          <select
            required
            id="type"
            onChange={onChange}
            value={type}
            className="p-1 border rounded-md w-full"
          >
            <option value="" disabled>
              Select a Type
            </option>
            <option value="Public company">Public company</option>
            <option value="Government agency">Government agency</option>
            <option value="Privately held">Privately held</option>
            <option value="Nonprofit">Nonprofit</option>
          </select>
        </div>
      </div>
    
      <div className="right-column curved-box">
        <div className="w-full flex flex-col items-start mb-4">
          <Areaselector
            country={country}
            setCountry={setCountry}
            state={state}
            setState={setState}
            city={city}
            setCity={setCity}
          ></Areaselector>
        </div>
        <label htmlFor='location2' className='font-bold'>
            Address <span className='text-red'>*</span>
        </label>
        <div className="flex">
        <div className='w-full flex flex-col items-start mb-4'>
        <input
            required
            type='text'
            autoComplete='off'
            id='address'
            onChange={onChange}
            value={address}
            className='p-1 border rounded-md w-full'
        />
        </div>
        <div className='w-full flex flex-col items-start mb-4 ml-4'>
        <input
            required
            type='text'
            autoComplete='off'
            id='location3'
            onChange={onChange}
            value={locationString}
            readOnly  // This makes the input read-only
            className='p-1 border rounded-md w-full'
        />
        </div>
        </div>
        <div className="w-full flex flex-col items-start mb-4">
          <label htmlFor="intro" className="font-bold">
            Introduction <span className="text-red">*</span>
          </label>
          <textarea
            autoComplete="off"
            onChange={(e) => setIntro(e.target.value)}
            value={intro}
            className="p-1 border rounded-md w-full"
          ></textarea>
        </div>
        <div className="w-full flex flex-col items-start mb-4">
          <label htmlFor="icon" className="font-bold">
            Icon <span className="text-red">*</span>
          </label>
          <input
            required
            type="file"
            autoComplete="off"
            id="icon"
            onChange={onImageHandelr}
            accept="image/*"
            className="p-1 border rounded-md w-full"
          ></input>
          {imageSrc && (
            <div className="mt-4">
              <img src={URL.createObjectURL(imageSrc)} alt="Uploaded Icon" className="max-w-xs" />
            </div>
          )}
        </div>
        <div className="flex">
            <div className="mr-4 mt-0.5">  <Acceptbutton></Acceptbutton></div>
        <div>
                I verify that I am an authorized representative of this organization
                and have the right to act on its behalf in the creation and management
                of this page. The organization and I agree to the additional terms for
                Pages.
        </div>
        </div>
        <button
          className="flex flex-col items-start mb-4 curved-box"
          disabled={isLoading}
        >
          {isLoading && <span> Applying ...</span>}
          {!isLoading && <span> Apply </span>}
        </button>
      </div>
    </form>
  );
};

export default CreateForm;
