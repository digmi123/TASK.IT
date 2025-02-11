import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import View from "@/assets/view.svg?react";
import Description from "@/assets/description.svg?react";
import bg from "@/assets/task-bg.jpg";
import Comments from "@/features/task/components/Coments";

export default function TaskDialog({ task, children }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[600px]">
        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
          <DialogDescription>Add your own task.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <img src={bg} alt="background-image" className="h-[200px]" />

          <div className="flex flex-col items-start gap-4">
            <div className="flex gap-4">
              <View />
              <h1>{task.title}</h1>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4">
            <div className="flex gap-4">
              <Description />
              <p>{task.description}</p>
            </div>
          </div>

          <hr
            id="divider"
            className="w-full h-[1px] bg-slate-300 rounded-md my-4 border-0"
          />
        </div>

        <Comments task={task} />

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
