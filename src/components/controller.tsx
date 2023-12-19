"use server";

import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import React from "react";
import { UserResponse } from "@supabase/supabase-js";

export async function getJob(formData: FormData) {
  "use server";
  // get user
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  // filter value
  const location = formData.get("location") as string;
  const type = formData.get("type") as string;
  const experience = formData.get("experience") as string;
  const salary = formData.get("salary") as string;
  // compose query
  let query = supabase.from("Job").select("*");
  if (location != "%") {
    query = query.eq("location", location);
  }
  if (type != "%") {
    query = query.eq("type", type);
  }
  if (experience != "%") {
    query = query.eq("experience", experience);
  }
  if (salary != "%") {
    query = query.eq("salary", salary);
  }
  // get job
  const { data: jobs, error } = await query;
  if (error) {
    return null;
  }
  return (
    <div className="flex flex-col h-full w-full">
      <ul className="flex flex-col h-full w-full space-y-[2vh]">
        {jobs.map((job) => (
          // eslint-disable-next-line react/jsx-key
          <li 
            className="flex flex-row w-full border-2 border-black rounded-md" 
            >
            <div className="flex m-[1vw]">
                <img
                    className="w-[10vw] h-[10vw]"
                    src={job.employer_logo}
                    alt=""
                />
            </div>
            <div className="flex flex-col justify-between w-full p-[1vw]">
              <div className="flex flex-row justify-between w-full">
                <h1 className="text-xl font-bold">{job.name}</h1>
                <h1 className="text-xl font-bold">{job.salary} Millions</h1>
              </div>
              <div className="flex flex-row w-full">
                <h1 className="text-lg">{job.employer_name}</h1>
              </div>
              <div className="flex flex-row w-full">
                <h1 className="text-lg">
                  {job.location}({job.type})
                </h1>
              </div>
              <div className="flex flex-row w-full">
                <h1 className="text-md">{job.post_time}</h1>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function postJob(
  formData1: FormData,
  formData2: FormData,
  user: UserResponse["data"]
) {
  "use server";
  // get user
  const cookieStore = cookies();
  const supabase = createClient();
  const employerData = await supabase
    .from("Employer")
    .select("*")
    .eq("user_id", user.user?.id)
    .single();
  const employer_name = employerData.data.name;
  const employer_logo = employerData.data.logo;
  const { data, error } = await supabase.from("Job").insert([
    {
      employer_id: user.user?.id,
      name: formData1.get("name"),
      employer_name: employer_name,
      employer_logo: employer_logo??"",
      status: "open",
      location: formData1.get("location"),
      salary: formData2.get("salary"),
      type: formData1.get("type"),
      content: formData2.get("content"),
      experience: formData2.get("exp"),
      workplace: formData1.get("workplace"),
      requirements: formData2.get("requirements"),
      benefits: formData2.get("benefits"),
    },
  ]);
  if (error) {
    console.log(error);
  } else {
    console.log("Success", data);
  }
}
