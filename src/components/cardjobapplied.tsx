
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
    time_date_post: Date;
} 

const CardApplied:React.FC<Jobapplied> = ({name, employer_name, location, type, post_time,tag,employer_logo}) =>{
    const check_applied = tag==="Applied"
    const button_app = check_applied ? "View response" : "Apply now"
    return(
        <div className='flex flex-row border-2 border-black w-full max-h-80 py-2 mt-1 rounded-md mb-10'>
            <div className='flex w-1/5 mx-[0.01vw] rounded-full overflow-hidden items-center justify-center'>
                <img
                    className="w-3/5 rounded-full object-contain no-drag"
                    src={employer_logo ? employer_logo : ""}
                    alt=""
                />
            </div>
            <div className='flex flex-col justify-between w-3/5'>
                <h1 className='text-xl font-bold' >{name}</h1>
                <h1 className='text-base'>{employer_name}</h1>
                <h1 className='text-base'>{location} ({type})</h1>
                <h2 className='text-xs'>{post_time}</h2>
            </div>
            <div className='flex flex-col justify-between w-2/5 items-end'>
                <div className='text-center  rounded-full bg-gray-400 m-[1vh] px-[1vw]'>
                {tag}
                </div>
                <button className='text-center bg-[#3e736e] hover:bg-[#13544E] rounded-full w-6/7 m-[1vh] px-[3vw]'>
                    <h1 className='font-bold text-lg text-[#d9d9d9]'> {button_app}</h1>
                </button>
            </div>
        </div>
    )
}

export default CardApplied;