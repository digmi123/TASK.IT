import { Button } from "@/components/ui/button";
import NewMemberAvatar from "./NewMemberAvatar";

export default function Member({ member }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 py-2">
      <div id="member-area" className="flex items-center gap-4">
        <NewMemberAvatar user={member} />
        <div id="member-info" className="flex flex-col gap-2">
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
