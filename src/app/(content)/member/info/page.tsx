import UserProfileCard from '@/components/UserProfileCard/UserProfileCard'
import AppBar from '@/components/appbar'
import React from 'react'
import './component.css'
import { FaUserAlt } from "react-icons/fa";

const solutions = [
    {
      name: 'General Information',
      description: '',
      href: '/postjob',
      icon: IconOne,
    },
    {
      name: 'Security Settings',
      description: '',
      href: '/company/hrmanagement',
      icon: IconTwo,
    },
  ]

  
const page = () => {
  return (
    <>
    <AppBar></AppBar>
    <main className='relative pt-[10vh] flex ml-10'> 
    <div className='w-1/3'>
        <UserProfileCard></UserProfileCard>
        <div className='w-full'>
            <button className=" w-full origin-top-right rounded-md focus:outline-none hover:text-gray-50 flex">
            <div className="relative grid gap-8 bg-white p-7">
                            {solutions.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="-m-3 flex rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-300 hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                            >
                                <div className="flex h-10 w-10 shrink-0 sm:h-12 sm:w-12">
                                <item.icon aria-hidden="true" />
                                </div>
                                <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900">
                                    {item.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {item.description}
                                </p>
                                </div>
                            </a>
                            ))}
                        </div>
            </button>
            </div>
        </div>
        <div className="verticalLine"></div>
        <div> abc</div> 
    </main>
    </>
  )
}

function IconOne() {
    return (
        <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="2 User">
        <g id="Union">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.56982 6.91875C3.56982 10.4575 6.44982 13.3375 9.98982 13.3375H10.0323C11.7411 13.3313 13.3473 12.66 14.5498 11.4462C15.7548 10.2337 16.4161 8.62375 16.4086 6.91875C16.4086 3.38 13.5286 0.5 9.98982 0.5C6.44982 0.5 3.56982 3.38 3.56982 6.91875ZM5.44482 6.91875C5.44482 4.41375 7.48357 2.375 9.98982 2.375C12.4948 2.375 14.5336 4.41375 14.5336 6.9225C14.5386 8.13 14.0723 9.26875 13.2198 10.125C12.3686 10.9838 11.2336 11.4575 10.0286 11.4625H9.98982C7.48357 11.4625 5.44482 9.42375 5.44482 6.91875Z" fill="black"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.499756 19.8988C0.499756 24.3213 7.39476 24.3213 9.98976 24.3213C12.3373 24.3213 19.4798 24.3213 19.4798 19.8738C19.4798 15.905 14.0635 15.4463 9.98976 15.4463C7.64226 15.4463 0.499756 15.4463 0.499756 19.8988ZM2.37476 19.8988C2.37476 17.7675 6.51601 17.3213 9.98976 17.3213C15.0423 17.3213 17.6048 18.18 17.6048 19.8738C17.6048 21.58 15.0423 22.4463 9.98976 22.4463C4.93726 22.4463 2.37476 21.5888 2.37476 19.8988Z" fill="black"/>
        <path d="M18.6031 11.9147C18.1431 11.9147 17.7418 11.576 17.6756 11.1072C17.6043 10.5947 17.9606 10.1197 18.4731 10.0485C20.0331 9.82971 21.2106 8.47596 21.2131 6.89846C21.2131 5.33096 20.0906 4.00846 18.5468 3.75596C18.0356 3.67096 17.6893 3.18971 17.7731 2.67846C17.8568 2.16721 18.3406 1.82346 18.8493 1.90471C21.3056 2.30721 23.0881 4.40846 23.0881 6.89971C23.0831 9.40596 21.2118 11.5585 18.7343 11.906C18.6906 11.9122 18.6468 11.9147 18.6031 11.9147Z" fill="black"/>
        <path d="M21.9932 20.4712C22.1344 20.8449 22.4907 21.0762 22.8694 21.0762C22.9807 21.0762 23.0932 21.0562 23.2019 21.0149C25.0807 20.3037 25.4744 19.0699 25.4744 18.1587C25.4744 16.9349 24.7657 15.3687 21.3832 14.8624C20.8807 14.7962 20.3944 15.1399 20.3169 15.6524C20.2407 16.1637 20.5944 16.6412 21.1069 16.7187C22.7607 16.9649 23.5994 17.4499 23.5994 18.1587C23.5994 18.3687 23.5994 18.8599 22.5369 19.2624C22.0532 19.4449 21.8094 19.9874 21.9932 20.4712Z" fill="black"/>
        </g>
        </g>
        </svg>
    )
  }
  function IconTwo() {
    return (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="8" fill="#FFEDD5" />
        <path
          d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
          stroke="#FB923C"
          strokeWidth="2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
          stroke="#FDBA74"
          strokeWidth="2"
        />
      </svg>
    )
  }
  
  function IconThree() {
    return (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="8" fill="#FFEDD5" />
        <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
        <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
        <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
        <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
        <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
        <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
      </svg>
    )
  }

  
export default page