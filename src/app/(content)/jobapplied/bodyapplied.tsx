import CardApplied, {Jobapplied} from '@/components/cardjobapplied'

export default function BodyJobApplied() {
    const mockJobData: Jobapplied = {
        job_name: 'Mock Job',
        company_name: 'Mock Company',
        location: 'Mock Location',
        type: 'Mock Type',
        post_day: 'Mock Post Day',
        tag: 'Applied',
        avata: 'Mock Avata',
      };
    return (
    <div className='flex flex-row pt-[8vw]'>
        <div className='flex-col w-2/5 mx-[1vw]'>
                    
        </div>
        <div className='flex-row w-2/5'>
            <CardApplied {...mockJobData}/>
        </div>
    </div>

    )
}