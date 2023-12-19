import {FC} from "react";
import { createClient } from '@/utils/supabase/server'

interface pageProps{
    params: {name: string}
}

export async function check_user_id(name: string){
    "use server"
    const supabase = createClient();

    const user = await supabase.auth.getUser()

}

const page:FC<pageProps> =  ({params}) =>{

    return <div>
        <h1> other names are: {params.name}</h1>
        </div>
}
export default page