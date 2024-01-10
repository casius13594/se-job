"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import "./component.css";
import classnames from "classnames";
import { Button, ThemePanel } from "@radix-ui/themes";
import { IoIosNotifications, IoMdHome, IoMdDocument } from "react-icons/io";
import { useState, useEffect } from "react";
import Menu_Profile from "./Appbar_components/dropdown_menu";
import { getUser, get_noti_list, update_noti_status } from "./controller";
import NotificationDropdown from "./Appbar_components/dropdown_noti";
import Badge from "@mui/icons-material/Badge";
import { InfoNoti } from "./Card_Cotification/cardnoti";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const AppBar = () => {
  const [profileImg, setProfileImg] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [defaultLogo, setDefaultLogo] = useState("");
  const [profileName, setProfileName] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [userActive, setUserActive] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [listNoti, setListNoti] = useState<InfoNoti[]>([]);

  const currentPath = usePathname();
  const path_jobapplied = "/jobapplied";
  const path_joblist = "/joblist";
  const isCurrentPath = currentPath === path_jobapplied;
  const isCurrentPath_joblist = currentPath === path_joblist;
  const router = useRouter();
  const supabase = createClientComponentClient();
  const userType = localStorage.getItem("userType");
  const notificationsRef = React.useRef(null);

  console.log(currentPath);

  const handleNotificationsClick = (e: any) => {
    e.preventDefault(); // Prevents navigation
    setShowNotifications(!showNotifications);
    const updatedNotiList = listNoti.map((noti) => ({
      ...noti,
      status: "Read",
    }));
    setListNoti(updatedNotiList);
    update_noti_status();
  };

  useEffect(() => {
    function handleClickOutside(event: { target: any; }) {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    }

    // Attach the listeners on component mount.
    document.addEventListener("mousedown", handleClickOutside);
    // Detach the listeners on component unmount.
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationsRef]);

  useEffect(() => {
    const fetchProfile = async () => {
      const userObject = await getUser();
      if (userObject) {
        const { data: user, isEmployee: isEmployee } = userObject;
        if (user) {
          if (!isCurrentPath) {
            localStorage.setItem("search_jobapplied", "");
          }
          if (!isCurrentPath_joblist) {
            localStorage.setItem("search_joblist", "");
          }
          // Assuming profile_img and name are stored in user_metadata
          setProfileImg(user.logo);
          setProfileName(user.name);
          if (isEmployee) setDefaultLogo("/default_logo.svg");
          else {
            setDefaultLogo("/logo.svg");
            setProfileUrl(user.url);
          }
          setUserActive(true);
        } else {
          setUserActive(false);
        }
      }
    };
    const fetch_noti = async () => {
      const noti_list = await get_noti_list();
      (noti_list ?? []).sort((a, b) => {
        const timeA = new Date(a.time).getTime();
        const timeB = new Date(b.time).getTime();
        return timeB - timeA;
      });
      setListNoti(noti_list || []);
    };
    const channel = supabase
      .channel("noti")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Notification",
        },
        async () => {
          console.log("DB changes");
          await fetch_noti();
          router.refresh();
        }
      )
      .subscribe();

    fetchProfile();
    fetch_noti();
    return () => {
      supabase.removeChannel(channel); // Unsubscribe when the component is unmounted
    };
  }, [supabase, router]);

  const links = [
    {
      key: "home",
      href: userType === "employer" ? `/${profileUrl}` : "/joblist",
      icon: <IoMdHome />,
      name: "",
    },
    ...(userType === "employee"
      ? [
          {
            key: "document",
            href: "/jobapplied",
            icon: <IoMdDocument />,
            name: "",
          },
        ]
      : []),
    {
      key: "notifications",
      href: "#",
      icon: (
        <Button className="circle-button" onClick={handleNotificationsClick}>
          <IoIosNotifications />
          {listNoti.filter((noti) => noti.status === "Unread").length > 0 && (
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red text-white rounded-full px-2 py-1 text-xs">
              {listNoti.filter((noti) => noti.status === "Unread").length}
            </span>
          )}
        </Button>
      ),
      name: "",
    },
  ];

  const handleSearchInputChange = (value: string) => {
    setSearchInput(value);

    // Check if the current path matches the target path
    if (currentPath) {
      if (isCurrentPath) {
        localStorage.setItem("search_jobapplied", value);
      } else {
        localStorage.setItem("search_jobapplied", "");
      }

      if (isCurrentPath_joblist) {
        localStorage.setItem("search_joblist", value);
      } else {
        localStorage.setItem("search_joblist", "");
      }
    }
  };
  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      setSearchInput(searchInput);
      handleSearchInputChange(searchInput);

      if (currentPath === "/joblist") {
        localStorage.setItem("joblist_reset", "true");
      }
    }
  };
  return (
    <header className="w-full z-10 bg-white">
      <nav className="w-full mx-auto flex justify-between items-center px-6 py-2">
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/logo.svg"
            alt="Jelp logo"
            width="100"
            height="100"
            className="object-contain"
          />
        </Link>
        {currentPath === "/joblist" && (
          <div
            className="relative w-1/2"
            hidden={currentPath.startsWith("/member/")}
          >
            <input
              className=" bg-[#d9d9d9] pl-10 rounded-lg h-[5vh] w-full"
              placeholder="Search"
              value={searchInput}
              onChange={(e) => handleSearchInputChange(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <Image src="/search.svg" alt="search" width={20} height={20} />
            </span>
          </div>
        )}

        <div className="flex justify-between">
          {userActive ? (
            <div className="flex space-x-6">
              <div className="translate-y-4 flex space-x-6">
                {links.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    className={classnames({
                      "text-zinc-900": link.href === currentPath,
                      "text-zinc-500": link.href !== currentPath,
                      "hover:text-zinc-800 transition-colors": true,
                      "flex flex-col items-center text-center": true, // Added flex styles for centering
                    })}
                  >
                    <Button className="circle-button">
                      {link.icon} {/* Use the icon React component here */}
                    </Button>
                    <p className="link-name font-sans text-sm">{link.name}</p>
                  </Link>
                ))}
              </div>
              <div ref={notificationsRef}>
                {showNotifications && (
                  <NotificationDropdown listNoti={listNoti} />
                )}
              </div>
              <div className="translate-y-2 z-10">
                <Menu_Profile
                  profile_img={profileImg}
                  name={profileName}
                  default_logo={defaultLogo}
                ></Menu_Profile>
              </div>
            </div>
          ) : (
            <Link
              className="bg-[#13544E] rounded-3xl px-5 py-2 w-full text-white"
              href="/auth/login"
            >
              Log in
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default React.memo(AppBar);
