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
    <div className="z-10 fixed px-1 py-1 translate-y-2 top-16 h-[90vh] right-6 w-4/12 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none overflow-y-auto">
      <h1 className="text-lg font-bold">Notifications</h1>
      {listNoti.map((item: InfoNoti) => (
        <CardNotification {...item} />
      ))}
    </div>
  );
};

export default NotificationDropdown;
