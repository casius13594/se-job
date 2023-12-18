import Register from "./registerform"
import { redirect } from "next/navigation"
import {readUserSession} from "@/utils/actions/index"

export default async function page(){
  // const {data} = await readUserSession();
  // if(!data.session ){
  //   return redirect("/");
  // }
  return (
    <div className="max-h-full max-w-full ">
      <Register/>
    </div>
  )
}