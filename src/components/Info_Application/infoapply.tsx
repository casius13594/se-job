"use client";
import { UUID } from "crypto";
import { useEffect, useState } from "react";
import { get_info_application } from "../controller";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function ApplicationView({
  onClosePopup,
  job_id,
}: {
  onClosePopup: () => void;
  job_id: string;
}) {
  const [info, setInfo] = useState<any>({});
  const [cvName, setCvName] = useState<string>("");
  const supabase = createClientComponentClient();
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  async function getInfoApply() {
    try {
      const info_apply = await get_info_application(job_id as UUID);
      const cvPath = info_apply.cv_path.split("/");
      const file_pdf = await supabase.storage
        .from("cv")
        .download(cvPath[cvPath.length - 2] + "/" + cvPath[cvPath.length - 1]);

      if (file_pdf.error) {
        console.error("Error fetching CV file", file_pdf.error);
      } else {
        setCvName(cvPath[cvPath.length - 1]);
        if (file_pdf.data) {
          const blob = new Blob([file_pdf.data], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);
          setFileUrl(url);
        }
      }

      setInfo(info_apply);
    } catch (error) {
      console.error("Error fetching application info", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getInfoApply();
  }, [job_id]);

  return (
    <div
      className="popup-overlay"
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
            Application view
          </div>
          <img src="/delete.svg" className="invisible" alt="" />
        </div>

        <div className="flex items-center justify-between px-8 py-2">
          <span>Contact infomation</span>
        </div>

        <div className="popup-content space-y-4 px-8 py-2">
          <form
            className="px-6 py-2 rounded-3xl"
            style={{
              border: "1px solid rgba(0, 0, 0, 0.29)",
            }}
          >
            {/* Other form elements */}
            <label className="flex flex-col mt-2">
              <span className="mb-1">Name</span>
              <text
                className="h-8 px-1 font-normal rounded-md focus:outline-none"
                style={{
                  border: "1px solid rgba(0, 0, 0, 1)",
                }}
              >
                {info.name ? info.name : ""}
              </text>
            </label>
            <label className="flex flex-col mt-2">
              <span className="mb-1">Email</span>
              <text
                className="h-8 px-1 font-normal rounded-md focus:outline-none"
                style={{
                  border: "1px solid rgba(0, 0, 0, 1)",
                }}
                type="email"
              >
                {info.email ? info.email : ""}
              </text>
            </label>
            <label className="flex flex-col mt-2">
              <span className="mb-1">Phone</span>
              <text
                className="h-8 px-1 font-normal rounded-md focus:outline-none"
                style={{
                  border: "1px solid rgba(0, 0, 0, 1)",
                }}
              >
                {info.phone ? info.phone : ""}
              </text>
            </label>
            <label className="flex flex-col mt-2">
              <div className="flex items-center justify-between">
                <span className="mb-1">Your CV</span>
                {fileUrl ? (
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-14 py-1 font-normal rounded-xl cursor-pointer hover:bg-lime-300 bg-slate-400"
                  >
                    {cvName}
                  </a>
                ) : (
                  <label
                    className="px-14 py-1 font-normal rounded-xl cursor-pointer hover:bg-gray-400"
                    style={{
                      border: "1px solid rgba(0, 0, 0, 1)",
                    }}
                  >
                    None
                  </label>
                )}
              </div>
            </label>
            <label className="flex flex-col mt-2">
              <span className="mb-1">Proposal letter</span>
              <text
                className="p-1 autoSize rounded-md focus:outline-none font-normal"
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.5)",
                }}
                name="proposal"
              >
                {info.propo_letter ? info.propo_letter : ""}
              </text>
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
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
