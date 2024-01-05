"use client";
import { UUID } from "crypto";
import React, { useState } from "react";
import { FaCircle } from "react-icons/fa";

export interface InfoNoti {
  name_sender: string;
  logo_sender: string;
  link: string;
  content: string;
  status: string;
  time: string;
}

const CardNotification: React.FC<InfoNoti> = ({
  name_sender,
  logo_sender,
  link,
  content,
  status,
  time,
}) => {
  const check_status = status === "Unread";
  const handleButtonClick = () => {};

  return (
    <div
      onClick={handleButtonClick}
      className="flex flex-row border-2 border-black w-full max-h-80 py-1 rounded-md "
    >
      <div className="flex w-3/12 mx-[0.01vw] rounded-full overflow-hidden items-center justify-center">
        <img
          className="w-2/5 rounded-full object-contain no-drag"
          src={logo_sender ? logo_sender : "/logo.svg"}
          alt=""
        />
      </div>
      <div className="flex flex-col justify-between w-8/12">
        <h1 className="text-xl font-bold">{name_sender}</h1>
        <h1 className="text-base">{content}</h1>
        <h2 className="text-xs">{time}</h2>
      </div>
      {check_status && (
        <div className="flex justify-between items-center w-1/12">
          <FaCircle style={{ color: "blue" }} />
        </div>
      )}
    </div>
  );
};

export default CardNotification;
