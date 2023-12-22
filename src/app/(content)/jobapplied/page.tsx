'use client'
import { useEffect, useState } from 'react';
import AppBar from '@/components/appbar';
import CardApplied, {Jobapplied} from '@/components/cardjobapplied'
import { fetchData,is_user } from '@/components/controller';
import { IoMdHome,IoIosWarning   } from "react-icons/io";
import { TbError404 } from "react-icons/tb";
import { requireLogin } from '@/components/popupModal';



export default function page(){
    const [data, setData] = useState<Jobapplied[]>([]);
    const [isClick, setIsClick] = useState<number>(1);
    const [isuser, setIsuser] = useState<boolean>(true);
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
            const check_user = await is_user();

            setIsuser(check_user)
            if(check_user){               
                // Fetch data from "Applied" table with a custom tag
                const appliedData = await fetchData('listappliedjob', 'Applied');
                appliedData.sort((a, b) => b.time_date_post.getTime() - a.time_date_post.getTime());

                // Fetch data from "Jobtab" table with a custom tag
                const savedData = await fetchData('listsavejob', 'Saved');
                savedData.sort((a, b) => b.time_date_post.getTime() - a.time_date_post.getTime());

                // Combine the results from both tables
                const combinedResults = [...appliedData, ...savedData];
                combinedResults.sort((a, b) => b.time_date_post.getTime() - a.time_date_post.getTime());
                
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
            }
        
        };
    
        fetchDataFromSupabase();
    }, [isClick]);

    if(!isuser){
        return (
            <>
                <AppBar />
                <main className = {`flex flex-col h-full w-full items-center justify-center p-[8vh]`}>
                    <svg stroke="red" fill="red" stroke-width="0" viewBox="0 0 512 512" height="300" width="300" xmlns="http://www.w3.org/2000/svg">
                        <path d="M228.9 79.9L51.8 403.1C40.6 423.3 55.5 448 78.9 448h354.3c23.3 0 38.2-24.7 
                        27.1-44.9L283.1 79.9c-11.7-21.2-42.5-21.2-54.2 0zM273.6 214L270 336h-28l-3.6-122h35.2zM256 402.4c-10.7 
                        0-19.1-8.1-19.1-18.4s8.4-18.4 19.1-18.4 19.1 8.1 19.1 18.4-8.4 18.4-19.1 18.4z"></path></svg>
                    
                    <h1 className='text-red text-2xl'> Guest, employer or no role do not have access</h1>
                    <div className='text-left flex flex-col m-[2vh]'>
                        <h1 className='text-black text-xl'>Hint :</h1>
                        <h1 className='text-black text-xl'>Register - login - choose employee role</h1>
                        <h1 className='text-black text-xl'>Employers do not have access</h1>
                    </div>
                    
                </main>
            </>
        )
    }
    else{
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
}