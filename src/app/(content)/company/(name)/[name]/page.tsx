import {FC} from "react";

interface pageProps{
    params: {name: string}
}

const page:FC<pageProps> =  ({params}) =>{
    return <div>
        <h1> other names are: {params.name}</h1>
        </div>
}
export default page