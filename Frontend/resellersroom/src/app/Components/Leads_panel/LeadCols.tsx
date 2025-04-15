import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import dynamic from "next/dynamic";
const DraggableCard = dynamic(() => import("./DraggableCard"), { ssr: false });

type Props = {
  className: string;
  Colname: string;
  column: any;
  tasks: any[];
  disableDrag?: boolean; 
  Manualcolchange:(newStage: string ,oldstage:String, taskid:string, task_id:object)=>void;
};

const LeadCols = (props: Props) => {
  const { setNodeRef } = useDroppable({
    id: props.column.id, 
  });

  return (
    <div className="lg:w-[20vw] lg:h-[90vh] w-[70vw] h-[80vh] flex flex-col py-3 px-2 ">
    
      <div className="text-black text-lg font-semibold text-center mb-4">
        {props.Colname}
      </div>

    
      <div
        className="flex-1 overflow-y-auto border-1 border-black 
        [&::-webkit-scrollbar]:hidden
        dark:[&::-webkit-scrollbar]:hidden
        scrollbar-thin"
        ref={setNodeRef}
      >
        <SortableContext
          items={props.tasks&&props.tasks.map((task) => task.id.toString())}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col items-center gap-5 p-1 transition-all duration-300 ease-in-out">
            {props.tasks.map((task: any, index) => (
              <DraggableCard key={task.id} task={task} column={props.column} disableDrag={props.disableDrag} Manualcolchange={props.Manualcolchange} />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
};

export default LeadCols;