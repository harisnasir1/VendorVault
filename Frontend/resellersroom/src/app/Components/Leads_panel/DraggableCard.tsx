import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const DraggableCard = ({ task,column }: { task: any, column:object }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: String(task.id), // Important: should be a string
    
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`w-[80%] h-[155px] text-black ${task.stage=='Won'?"bg-[#B7CBAF]":task.stage=="Lost"?"bg-[#B56060]":"bg-[#D9D9D9]"} rounded-xl cursor-pointer flex flex-col gap-0.5 transition-all duration-300 ease-in-out `}>
      
             <div className=' h-[65%] flex justify-center items-center'>
             <div className=' w-[76%] h-[95%]   rounded-2xl flex justify-center'>
             <img src={task?.stockxitem[0]?.image} alt="" className=' w-full h-full rounded-2xl p-2  ' />
                   </div>
             </div>
             <div className=' h-[35%]  flex text-center justify-center items-center text-md font-bold'>
             {task.Name}
             </div>

      </div>
  );
};

export default DraggableCard;