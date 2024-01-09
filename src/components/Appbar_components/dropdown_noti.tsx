/* eslint-disable react/jsx-key */
"use client";
import React, { Fragment, useEffect, useState } from "react";
import CardNotification, { InfoNoti } from "../Card_Cotification/cardnoti";

interface NotificationDropdownProps {
  listNoti: InfoNoti[];
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  listNoti,
}) => {
  return (
    <div className="z-10 fixed px-1 py-1 translate-y-2 top-16 h-[50vh] right-6 w-3/12 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-2xl  focus:outline-none overflow-y-auto">
      <div className="flex flex-row">
        <h1 className="text-lg font-bold ml-3">Notifications </h1>
        <div className="text-sm ml-4 rounded-full bg-[#AD343E] flex items-center justify-center w-5 h-5 text-white translate-y-1">
          {listNoti.length}{" "}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 5,
        }}
      >
        <div style={{ flex: 1, height: "1px", backgroundColor: "black" }} />
      </div>
      {listNoti.map((item: InfoNoti) => (
        <CardNotification {...item} />
      ))}
    </div>
  );
};

export default NotificationDropdown;
