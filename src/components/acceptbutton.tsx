'use client';
import {useState } from "react";
import { IoIosCheckbox, IoIosCheckboxOutline } from "react-icons/io";

const Acceptbutton = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleIcon = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <button onClick={toggleIcon} className="icon-button">
      {isChecked ? <IoIosCheckbox /> : <IoIosCheckboxOutline />}
    </button>
  );
};

export default Acceptbutton;