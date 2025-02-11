import avatar from "@/assets/user.svg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AddIcon from "@/assets/add.svg?react";

function OrganizationMembers({ organization }) {
  console.log({ organization });

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
          className="w-[120px] flex items-center justify-end"
        >
          {visibleParticipants.map((participant, index) => {
            return (
              <img
                key={index}
                id="participant-icon"
                src={participant.picture || avatar}
                alt=""
                className="rounded-full border w-10 h-10"
              />
            );
          })}
        </div>
        <Button asChild variant="secondary">
          <Link to={`/${organization.id}/members/workspace`}>
            Manage members
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default OrganizationMembers;
