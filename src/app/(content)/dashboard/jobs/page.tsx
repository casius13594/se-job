"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  getApplied,
  getJobOfEmployer,
  toggleJobStatus,
} from "@/components/controller";
import Link from "next/link";

interface Job {
  job_id: any;
  name: any;
  status: any;
  location: any;
  type: any;
  post_time: any;
  salary: any;
  experience: any;
}

const JobPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [applicants, setApplicants] = useState<any[][]>([]);
  const filteredJobs = jobs.filter((job) =>
    job.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  useEffect(() => {
    console.log(localStorage.getItem("current_user_id"));
    getJobOfEmployer(localStorage.getItem("current_user_id") || "")
      .then((jobs) => {
        if (jobs !== null) {
          setJobs(jobs);
          Promise.all(jobs.map((job) => getApplied(job.job_id)))
            .then((applicantsPerJob) => {
              const filteredApplicants = applicantsPerJob.filter(
                (applicant) => applicant !== null
              ) as any[][];
              setApplicants(filteredApplicants);
            })
            .catch((error) => console.error(error));
        } else {
          setJobs([]);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const changeJobStatus = async (jobId: string) => {
    try {
      await toggleJobStatus(jobId);
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.job_id === jobId
            ? { ...job, status: job.status === "open" ? "close" : "open" }
            : job
        )
      );
    } catch (error) {
      console.error("Failed to toggle job status", error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-row w-1/2 justify-between mb-5">
        <div className="relative w-1/2">
          <input
            className=" bg-[#13544e] pl-10 rounded-lg h-[5vh] w-full text-white"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
            <Image
              src="/search_light.svg"
              alt="search"
              width={20}
              height={20}
            />
          </span>
        </div>
        <text className="flex items-center text-center">
          Total job: {jobs.length}
        </text>
      </div>
      <div className="grid grid-cols-6 gap-4 text-center overflow-hidden">
        <div>No.</div>
        <div>Name</div>
        <div>Applicants</div>
        <div>Status</div>
        <div className="col-span-2">Action</div>

        {filteredJobs.map((job, index) => (
          <>
            <div>{index + 1}</div>
            <div>{job.name}</div>
            <div>{(applicants[index] || []).length}</div>
            <div>{job.status === "open" ? "Visible" : "Hidden"}</div>
            <div className="col-span-2 flex justify-end">
              <div className="flex justify-between w-5/6">
                <button
                  onClick={() => changeJobStatus(job.job_id)}
                  className="bg-black text-white px-3 py-1 rounded-3xl"
                >
                  {job.status === "open" ? "Hide Job" : "Show Job"}
                </button>
                <Link
                  className="bg-black text-white px-3 py-1 rounded-3xl"
                  href={{
                    pathname: "/dashboard/applicants",
                    query: {
                      index: index,
                      id: job.job_id,
                      name: job.name,
                      status: job.status,
                    },
                  }}
                >
                  Check Applicants
                </Link>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default JobPage;
