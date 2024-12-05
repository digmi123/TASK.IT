import { Button } from "@/components/ui/button";
import reactLogo from "@/assets/react.svg";

export default function Member({ member }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b-2 py-2">
      <div id="member-area" className="flex items-center gap-4">
        <img src={reactLogo} alt="" className="w-12 h-12" />
        <div id="member-info" className="flex flex-col gap-2">
          <h2 className="font-semibold text-xl">Member Name</h2>
          <p>{member.email}</p>
        </div>
      </div>
      <div id="action-buttons" className="flex gap-4">
        <Button>VIew Boards</Button>
        <Button>VIew Boards</Button>
        <Button>VIew Boards</Button>
      </div>
    </div>
  );
}
