"use client";
import { useEffect, useMemo, useState } from "react";
import AppBar from "@/components/appbar";
import CardApplied, { Jobapplied } from "@/components/cardjobapplied";
import { fetchData, is_user } from "@/components/controller";
import { IoMdHome, IoIosWarning } from "react-icons/io";
import { TbError404 } from "react-icons/tb";
import { requireLogin } from "@/components/popupModal";
import debounce from "lodash.debounce";
import { UUID } from "crypto";
import { ApplicationView } from "@/components/Info_Application/infoapply";

export default function page() {
  const [data, setData] = useState<Jobapplied[]>([]);
  const [isClick, setIsClick] = useState<number>(1);
  const [isuser, setIsuser] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [jobIdInView, setJobIdInView] = useState<string | "">("");

  const closeForm = () => {
    setIsFormVisible(false);
  };

  const openViewInfo = (job_id: string) => {
    setIsFormVisible(true);
    setJobIdInView(job_id);
  };

  const button = [
    // put property in here.
    { id: 1, icon: <IoMdHome />, name: "Saved and Applied Job" },
    { id: 2, icon: <IoMdHome />, name: "Saved Job" },
    { id: 3, icon: <IoMdHome />, name: "Applied Job" },
  ];

  const fetchDataFromSupabase = async (id: number) => {
    setIsLoading(true);
    const check_user = await is_user();

    setIsuser(check_user);
    if (check_user) {
      const storedSearchTerm = localStorage.getItem("search_jobapplied");
      setData(await fetchData(id, storedSearchTerm));
    }
    setIsLoading(false);
  };

  const debouncedFetchData = useMemo(
    () => debounce(fetchDataFromSupabase, 200),
    []
  );

  useEffect(() => {
    localStorage.setItem("id_click", isClick.toString());
    fetchDataFromSupabase(isClick);
  }, []);

  useEffect(() => {
    // listen to enter clicked
    window.addEventListener(
      "keypress",
      (e) => {
        if (e.key == "Enter") {
          const stringNumber = localStorage.getItem("id_click");
          if (stringNumber) {
            debouncedFetchData(parseInt(stringNumber, 10));
          } else {
            fetchDataFromSupabase(1);
          }
        }
      },
      false
    );
  }, []);

  const handleClick = (id: number) => {
    setIsClick(id);
    localStorage.setItem("id_click", id.toString());
    debouncedFetchData(id);
  };

  if (!isuser) {
    return (
      <>
        <AppBar />
        <main
          className={`flex flex-col h-full w-full items-center justify-center p-[8vh]`}
        >
          <svg
            stroke="red"
            fill="red"
            stroke-width="0"
            viewBox="0 0 512 512"
            height="300"
            width="300"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M228.9 79.9L51.8 403.1C40.6 423.3 55.5 448 78.9 448h354.3c23.3 0 38.2-24.7 
                        27.1-44.9L283.1 79.9c-11.7-21.2-42.5-21.2-54.2 0zM273.6 214L270 336h-28l-3.6-122h35.2zM256 402.4c-10.7 
                        0-19.1-8.1-19.1-18.4s8.4-18.4 19.1-18.4 19.1 8.1 19.1 18.4-8.4 18.4-19.1 18.4z"
            ></path>
          </svg>

          <h1 className="text-red text-2xl">
            {" "}
            Guest, employer or no role do not have access
          </h1>
          <div className="text-left flex flex-col m-[2vh]">
            <h1 className="text-black text-xl">Hint :</h1>
            <h1 className="text-black text-xl">
              Register - login - choose employee role
            </h1>
            <h1 className="text-black text-xl">Employers do not have access</h1>
          </div>
        </main>
      </>
    );
  } else {
    return (
      <>
        <style jsx global>{`
          html,
          body {
            overflow: hidden;
            height: 100%;
            margin: 0;
            padding: 0;
          }
        `}</style>
        <AppBar />
        <main className={`flex flex-col h-[100vh]`}>
          {isLoading}
          <div className="flex flex-row h-[90vh]">
            <div className="flex flex-col w-1/5 ml-[2vw]">
              <h1 className="font-bold text-2xl">Save and Applied Job</h1>
              {button.map((bt) => (
                <button
                  key={bt.id}
                  onClick={() => handleClick(bt.id)}
                  className={`${
                    isClick === bt.id ? "border-b-black border-b-2" : ""
                  }
                                flex flex-row items-center text-left w-full my-2 py-2`}
                >
                  <div className="circle-button m-2">
                    {bt.icon} {/* Use the icon React component here */}
                  </div>
                  <h1 className="font-bold">{bt.name}</h1>
                </button>
              ))}
            </div>
            <div className="flex flex-col w-3/5 mx-[2vw] overflow-auto no-scrollbar">
              <div className="h-90vh ">
                {data.map((item) => (
                  <CardApplied {...item} onViewClick={openViewInfo} />
                ))}
              </div>
            </div>
          </div>
          {isFormVisible && (
            <ApplicationView onClosePopup={closeForm} job_id={jobIdInView} />
          )}
        </main>
      </>
    );
  }
}
