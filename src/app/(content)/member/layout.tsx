import React from 'react'
import SidebarMember from './components/dashboard/sidebar/sidebar'
import styles from '@/components/DashBoard/dashbar.module.css'
import AppBar from '@/components/appbar'
const layout = ({children} : {
    children: React.ReactNode
  }) => {
  return (
    <>
    <AppBar></AppBar>
    <div className={styles.container + " h-[75vh]"}>
        <div className={styles.menu}>
        <SidebarMember></SidebarMember>
        </div>
    <div className={styles.content}>
        {children}
    </div>
    </div>
    <footer className="w-full h-30 pt-4">
        <div className="w-full h-10 flex bg-green pl-10 text-white font_size_text font-bold items-center">
          JELP
        </div>
        <div className="w-full h-20 flex pl-10 font_size_text font-bold items-center">
          © Jelp. All Rights Reserved.
        </div>
      </footer>
    </>
  )
}

export default layout