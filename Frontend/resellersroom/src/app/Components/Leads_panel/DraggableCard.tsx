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
      className="w-[80%] h-[150px] text-black bg-[#D9D9D9] rounded-xl cursor-pointer"
    >
      {task.content}
    </div>
  );
};

export default DraggableCard;
