
import { headers, cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'


export async function getJob(formData: FormData, keyword: string) {
    'use server'
    // get user
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    // filter value
    const location = formData.get('location') as string
    const type = formData.get('type') as string
    const experience = formData.get('experience') as string
    const salaryMin = formData.get('salary-min') as string
    const salaryMax = formData.get('salary-max') as string
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
    // get job
    const { data: job, error } = await query
    if (error) {
        return null
    }
    return job
}