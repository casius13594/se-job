import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CustomButton from './CustomButton'

const Navbar = () => {
  return (
    <header className="w-full absolute z-10">
        <nav className="max-w-[1440p] mx-auto flex justify-between items-center
        sm:px-16 px-6 py-4">
            <Link href="/" className="flex justify-center items-center">
                <Image
                    src="/logo.svg"
                    alt="Jelp logo"
                    width="100"
                    height="100"
                    className="object-contain"
                />
            </Link>

            <div className="flex flex-row space-x-3">
                
                <CustomButton
                    title="Home"
                    btnType="button"
                    containerStyles="text-black-100 rounded-full bg-white"
                />
                <CustomButton
                    title="About"
                    btnType="button"
                    containerStyles="text-black-100 rounded-full bg-white"
                />
                <CustomButton
                    title="Pages"
                    btnType="button"
                    containerStyles="text-black-100 rounded-full bg-white"
                />
                <CustomButton
                    title="Contact"
                    btnType="button"
                    containerStyles="text-black-100 rounded-full bg-white"
                />
                <CustomButton
                    title="Register Now"
                    btnType="button"
                    containerStyles="text-white rounded-full bg-green min-w-[261px]"
                />
            </div>
        </nav>
    </header>
  )
}

export default Navbar