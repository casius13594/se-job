"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function PostJob() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {};

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
      <div className="flex flex-col items-center justify-self-start w-1/3">
        <h1 className="mb-5 text-2xl font-bold text-white cursor-default">
          Find your talent fast, efficiently
        </h1>

        <form
          className="w-full text-xl text-black font-semibold flex flex-col bg-white rounded-3xl px-16 py-5"
          onSubmit={(event) => handleSubmit(event)}
        >
          <h1 className="place-self-center text-[#13544E] pb-3 font-extrabold text-3xl">
            Job information
          </h1>
          <div className="grid grid-cols-2 text-base my-2 font-extrabold">
            <text>General Information</text>
            <text className="justify-self-end text-red">* Required field</text>
          </div>

          <div className="items-center mb-5 text-sm font-bold">
            <text>
              Job name <span className="text-red ml-1">*</span>
            </text>
            <input className="w-full h-7 border-black border border-r-2 border-b-2 rounded-lg shadow"></input>
          </div>

          <div className="items-center mb-5 text-sm font-bold">
            <text>
              Workplace type <span className="text-red ml-1">*</span>
            </text>
            <input className="w-full h-7 border-black border border-r-2 border-b-2 rounded-lg shadow"></input>
          </div>

          <div className="items-center mb-5 text-sm font-bold">
            <text>
              Employee location <span className="text-red ml-1">*</span>
            </text>
            <input className="w-full h-7 border-black border border-r-2 border-b-2 rounded-lg shadow"></input>
          </div>

          <div className="items-center mb-5 text-sm font-bold">
            <text>
              Employment type <span className="text-red ml-1">*</span>
            </text>
            <input className="w-full h-7 border-black border border-r-2 border-b-2 rounded-lg shadow"></input>
          </div>

          <button
            type="submit"
            className="w-2/3 h-10 px-6 mt-7 text-xl place-self-center font-dmsans text-white bg-[#13544E] rounded-lg focus:shadow-outline"
          >
            Next step
          </button>
        </form>
      </div>
    </div>
  );
}
