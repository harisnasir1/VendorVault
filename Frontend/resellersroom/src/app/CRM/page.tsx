"use client";
import React, { useState, ReactNode } from "react";

type pageProps = {};



const page: React.FC<pageProps> = () => {
    
  const [sideopen, setsideopen] = useState<boolean>(true  );
  const [Conversations,SetConversations]=useState<string []>([])
  const [ selectcon,setselectedcon]=useState("")

  return (
    <>
      <div className="w-[100vw] bg-white h-[100vh]  text-black flex overflow-hidden">
     
          hello
        
      </div>
    </>
  );
};
export default page;
