
import React from 'react';
export interface Jobapplied {
    job_name: string;
    company_name: string;
    location: string;
    type: string;
    post_day: string;
    tag: string;
    avata: string;
} 

const CardApplied:React.FC<Jobapplied> = ({job_name, company_name, location, type, post_day,tag}) =>{
    const check_applied = tag==="Applied"
    const button_app = check_applied ? "View response" : "Apply now"
    return(
        <div className='flex flex-row bottom-2 border-black w-full p-x-[1vw] p-y-[0.5vh]'>
            <div className='flex-shrink-0 w-1/5 mx-[0.5vw]'>
                <svg className='w-full' xmlns="http://www.w3.org/2000/svg" width="117" height="117" viewBox="0 0 117 117" fill="none">
                                    <circle cx="58.5" cy="58.5" r="58.5" fill="#D9D9D9"/>
                </svg>
            </div>
            <div className='flex flex-col justify-between w-3/5'>
                <h1 className='text-xl' >{job_name}</h1>
                <h1 className='text-lg'>{company_name}</h1>
                <h1 className='text-lg'>{location} ({type})</h1>
                <h2 className='text-sm'>{post_day}</h2>
            </div>
            <div className='flex flex-col items-center justify-between w-2/5 '>
                <div className='text-center  rounded-full bg-gray-400 w-1/2'>
                {tag}
                </div>
                <button className='text-center bg-[#3e736e] hover:bg-[#13544E] rounded-full w-6/7'>
                    <h1 className='font-bold p-2 text-[#d9d9d9]'> {button_app}</h1>
                </button>
            </div>
        </div>
    )
}

export default CardApplied;