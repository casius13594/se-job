import { Box } from "@radix-ui/themes"; // Import the Box component 
import './Profile.css'; 
import CreateForm from "./CreateForm";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <>
          <div className="justify-center items-center">
            <div className="ml-4 flex">
              <Image src="/GI.svg" alt="me" width="250" height="250" className="mr-14" />
              <Image src="/Req.svg" alt="me" width="200" height="200" className="mt-4" />
          </div>
          <div className="font-bold text-lg ml-11">Contact Information</div>
          <CreateForm></CreateForm>
        </div>
    </>
  );
}
