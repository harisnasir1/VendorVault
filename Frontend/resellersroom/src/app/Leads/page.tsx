"use client"
import dynamic from "next/dynamic";
import React,{act, Children, ReactNode, useState} from 'react'
import {DndContext,DragOverlay } from '@dnd-kit/core';
import DraggableCard from "../Components/Leads_panel/DraggableCard";
import { col } from "motion/react-m";
const LeadCols = dynamic(() => import("../Components/Leads_panel/LeadCols"), { ssr: false });

type Props = {}


export default function page({}: Props) {
  const [state,setstate]=useState(initialData);
  const [activeCard, setActiveCard] = useState(null);



  const [draggedFromColumn, setDraggedFromColumn] = useState<string | null>(null);

const DragStart = (event: any) => {
  const { active } = event;
  const taskId = parseInt(active.id);
  const task = findTaskById(state, taskId);

  const colId = findColumnByTaskId(state, taskId);
  setDraggedFromColumn(colId);
  setActiveCard(task);
};



  const findTaskById = (state: any, id: number) => {
    return state.tasks[id];
  };


  const findColumnByTaskId = (state: any, taskId: string | number): string => {
    for (const colId of Object.keys(state.columns)) {
  //    console.log(state.columns[colId].taskIds)
      if (state.columns[colId].taskIds.includes(taskId)) {
        return colId;
      }
    }
    return "";
  };
  
  
  const DragEnd = (event: any) => {
    const { active, over } = event;
  
    if (!over || !draggedFromColumn) {
      setActiveCard(null);
      setDraggedFromColumn(null);
      return;
    }
  
    const taskId = parseInt(active.id);
    const destinationColId = over.id;
  
    // If dropped in the same column
    if (draggedFromColumn === destinationColId) {
      console.log("comming in same" , destinationColId, "  == ", draggedFromColumn)
      const column = state.columns[destinationColId];
      console.log(column)
      const oldIndex = column.taskIds.indexOf(taskId);
      console.log(oldIndex)
      const newIndex = over.data?.current?.sortable?.index;
      console.log(over)
      if (oldIndex === newIndex || newIndex == null) {
        // No reordering needed
        setActiveCard(null);
        setDraggedFromColumn(null);
        return;
      }
  
      const newTaskIds = [...column.taskIds];
      newTaskIds.splice(oldIndex, 1);
      newTaskIds.splice(newIndex, 0, taskId);
  
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [destinationColId]: {
            ...column,
            taskIds: newTaskIds,
          },
        },
      };
  
      setstate(newState);
      setActiveCard(null);
      setDraggedFromColumn(null);
      return;
    }
  else
   { // Else: Moving to different column
    console.log("comming in true ")
    const sourceCol = state.columns[draggedFromColumn];
    const destinationCol = state.columns[destinationColId];
  
    const newSourceTaskIds = sourceCol.taskIds.filter((id: number) => id !== taskId);
    const newDestinationTaskIds = [...destinationCol.taskIds, taskId];
  
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [draggedFromColumn]: {
          ...sourceCol,
          taskIds: newSourceTaskIds,
        },
        [destinationColId]: {
          ...destinationCol,
          taskIds: newDestinationTaskIds,
        },
      },
    };
  
    setstate(newState);
    setActiveCard(null);}
    setDraggedFromColumn(null);
  };
  


  return (
    <DndContext  onDragStart={DragStart} onDragEnd={DragEnd}> 



    <div className='lg:w-[80vw] md:w-[60vw] w-full px-0.5 h-[100vh]  flex gap-2 justify-start items-center overflow-x-auto
       [&::-webkit-scrollbar]:w-1
    [&::-webkit-scrollbar-track]:bg-gray-100
    [&::-webkit-scrollbar-thumb]:bg-gray-300
    dark:[&::-webkit-scrollbar-track]:bg-neutral-700
    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
    '>
  <div className="flex gap-1">
    {
      state.columnOrder.map((ColumnId, index) => {
        const column = state.columns[ColumnId];
        const tasks = column.taskIds.map((taskId,index) => state.tasks[taskId]);  // Fetch your MongoDB data here if needed
        return (
          <LeadCols key={index} className="" Colname={column.title} column={column} tasks={tasks} />
        );
      })
    }
  </div>
</div>
<DragOverlay>
        {activeCard ? <DraggableCard task={activeCard} /> : null}
      </DragOverlay>
</DndContext>

  )
}

const initialData = {
  tasks: {
    1: { id: 1, content: "Configure Next.js application" },
    2: { id: 2, content: "Configure Next.js and tailwind " },
    3: { id: 3, content: "Create sidebar navigation menu" },
    4: { id: 4, content: "Create page footer" },
    5: { id: 5, content: "Create page navigation menu" },
    6: { id: 6, content: "Create page layout" },
  },
  columns: {
    "NewLead": {
      id: "NewLead",
      title: "New Lead",
      taskIds: [1, 2, 3, 4, 5, 6],
    },
    "NeedToSource": {
      id: "NeedToSource",
      title: "Need To Source",
      taskIds: [],
    },
    "Offered": {
      id: "Offered",
      title: "Offered",
      taskIds: [],
    },
    "WarmLead": {
      id: "WarmLead",
      title: "Warm Lead",
      taskIds: [],
    },
    "Won": {
      id: "Won",
      title: "Won",
      taskIds: [],
    },
    "Lost": {
      id: "Lost",
      title: "Lost",
      taskIds: [],
    },
  },
  columnOrder: ["NewLead", "NeedToSource", "Offered", "WarmLead", "Won", "Lost"],
};
