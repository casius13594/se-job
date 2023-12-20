"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import { addEmployee } from "@/components/controller";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function EmployeeProfile() {
  const [startDate, setStartDate] = useState(null);
  const datePickerRef = useRef<ReactDatePicker | null>(null);
  const router = useRouter();

  const handleBlur = () => {
    setTimeout(() => {
      if (datePickerRef.current) {
        datePickerRef.current.setOpen(false);
      }
    }, 100); // 100ms delay
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = document.getElementById("form") as HTMLFormElement;
    const formData = new FormData(form);
    console.log(formData.get("name"));
    console.log(startDate);
    console.log(formData.get("location"));
    const supabase = createClientComponentClient();
    const user = await supabase.auth.getUser();
    let error;
    if (startDate !== null) {
      error = addEmployee(formData, startDate, user.data);
    }
    router.push("../../joblist");
  };
  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-[#e3ce98] ">
      <Link href="/" className="flex place-self-start ml-16 mt-5">
        <Image
          src="/logo.svg"
          alt="Jelp logo"
          width="100"
          height="100"
          className="object-contain"
        />
      </Link>
      <div className="flex flex-col w-1/3 mx-auto">
        <form
          id="form"
          onSubmit={(event) => handleSubmit(event)}
          className="w-full text-xl text-black font-semibold flex flex-col bg-white rounded-3xl px-16 py-5"
        >
          <h1 className="place-self-center text-[#13544E] pb-3 font-extrabold text-3xl">
            Your first step
          </h1>
          <div className="grid grid-cols-2 text-base my-2 font-extrabold">
            <span>General Information</span>
            <span className="justify-self-end text-red">* Required field</span>
          </div>

          <div className="items-center mb-5 text-sm font-bold">
            <label>
              Name <span className="text-red ml-1">*</span>
            </label>
            <input
              name="name"
              required
              className="w-full h-7 border-black border border-r-2 border-b-2 rounded-lg shadow p-2 font-medium"
            ></input>
          </div>

          <div className=" mb-5 text-sm font-bold flex flex-col">
            <label>
              Birth date <span className="text-red ml-1">*</span>
            </label>
            <DatePicker
              ref={datePickerRef}
              className="w-full h-7 border-black border border-r-2 border-b-2 rounded-lg shadow p-2 font-medium"
              onChange={(date: Date) => {
                setStartDate(date);
                handleBlur();
                console.log(date);
              }}
              selected={startDate}
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={150}
              maxDate={new Date()}
              placeholderText="Select a date"
              renderCustomHeader={({
                date,
                changeYear,
                increaseMonth,
                decreaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div className=" w-full justify-between flex">
                  <button
                    type="button"
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                    className="ml-5"
                  >
                    {"<"}
                  </button>
                  <div className="flex items-center mx-10">
                    {date.toLocaleString("default", { month: "long" })}
                    <select
                      value={date.getFullYear()}
                      onChange={({ target: { value } }) => changeYear(value)}
                    >
                      {Array.from(
                        new Array(100),
                        (_, i) => new Date().getFullYear() - i
                      ).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    className="mr-5"
                  >
                    {">"}
                  </button>
                </div>
              )}
            />
          </div>

          <div className="items-center mb-5 text-sm font-bold">
            <label>
              Location <span className="text-red ml-1">*</span>
            </label>
            <input
              name="location"
              required
              className="w-full h-7 border-black border border-r-2 border-b-2 rounded-lg shadow p-2 font-medium"
            ></input>
          </div>

          <button
            type="submit"
            className="w-2/3 h-10 px-6 mt-3 text-xl place-self-center font-dmsans text-[#ebe3e3] bg-[#13544E] rounded-lg focus:shadow-outline"
          >
            Finish
          </button>
        </form>
      </div>
    </div>
  );
}
