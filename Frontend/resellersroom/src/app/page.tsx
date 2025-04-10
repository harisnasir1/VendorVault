"use client";
import React, { useState, ReactNode } from "react";
import Sidebar from "./Components/Main containers/Sidebar";
import MainContainer from "./Components/Main containers/MainContainer";
import Sidelogo from "./Components/Small comps/Sidelogo";
type pageProps = {};

const Sidepanel = ({
  sideopen,
  children,
  className,
}: {
  sideopen: boolean;
  children: ReactNode;
  className: string;
}) => {
  return (
    <div
      className={`
    absolute md:relative
    transition-all duration-500 ease-in-out
    ${
      sideopen
        ? "translate-x-0 lg:w-[20vw] md:w-[30vw]"
        : "-translate-x-full md:translate-x-0 lg:w-0 md:w-0 overflow-hidden"
    }
    w-[60vw]  // Mobile width
    h-full  ${className}
  `}
    >
      {children}
    </div>
  );
};


const page: React.FC<pageProps> = () => {
    
  const [sideopen, setsideopen] = useState<boolean>(true  );
  const [Conversations,SetConversations]=useState<string []>([])
  const [ selectcon,setselectedcon]=useState("")

  return (
    <>
   
    </>
  );
};
export default page;
