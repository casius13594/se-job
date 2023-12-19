
import { headers, cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import React from 'react'


export async function getJob(formData: FormData, keyword: string) {
    'use server'
    // get user
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    // filter value
    const location = formData.get('location') as string
    const type = formData.get('type') as string
    const experience = formData.get('experience') as string
    const salary = formData.get('salary') as string
    // compose query
    let query = supabase.from('Job').select('*')
    if (location != '%') {
        query = query.eq('location', location)
    }
    if (type != '%') {
        query = query.eq('type', type)
    }
    if (experience != '%') {
        query = query.eq('experience', experience)
    }
    if (salary != '%') {
        query = query.eq('salary', salary)
    }
    // get job
    const { data: jobs, error } = await query
    if (error) {
        return null
    }
    return (
        <div className='flex flex-col h-full w-full overflow-scroll'>
            {
                jobs.map((job) => (
                    <ul>
                        <li className='flex flex-row justify-evenly w-full border-black rounded-md p-x-[1vw] p-y-[0.5hw]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="117" height="117" viewBox="0 0 117 117" fill="none">
                                <circle cx="58.5" cy="58.5" r="58.5" fill="#D9D9D9"/>
                            </svg>
                            <div className='flex flex-col justify-between w-full'>
                                <div className='flex flex-row justify-between w-full'>
                                    <h1 className='text-xl font-bold'>
                                        {job.title}
                                    </h1>
                                    <h1 className='text-xl font-bold'>
                                        {job.salary} Millions
                                    </h1>
                                </div>
                                <div className='flex flex-row w-full'>
                                    <h1 className='text-lg'>
                                        {job.company}
                                    </h1>
                                </div>
                                <div className='flex flex-row w-full'>
                                    <h1 className='text-lg'>
                                        {job.location}({job.type})
                                    </h1>
                                </div>
                                <div className='flex flex-row w-full'>
                                    <h1 className='text-md'>
                                        {job.posted_at}
                                    </h1>
                                </div>
                            </div>
                        </li>
                    </ul>
                ))
            }
        </div>
    )
}