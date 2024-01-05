import { Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import CardNotification from "../Card_Cotification/cardnoti";

const NotificationDropdown = () => {
  return (
    <div className="fixed px-1 py-1 translate-y-2 top-16 h-[90vh] right-6 w-4/12 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none overflow-y-auto">
      <h1 className="text-lg font-bold">Notifications</h1>
      <CardNotification
        name_sender="abc"
        logo_sender=""
        link=""
        content="Notification content"
        status="Read"
        time="12:34 PM"
      />
      <CardNotification
        name_sender="abc"
        logo_sender=""
        link=""
        content="Notification content"
        status="Unread"
        time="12:34 PM"
      />
      <CardNotification
        name_sender="abc"
        logo_sender=""
        link=""
        content="Notification content"
        status="Read"
        time="12:34 PM"
      />
      <CardNotification
        name_sender="abc"
        logo_sender=""
        link=""
        content="Notification content"
        status="Read"
        time="12:34 PM"
      />
      <CardNotification
        name_sender="abc"
        logo_sender=""
        link=""
        content="Notification content"
        status="Read"
        time="12:34 PM"
      />
      <CardNotification
        name_sender="abc"
        logo_sender=""
        link=""
        content="Notification content"
        status="Read"
        time="12:34 PM"
      />
      <CardNotification
        name_sender="abc"
        logo_sender=""
        link=""
        content="Notification content"
        status="Read"
        time="12:34 PM"
      />
      <CardNotification
        name_sender="abc"
        logo_sender=""
        link=""
        content="Notification content"
        status="Read"
        time="12:34 PM"
      />
      <CardNotification
        name_sender="abc"
        logo_sender=""
        link=""
        content="Notification content"
        status="Read"
        time="12:34 PM"
      />
    </div>
  );
};

export default NotificationDropdown;
