'use server'

import { headers, cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import React from 'react'


export async function getJob(formData: FormData) {
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
        <div className='flex flex-col h-full w-full'>
            {
                jobs.map((job) => (
                    <ul>
                        <li className='flex flex-row w-full border-2 border-black rounded-md'>
                            <div className='flex m-[1vw]'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="117" height="117" viewBox="0 0 117 117" fill="none">
                                    <circle cx="58.5" cy="58.5" r="58.5" fill="#D9D9D9"/>
                                    {job.employer_logo}
                                </svg>
                            </div>
                            <div className='flex flex-col justify-between w-full p-[1vw]'>
                                <div className='flex flex-row justify-between w-full'>
                                    <h1 className='text-xl font-bold'>
                                        {job.name}
                                    </h1>
                                    <h1 className='text-xl font-bold'>
                                        {job.salary} Millions
                                    </h1>
                                </div>
                                <div className='flex flex-row w-full'>
                                    <h1 className='text-lg'>
                                        {job.employer_name}
                                    </h1>
                                </div>
                                <div className='flex flex-row w-full'>
                                    <h1 className='text-lg'>
                                        {job.location}({job.type})
                                    </h1>
                                </div>
                                <div className='flex flex-row w-full'>
                                    <h1 className='text-md'>
                                        {job.post_time}
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