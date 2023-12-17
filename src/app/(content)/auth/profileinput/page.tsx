import { Box } from "@radix-ui/themes"; // Import the Box component 
import './Profile.css'; 
import CreateForm from "./CreateForm";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="two-column-layout">
        {/* Left Column */}
        <div className="left-column curved-box scrollable-column">
          <div className="flex justify-center items-center">
            <div className="ml-4 flex">
              <Image src="/GI.svg" alt="me" width="250" height="250" className="mr-14" />
              <Image src="/Req.svg" alt="me" width="200" height="200" className="mt-4" />
            </div>
          </div>
          <div className="font-bold text-lg ml-11">Contact Information</div>
          <CreateForm></CreateForm>
        </div>

        {/* Right Column */}
        <Box className="right-column curved-box">
          {/* Content for the second column */}
          <p>This is the content for the second column.</p>
        </Box>
      </div>
    </>
  );
}
