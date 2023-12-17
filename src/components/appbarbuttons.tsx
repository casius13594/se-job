"use client";
import Image from "next/image";
import { AppBarButtonProps } from "@/app/types";

const Button: React.FC<AppBarButtonProps> = ({ iconSrc, text }) => (
    <button className="flex flex-col items-center justify-center">
      <Image src={iconSrc} alt={text} width={50} height={50} />
      <span>{text}</span>
    </button>
  );

export default Button;