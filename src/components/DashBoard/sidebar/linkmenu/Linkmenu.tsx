"use client";

import Link from 'next/link'
import styles from './Linkmenu.module.css'
import { usePathname } from 'next/navigation'
import { SlArrowRight } from "react-icons/sl";

type MenuLinkProp = {
    item: any;
};
const MenuLink: React.FC<MenuLinkProp> = ({item}) => {

  const pathname = usePathname()
  console.log("MenuLink item:", item);
  return (
    <Link href={item?.path} className={`${styles.container} ${pathname === item.path && styles.active}`}>
      {item.icon}
      {item.title}
      <SlArrowRight />
    </Link>
  )
}

export default MenuLink