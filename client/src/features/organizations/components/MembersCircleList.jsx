import avatar from "@/assets/user.svg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AddIcon from "@/assets/add.svg?react";
import NewMemberAvatar from "@/features/members/components/NewMemberAvatar";

function MembersCircleList({ organization }) {
  const visibleParticipants = organization.members.slice(0, 5);
  return (
    <div id="manage-members" className="flex items-center gap-4 justify-around">
      <div id="end-side">
        <Button>
          <AddIcon />
          Invite Members To Organization
        </Button>
      </div>

      <div id="start-side" className="flex items-center gap-4">
        <div
          id="participants-wrapper"
          className="min-w-[120px] flex items-center justify-end"
        >
          {visibleParticipants.map((participant) => (
            <NewMemberAvatar
              user={participant}
              key={participant.id}
              className="w-12 h-12"
            />
          ))}
        </div>
        <Button asChild variant="secondary">
          <Link to="members/workspace">Manage members</Link>
        </Button>
      </div>
    </div>
  );
}

export default MembersCircleList;
