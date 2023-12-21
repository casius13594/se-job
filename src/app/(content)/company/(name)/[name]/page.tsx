import {FC} from "react";
import { createClient } from '@/utils/supabase/server'
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
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
            .eq("url",'company/'+name)
            .single();

            if (user_e.data != null && user_e.data.user_id == user.data.user?.id){
                return [user_e,1];
            }
            else {return  [user_e,0]}
        }
    }
}

const page:FC<pageProps> = async ({params}) =>{
    const check_server_exist_ed = await check_server_exist(params.name)

    if (check_server_exist_ed != null && typeof check_server_exist_ed[0] !== 'number'){
        if (check_server_exist_ed[1] == 0){
            return (<>
            Hello guest
            <Profilepage companyName= {check_server_exist_ed[0].data.name}
            industry= {check_server_exist_ed[0].data.inds}
            location= {check_server_exist_ed[0].data.location}
            introduction={check_server_exist_ed[0].data.description}
            logo = {check_server_exist_ed[0].data.logo}
            size = {check_server_exist_ed[0].data.size}
            ></Profilepage>
            </>
            )
        }
        else{
            console.log(check_server_exist_ed[0].data)
            return(<>
            <Profilepage companyName= {check_server_exist_ed[0].data.name}
            industry= {check_server_exist_ed[0].data.inds}
            location= {check_server_exist_ed[0].data.location}
            introduction={check_server_exist_ed[0].data.description}
            logo = {check_server_exist_ed[0].data.logo}
            size = {check_server_exist_ed[0].data.size}
            ></Profilepage>
            </>)
        }
    }
    else {
        return (<><Custom404></Custom404></>)
    }

    
}
export default page