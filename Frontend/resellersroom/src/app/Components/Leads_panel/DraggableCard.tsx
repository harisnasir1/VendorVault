import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const columnOptions = ["NewLead", "NeedToSource", "Offered", "WarmLead", "Won", "Lost"];

const DraggableCard = ({ task, column, disableDrag = false,Manualcolchange, }: { task: any; column: object; disableDrag?: boolean,Manualcolchange:(newStage: string, oldstage:String, taskid:string, task_id:object)=>void }) => {
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



  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(!disableDrag && listeners)}
      {...(!disableDrag && attributes)}
      className={`relative w-[80%] h-[155px] text-black ${
        task.stage === 'Won'
          ? 'bg-[#B7CBAF]'
          : task.stage === 'Lost'
          ? 'bg-[#B56060]'
          : 'bg-[#D9D9D9]'
      } rounded-xl cursor-pointer flex flex-col gap-0.5 transition-all duration-300 ease-in-out shadow-lg shadow-black`}
    >
      
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
    <div className="absolute top-8 right-0 bg-white rounded-md shadow-lg z-50 w-32 py-1">
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


     
      <div className="h-[63%] flex justify-center items-center">
        <div className="w-[76%] h-[95%] rounded-2xl flex justify-center bg-white">
          <img
            src={task?.stockxitem[0]?.image}
            alt=""
            className="w-full h-full rounded-2xl p-4"
          />
        </div>
      </div>

    
      <div className="h-[33%] flex text-center justify-center items-center text-md font-bold">
        {task.Name}
      </div>
    </div>
  );
};


export default DraggableCard;
