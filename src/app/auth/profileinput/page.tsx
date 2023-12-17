import { Box } from "@radix-ui/themes"; // Import the Box component 
import './Profile.css'; 
import CreateForm from "./CreateForm";
export default function Home() {
  return (
    <>
    <div className="two-column-layout">
        {/* Left Column */}
        <h2 className="left-column text-center">
          Hello, Home page!
          <CreateForm></CreateForm>
        </h2>

        {/* Right Column */}
        <Box className="right-column curved-box">
          {/* Content for the second column */}
          <p>This is the content for the second column.</p>
        </Box>
      </div>
      
      </>
  );
}


