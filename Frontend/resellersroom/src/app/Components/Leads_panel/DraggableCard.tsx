import React, {useEffect, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskPanel } from './TaskPanel';
import {Clock} from 'lucide-react'
const columnOptions = ["NewLead", "NeedToSource", "Offered", "WarmLead", "Won", "Lost"];

const DraggableCard = ({ task, column, disableDrag = false,Manualcolchange, }: { task: any; column: object; disableDrag?: boolean,Manualcolchange:(newStage: string, oldstage:string, taskid:number, task_id:object)=>void }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: String(task.id),
    disabled: disableDrag, 
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  

  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedCol, setSelectedCol] = useState(task.stage);
  const [startpos,setstartpos]=useState<{x:number,y:number}|null>(null)
  const [showPanel, setShowPanel] = useState(false);
  const [clickedTask, setClickedTask] = useState(null);
  const [creationdate,setcreationdate]=useState<string>("");
  useEffect(()=>{
    const createdAt = task.createdAt; // or from your MongoDB doc
    const date = new Date(createdAt);


      const formatted = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })}`;
        setcreationdate(formatted)
  },[])
  const handelclickdown=(e:React.MouseEvent)=>{

    setstartpos({x:e.clientX,y:e.clientY});
  }
  const handelclickup=(e:React.MouseEvent)=>{
   
  
    if(startpos!=null)
    {
      const x= e.clientX - startpos?.x;
      const y= e.clientY - startpos?.y;
      const distance=  Math.sqrt(x * x + y * y);
      
      if(distance<5)
      {
        setClickedTask(task);
        setShowPanel(true);
      }
    }

  }
  console.log(task)

  return (
    <div
      ref={setNodeRef}
      onPointerDown={(e)=>handelclickdown(e)}
      onPointerUp={(e)=>handelclickup(e)}
    
      style={style}
      {...(!disableDrag && listeners)}
      {...(!disableDrag && attributes)}
      className={`relative w-[190px] h-[225px] text-black ${
        task.stage === 'Won'
          ? 'bg-[#B7CBAF]'
          : task.stage === 'Lost'
          ? 'bg-[#B56060]'
          : 'bg-[#D9D9D9]'
      } rounded-xl cursor-pointer flex flex-col gap-0.5 transition-all duration-300 ease-in-out shadow-lg shadow-black  hover:border-amber-50 border `}
    >
      {showPanel && <TaskPanel open={showPanel} setOpen={setShowPanel} task={clickedTask} />}
      <div className="absolute top-2 right-2 sm:block md:hidden">
  <button
    onClick={(e) => {
      e.stopPropagation();
      setOpenDropdown(!openDropdown);
    }}
    className="text-lg font-bold hover:bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center"
  >
    ⋯
  </button>

  {openDropdown && (
    <div className="absolute top-8 right-0 bg-whiterounded-md shadow-lg z-50 w-32 py-1">
      {columnOptions.map((colName) => (
        <button
          key={colName}
          onClick={() =>{
            Manualcolchange(colName,selectedCol,task.id,task)
            setSelectedCol(colName);
            setOpenDropdown(false); 
          
          }
          }
          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
        >
          {colName}
        </button>
      ))}
    </div>
  )}
</div>


     
      <div className="h-[53%] flex justify-center items-center ">
        <div className="w-[76%] h-[95%] rounded-2xl flex justify-center bg-white">
          <img
            src={task?.stockxitem[0]?.image}
            alt=""
            className="w-full h-full rounded-2xl "
          />
        </div>
      </div>

    
      <div className="h-[47%] rounded-xl  flex flex-col text-center justify-center items-center gap-1  text-sm text-black ">
        <div className='w-full h-[22%] '></div>
        <div className='w-full h-[22%] font-bold text-md overflow-hidden '>{task.Name}</div>
        <div className=' h-[22%] overflow-hidden text-xs   text-nowrap w-[90%] '>{task.stockxitem[0].name}</div>


        <div className='w-full h-[22%]  flex justify-start items-end gap-0.5'>
           <div className=' w-[32%] rounded-2xl flex justify-center bg-[#374D71] hover:font-bold text-white  font- h-[85%] ml-2.5'>
                    <div className=' flex items-center'> <Clock color="white" size={16} /></div>
                    <div className=' text-[10px] flex items-center'>{creationdate}</div>
           </div>
        </div>
      </div>
    </div>
  );
};


export default DraggableCard;
