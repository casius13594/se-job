'use client'

import { getJobDetail } from "@/components/controller";
import React from "react";
import AppBar from "@/components/appbar";
import { dm_sans } from '@/components/fonts';
import Link from "next/link";


export default function JobDetail() {
    const [job, setJob] = React.useState(null);
    const job_id = localStorage.getItem("job_id") || "";
    React.useEffect(() => {
        getJobDetail(job_id).then((job) => {
            setJob(job);
        });
    }, []);
    if(!job) return <p>{job_id}</p>;
    return(
        <>
            <AppBar/>
            <main className = {`flex flex-col w-[100vw] h-[100vh] ${dm_sans.className} pt-[8vh] overflow-hidden`}>
                <JobDetailPage job={job}/>
            </main>
        </>
    )
}

function JobDetailPage({ 
    job, 
}: {
    job: any
})
 {
    return(
        <div className = 'flex flex-row min-h-full w-full pt-[10vh] space-x-[0.5vw] justify-evenly'>
            <div className = 'flex flex-col w-[45vw] h-full space-y-[2vh]'>
                <div className="flex flex-row w-full border-2 border-black rounded-3xl bg-[#13544E26]">
                    <div 
                        className='flex flex-row w-full'
                    >
                        <div className="flex m-[1vw]">
                            <img
                                className="w-[10vw] h-[10vw]"
                                src={job.employer_logo}
                                alt=""
                            />
                        </div>
                        <div className="flex flex-col justify-between w-full p-[1vw]">
                            <div className="flex flex-row justify-between w-full">
                                <h1 className="text-xl font-bold">{job.name}</h1>
                                <div className = 'flex flex-row space-x-[1vw] space-y-[0.5vh]'>
                                    <h1 className="text-xl font-bold">{job.salary} Millions</h1>
                                </div>
                            </div>
                            <div className="flex flex-row w-full">
                                <h1 className="text-lg">{job.employer_name}</h1>
                            </div>
                            <div className="flex flex-row w-full">
                                <h1 className="text-lg">
                                    {job.location}({job.type})
                                </h1>
                            </div>
                            <div className="flex flex-row w-full">
                                <h1 className="text-md">{job.post_time}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full items-center">                
                    <div className = 'flex flex-row rounded-full bg-[#D9D9D9] text-lg p-[1vw]'>
                        You might interested in
                    </div>
                    <div className="flex flex-row text-xl">
                        To be implemented
                    </div>
                </div>
            </div>
            <div className = 'flex flex-col w-[50vw] min-h-full bg-[#D9D9D9] rounded-3xl overflow-y-scroll space-y-[2vh]'>
                <div className='flex flex-row w-full p-[1vw]'>
                    <div className='flex flex-row w-full space-x-[1vw]'>
                        <h1 className='text-2xl font-bold'>
                            {job.name}
                        </h1>
                        <ul className='flex flex-row'>
                            <li className='text-xl'>
                                {job.location}
                            </li>
                            <li className='text-xl'>
                                {job.post_time}
                            </li>
                        </ul>
                    </div>
                    <Link href='/'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="35" viewBox="0 0 32 35" fill="none">
                            <path d="M26.6665 11.6667L27.4045 12.3415L28.0215 11.6667L27.4045 10.9919L26.6665 11.6667ZM19.9998 28.7084C20.5521 28.7084 20.9998 28.2607 20.9998 27.7084C20.9998 27.1561 20.5521 26.7084 19.9998 26.7084L19.9998 28.7084ZM20.7379 19.6331L27.4045 12.3415L25.9285 10.9919L19.2618 18.2836L20.7379 19.6331ZM27.4045 10.9919L20.7379 3.70027L19.2618 5.04981L25.9285 12.3415L27.4045 10.9919ZM26.6665 10.6667L13.354 10.6667L13.354 12.6667L26.6665 12.6667L26.6665 10.6667ZM13.354 28.7084L19.9998 28.7084L19.9998 26.7084L13.354 26.7084L13.354 28.7084ZM4.33317 19.6875C4.33317 24.6696 8.37193 28.7084 13.354 28.7084L13.354 26.7084C9.47651 26.7084 6.33317 23.565 6.33317 19.6875L4.33317 19.6875ZM13.354 10.6667C8.37194 10.6667 4.33317 14.7055 4.33317 19.6875L6.33317 19.6875C6.33317 15.81 9.47651 12.6667 13.354 12.6667L13.354 10.6667Z" fill="#33363F"/>
                        </svg>
                    </Link>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="35" viewBox="0 0 25 18" fill="none"
                        onClick={() => alert('To be implemented')}    
                    >
                        <rect width="24.9231" height="4.15385" rx="2.07692" fill="black"/>
                        <rect y="6.9231" width="24.9231" height="4.15385" rx="2.07692" fill="black"/>
                        <rect y="13.8462" width="24.9231" height="4.15385" rx="2.07692" fill="black"/>
                    </svg>
                </div>
                <div className='flex flex-col w-full rounded-3xl border-2 border-[#13544E] bg-[#F2F0F0] space-y-[1vh] py-[2vh]'>
                    <div className='flex flex-row w-full justify-between px-[2vw]'>
                        <div className='flex flex-col items-center justify-center'>
                            <h1 className='text-2xl font-bold text-center'>
                                Experience
                            </h1>
                            <svg xmlns="http://www.w3.org/2000/svg" width="74" height="74" viewBox="0 0 74 74" fill="none">
                                <circle cx="37" cy="37" r="37" fill="#13544E"/>
                            </svg>
                            <h1 className='text-xl text-center'>
                                {job.experience}
                            </h1>
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                            <h1 className='text-2xl font-bold text-center'>
                                Type
                            </h1>
                            <svg xmlns="http://www.w3.org/2000/svg" width="74" height="74" viewBox="0 0 74 74" fill="none">
                                <circle cx="37" cy="37" r="37" fill="#13544E"/>
                            </svg>
                            <h1 className='text-xl text-center'>
                                {job.type}
                            </h1>
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                            <h1 className='text-2xl font-bold text-center'>
                                Salary
                            </h1>
                            <svg xmlns="http://www.w3.org/2000/svg" width="74" height="74" viewBox="0 0 74 74" fill="none">
                                <circle cx="37" cy="37" r="37" fill="#13544E"/>
                            </svg>
                            <h1 className='text-xl text-center'>
                                {job.salary} Millions
                            </h1>
                        </div>
                    </div>
                    <div className='flex flex-row w-full px-[2vw] justify-between'>
                        <button className='flex flex-row w-[30vw] rounded-full bg-[#13544ED1] items-center justify-center space-x-[1vw]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M13.8325 6.17463L8.10904 11.9592L1.59944 7.88767C0.66675 7.30414 0.860765 5.88744 1.91572 5.57893L17.3712 1.05277C18.3373 0.769629 19.2326 1.67283 18.9456 2.642L14.3731 18.0868C14.0598 19.1432 12.6512 19.332 12.0732 18.3953L8.10601 11.9602" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <h1 className='text-xl font-bold text-center py-[1vh]'>
                                Apply now
                            </h1>
                        </button>
                        <button className='flex flex-row w-[12vw] rounded-full bg-[#D9D9D9] items-center justify-center space-x-[1vw]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.87187 9.59832C0.798865 6.24832 2.05287 2.41932 5.56987 1.28632C7.41987 0.689322 9.46187 1.04132 10.9999 2.19832C12.4549 1.07332 14.5719 0.693322 16.4199 1.28632C19.9369 2.41932 21.1989 6.24832 20.1269 9.59832C18.4569 14.9083 10.9999 18.9983 10.9999 18.9983C10.9999 18.9983 3.59787 14.9703 1.87187 9.59832Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M15 4.69995C16.07 5.04595 16.826 6.00095 16.917 7.12195" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <h1 className='text-xl font-bold text-center py-[1vh]'>
                                Save job
                            </h1>
                        </button>
                    </div>
                </div>
                <div className='flex flex-col w-full px-[2vw] space-y-[3vh]'>
                    <div className='flex flex-row w-full space-x-[1vw]'>
                        <div className='flex w-[0.5vw] h-full bg-[#13544E]'/>
                        <h1 className='text-2xl font-bold'>
                            Job details
                        </h1>
                    </div>
                    <div className='flex flex-col w-full py-[1vh]'>
                        <ul>
                            <h1 className='text-xl font-bold'>
                                About the job
                            </h1>
                            {
                                job.content? 
                                    job.content.split('\n').map((item: string) => {
                                        return(
                                            <li className='text-xl'>
                                                {item}
                                            </li>
                                        )
                                    })
                                :
                                    <p>None</p>
                            }
                        </ul>
                        <ul>
                            <h1 className='text-xl font-bold'>
                                Requirements
                            </h1>
                            {
                                job.requirement?
                                    job.requirements.split('\n').map((item: string) => {
                                        return(
                                            <li className='text-xl'>
                                                {item}
                                            </li>
                                        )
                                    })
                                :
                                    <p>None</p>
                            }
                        </ul>
                        <ul>
                            <h1 className='text-xl font-bold'>
                                Benefits
                            </h1>
                            {
                                job.benefits?
                                    job.benefits.split('\n').map((item: string) => {
                                        return(
                                            <li className='text-xl'>
                                                {item}
                                            </li>
                                        )
                                    })
                                :
                                    <p>None</p>
                            }
                        </ul>
                    </div>
                    <div className='flex flex-row w-full space-x-[1vw]'>
                        <div className='flex w-[0.5vw] h-full bg-[#13544E]'/>
                        <h1 className='text-2xl font-bold'>
                            Company Infomation
                        </h1>
                    </div>
                    <div className='flex flex-row w-full py-[1vh]'>
                        <div className="flex m-[1vw]">
                            <img
                                className="w-[10vw] h-[10vw]"
                                src={job.employer_logo}
                                alt=""
                            />
                        </div>
                        <div className="flex flex-col justify-between w-full p-[1vw]">
                            <h1 className="text-3xl font-bold">{job.employer_name}</h1>
                            <h1 className="text-xl">{job.location}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
    )
}