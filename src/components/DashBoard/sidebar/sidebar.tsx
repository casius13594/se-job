"use client";
import React, { useEffect, useState } from "react";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
} from "react-icons/md";
import styles from "./sidebar.module.css";
import MenuLink from "./linkmenu/Linkmenu";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getUser } from "@/components/controller";
const menuItems = [
  {
    title: "Dashboard",
    list: [
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Jobs",
        path: "/dashboard/jobs",
        icon: <MdShoppingBag />,
      },
      {
        title: "Usertest",
        path: "/admin/usertest",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Jobs",
        path: "/admin/jobs",
        icon: <MdShoppingBag />,
      },
    ],
  },
];

const Sidebar = () => {
  const [profileImg, setProfileImg] = useState("");
  const [defaultLogo, setDefaultLogo] = useState("");
  const [profileName, setProfileName] = useState("");
  const [role, setRole] = useState("");
  const [userActive, setUserActive] = useState(false);
  const currentPath = usePathname();
  const [isEmployee, setIsEmployee] = useState(false);

  console.log(currentPath);
  useEffect(() => {
    const fetchProfile = async () => {
      const userObject = await getUser();
      if (userObject) {
        const { data: user, isEmployee: isEmployeeStatus } = userObject;
        setIsEmployee(isEmployeeStatus);
        if (user) {
          // Assuming profile_img and name are stored in user_metadata
          setProfileImg(user.logo);
          setProfileName(user.name);
          if (isEmployee) setDefaultLogo("/default_logo.svg");
          else setDefaultLogo("/logo.svg");
          setUserActive(true);
        } else {
          setUserActive(false);
        }
      }
    };

    fetchProfile();
  }, []);

  const isAdminPath = currentPath.includes("/admin");

  // Define menu items based on whether it's an admin path
  const filteredMenuItems = isAdminPath
    ? menuItems[0].list.slice(2) // show last two items
    : menuItems[0].list.slice(0, 2); // show first two items

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src={profileImg || defaultLogo}
          alt=""
          width="100"
          height="100"
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>{profileName}</span>
          <span className={styles.userTitle}>
            {isAdminPath ? "Admin" : isEmployee ? "Employee" : "Employer"}
          </span>
        </div>
      </div>
      <ul className={styles.list}>
        {filteredMenuItems.map((item) => (
          <MenuLink item={item} key={item.title} />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
