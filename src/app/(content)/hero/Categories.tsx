"use client";
import React from "react";
import Image from "next/image";
import { CustomButton } from ".";
import Link from "next/link";

const Categories = () => {
  return (
    <div className="Categories">
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
    </div>
  );
};
export default Categories;
