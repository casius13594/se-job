"use client";
import React from "react";
import Image from "next/image";
import { CustomButton } from ".";
import Link from "next/link";

const Categories = () => {
  return (
    <div className="Categories">
      <div className="categories__header flex flex-row justify-end items-center m-10">
        <div className="categories__header-title flex flex-row">
          <h1 className="text-[3vw] font-bold text-green">
            Browse through our vast
          </h1>
          <h1 className="text-[3vw] font-bold text-red">&nbsp;categories</h1>
        </div>
        <img
          src="/abstract-shape-right.svg"
          className="object-fill h-[4vw] m-5"
        />
      </div>
    </div>
  );
};
export default Categories;
