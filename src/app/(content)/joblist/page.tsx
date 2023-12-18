
import AppBar from '@/components/appbar';
import React from 'react';
import { dm_sans } from '@/components/fonts';

export default function JobList(){

    return (
        <>
        <AppBar />
        <main className = {`flex flex-col h-[100vh] ${dm_sans.className}`}>
            <div className = 'flex flex-row min-h-full w-full pt-[7vw] px-[1vw] space-x-[2vw]'>
                <div className = 'flex flex-col w-[15vw] min-h-full'>
                    <h1 className='flex flex-row w-full text-center text-lg font-bold'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.48389 3.48389H25.5484V8.71211L17.9107 16.2748V21.8119L11.1216 24.3871V16.2748L3.48389 8.71211V3.48389ZM5.18116 5.13117V8.03942L12.8189 15.6021V21.9747L16.2134 20.6871V15.6021L23.8511 8.03942V5.13117H5.18116Z" fill="black"/>
                        </svg>
                        Filter your choices
                    </h1>
                    <form id = 'filter' className='flex flex-col w-full space-y-[0.5vw]'>
                        <div>
                            <label htmlFor = 'location'>Location</label>
                            <select id = 'location' className = 'rounded-lg bg-gray-300 w-full'>
                                <option value='*'>All</option>
                                <option value='Ha Noi'>Ha Noi</option>
                                <option value='Ho Chi Minh'>Ho Chi Minh</option>
                                <option value='Da Nang'>Da Nang</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor = 'rating'>Category</label>
                            <select id = 'rating' className = 'rounded-lg bg-gray-300 w-full'>
                                <option value='*'>All</option>
                                <option value='good'>Good</option>
                                <option value='acceptable'>Acceptable</option>
                                <option value='bad'>Bad</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor = 'experience'>Experience</label>
                            <select id = 'experience' className = 'rounded-lg bg-gray-300 w-full'>
                                <option value='*'>All</option>
                                <option value='0'>None</option>
                                <option value='1'>1-2 years</option>
                                <option value='2'>2+ years</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor = 'type'>Type</label>
                            <select id = 'type' className = 'rounded-lg bg-gray-300 w-full'>
                                <option value='*'>All</option>
                                <option value='fulltime'>Fulltime</option>
                                <option value='parttime'>Parttime</option>
                                <option value='intern'>Intern</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor = 'salary' className='w-full'>Salary</label>
                            <div className = 'flex flex-row w-full'>
                                <label htmlFor = 'salary-min'>Min:</label>
                                <input 
                                    type='number' 
                                    id = 'salary-min' 
                                    placeholder='0'
                                    className = 'rounded-lg bg-gray-300 w-full'
                                />
                            </div>
                            <div className = 'flex flex-row w-full'>
                                <label htmlFor = 'salary-max'>Max:</label>
                                <input 
                                    type='number' 
                                    id = 'salary-max'
                                    placeholder='100000000'
                                    className = 'rounded-lg bg-gray-300 w-full'
                                />
                            </div>
                        </div>
                        <button>
                            Apply
                        </button>
                        <div className='rounded-lg bg-gray-300 w-full h-[12vw]'>
                            <div className='flex flex-row w-full pt-[1vw]'>
                                <h1 className='text-center text-xl w-full'>
                                    Banner
                                </h1>
                            </div>
                        </div>
                    </form>
                </div>
                <div className = 'flex flex-col min-h-full w-[55vw]'>
                    <div className = 'flex flex-row w-full justify-between'>
                        <h1 className = 'flex flex-row text-center text-2xl font-bold'>
                            Results:
                        </h1>
                        <div className='flex flex-row w-fit'>
                            <label htmlFor = 'sort' className = 'text-center text-xl'>
                                Sort by:
                            </label>
                            <select id='sort'>
                                <option value="none">None</option>
                                <option value="salary-inc">Salary (increasing)</option>
                                <option value="salary-des">Salary (descreasing)</option>
                                <option value="rating-inc">Rating (increasing)</option>
                                <option value="rating-des">Rating (descreasing)</option>
                            </select>   
                        </div>
                    </div>
                </div>
                <div className = 'flex flex-col min-h-full w-[25vw] justify-between'>
                    <div className='flex flex-col h-full space-y-[2vw] w-full'>
                        <div className='rounded-lg bg-gray-300 w-full h-[20vh]'>
                            <div className='flex flex-row w-full m-[1vw] text-center text-xl'>
                                Other features
                            </div>
                        </div>
                        <div className='rounded-lg bg-gray-300 w-full h-[20vh]'>
                            <div className='flex flex-row w-full m-[1vw] space-x-[2vw]'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="22" viewBox="0 0 16 22" fill="none">
                                    <path d="M1 7.90976C1 4.65247 1 3.02382 1.76884 2.01191C2.53769 1 3.77513 1 6.25 1H9.75C12.2249 1 13.4623 1 14.2312 2.01191C15 3.02382 15 4.65247 15 7.90976V15.7726C15 18.8627 15 20.4078 14.2612 20.8804C13.5225 21.353 12.5994 20.3984 10.7532 18.4892L10.1624 17.8782C9.1243 16.8048 8.60526 16.268 8 16.268C7.39474 16.268 6.8757 16.8048 5.83762 17.8782L5.24678 18.4892C3.4006 20.3984 2.47751 21.353 1.73876 20.8804C1 20.4078 1 18.8627 1 15.7726V7.90976Z" stroke="#33363F" stroke-width="2"/>
                                </svg>
                                <h1 className='text-center text-xl'>
                                    Saved Jobs
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='flex flex-col rounded-t-2xl bg-gray-300 w-full content-center h-[10vh]'>
                            <div className='flex flex-row content-center justisfy-center h-full p-[1vw] space-x-[2vw]'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                                    <circle cx="24" cy="24" r="23.5" fill="white" stroke="black"/>
                                </svg>
                                <h1 className='text-center text-xl h-fit'>
                                    Messaging
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        </>
    )
}
