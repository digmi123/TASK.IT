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
import TemplateCard from "@/features/templates/components/TemplateCard";
import { addNewDeskThunk } from "@/redux/slices/desksSlice";
import { useDispatch } from "react-redux";
import UsersSearch from "@/shared/components/UsersSearch";
import { templateCards } from "@/features/templates/consts";

function NewDeskDialog() {
  const dispatch = useDispatch();

  const handleNewDesk = async (e) => {
    e.preventDefault();
    const deskName = e.target.desk_name.value;
    const template = e.target.template.value;
    dispatch(addNewDeskThunk({ deskName, template }));
    setOpen(false);
  };

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        <Button variant="secondary">Create Desk</Button>
      </DialogTrigger>
      <DialogContent id="new-desk-dialog" className="w-fit">
        <div id="dialog-content" className="max-w-[900px]">
          <DialogHeader>
            <DialogTitle>New Desk</DialogTitle>
            <DialogDescription>Add your own desk.</DialogDescription>
            <hr
              id="divider"
              className="w-full h-[1px] bg-slate-300 rounded-md my-4 border-0"
            />
          </DialogHeader>

          <form className="flex flex-col gap-4" onSubmit={handleNewDesk}>
            <h2 className="text-2xl font-semibold">Enter Desk Name</h2>
            <Input type="text" placeholder="Desk Name" name="desk_name" />

            <div id="templates-section" className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold">
                Choose your first board template:
              </h2>
              <div
                id="templates-cards-wrapper"
                className="flex items-center gap-4 overflow-x-auto w-full p-4"
              >
                <TemplateCard
                  templateName="None"
                  backgroundImage=""
                  className="border-2 border-slate-300 text-primary"
                  checked={true}
                />
                {templateCards.map((card) => (
                  <TemplateCard
                    key={card.templateName}
                    templateName={card.templateName}
                    backgroundImage={card.backgroundImage}
                    className="text-white"
                  />
                ))}
              </div>
            </div>

            <hr
              id="divider"
              className="w-full h-[1px] bg-slate-300 rounded-md my-4 border-0"
            />

            <UsersSearch />
            <div className="flex w-full gap-4">
              <Button type="submit" className="flex-1">
                Save
              </Button>

              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="destructive">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default NewDeskDialog;
