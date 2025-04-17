"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DraggableCard from "../Components/Leads_panel/DraggableCard";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { Reseller, RootState } from "@/lib/Resellerstore";
import {addItem,Toggleleadsrenderstep} from '@/lib/features/Newrequest/NewRequestSlice'

const LeadCols = dynamic(() => import("../Components/Leads_panel/LeadCols"), {
  ssr: false,
});

type Props = {};

type task={
  id:number,
  _id:string,
  Name:string,
  stockxitem:string,
  shopifycustomerid:string,
  cusid:string,
  size:string,
  condition:string,
  stage:string,
  createdAt:string,
}
type column={
  id:number,
  title:string,
  taskIds:number[]
}
type statetype={
  tasks:{
   [ key:string]:task
  },
  columns:{
    [key:string]:column
  },
  columnOrder:string[]
}


function useIsSmallScreen() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isSmallScreen;
}

export default function page({}: Props) {
  const dispatch=useDispatch()
  const [state, setstate] = useState<statetype>();
  const [activeCard, setActiveCard] = useState(null);
  const [smcolumn, setsmcolumn] = useState<string>("NewLead");
  const [userid, setuserid] = useState<string | null>("");
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10, 
      },
      
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 10,
        tolerance: 5,
      },
    })
  );
  
  useEffect(() => {
    dispatch(Toggleleadsrenderstep(0));
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("tempcred");
      setuserid(id);
    }
  }, []);

  useEffect(() => {
    const fetchallorders = async () => {
      const mongodata = (
        await axios.post("http://localhost:8000/api/orders/getAllOrders", {
          id: userid,
        })
      ).data;
      console.log(mongodata);
      setstate(mongodata);
    };
    fetchallorders();
  }, [userid]);

  const isSmallScreen = useIsSmallScreen();

  const DragStart = (event: any) => {
  if(state) { const { active } = event;
    const taskId = parseInt(active.id);
    const task = findTaskById(state, taskId);
    
    const colId = findColumnByTaskId(state, taskId);
   
    setActiveCard(task);}
  };

  const findTaskById = (state: any, id: number) => {
    return state.tasks[id];
  };

  const findColumnByTaskId = (state: statetype, taskId: number): string => {
    for (const colId of Object.keys(state.columns)) {
     
      if (state.columns[colId].taskIds.includes(taskId)) {
        return colId;
      }
    }
    return "";
  };

  const DragEnd = (event: any) => {
    const { active, over } = event;

    if (!over ) return setActiveCard(null);
    if(state)
      {
    const currenttask = findTaskById(state, active.id);
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
    const newSourceTaskIds = sourceCol.taskIds.filter((id) => id !== activeId);

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
      tasks: {
        ...state.tasks,
        [active.id]: {
          ...state.tasks[Number(active.id)],
          stage: destinationCol.title,
        },
      },
    };

    setstate(newState);
    setActiveCard(null);
    axios.post("http://localhost:8000/api/orders/UpdateStages", {
      taskid: currenttask,
      newstage: destinationCol.id,
    });}
  };

  const Manualcolchange = (
    newStage: string,
    oldstage: string,
    taskid: number,
    task_id: object
  ) => {
   if(state)
    { const sourceCol = state.columns[oldstage];
    const newSourceTaskIds = sourceCol.taskIds.filter((id:number) => id !== taskid);

    const destinationCol = state.columns[newStage];

    const isOverAColumn = state.columns.hasOwnProperty(newStage);

    const newDestinationTaskIds = isOverAColumn
      ? [...destinationCol.taskIds, taskid] // just push at end
      : (() => {
          const index = destinationCol.taskIds.indexOf(parseInt(newStage));
          const updated = [...destinationCol.taskIds];
          updated.splice(index, 0, taskid);
          return updated;
        })();

    const n = {
      ...state,
      columns: {
        ...state.columns,
        [oldstage]: {
          ...sourceCol,
          taskIds: newSourceTaskIds,
        },
        [newStage]: {
          ...destinationCol,
          taskIds: newDestinationTaskIds,
        },
      },
      tasks: {
        ...state.tasks,
        [taskid]: {
          ...state.tasks[Number(taskid)],
          stage: destinationCol.title,
        },
      },
    };
    setstate(n);
    setActiveCard(null);
    axios.post("http://localhost:8000/api/orders/UpdateStages", {
      taskid: task_id,
      newstage: newStage,
    });}
  };

  return (
    <DndContext onDragStart={DragStart} onDragEnd={DragEnd}  sensors={sensors}>
      {!isSmallScreen ? (
        <div
          className="lg:w-[80vw] md:w-[60vw] lg:visible hidden w-full px-0.5 h-[100vh]  lg:flex gap-2 justify-start items-center overflow-x-auto
       [&::-webkit-scrollbar]:w-1
    [&::-webkit-scrollbar-track]:bg-gray-100
    [&::-webkit-scrollbar-thumb]:bg-gray-300
    dark:[&::-webkit-scrollbar-track]:bg-neutral-700
    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 "
        >
          <div className="flex gap-1">
            {state &&
              state.columnOrder &&
              state.columnOrder.map((ColumnId, index) => {
                const column = state.columns[ColumnId];
                const tasks = column.taskIds.map(
                  (taskId, index) => state.tasks[taskId]
                ); // Fetch your MongoDB data here if needed
                return (
                  <LeadCols
                    key={index}
                    className=""
                    Colname={column.title}
                    column={column}
                    tasks={tasks}
                    disableDrag={isSmallScreen}
                    Manualcolchange={Manualcolchange}
                  />
                );
              })}
          </div>
        </div>
      ) : (
        <div className=" lg:hidden visible w-full h-full flex-col  flex items-center">
          <div className=" w-full  h-[5vh] flex justify-center item-center ">
            <select
              id="condition"
              value={smcolumn}
              onChange={(e) => {
                setsmcolumn(e.target.value);
              }}
              className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg  p-2.5 ml-1.5"
            >
              <option value="NewLead">NewLead</option>
              <option value="NeedToSource">Need To Source</option>
              <option value="Offered">Offered</option>
              <option value="WarmLead">WarmLead</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          {state &&
            state.columnOrder &&
            state.columnOrder.map((ColumnId, index) => {
              const column = state.columns[ColumnId];
              const tasks = column.taskIds.map(
                (taskId, index) => state.tasks[taskId]
              );
              if (smcolumn == ColumnId) {
                return (
                  <LeadCols
                    key={index}
                    className=""
                    Colname={column.title}
                    column={column}
                    tasks={tasks}
                    disableDrag={isSmallScreen}
                    Manualcolchange={Manualcolchange}
                  />
                );
              } // Fetch your MongoDB data here if needed
            })}
        </div>
      )}

      <DragOverlay>
        {activeCard ? <DraggableCard task={activeCard} column={{}} disableDrag Manualcolchange={Manualcolchange} /> : null}
      </DragOverlay>
    </DndContext>
  );
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
    NewLead: {
      id: "NewLead",
      title: "New Lead",
      taskIds: [1, 2, 3, 4],
    },
    NeedToSource: {
      id: "NeedToSource",
      title: "Need To Source",
      taskIds: [5],
    },
    Offered: {
      id: "Offered",
      title: "Offered",
      taskIds: [],
    },
    WarmLead: {
      id: "WarmLead",
      title: "Warm Lead",
      taskIds: [6],
    },
    Won: {
      id: "Won",
      title: "Won",
      taskIds: [],
    },
    Lost: {
      id: "Lost",
      title: "Lost",
      taskIds: [],
    },
  },
  columnOrder: [
    "NewLead",
    "NeedToSource",
    "Offered",
    "WarmLead",
    "Won",
    "Lost",
  ],
};
