"use client";

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Check } from "lucide-react";

type Suggest = {
  _id: string;
  Stockxid: string;
  sku: string;
  name: string;
  slug: string;
  brand: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

const availableLabels = [
  { id: 1, name: "Urgent", color: "bg-red-500" },
  { id: 2, name: "Follow-up", color: "bg-blue-500" },
  { id: 3, name: "Info", color: "bg-green-500" },
];

export function TaskPanel({
  open,
  setOpen,
  task,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  task: Suggest;
}) {
  const [labelDialogOpen, setLabelDialogOpen] = useState(false);
  const [createLabelOpen, setCreateLabelOpen] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState<any[]>([]);
  const [newLabel, setNewLabel] = useState("");
  const [selectedColor, setSelectedColor] = useState("bg-blue-500");
  const dialogRef = useRef<HTMLDivElement>(null);



  const toggleLabel = (label: any) => {
    setSelectedLabels((prev) =>
      prev.find((l) => l.id === label.id)
        ? prev.filter((l) => l.id !== label.id)
        : [...prev, label]
    );
  };

  const colors = ["bg-red-500", "bg-green-500", "bg-blue-500", "bg-yellow-400"];

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="w-[600px] h-[90vh] overflow-y-auto animate-in fade-in zoom-in-90"
          ref={dialogRef}
        >
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl  text-center">
              {task?.Name}
            </DialogTitle>
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

          {/* Labels Section */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-2">Labels</h3>
            <div className="flex gap-2 flex-wrap">
              {selectedLabels.map((label) => (
                <div
                  key={label.id}
                  className={`px-3 py-1 text-sm rounded-full text-white ${label.color}`}
                >
                  {label.name}
                </div>
              ))}
              <Button
                size="icon"
                variant="outline"
                onClick={() => setLabelDialogOpen(true)}
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>

          {/* Description Area */}
      
            <div className="mb-4">
              <label className="text-sm font-medium mb-1 block">
                Description
              </label>
              <textarea
                rows={5}
                className="w-full rounded-md border p-2 text-sm resize-none"
                placeholder="Add task description..."
              />
            </div>
 

        
    
        </DialogContent>
      </Dialog>

      {/* Nested Dialogs (Label Selector & Create Label) */}
      <Dialog open={labelDialogOpen} onOpenChange={setLabelDialogOpen}>
        <DialogContent className="sm:max-w-sm p-4">
          <DialogHeader>
            <DialogTitle>Select a Label</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-2 my-4">
            {availableLabels.map((label) => (
              <Button
                key={label.id}
                variant="secondary"
                onClick={() => toggleLabel(label)}
                className={`justify-between ${
                  selectedLabels.find((l) => l.id === label.id)
                    ? "border-black"
                    : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${label.color}`} />
                  {label.name}
                </div>
                {selectedLabels.find((l) => l.id === label.id) && (
                  <Check size={16} />
                )}
              </Button>
            ))}
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
              const label = {
                id: Date.now(),
                name: newLabel,
                color: selectedColor,
              };
              setSelectedLabels((prev) => [...prev, label]);
              setCreateLabelOpen(false);
              setNewLabel("");
            }}
          >
            Add
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
