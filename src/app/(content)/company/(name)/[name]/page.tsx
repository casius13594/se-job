import {FC} from "react";
import { createClient } from '@/utils/supabase/server'

interface pageProps{
    params: {name: string}
}

export async function check_employer_id(name: string){
    "use server"
    const supabase =await createClient()
    const user = await supabase.auth.getUser();
    console.log(user.data)
    
    // check user login or not
    if(user.data){
        const user_employer = await supabase
        .schema('public')
        .from('User')
        .select("user_id,type")
        .eq("user_id", user.data.user?.id)
        .eq("type","employer")
        .single();

        // check user is employer position
        if(user_employer.data)
        {
            const exist_employer = await supabase
            .schema('public')
            .from('Employer')
            .select("user_id,url")
            .eq("user_id",user.data.user?.id)
            .single();

            // check user create company page or not
            if(exist_employer.data)
            {
                const temp_url = "company/"+name;
                const company_url = exist_employer.data.url;

                return temp_url===company_url;
            }
            else
                return false;
        }
        else{
            return true;
        }
    }
    else{
        return true;
    }
    
}

const page:FC<pageProps> = async ({params}) =>{
    const check_employer_page = await check_employer_id(params.name)

    if(check_employer_page){
        return <div>
        <h1> other names are: {params.name}</h1>
        </div>
    }else{
        alert("You do not have permission to access another company page")
    }
    
}
export default page