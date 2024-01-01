"use client";
import {
  acceptApplicantDB,
  declineApplicantDB,
  getApplied,
  toggleJobStatus,
} from "@/components/controller";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ApplicantPage = () => {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState(searchParams.get("status"));
  const index = parseInt(searchParams.get("index") || "", 10);
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [applicants, setApplicants] = useState<any[]>([]);

  useEffect(() => {
    console.log(localStorage.getItem("current_user_id"));
    getApplied(id)
      .then((applicants) => {
        setApplicants(applicants || []);
      })
      .catch((error) => console.error(error));
  }, []);

  const changeJobStatus = async (jobId: string) => {
    try {
      await toggleJobStatus(jobId);
      setStatus(status === "open" ? "close" : "open");
    } catch (error) {
      console.error("Failed to toggle job status", error);
    }
  };

  const acceptApplicant = async (applicantId: string) => {
    try {
      await acceptApplicantDB(applicantId, id);
      setApplicants(
        applicants.map((applicant) =>
          applicant.employee_id === applicantId
            ? { ...applicant, status: "Accepted" }
            : applicant
        )
      );
      console.log(applicants);
    } catch (error) {
      console.error("Failed to accept applicant", error);
    }
  };

  const declineApplicant = async (applicantId: string) => {
    try {
      await declineApplicantDB(applicantId, id);
      setApplicants(
        applicants.map((applicant) =>
          applicant.employee_id === applicantId
            ? { ...applicant, status: "Declined" }
            : applicant
        )
      );
      console.log(applicants);
    } catch (error) {
      console.error("Failed to decline applicant", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-6 gap-4 text-center mb-5">
        <div>No.</div>
        <div>Name</div>
        <div>Applicants</div>
        <div>Status</div>
        <div className="col-span-2">Action</div>
        <div>{index + 1}</div>
        <div>{name}</div>
        <div>{applicants.length}</div>
        <div>{status === "open" ? "Visible" : "Hidden"}</div>
        <div className="col-span-2 flex justify-center">
          <button
            onClick={() => changeJobStatus(id)}
            className="bg-black text-white px-3 py-1 rounded-3xl"
          >
            {status === "open" ? "Hide Job" : "Show Job"}
          </button>
        </div>
      </div>
      <hr style={{ height: 1, borderColor: "#000000" }} />
      <div className="grid grid-cols-6 gap-4 text-center mt-5">
        <div>No.</div>
        <div>Name</div>
        <div>Email</div>
        <div>Status</div>
        <div className="col-span-2">Action</div>
        {applicants.map((applicant, applicantIndex) => (
          <>
            <div>{applicantIndex + 1}</div>
            <div>{applicant.name}</div>
            <div>{applicant.email}</div>
            <div>{applicant.status}</div>
            <div className="col-span-2 flex justify-center">
              <div className="flex justify-between w-5/6">
                <button className="bg-black text-white px-3 py-1 rounded-3xl">
                  View CV
                </button>
                <button
                  onClick={() => acceptApplicant(applicant.employee_id)}
                  className="bg-[#13544e] text-white px-3 py-1 rounded-3xl"
                >
                  Accept
                </button>
                <button
                  onClick={() => declineApplicant(applicant.employee_id)}
                  className="bg-red text-white px-3 py-1 rounded-3xl"
                >
                  Decline
                </button>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default ApplicantPage;
