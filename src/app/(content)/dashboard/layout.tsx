import React from "react";
import Sidebar from "@/components/DashBoard/sidebar/sidebar";
import styles from "@/components/DashBoard/dashbar.module.css";
import AppBar from "@/components/appbar";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.menu}>
            <Sidebar></Sidebar>
          </div>
          <div className={styles.content}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default layout;
