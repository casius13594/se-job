
import { UUID } from 'crypto';
import React from 'react';


export interface Jobapplied {
    job_id: UUID;
    name: string;
    employer_name: string;
    location: string;
    type: string;
    post_time: string;
    tag: string;
    employer_logo: string;
} 

const CardApplied:React.FC<Jobapplied> = ({name, employer_name, location, type, post_time,tag,employer_logo}) =>{
    const check_applied = tag==="Applied"
    const button_app = check_applied ? "View response" : "Apply now"
    return(
        <div className='flex flex-row border-2 border-black w-full py-2 m-2 rounded-md'>
            <div className='flex-shrink-0 w-1/5 mx-[0.5vw]'>
                <img
                    className="w-full"
                    src={employer_logo}
                    alt=""
                />
            </div>
            <div className='flex flex-col justify-between w-3/5'>
                <h1 className='text-xl' >{name}</h1>
                <h1 className='text-lg'>{employer_name}</h1>
                <h1 className='text-lg'>{location} ({type})</h1>
                <h2 className='text-sm'>{post_time}</h2>
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