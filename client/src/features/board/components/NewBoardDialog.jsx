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
import { Input } from "@/components/ui/input";

function NewBoardDialog({ children, addBoard }) {
  const handleNewBoard = (e) => {
    e.preventDefault();
    const board_name = e.target.board_name.value;
    addBoard(board_name);
    setOpen(false);
  };

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Board</DialogTitle>
          <DialogDescription>Add your own board.</DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={handleNewBoard}>
          <Input type="text" placeholder="Board Name" name="board_name" />
          <Button type="submit">Save</Button>
        </form>

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

export default NewBoardDialog;
