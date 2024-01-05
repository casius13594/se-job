"use client";
import React, { Fragment, useEffect, useState } from "react";
import CardNotification, { InfoNoti } from "../Card_Cotification/cardnoti";
import { get_noti_list } from "../controller";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const NotificationDropdown = () => {
  const [listNoti, setListNoti] = useState<InfoNoti[]>([]);

  async function fetch_noti() {
    const noti_list = await get_noti_list();
    console.log("vo");
    setListNoti(noti_list || []);
  }

  useEffect(() => {
    fetch_noti();
  });

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
