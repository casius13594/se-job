'use client'
import { useEffect, useState } from 'react';
import AppBar from '@/components/appbar';
import CardApplied, {Jobapplied} from '@/components/cardjobapplied'
import { fetchData } from '@/components/controller';
import { IoMdHome } from "react-icons/io";


export default function page(){
    const [data, setData] = useState<Jobapplied[]>([]);
    const is_click = 1;
    const [isClick, setIsClick] = useState<number>(1);
    const button = [
        // put property in here.
        {id: 1,icon: <IoMdHome />,name: 'Saved and Applied Job' },
        {id: 2,icon: <IoMdHome  />,name: 'Saved Job' },
        {id: 3,icon: <IoMdHome />,name: 'Applied Job' },
    ];

    const handleClick =(id:number) => {
        setIsClick(id);
    };

    useEffect(() => {
        const fetchDataFromSupabase = async () => {
          // Fetch data from "Applied" table with a custom tag
          const appliedData = await fetchData('listappliedjob', 'Applied');
    
          // Fetch data from "Jobtab" table with a custom tag
          const savedData = await fetchData('listsavejob', 'Saved');
    
          // Combine the results from both tables
          const combinedResults = [...appliedData, ...savedData];
        
          switch(isClick)
          {
            case 1:
                setData(combinedResults);
                break;
            case 2:
                setData(savedData);
                break;
            case 3:
                setData(appliedData);
                break;
          }
          
        };
    
        fetchDataFromSupabase();
      }, [isClick]);
    return(
        <>  
            <AppBar />
            <main className = {`flex flex-col h-[100vh] overflow-hidden`}>
                <div className='flex flex-row pt-[7vw] mt-[0.5vh]'>
                    <div className='flex-col w-1/5 ml-[2vw]'>
                        <h1 className='font-bold text-2xl'>Save and Applied Job</h1>
                        {button.map((bt) => (
                        <button
                            key={bt.id}
                            onClick={()=>handleClick(bt.id)}
                            className={`${isClick === bt.id ? 'border-b-black border-b-2' : ''}
                            flex flex-row items-center text-left w-full my-2 py-2`
                            }
                        >
                            <div className="circle-button m-2">
                                {bt.icon} {/* Use the icon React component here */}
                            </div>
                            <h1 className='font-bold'>{bt.name}</h1></button>))}
                    </div>
                    <div className='flex-row w-3/5 h-full mx-[2vw]'>
                        {data.map((item) => (
                            <CardApplied {...item}/>
                        ))}
                         
                    </div>
             </div>
            </main>
            
            
            
        </>
    )
}