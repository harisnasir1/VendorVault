"use client";

import { useState } from "react";
import Sidebar from "../Main containers/Sidebar";
import Navbar from "../Main containers/Navbar";
import { SelectionProvider } from "../../Context/Leads/SelectionContext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [sideOpen, setSideOpen] = useState(true);

  
  const handleMainClick = (msg:String) => {

    console.log(window.innerWidth)
    if (window.innerWidth < 800 && msg!="menubtn" ) {
        
      setSideOpen(false);
    }
    else{
        setSideOpen(true);
    }
  };

  return (
    <div className="antialiased w-[100vw] h-[100vh] flex overflow-hidden bg-white text-[#e0e0e0]">
      <Sidebar
        sideopen={sideOpen}
        ClassName="z-10 bg-[#bec9ca] flex flex-col gap-5 items-center"
      />
      <div className="flex-grow bg-[#ffffff6b] " >
        <SelectionProvider>
          <Navbar toggleSidebar={handleMainClick} />
          <div
          className="flex flex-col gap-5 items-center  h-full"
          onClick={()=>handleMainClick("")} >
          {children
          }
          </div>
        </SelectionProvider>
      </div>
    </div>
  );
}
