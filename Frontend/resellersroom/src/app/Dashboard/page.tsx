"use client";
import React, { useState, ReactNode } from "react";

type pageProps = {};



const page: React.FC<pageProps> = () => {
    
  const [sideopen, setsideopen] = useState<boolean>(true  );
  const [Conversations,SetConversations]=useState<string []>([])
  const [ selectcon,setselectedcon]=useState("")

  return (
    <>
      <div className="">
     
          hello
        
      </div>
    </>
  );
};
export default page;
