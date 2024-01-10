"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  getApplied,
  getJobOfEmployer,
  getPending,
  toggleJobStatus,
} from "@/components/controller";
import Link from "next/link";
import { ClipLoader } from "react-spinners";

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
  const [isLoading, setIsLoading] = useState(false);
  const filteredJobs = jobs.filter((job) =>
    job.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  useEffect(() => {
    setIsLoading(true);
    console.log(localStorage.getItem("current_user_id"));
    getJobOfEmployer(localStorage.getItem("current_user_id") || "")
      .then((jobs) => {
        if (jobs !== null) {
          setJobs(jobs);
          Promise.all(jobs.map((job) => getPending(job.job_id)))
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
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
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
      {isLoading ? (
        <ClipLoader color="#ffffff" loading={true} size={50}></ClipLoader>
      ) : (
        <>
          <div className="flex flex-row w-1/2 justify-between mb-5">
            <div className="relative w-1/2">
              <input
                className=" bg-[#d9d9d9] pl-10 rounded-lg h-[5vh] w-full text-white"
                placeholder="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                <Image
                  src="/search.svg"
                  alt="search"
                  width={20}
                  height={20}
                />
              </span>
            </div>
            <text className="flex items-center text-center text-base font-black">
              Total job: {jobs.length}
            </text>
          </div>
          <div className="grid grid-cols-6 gap-4 text-center overflow-hidden text-bold">
            <div className="font-bold">No.</div>
            <div className="font-bold">Name</div>
            <div className="font-bold">Applicants</div>
            <div className="font-bold">Status</div>
            <div className="col-span-2 font-bold">Action</div>

            {filteredJobs.map((job, index) => (
              <>
                <div className="text-sm">{index + 1}</div>
                <div className="text-sm">{job.name}</div>
                <div className="text-sm">
                  {(applicants[index] || []).length}
                </div>
                <div className="text-sm">
                  {job.status === "open"
                    ? "Visible"
                    : job.status === "pending"
                    ? "Pending"
                    : "Hidden"}
                </div>
                <div className="col-span-2 flex justify-end">
                  <div className="flex justify-between w-5/6">
                    {job.status !== "pending" ? (
                      <button
                        onClick={() => changeJobStatus(job.job_id)}
                        className="bg-black text-white px-3 py-1 rounded-3xl text-sm"
                      >
                        {job.status === "open" ? "Hide Job" : "Show Job"}
                      </button>
                    ) : (
                      <div className="px-3 py-1 rounded-3xl text-sm"></div>
                    )}
                    <Link
                      className="bg-black text-white px-3 py-1 rounded-3xl text-sm"
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
        </>
      )}
    </div>
  );
};

export default JobPage;
