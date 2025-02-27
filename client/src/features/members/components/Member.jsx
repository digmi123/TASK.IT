import { Button } from "@/components/ui/button";
import NewMemberAvatar from "./NewMemberAvatar";
import { Link } from "react-router-dom";

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
        <Button>
          <Link to={`/profile/${member.id}`}>View Profile</Link>
        </Button>
        <Button>View Boards</Button>
        <Button>View Boards</Button>
      </div>
    </div>
  );
}
