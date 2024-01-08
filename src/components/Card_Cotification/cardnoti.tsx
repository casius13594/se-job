"use client";
import { UUID } from "crypto";
import { formatDistanceToNow, parseISO } from "date-fns";
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

  const formatDate = (date: string): string => {
    const parsedDate = parseISO(date);
    const timeAgo = formatDistanceToNow(parsedDate);

    return timeAgo + " ago";
  };

  return (
    <div
      onClick={handleButtonClick}
      className="flex flex-row border-2 border-black w-full max-h-20 py-1 rounded-md shadow-md hover:bg-[#D9D9D9]"
    >

      <div className="flex w-3/12 mx-[0.01vw] rounded-full overflow-hidden items-center justify-center">
        <img
          className=" h-3/4 rounded-full object-fit no-drag"
          style={{ borderRadius: "50%", aspectRatio: "1/1" }}
          src={logo_sender ? logo_sender : "/logo.svg"}
          alt=""
        />
      </div>
      <div className="flex flex-col justify-between w-9/12">
        <h1 className="text-sm font-bold">{name_sender}</h1>
        <h1 className="text-xs">{content}</h1>
        <h2 className="text-xs">{formatDate(time)}</h2>
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
