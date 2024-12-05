import reactLogo from "@/assets/react.svg";
import { Button } from "@/components/ui/button";
import AddIcon from "@/assets/add.svg?react";

export default function MembersBoardBar() {
  return (
    <div className="flex items-center gap-6 justify-around">
      <div id="left-wrapper" className="flex gap-4">
        <div
          id="img-wrapper"
          className="w-12 h-12 rounded-md bg-slate-600 flex items-center justify-center"
        >
          <img src={reactLogo} alt="" />
        </div>
        <div id="text-wrapper">
          <h3 className="font-semibold text-xl">Board Workspace</h3>
          <p>Private</p>
        </div>
      </div>

      <Button>
        <AddIcon />
        Invite Workspace Members
      </Button>
    </div>
  );
}
