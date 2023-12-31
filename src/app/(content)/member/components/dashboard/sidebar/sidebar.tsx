'use client';
import React, { useEffect, useState } from 'react'
import { MdDashboard, MdSupervisedUserCircle, MdShoppingBag} from 'react-icons/md';
import styles from "./sidebar.module.css";
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { getUser } from '@/components/controller';
import MenuLink from '@/components/DashBoard/sidebar/linkmenu/Linkmenu';
const menuItems = [
    {
      title: "Profile",
      list: [
        {
          title: "Basic Information",
          path: "/member/info",
          icon: <MdSupervisedUserCircle />,
        },
        {
          title: "Security Settings",
          path: "/member/security",
          icon: <MdShoppingBag />,
        },
           ],
    },
]

  
const SidebarMember = () => {
    const [profileImg, setProfileImg] = useState("");
    const [defaultLogo, setDefaultLogo] = useState("");
    const [profileName, setProfileName] = useState("");
    const [role, setRole] = useState("");
    const [userActive, setUserActive] = useState(false);
    const currentPath = usePathname();
  
    console.log(currentPath);
    useEffect(() => {
      const fetchProfile = async () => {
        const userObject = await getUser();
        if (userObject) {
          const { data: user, isEmployee: isEmployee } = userObject;
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
  return (

    
    <div className={styles.container}>
         <div className={styles.user}>
        <Image
          className={styles.userImage}
          src={profileImg || defaultLogo}
          alt=""
          width="60"
          height="60"
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>{profileName}</span>
          <span className={styles.userTitle}>{role} abc</span>
        </div>
      </div>
        <ul className={styles.list}>
           {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
  </div>
  )
}


export default SidebarMember