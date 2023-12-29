"use client";

import { UserInfo } from "@/components/userinfo";
import AppBar from "@/components/appbar";
import { dm_sans } from "@/components/fonts";
import Link from "next/link";

export default function BasicInfo() {
  return (
    <main
      className={`flex flex-col w-[100vw] h-[100vh] ${dm_sans.className} pt-[2vh] overflow-hidden`}
    >
      <AppBar />
      <UserInfo
        isBasic={false}
        content={
          <div className="flex flex-col w-full h-full">
            <div className="flex flex-row w-full h-[10vh] space-x-[1vw]">
              <Link
                href="./auth/changePassword"
                className="w-full h-full mt-[1vw]"
              >
                <button className="btnSetting__password w-full h-full font-bold bg-gray-300 hover:bg-gray-400 active:bg-gray-500">
                  Change your password
                </button>
              </Link>
            </div>
          </div>
        }
      />
      <footer className="w-full h-40 pt-4">
        <div className="w-full h-10 flex bg-green pl-10 text-white text-2xl font-bold items-center">
          JELP
        </div>
        <div className="w-full h-20 flex pl-10 text-2xl font-bold items-center">
          © Jelp. All Rights Reserved.
        </div>
      </footer>
    </main>
  );
}
