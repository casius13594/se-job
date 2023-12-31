import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { IoIosExit, IoMdExit } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface MenuProfileProps {
  profile_img: string;
  name: string;
  default_logo: string;
}
const Menu_Profile: React.FC<MenuProfileProps> = ({
  profile_img,
  name,
  default_logo,
}) => {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClientComponentClient();
    console.log("Logging out");
    const res = await supabase.auth.signOut();
    if (res.error) {
      console.log("Error signing out:", res.error.message);
    } else {
      console.log("Successfully log out");
      router.push("/");
    } // navigate to home page
  };
  return (
    <div className="top-16 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            <Image
              src={profile_img || default_logo}
              className="placeholder-profile-img object-fill"
              width="100"
              height="100"
              alt="logo"
            ></Image>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Link href="member/info">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-green text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm `}
                    >
                      <Image
                        src={profile_img || default_logo}
                        className="placeholder-profile-img object-fill"
                        width="100"
                        height="100"
                        alt="logo"
                      ></Image>
                      <div className="text-lg">{name}</div>
                    </button>
                  )}
                </Menu.Item>
              </Link>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleSignOut}
                    className={`${
                      active ? "bg-red text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2`}
                  >
                    {active ? (
                      <IoIosExit className="text-lg"></IoIosExit>
                    ) : (
                      <IoMdExit className="text-lg"></IoMdExit>
                    )}
                    <div className="ml-5"></div>
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
export default Menu_Profile;
