import React,{ReactNode, useState} from 'react'
import axios from 'axios'
import Requestserch from './Requestserch'
import Requestresult from './Requestresult'
import {Suggest} from '../Small comps/Types'
import { motion } from "motion/react"

type Props = {
    sideopen:boolean,
    suggesteddata:Suggest[],
    setsuggesteddata:React.Dispatch<React.SetStateAction<Suggest>>
}

function Requestpanle({sideopen,suggesteddata,setsuggesteddata}: 
  {sideopen:boolean,suggesteddata:Suggest[],setsuggesteddata:React.Dispatch<React.SetStateAction<Suggest[]>>}) {
  const [search,setsearch]=useState<String>("")
  const Getdata=async(msg:String)=>{
    console.log("click",msg)
   const data= await axios.post("http://localhost:8000/api/Stockx/getstockstore",{
    search:msg
   })
  console.log(data.data);
   setsuggesteddata(data.data.message)
  }
  
  const [mcom,setmcom]=useState<boolean>(false)
  const Requestmade=()=>{
  console.log("hello")
  }
  const variants ={
    
  }
  return (
    <div
   
    className={`${sideopen ? "lg:w-[80%]" : "lg:w-[70%]"} 
      h-[75vh] bg-[#EBEBEB] flex flex-col text-black`}>
      <Requestserch search={search} setsearch={setsearch} Getdata={Getdata}/>
     { 
      <Requestresult suggesteddata={suggesteddata} setsuggesteddata={setsuggesteddata}
      Requestmade={Requestmade}
      />}
    </div>
  )
}

export default Requestpanle