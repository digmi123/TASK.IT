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
import TemplateCard from "@/shared/components/TemplateCard";
import NewMemberAvatar from "@/features/members/components/NewMemberAvatar";
import { useDesks } from "@/shared/providers/DesksProvider";

function NewDeskDialog() {
  const { addDesk } = useDesks();
  const handleNewDesk = (e) => {
    e.preventDefault();
    const deskName = e.target.desk_name.value;
    addDesk(deskName);
    setOpen(false);
  };

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="m-4" variant="secondary">
          Create Desk
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-fit">
        <DialogHeader>
          <DialogTitle>New Desk</DialogTitle>
          <DialogDescription>Add your own desk.</DialogDescription>
          <hr
            id="divider"
            className="w-full h-[1px] bg-slate-300 rounded-md my-4 border-0"
          />
        </DialogHeader>

        <div id="templates-section" className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Choose your Template</h2>
          <div id="templates-wrapper" className="flex items-center gap-4">
            <TemplateCard />
            <TemplateCard />
            <TemplateCard />
          </div>
        </div>

        <hr
          id="divider"
          className="w-full h-[1px] bg-slate-300 rounded-md my-4 border-0"
        />

        <form className="flex flex-col gap-4" onSubmit={handleNewDesk}>
          <h2 className="text-2xl font-semibold">Enter Desk Name</h2>
          <Input type="text" placeholder="Desk Name" name="desk_name" />

          <div id="new-members-section" className="flex flex-col gap-4">
            <div id="new-members-header" className="flex items-center gap-4">
              <h2 className="text-2xl font-semibold">Add Members</h2>
              <Input
                type="text"
                placeholder="Search"
                name="member_name"
                className="w-fit"
              />
            </div>
            <div
              id="new-members-wrapper"
              className="flex gap-4 overflow-x-auto"
            >
              <NewMemberAvatar />
              <NewMemberAvatar />
              <NewMemberAvatar />
              <NewMemberAvatar />
            </div>
          </div>

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

export default NewDeskDialog;
