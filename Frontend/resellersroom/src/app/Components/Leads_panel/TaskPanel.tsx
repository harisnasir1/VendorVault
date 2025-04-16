import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  
  export function TaskPanel({ open, setOpen, task }:{open:boolean, setOpen:React.Dispatch<boolean>, task:any }) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px] animate-in fade-in zoom-in-90">
          <DialogHeader>
            <DialogTitle>{task?.Name}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <img src={task?.stockxitem?.[0]?.image} className="w-full rounded-lg" />
            <p className="mt-4 text-sm text-muted-foreground">Task Details here</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  