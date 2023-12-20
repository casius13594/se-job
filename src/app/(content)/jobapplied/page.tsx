'use client'
import { useEffect, useState } from 'react';
import AppBar from '@/components/appbar';
import CardApplied, {Jobapplied} from '@/components/cardjobapplied'
import { createClient } from '@/utils/supabase/server'
import { Result } from 'postcss';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { fetchData } from '@/components/controller';



export default function page(){
    const [data, setData] = useState<Jobapplied[]>([]);
    useEffect(() => {
        const fetchDataFromSupabase = async () => {
          // Fetch data from "Applied" table with a custom tag
          const appliedData = await fetchData('listappliedjob', 'Applied');
    
          // Fetch data from "Jobtab" table with a custom tag
          const savedData = await fetchData('listsavejob', 'Saved');
    
          // Combine the results from both tables
          const combinedResults = [...appliedData, ...savedData];
    
          setData(combinedResults);
        };
    
        fetchDataFromSupabase();
      }, []);
    return(
        <>  
            <AppBar />
            <main className = {`flex flex-col h-[100vh] overflow-hidden`}>
                <div className='flex flex-row pt-[8vw]'>
                    <div className='flex-col w-2/5 mx-[1vw]'>

                    </div>
                    <div className='flex-row w-2/5'>
                    {data.map((item) => (
                        <CardApplied {...item}/>
                    ))}
                         
                    </div>
             </div>
            </main>
            
            
            
        </>
    )
}