/* eslint-disable react/jsx-key */
"use client";

import {
  getJobDetail,
  getRelatedJob,
  takeURL,
  getSavedJob,
  saveJob,
  unsaveJob,
} from "@/components/controller";
import React, { useState } from "react";
import { TfiMoney } from "react-icons/tfi";
import { dm_sans } from "@/components/fonts";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { BsBoxFill } from "react-icons/bs";
import "./jobdetail.css";
import { MdOutlineAttachMoney, MdWorkHistory } from "react-icons/md";
import { requireLogin } from "@/components/popupModal";
// import { cookies } from "next/headers";

export default function JobDetail() {
  const [savedJobs, setSavedJobs] = React.useState<any[]>([]);
  const [loginRequired, setLoginRequired] = React.useState<boolean>(false);
  const [job, setJob] = React.useState(null);
  const [relatedJobs, setRelatedJobs] = React.useState([]); // [
  const job_id =
    typeof window !== "undefined" ? localStorage.getItem("job_id") || "" : "";

  const [isPopupVisible, setPopupVisibility] = React.useState(false);
  const [reset, setReset] = React.useState<boolean>(false);

  const handleApplyNowClick = () => {
    setPopupVisibility(true);
  };

  const handleClosePopup = () => {
    setPopupVisibility(false);
  };

  function toggleReset() {
    setReset(!reset);
  }

  React.useEffect(() => {
    getJobDetail(job_id).then((job) => {
      setJob(job);
    });

    getRelatedJob(job_id).then((jobs) => {
      setRelatedJobs(jobs);
    });

    const savedJobList = getSavedJob();
    savedJobList.then((jobs) => {
      setSavedJobs(jobs || []);
    });
  }, [reset]);
  if (!job) return;
  return (
    <>
      <main
        className={`flex flex-col w-[100vw] h-[100vh] ${dm_sans.className} pt-[2vh]`}
      >
        {requireLogin(loginRequired, () => setLoginRequired(false))}
        <JobDetailPage
          job={job}
          savedJobs={savedJobs}
          relatedJobs={relatedJobs}
          setLoginRequired={setLoginRequired}
          onApplyNowClick={handleApplyNowClick}
          setReset={toggleReset}
        />
        {isPopupVisible && <ApplicationPopup onClosePopup={handleClosePopup} />}
      </main>
    </>
  );
}

