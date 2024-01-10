import React from "react";
import Image from "next/image";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className=" w-full h-30 pt-4">
      <div className="w-full h-15 flex bg-green pl-10 text-white font_size_text font-bold items-center justify-between py-2 pr-3">
        JELP
        <div className="flex">
          <Link href="https://www.facebook.com/VNUHCM.US" className="mx-1">
            <Image
              src="/facebook.svg"
              alt=""
              width={30}
              height={30}
              objectFit="scale-down"
            />
          </Link>
          <Link
            href="https://www.instagram.com/explore/locations/1964421187158685/truong-ai-hoc-khoa-hoc-tu-nhien-ai-hoc-quoc-gia-tphcm/"
            className="mx-1"
          >
            <Image
              src="/instagram.svg"
              alt=""
              width={30}
              height={30}
              objectFit="scale-down"
            />
          </Link>
        </div>
      </div>
      <div className="w-full h-20 pl-10 pt-1 font_size_text items-center">
        Address: 227 Nguyen Van Cu, Ward 4, District 5, Ho Chi Minh City
        <br />
        Hotline: 0987654321
        <br />
        <div className="font-bold">© 2024 Jelp Inc. All Rights Reserved </div>
      </div>
    </footer>
  );
};

export default Footer;
