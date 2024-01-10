import { dm_sans } from "@/components/fonts";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <main
      className={`flex flex-col w-full h-full ${dm_sans.className} pt-[2vh] overflow-hidden`}
    >
      <div className="text-2xl font-bold"> Security Settings</div>
      <div className="border-b mt-4 mb-4 border-green w-1/5 "></div>
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-row w-full h-[10vh] space-x-[1vw]">
          <Link
            href="../auth/changePassword"
            className="w-full h-full mt-[1vw]"
          >
            <button className="btnSetting__password w-1/5 h-full font-bold bg-gray-300 hover:bg-gray-400 active:bg-gray-500">
              Change your password
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default page;
