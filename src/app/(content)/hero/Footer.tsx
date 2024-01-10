import React from "react";
import Image from "next/image";
const Footer = () => {
  return (
    <footer className=" w-full h-30 pt-4">
      <div className="w-full h-15 flex bg-green pl-10 text-white font_size_text font-bold items-center justify-between py-2 pr-3">
        JELP
        <Image src="/social.svg" alt="" width={150} height={1} objectFit="scale-down"/>
      </div>
      <div className="w-full h-20 flex pl-10 font_size_text font-bold items-center">
        Address: 227 Nguyen Van Cu, Ward 4, District 5, Ho Chi Minh City<br/>
        Hotline: 0987654321<br/>
        © 2024 Jelp Inc. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
