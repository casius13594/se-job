
import AppBar from '@/components/appbar';
import CardApplied, {Jobapplied} from '@/components/cardjobapplied'
import { createClient } from '@/utils/supabase/server'
import { Result } from 'postcss';

export async function fetchData(tableName: string, customTag: string) {
    "use server"
    const supabase = createClient();
    const currentuser = await supabase.auth.getUser()
    const {data,error} = await supabase
    .from(tableName)
    .select('job_id, Job (job_id)')
    .eq("employee_id", currentuser.data.user?.id)


    if(error){
        console.error('Error fetching data:', error);
        return []
    }

    // const results: Jobapplied[] = data.map((item) =>({
    //     ...item,
    //     tag:customTag,
    //     post_day:new Date(item.post_id).toLocaleDateString()}))

}

export default function page(){
    const mockJobData: Jobapplied = {
        job_name: 'Mock Job',
        company_name: 'Mock Company',
        location: 'Mock Location',
        type: 'Mock Type',
        post_day: 'Mock Post Day',
        tag: 'Applied',
        avata: 'Mock Avata',
      };
    return(
        <>  
            <AppBar />
            <main className = {`flex flex-col h-[100vh] overflow-hidden`}>
                <div className='flex flex-row pt-[8vw]'>
                    <div className='flex-col w-2/5 mx-[1vw]'>

                    </div>
                    <div className='flex-row w-2/5'>
                         <CardApplied {...mockJobData}/>
                    </div>
             </div>
            </main>
            
            
            
        </>
    )
}