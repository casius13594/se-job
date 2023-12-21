import {FC} from "react";
import { createClient } from '@/utils/supabase/server'
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import AppBar from "@/components/appbar";
import Profilepage from "@/components/profilepage";
import Custom404 from "@/components/404page";
interface pageProps{
    params: {name: string}
}
export async function check_server_exist(name: string){
    "use server"
    const supabase =await createServerComponentClient({cookies})
    const server_url = await supabase.schema('public').from('Employer').select('url').eq('url','company/'+name).single();
    if (server_url.data == null){
        return null
    }
    else{
        const user = await supabase.auth.getUser();
        console.log(user);
        if (user.data){
            const user_e = await supabase.schema('public').
            from('Employer').
            select("*")
            .eq("user_id", user.data.user?.id)
            .eq("url",'company/'+name)
            .single();

            if (user_e.data != null){
                return user_e;
            }
            else {return 'guest'}
        }
    }
}

const page:FC<pageProps> = async ({params}) =>{
    const check_server_exist_ed = await check_server_exist(params.name)

    if (check_server_exist_ed != null){
        if (check_server_exist_ed == 'guest'){
            return (<>Hello guest</>)
        }
        else{
            return(<>Hello owner</>)
        }
    }
    else {
        return (<><Custom404></Custom404></>)
    }

    
}
export default page