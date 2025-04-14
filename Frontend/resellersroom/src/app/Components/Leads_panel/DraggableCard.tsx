
import React from 'react'
import { useDraggable } from '@dnd-kit/core';
const DraggableCard = ({ task }: { task: any }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: String(task.id),
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
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
export default DraggableCard