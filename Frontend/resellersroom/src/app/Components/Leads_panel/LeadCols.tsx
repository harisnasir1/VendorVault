import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import DraggableCard from './DraggableCard';

type Props = {
  className: string;
  Colname: string;
  column: any;
  tasks: any[];
};

const LeadCols = (props: Props) => {
  const { setNodeRef } = useDroppable({
    id: props.column.id, // unique ID for the column
  });

  return (
    <div className="w-[20vw] h-[90vh] flex flex-col py-3 px-2">
      {/* Column Title */}
      <div className="text-black text-lg font-semibold text-center mb-4">
        {props.Colname}
      </div>

      {/* Scrollable card container */}
      <div
        className="flex-1 overflow-y-auto border-1 border-black 
        [&::-webkit-scrollbar]:hidden
        dark:[&::-webkit-scrollbar]:hidden
        scrollbar-thin"
        ref={setNodeRef}
      >
        <SortableContext
          items={props.tasks.map((task) => task.id.toString())}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col items-center gap-4 p-1">
            {props.tasks.map((task: any, index) => (
              <DraggableCard key={task.id} task={task} column={props.column} />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
};

export default LeadCols;