function JobDetailPage({
  job,
  savedJobs,
  relatedJobs,
  setLoginRequired,
  onApplyNowClick,
  setReset,
}: {
  job: any;
  savedJobs: any[];
  relatedJobs: any[];
  setLoginRequired: (logedIn: boolean) => void;
  onApplyNowClick: () => void;
  setReset: () => void;
}) {
  const [employer, setEmployer] = useState<any[]>([]);
  React.useEffect(() => {
    if (job) {
      takeURL(job.employer_id).then((employerData) => {
        if (employerData !== null) {
          setEmployer(employerData);
        }
      });
    }
  }, [job]);
  console.log(employer);
  const formatDateToDDMMYYYY = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <style jsx global>{`
        ::-webkit-scrollbar {
          display: none;
        }
        body {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
      <div className="flex flex-row w-full justify-between px-[1vw]">
        <div className="flex flex-col w-[45vw] h-full space-y-[2vh]">
          <div className="flex flex-row w-full border-2 border-slate-400 rounded-3xl bg-[#13544E26]">
            <div className="flex flex-row w-full">
              <div className="flex m-[1vw]">
                <img
                 className="placeholder-image -translate-x-4 translate-y-2"
                  src={job.employer_logo || "/logo.svg"}
                  alt=""
                />
              </div>
              <div className="flex flex-col justify-between w-full p-[1vw]">
                <div className="flex flex-row justify-between w-full">
                  <h1 className="text-xl font-bold">{job.name}</h1>
                  <div className="flex flex-row space-x-[1vw] space-y-[0.5vh]">
                    <h1 className="text-xl font-bold">{job.salary} Millions</h1>
                  </div>
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
                  <h1 className="text-md">
                    {formatDateToDDMMYYYY(new Date(job.post_time))}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full items-center">
            <div className="flex flex-row rounded-full bg-[#D9D9D9] text-sm p-[1vw] font-bold">
              You might interested in
            </div>
            <div className="flex flex-col w-full h-full overflow-y-scroll no-scrollbar ">
              {relatedJobs.map((job) => {
                return (
                  <div
                    key={job.job_id}
                    className="flex flex-row w-full border-2 border-slate-400 rounded-3xl bg-white  hover:bg-[#13544E26] mt-[2vh] overflow-y-scroll no-scrollbar"
                    onClick={() => {
                      const job_id = job.job_id as string;
                      localStorage.setItem("job_id", job_id);
                      window.location.href = "/jobdetail";
                    }}
                  >
                    <div className="flex flex-row w-full">
                      <div className="flex m-[1vw]">
                        <img
                          className="placeholder-image -translate-x-4 translate-y-2"
                          src={job.employer_logo || "/logo.svg"}
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col justify-between w-full p-[1vw]">
                        <div className="flex flex-row justify-between w-full">
                          <h1 className="text-xl font-bold">{job.name}</h1>
                          <div className="flex flex-row space-x-[1vw] space-y-[0.5vh]">
                            <h1 className="text-xl font-bold">
                              {job.salary} Millions
                            </h1>
                          </div>
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
                          <h1 className="text-md">
                            {formatDateToDDMMYYYY(new Date(job.post_time))}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[50vw] min-h-full bg-[#D9D9D9] rounded-3xl overflow-y-scroll no-scrollbar space-y-[2vh]">
          <div className="flex flex-row w-full p-[1vw]">
            <div className="flex flex-row w-full space-x-[1vw]">
              <h1 className="text-xl font-bold">{job.name}</h1>
              <ul className="flex flex-row list-disc list-inside space-x-[1vw]">
                <li className="text-base">{job.location}</li>
                <li className="text-base">
                  {formatDateToDDMMYYYY(new Date(job.post_time))}
                </li>
              </ul>
            </div>
            <Link href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="35"
                viewBox="0 0 32 35"
                fill="none"
              >
                <path
                  d="M26.6665 11.6667L27.4045 12.3415L28.0215 11.6667L27.4045 10.9919L26.6665 11.6667ZM19.9998 28.7084C20.5521 28.7084 20.9998 28.2607 20.9998 27.7084C20.9998 27.1561 20.5521 26.7084 19.9998 26.7084L19.9998 28.7084ZM20.7379 19.6331L27.4045 12.3415L25.9285 10.9919L19.2618 18.2836L20.7379 19.6331ZM27.4045 10.9919L20.7379 3.70027L19.2618 5.04981L25.9285 12.3415L27.4045 10.9919ZM26.6665 10.6667L13.354 10.6667L13.354 12.6667L26.6665 12.6667L26.6665 10.6667ZM13.354 28.7084L19.9998 28.7084L19.9998 26.7084L13.354 26.7084L13.354 28.7084ZM4.33317 19.6875C4.33317 24.6696 8.37193 28.7084 13.354 28.7084L13.354 26.7084C9.47651 26.7084 6.33317 23.565 6.33317 19.6875L4.33317 19.6875ZM13.354 10.6667C8.37194 10.6667 4.33317 14.7055 4.33317 19.6875L6.33317 19.6875C6.33317 15.81 9.47651 12.6667 13.354 12.6667L13.354 10.6667Z"
                  fill="#33363F"
                />
              </svg>
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="35"
              viewBox="0 0 25 18"
              fill="none"
              onClick={() => alert("To be implemented")}
            >
              <rect
                width="24.9231"
                height="4.15385"
                rx="2.07692"
                fill="black"
              />
              <rect
                y="6.9231"
                width="24.9231"
                height="4.15385"
                rx="2.07692"
                fill="black"
              />
              <rect
                y="13.8462"
                width="24.9231"
                height="4.15385"
                rx="2.07692"
                fill="black"
              />
            </svg>
          </div>
          <div className="flex flex-col w-full rounded-3xl border-2 border-[#13544E] bg-[#F2F0F0] space-y-[1vh] py-[2vh]">
            <div className="flex flex-row w-full justify-between px-[2vw]">
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-xl font-bold text-center">Experience</h1>
                <div className="circular-icon">
                  <BsBoxFill />
                </div>
                <h1 className="text-base text-center">{job.experience}</h1>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-xl font-bold text-center">Type</h1>
                <div className="circular-icon">
                  <MdWorkHistory />
                </div>
                <h1 className="text-base text-center">{job.type}</h1>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-xl font-bold text-center">Salary</h1>
                <div className="circular-icon">
                  <TfiMoney />
                </div>
                <h1 className="text-base text-center">{job.salary} Millions</h1>
              </div>
            </div>
            <div className="flex flex-row w-full px-[2vw] justify-between">
              <button
                className="flex flex-row w-[30vw] rounded-full hover:bg-[#1C7E75] bg-[#13544E] items-center justify-center space-x-[1vw]"
                onClick={onApplyNowClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M13.8325 6.17463L8.10904 11.9592L1.59944 7.88767C0.66675 7.30414 0.860765 5.88744 1.91572 5.57893L17.3712 1.05277C18.3373 0.769629 19.2326 1.67283 18.9456 2.642L14.3731 18.0868C14.0598 19.1432 12.6512 19.332 12.0732 18.3953L8.10601 11.9602"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <h1 className="text-xl font-bold text-center text-white py-[1vh]">
                  Apply now
                </h1>
              </button>
              <button
                className="flex flex-row w-[12vw] rounded-full hover:bg-[#CCCCCC] bg-[#D9D9D9] items-center justify-center space-x-[1vw]"
                onClick={() => {
                  if (
                    savedJobs
                      .map((savedJob) => savedJob.Job.job_id)
                      .includes(job.job_id)
                  ) {
                    unsaveJob(job.job_id);
                  } else {
                    saveJob(job.job_id).then((res) => {
                      res == false ? setLoginRequired(true) : null;
                    });
                  }
                  setReset();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="20"
                  viewBox="0 0 22 20"
                  fill={
                    savedJobs
                      .map((savedJob) => savedJob.Job.job_id)
                      .includes(job.job_id)
                      ? "red"
                      : "none"
                  }
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.87187 9.59832C0.798865 6.24832 2.05287 2.41932 5.56987 1.28632C7.41987 0.689322 9.46187 1.04132 10.9999 2.19832C12.4549 1.07332 14.5719 0.693322 16.4199 1.28632C19.9369 2.41932 21.1989 6.24832 20.1269 9.59832C18.4569 14.9083 10.9999 18.9983 10.9999 18.9983C10.9999 18.9983 3.59787 14.9703 1.87187 9.59832Z"
                    stroke="black"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15 4.69995C16.07 5.04595 16.826 6.00095 16.917 7.12195"
                    stroke="black"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <h1 className="text-xl font-bold text-center py-[1vh]">
                  Save job
                </h1>
              </button>
            </div>
          </div>
          <div className="flex flex-col w-full px-[2vw] space-y-[3vh]">
            <div className="flex flex-row w-full space-x-[1vw]">
              <div className="flex w-[0.5vw] h-full bg-[#13544E]" />
              <h1 className="text-2xl font-bold">Job details</h1>
            </div>
            <div className="flex flex-col w-full py-[1vh]">
              <ul>
                <h1 className="text-xl font-bold">About the job</h1>
                {job.content ? (
                  job.content.split("\n").map((item: string) => {
                    return <li className="text-base">{item}</li>;
                  })
                ) : (
                  <p>None</p>
                )}
              </ul>
              <ul>
                <h1 className="text-xl font-bold">Requirements</h1>
                {job.requirement ? (
                  job.requirements.split("\n").map((item: string) => {
                    return <li className="text-base">{item}</li>;
                  })
                ) : (
                  <p>None</p>
                )}
              </ul>
              <ul>
                <h1 className="text-xl font-bold">Benefits</h1>
                {job.benefits ? (
                  job.benefits.split("\n").map((item: string) => {
                    return <li className="text-base">{item}</li>;
                  })
                ) : (
                  <p>None</p>
                )}
              </ul>
            </div>
            <div className="flex flex-row w-full space-x-[1vw]">
              <div className="flex w-[0.5vw] h-full bg-[#13544E]" />
              <h1 className="text-2xl font-bold">Company Infomation</h1>
              
            </div>
            <div className="flex flex-row w-full rounded-3xl">
            <div className="flex flex-row w-full">
              <div className="flex m-[1vw]">
                <img
                 className="placeholder-image -translate-x-4 translate-y-2"
                  src={employer[0]?.logo || "/logo.svg"}
                  alt=""
                />
              </div>
              <div className="flex flex-col justify-between w-full p-[1vw]">
              <a href={employer[0]?.url || ""} target="_blank" rel="noopener noreferrer">
  <div className="flex flex-row justify-between w-full">
    <h1 className="text-3xl font-bold hover:underline cursor-pointer">
      {employer[0]?.name}
    </h1>
  </div>
</a>
                <div className="flex flex-row w-full">
                  <h1 className="text-base">{employer[0]?.description}</h1>
                </div>
                <div className="flex flex-row w-full">
                  <h1 className="text-sm">
                  • {employer[0]?.location} • {employer[0]?.size} employees
                  </h1>
                </div>
              </div>
            </div>
          </div>
            <div> </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ApplicationPopup({ onClosePopup }: { onClosePopup: () => void }) {
  const [nameApply, setNameApply] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [proposal, setProposal] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const supabase = createClientComponentClient();

  const isFormValid = nameApply && email && phone && cv;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setCv(file);
  };

  const handleFileRemove = () => {
    setCv(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) {
      return;
    }

    const currentUser = await supabase.auth.getUser();
    const user_id = currentUser.data?.user?.id;
    const cv_path = `cv/${user_id}/${cv.name}`;

    await supabase.storage
      .from("cv")
      .upload(user_id + "/" + cv?.name, cv as File, {
        upsert: true,
      });

    let proposalText = "";
    if (proposal) {
      proposalText = proposal;
    }

    await supabase
      .schema("public")
      .from("Applied")
      .insert([
        {
          job_id: localStorage.getItem("job_id") || "",
          employee_id: user_id!,
          time: new Date(),
          name: nameApply,
          email: email,
          phone: phone,
          cv_path: cv_path,
          propo_letter: proposalText,
          status: "Pending",
        },
      ]);

    // Clear the form state after submission
    setNameApply("");
    setEmail("");
    setPhone("");
    setCv(null);
    onClosePopup();
  };

  return (
    <div
      className="popup-overlay overflow-auto"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Grey color with 50% opacity
        zIndex: 8, // Ensure the overlay is behind the dialog (z-index: 10)
      }}
    >
      <div
        className="popup-container w-[822px] bg-white p-6 border rounded-xl mt-14 text-xl font-bold"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <div className="popup-header flex items-center justify-between">
          <img
            onClick={onClosePopup}
            src="/delete.svg"
            className="cursor-pointer"
            alt=""
          />
          <div className="flex items-center bg-green text-white px-10 py-3 rounded-xl">
            Application form
          </div>
          <img src="/delete.svg" className="invisible" alt=""/>
        </div>

        <div className="flex items-center justify-between px-8 py-2">
          <span>Contact infomation</span>
          <span className="text-red">* Required field</span>
        </div>

        <div className="popup-content space-y-4 px-8 py-2">
          <form
            onSubmit={handleSubmit}
            className="px-6 py-2 rounded-3xl"
            style={{
              border: "1px solid rgba(0, 0, 0, 0.29)",
            }}
          >
            {/* Other form elements */}
            <label className="flex flex-col mt-2">
              <span className="mb-1">
                Name <span className="text-red">*</span>
              </span>
              <input
                className="h-8 px-1 font-normal rounded-md focus:outline-none"
                style={{
                  border: "1px solid rgba(0, 0, 0, 1)",
                }}
                type="text"
                name="name"
                autoComplete="name"
                required
                value={nameApply}
                onChange={(e) => setNameApply(e.target.value)}
              />
            </label>
            <label className="flex flex-col mt-2">
              <span className="mb-1">
                Email <span className="text-red">*</span>
              </span>
              <input
                className="h-8 px-1 font-normal rounded-md focus:outline-none"
                style={{
                  border: "1px solid rgba(0, 0, 0, 1)",
                }}
                type="email"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="flex flex-col mt-2">
              <span className="mb-1">
                Phone <span className="text-red">*</span>
              </span>
              <input
                className="h-8 px-1 font-normal rounded-md focus:outline-none"
                style={{
                  border: "1px solid rgba(0, 0, 0, 1)",
                }}
                type="tel"
                name="phone"
                autoComplete="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
            <label className="flex flex-col mt-2">
              <span className="mb-1">
                Upload your CV <span className="text-red">*</span>
              </span>
              <div className="flex items-center justify-between">
                <span className="font-normal">
                  Maximum size 5MB, pdf format only
                </span>
                {cv ? (
                  <div className="flex items-center space-x-2">
                    <span>{cv.name}</span>
                    <button
                      type="button"
                      onClick={handleFileRemove}
                      className="text-red"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label
                    className="px-14 py-1 font-normal rounded-xl cursor-pointer hover:bg-gray-400"
                    style={{
                      border: "1px solid rgba(0, 0, 0, 1)",
                    }}
                  >
                    Upload CV
                    <input
                      type="file"
                      name="cv"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                  </label>
                )}
              </div>
            </label>
            <label className="flex flex-col mt-2">
              <span className="mb-1">Proposal letter</span>
              <textarea
                className="p-1  rounded-md focus:outline-none font-normal"
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.5)",
                }}
                name="proposal"
                value={proposal}
                onChange={(e) => setProposal(e.target.value)}
                rows={4}
                placeholder="Write your ability, skills, and experience so that employers understand your potential better"
              />
            </label>
            <div className="flex items-center justify-between">
              <div className="flex flex-col font-normal">
                <span className="py-1 text-xs">
                  This form is provided by{" "}
                  <span
                    style={{
                      color: "#13544E",
                      fontFamily: "DM Serif Display",
                      fontSize: "30px",
                      fontStyle: "italic",
                      fontWeight: 700,
                      lineHeight: "29.333px",
                      letterSpacing: "-0.4px",
                    }}
                  >
                    Jelp
                  </span>
                </span>
                <span className="py-1 text-xs">
                  Employee should conduct clear research before applying the
                  company
                </span>
              </div>

              <button
                type="submit"
                className={`px-20 py-2 rounded-3xl ${
                  isFormValid
                    ? "bg-[#13544ED1] hover:bg-green"
                    : "bg-gray-400 cursor-not-allowed"
                } italic text-white`}
                disabled={!isFormValid}
              >
                Apply
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
