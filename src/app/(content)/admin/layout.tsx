"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/DashBoard/sidebar/sidebar";
import styles from "@/components/DashBoard/dashbar.module.css";
import AppBar from "@/components/appbar";
import { getUser } from "@/components/controller"; // Import the function to fetch user information

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const userObject = await getUser();
        if (userObject) {
          const { data: user } = userObject;
          if (user) {
            setUserType(user.type);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserType();
  }, []);
  console.log(userType);
  return (
    <>
      {userType === "admin" ? (
        <div className={styles.main}>
          <AppBar />
          <div className={styles.container}>
            <div className={styles.menu}>
              <Sidebar />
            </div>
            <div className={styles.content}>{children}</div>
          </div>
        </div>
      ) : (
        <p className="flex flex-column justify-center items-center h-[100vh] text-3xl font-bold">
          You do not have permission to access this page.
        </p>
      )}
    </>
  );
};

export default Layout;
