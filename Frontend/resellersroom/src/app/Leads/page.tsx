"use client"
import dynamic from "next/dynamic";
import React,{act, Children, ReactNode, useState,useEffect} from 'react'
import {DndContext,DragOverlay } from '@dnd-kit/core';
import DraggableCard from "../Components/Leads_panel/DraggableCard";
import { col } from "motion/react-m";
import axios from "axios";
const LeadCols = dynamic(() => import("../Components/Leads_panel/LeadCols"), { ssr: false });

type Props = {}


export default function page({}: Props) {
  const [state,setstate]=useState(initialData);
  const [activeCard, setActiveCard] = useState(null);
  

  useEffect(()=>{
    const fetchallorders=async()=>{
      const mongodata=(await axios.get("http://localhost:8000/api/orders/getAllOrders")).data;
     console.log(mongodata)
     setstate(mongodata)
    }
    fetchallorders()
  },[])

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
    if (!over) return setActiveCard(null);
  
    const activeId = parseInt(active.id); 
    const overId = over.id;
  
    const sourceColId = findColumnByTaskId(state, activeId);
  
    // CASE 1: over.id is a column → dropped into empty space in column
    const isOverAColumn = state.columns.hasOwnProperty(overId);
    const destinationColId = isOverAColumn
      ? overId
      : findColumnByTaskId(state, parseInt(overId));
  
    
    if (!destinationColId) return setActiveCard(null);
  
    const sourceCol = state.columns[sourceColId];
    const destinationCol = state.columns[destinationColId];
  
    if (sourceColId === destinationColId) {
      // Reordering in the same column
      const oldIndex = sourceCol.taskIds.indexOf(activeId);
  
      const newIndex = isOverAColumn
        ? sourceCol.taskIds.length
        : sourceCol.taskIds.indexOf(parseInt(overId));
  
      if (oldIndex === newIndex) {
        setActiveCard(null);
        return;
      }
  
      const newTaskIds = [...sourceCol.taskIds];
      newTaskIds.splice(oldIndex, 1); // remove active
      newTaskIds.splice(newIndex, 0, activeId); // insert at new index
  
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [sourceColId]: {
            ...sourceCol,
            taskIds: newTaskIds,
          },
        },
      };
      setstate(newState);
      setActiveCard(null);
      return;
    }
  
    // CASE 2: Moving to a different column
    const newSourceTaskIds = sourceCol.taskIds.filter(id => id !== activeId);
  
    const newDestinationTaskIds = isOverAColumn
      ? [...destinationCol.taskIds, activeId] // just push at end
      : (() => {
          const index = destinationCol.taskIds.indexOf(parseInt(overId));
          const updated = [...destinationCol.taskIds];
          updated.splice(index, 0, activeId);
          return updated;
        })();
        
  
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [sourceColId]: {
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
    setActiveCard(null);
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
    "1": { id: 1, content: "Configure Next.js application" },
    "2": { id: 2, content: "Configure Next.js and tailwind " },
    "3": { id: 3, content: "Create sidebar navigation menu" },
    "4": { id: 4, content: "Create page footer" },
    "5": { id: 5, content: "Create page navigation menu" },
    "6": { id: 6, content: "Create page layout" },
  },
  columns: {
    "NewLead": {
      id: "NewLead",
      title: "New Lead",
      taskIds: [1, 2, 3, 4],
    },
    "NeedToSource": {
      id: "NeedToSource",
      title: "Need To Source",
      taskIds: [5],
    },
    "Offered": {
      id: "Offered",
      title: "Offered",
      taskIds: [],
    },
    "WarmLead": {
      id: "WarmLead",
      title: "Warm Lead",
      taskIds: [6],
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