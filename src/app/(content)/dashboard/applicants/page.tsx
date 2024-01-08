"use client";
import {
  acceptApplicantDB,
  declineApplicantDB,
  employerUpdateApplied,
  getApplied,
  insert_noti,
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
    getApplied(id || "null")
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
      await employerUpdateApplied(id || "null", applicantId, "Accepted");
      setApplicants(
        applicants.map((applicant) =>
          applicant.employee_id === applicantId
            ? { ...applicant, status: "Accepted" }
            : applicant
        )
      );
      insert_noti(applicantId, "Your application has been approved");
      console.log(applicants);
    } catch (error) {
      console.error("Failed to accept applicant", error);
    }
  };

  const declineApplicant = async (applicantId: string) => {
    try {
      await employerUpdateApplied(id || "null", applicantId, "Declined");
      setApplicants(
        applicants.map((applicant) =>
          applicant.employee_id === applicantId
            ? { ...applicant, status: "Declined" }
            : applicant
        )
      );
      insert_noti(applicantId, "Your application has been declined");
      console.log(applicants);
    } catch (error) {
      console.error("Failed to decline applicant", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-6 gap-4 text-center mb-5">
        <div className = 'font-bold'>No.</div>
        <div className = 'font-bold'>Name</div>
        <div className = 'font-bold'>Applicants</div>
        <div className = 'font-bold'>Status</div>
        <div className="col-span-2 font-bold">Action</div>
        <div className = 'text-sm'>{index + 1}</div>
        <div className = 'text-sm'>{name}</div>
        <div className = 'text-sm'>{applicants.length}</div>
        <div className = 'text-sm'>{status === "open" ? "Visible" : "Hidden"}</div>
        <div className="col-span-2 flex justify-center">
          <button
            onClick={() => changeJobStatus(id || "null")}
            className="bg-black text-white px-3 py-1 rounded-3xl text-sm"
          >
            {status === "open" ? "Hide Job" : "Show Job"}
          </button>
        </div>
      </div>
      <hr style={{ height: 1, borderColor: "#000000" }} />
      <div className="grid grid-cols-6 gap-4 text-center mt-5 overflow-hidden">
        <div className = 'font-bold'>No.</div>
        <div className = 'font-bold'>Name</div>
        <div className = 'font-bold'>Email</div>
        <div className = 'font-bold'>Status</div>
        <div className="col-span-2 font-bold">Action</div>
        {applicants.map((applicant, applicantIndex) => (
          <>
            <div className = 'text-sm'>{applicantIndex + 1}</div>
            <div className = 'text-sm'>{applicant.name}</div>
            <div className = 'text-sm'>{applicant.email}</div>
            <div className = 'text-sm'>{applicant.status}</div>
            <div className="col-span-2 flex justify-center">
              <div className="flex justify-between w-5/6">
                <button className="bg-black text-white px-3 py-1 rounded-3xl text-sm">
                  View CV
                </button>
                <button
                  onClick={() => acceptApplicant(applicant.employee_id)}
                  className="bg-[#13544e] text-white px-3 py-1 rounded-3xl text-sm"
                >
                  Accept
                </button>
                <button
                  onClick={() => declineApplicant(applicant.employee_id)}
                  className="bg-red text-white px-3 py-1 rounded-3xl text-sm"
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
