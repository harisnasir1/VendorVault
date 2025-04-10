import React from 'react'
import Link from "next/link";

const Slide = ({img, name, link, number}: {img: string, link: string, name: string, number: null|string}) => {
    return(
        <div className={`ml-4 w-[90%] h-[14%] text-sm hover:bg-background cursor-pointer text-[#454545] flex items-center gap-3`}>
            <div className="flex justify-center items-center w-6 h-6">
                <img  src={img} alt="" className="w-full h-full object-contain" />
            </div>
            <div className="flex-1 flex justify-start items-center">
                {/* Fixed Link component */}
                <Link href={link} passHref legacyBehavior>
                    <a className="w-full">{name}</a>
                </Link>
            </div>
            {number && (
                <div className="flex items-center justify-center w-10 h-10">
                    <h3 className="h-[56%] w-full text-center flex items-center justify-center rounded-2xl text-white bg-[#374D71] px-2">
                        {number}
                    </h3>
                </div>
            )}
        </div>
    )
}

const Sideoptions = () => {
  return (
    <div className='w-full h-[50%] flex flex-col items-start justify-around'>
        {/* Fixed links - Next.js routes are case-sensitive */}
        <Slide img="/images/Dahboard.png" name="Dashboard" number={null} link="/Dashboard" />
        <Slide img="/images/request.png" name="Add New Request" number={null} link="/" />
        <Slide img="/images/Lead.png" name="Lead Management" number={"54"} link="/Leads" />
        <Slide img="/images/supplier.png" name="Supplier CRM" number={null} link="/CRM" />
        <Slide img="/images/Crm.png" name="Customer CRM" number={null} link="/customer-crm" />
    </div>
  )
}

export default Sideoptions