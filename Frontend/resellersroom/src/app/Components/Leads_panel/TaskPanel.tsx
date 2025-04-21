"use client";

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogPortal,
  DialogOverlay
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Check } from "lucide-react";
import axios from "axios";
import { Suggest,labeltype } from "../Small comps/Types";




export function TaskPanel({
  open,
  setOpen,
  task,
  fetchallorders
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  task: Suggest|null;
  fetchallorders: () => void
}) {
  const [labelDialogOpen, setLabelDialogOpen] = useState(false);
  const [createLabelOpen, setCreateLabelOpen] = useState(false);
  const [Description,setDescription]=useState<string>(task?.Description ?? "")
  const [selectedLabels, setSelectedLabels] = useState<Suggest|null>(task?.labels);
  const [newLabel, setNewLabel] = useState("");
  const [selectedColor, setSelectedColor] = useState("bg-blue-500");
  const [availableLabels,setavailableLabels]=useState<any>([])
  const dialogRef = useRef<HTMLDivElement>(null);

  const AddnewLabel =async(color:string,label:string)=>{
     const userid=localStorage.getItem("tempcred");                             ///change it when implement user interface thing
      const data=await axios.post("http://localhost:8000/api/features/addlabel",{
        color:color,
        name:label,
        userid:userid
      })
      setCreateLabelOpen(false);
      const availtags= await axios.post("http://localhost:8000/api/features/getlabels",{
        id:localStorage.getItem("tempcred")
       })
     
       
       setavailableLabels(availtags.data.data
)       //.log(availableLabels)
       setLabelDialogOpen(true)
      
  }

 

  const toggleLabel = (label: any) => {
    
    setSelectedLabels((prev:[labeltype]) =>
      prev.find((l) => l._id === label._id)
        ? prev.filter((l) => l.label.name !== label.label.name)
        : [...prev, label]
    );
  };

  useEffect(()=>{
  
  const fetchlables=async()=>{
    const availtags= await axios.post("http://localhost:8000/api/features/getlabels",{
      id:localStorage.getItem("tempcred")
     })
   
    
 
     setavailableLabels(availtags.data.data)
   
     //.log(availableLabels)
  }
  fetchlables()
  },[setCreateLabelOpen,setLabelDialogOpen])


  const Updateorderlabel=async()=>{
    if(task)
    {
      const cleanlabel=  selectedLabels.map(({ _id }:{_id:labeltype}) => _id);
      const res= await axios.post("http://localhost:8000/api/orders/updatelabels",{
        newlabels:cleanlabel,
        orderid:task._id
      })
      
      fetchallorders()
      setSelectedLabels(res.data.data[0].labels)
      setLabelDialogOpen(false)
    }
 
  }


  const colors = [
    "bg-red-500", "bg-green-500", "bg-blue-500", "bg-yellow-400",
    "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500",
    "bg-orange-500", "bg-lime-500", "bg-emerald-500", "bg-cyan-500",
    "bg-rose-500", "bg-violet-500", "bg-fuchsia-500", "bg-sky-500",
    "bg-amber-500", "bg-gray-500", "bg-zinc-500", "bg-neutral-500",
    "bg-stone-500", "bg-blue-400", "bg-green-400", "bg-red-400",
    "bg-pink-400", "bg-purple-400", "bg-yellow-300", "bg-orange-400",
    "bg-teal-400", "bg-indigo-400"
  ];

  const SupmitDesription=async()=>{
   
    setOpen(false)
    console.log("see")
   
      console.log("shit")
   const r= await axios.post("http://localhost:8000/api/orders/UpdateDescription",{
      Description:Description,
      orderid:task._id
    })
    fetchallorders()

  }
  return (
    <>
<Dialog open={open} onOpenChange={()=>SupmitDesription()}>
  <DialogPortal>
    <DialogOverlay className="fixed inset-0 bg-black/50 z-50" />
    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-90 z-50">
      <DialogHeader>
        <DialogTitle className=" w-full text-center text-2xl">{task?.Name}</DialogTitle>
      </DialogHeader>

      <div className="flex justify-center   ">
            <img
              src={task?.stockxitem[0].image}
              alt="Product"
              className="w-40 h-40 object-contain rounded-lg"
            />
          </div>
          <div className=" text-lg text-center font-bold ">
          {task?.stockxitem[0].name}
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-2">Labels</h3>
            <div className="flex gap-2 flex-wrap">
              {selectedLabels&&selectedLabels.map((label:labeltype,index:number) =>
               (
                <div
                  key={label._id}
                  className={`px-3 py-1 text-sm rounded-full text-white ${label.label.col}`}
                >
                  {label.label.name}
                </div>
              )
              )}
              <Button
                size="icon"
                variant="outline"
                onClick={() => setLabelDialogOpen(true)}
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>

       
      
            <div className="mb-4">
              <label className="text-sm font-medium mb-1 block">
                Description
              </label>
              <textarea
                value={Description}
                onChange={(e)=>setDescription(e.target.value)}
                rows={5}
                className="w-full rounded-md border p-2 text-sm resize-none"
                placeholder="Add task description..."
              />
            </div>
 
    </DialogContent>
  </DialogPortal>
</Dialog>

     
      <Dialog open={labelDialogOpen} onOpenChange={()=>Updateorderlabel()}>
        <DialogContent className="sm:max-w-sm p-4">
          <DialogHeader>
            <DialogTitle>Select a Label</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-2 my-4">
            {
            
            availableLabels&&availableLabels.map((label:any,index:number) => 
           {
             return(
              
              <Button
                key={label._id}
                variant="secondary"
                onClick={() => toggleLabel(label)}
                className={`justify-between ${
                selectedLabels&&  selectedLabels.find((l:labeltype) => l._id === label._id)
                    ? "border-black"
                    : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${label.label.col}`} />
                  {label.label.name}
                </div>
                {selectedLabels&&selectedLabels.find((l:labeltype) => l.label.name === label.label.name) && (
                  <Check size={16} />
                )}
              </Button>
            )}
            )}
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setLabelDialogOpen(false);
              setCreateLabelOpen(true);
            }}
          >
            Create New Label
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={createLabelOpen} onOpenChange={setCreateLabelOpen}>
        <DialogContent className="sm:max-w-sm p-4">
          <DialogHeader>
            <DialogTitle>Create a Label</DialogTitle>
          </DialogHeader>
          <input
            className="w-full p-2 border rounded mb-4"
            placeholder="Label Name"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
          />

          <div className="flex gap-2 flex-wrap mb-4">
            {colors.map((color) => (
              <div
                key={color}
                className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                  selectedColor === color
                    ? "border-black"
                    : "border-transparent"
                } ${color}`}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>

          <Button
            onClick={() => {
             AddnewLabel(selectedColor,newLabel)
            }}
          >
            Add
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
